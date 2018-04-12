
module App.Modules.ResultPage {
    
    import BaseController = App.Base.BaseController;
    import IListing = App.Repositories.Listing;

    declare type ResultParams = {
       latitude? : number, longitude? : number, dateFrom?: string 
    }

    class ResultController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$stateParams', '$timeout', 'ResultPageService', '$state', 'usSpinnerService', '$filter', 'AppConstants', 'RequestService', 'HelpersService'  ];

        map : any = {
            center : [59.9127831,10.761101],
            zoom : 13,
            marker : {
                position : [59.9127831,10.761101],
                draggable : false,
                icon : '/img/marker.png'
            },
            markers : []
        };

        latitude : any;

        longitude : any;

        zoom : any = 9;

        listings : Array<IListing.ListingResponse> = [];

        spinnerKey : string = 'map-spinner';
        
        mapInstance : any;

        markers : any = [];

        activeListings : Array<IListing.ListingResponse> = [];

        activeMarker : any;

        isFilterVisible : boolean = false;

        filterOptions : any = {
            price_per_month : {
                min: 0,
                max: 5000
            },
            price_per_month_initial : {
                min: 0,
                max: 5000
            },
            size : {
                min: 0,
                max: 5000
            },
            size_initial : {
                min: 0,
                max: 5000
            }
        }

        finalCriteria : Array<CriteriaFilter> = [];

        criteria : any = [];

        criteriaTemp : Array<CriteriaFilter> = [];

        filterCount : number = 0;

        dateFrom : string;

        urlTimeout : any;

        definedEvents : boolean = false;

        reloadParamsTimeout : any;

        bouncedChangedTimeout : any;

        minDate : any;

        isDateChanged : boolean = false;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $stateParams : any,
            private $timeout : any,
            private ResultPageService : ResultPageService,
            private $state : any,
            private usSpinnerService : any,
            private $filter : any, 
            private AppConstants : App.Main.MainConstants,
            private RequestService : App.Modules.Request.RequestService,
            private HelpersService : App.Services.Helpers.HelpersService
        ){
            super( $scope, $rootScope );
 
            this.latitude = this.$stateParams.latitude;
            this.longitude = this.$stateParams.longitude;
            this.mapInstance = new google.maps.Map( document.getElementById("mapInstance"), this.getMapOptions() );
            this.minDate = moment();

            this.init();
            this.defineScope();
        }

        init = () => {
            this.$scope.$on( '$destroy', this.destroy.bind(this) );
            this.usSpinnerService.spin( this.spinnerKey );
            this.loadResults();
            let selected_address = this.ResultPageService.selected_address;
            if( selected_address ){
                this.$timeout(() => {
                    this.$scope.$apply(() => {
                        this.$scope.selected_address = this.ResultPageService.selected_address;
                    });
                }, 100);
            }
        }

        destroy = () => {
            if(this.reloadParamsTimeout)
                this.$timeout.cancel(this.reloadParamsTimeout);
        }

        defineScope = () => {
            this.$scope['selected_address'] = null;
            this.$scope['dateFrom'] = this.getDateFrom();
            this.$scope.$watch( 'selected_address', this.placeOnChanged.bind( this ) );
        }

        private getDateFrom = () => {
            return ( this.$stateParams.dateFrom ) 
                    ? moment( this.$stateParams.dateFrom, this.AppConstants.dateFormat).format()
                    : null;
        }

        private reloadStateParams = ( params : ResultParams = {}, from : string ) => {
            if( this.reloadParamsTimeout ){
                this.$timeout.cancel(this.reloadParamsTimeout);
            }
            
            this.reloadParamsTimeout = this.$timeout(() => {
                let defaultParams : any = {
                    latitude :  this.latitude,
                    longitude :  this.longitude,
                    // dateFrom : this.dateFrom
                }

                if(!_.isEmpty(this.$scope['selected_address'])){
                    defaultParams.search = this.$scope['selected_address'].formatted_address;
                    this.HelpersService.gtmSearch();
                }
    
                this.$state.go('main.result_page', _.extend( defaultParams, params ), { notify : false } );
                history.replaceState({}, this.$state.current.data, window.location.href);
               
            }, 500);
        }

        setDateFrom = ( dateFrom : string, value : any) => {
            if(value) {
                dateFrom = value.format(this.AppConstants.dateFormat);
                this.dateFrom = dateFrom;
                this.$scope.dateFrom = dateFrom;
                this.isDateChanged = true;
                if( dateFrom !== this.$stateParams.dateFrom )
                    this.reloadStateParams({ dateFrom : dateFrom }, 'setDateFrom');  
            }
        }

        defineEvents = () => {
            if( !this.definedEvents ) {
                // this.mapInstance.addListener('bounds_changed', this.boundsChanged.bind(this));
                this.mapInstance.addListener('dragend', this.dragEnd.bind(this));
                this.mapInstance.addListener('dragstart', this.dragStart.bind(this));
                this.mapInstance.addListener('zoom_changed', this.zoomChanged.bind(this));
                this.mapInstance.addListener('click', this.mapClicked.bind(this));
                google.maps.event.trigger(this.mapInstance, 'resize');
                this.definedEvents = true;
            }
        }

        mapClicked = () => {
            if( this.activeMarker ){
                this.activeMarker.close();
            }
        }

        boundsChanged = () => {
            if(this.bouncedChangedTimeout){
                this.$timeout.cancel(this.bouncedChangedTimeout);
            }   
            this.bouncedChangedTimeout = this.$timeout(() => {
                let center = this.mapInstance.getCenter();
                this.zoom = this.mapInstance.getZoom();
                this.setLatLng( center.lat(), center.lng() );
                
                this.reloadStateParams({}, 'bounsedChanged');
            }, 500);
        }

        zoomChanged = () =>{
            this.dragStart();
            this.dragEnd();
        }
        
        dragStart = () => {
            this.usSpinnerService.spin( this.spinnerKey );
            
            // clean markers
            _.each( this.markers, ( marker : any ) => {
                if( !this.mapInstance.getBounds().contains( marker.getPosition() ) ){
                    marker.close();
                }
            } );
        }

        removeMarkers = () => {
            _.each( this.markers, ( marker : any ) => {
                marker.close();
            });
        }

        dragEnd = () => {
            this.$timeout(() => {
                this.showMarkers( this.filterListing( this.listings ) );
                this.resetRangeValues();
                this.filterOptions.size.min = this.filterOptions.size_initial.min ;
                this.filterOptions.price_per_month.max = this.filterOptions.price_per_month_initial.max;
                this.filterOptions.price_per_month.min = this.filterOptions.price_per_month_initial.min ;
                this.filterOptions.size.max = this.filterOptions.price_per_month_initial.max;
                this.usSpinnerService.stop( this.spinnerKey );
                let center = this.mapInstance.getCenter();
                this.zoom = this.mapInstance.getZoom();
                this.setLatLng( center.lat(), center.lng() );
                this.reloadStateParams({}, 'dragEnd');
            }, 1500 );
        }

        loadResults = () => {
            this.usSpinnerService.spin( this.spinnerKey );
            return this.ResultPageService.getResults( [ this.latitude, this.longitude ] ).then( this.setMapResults.bind(this) );
        }

        filterListing = ( listings : Array<IListing.ListingResponse> ) => {
            google.maps.event.trigger(this.mapInstance, 'resize');
            this.activeListings = _.filter( listings, ( listing : IListing.ListingResponse) => {
                return this.mapInstance.getBounds().contains( new google.maps.LatLng( listing.latitude, listing.longitude ) );
            });
            this.activeListings = this.ResultPageService.ResultFilter( this.activeListings )
                .filter( this.finalCriteria )
                .addPointsCriteria()
                .sort('points', 'asc')
                // .sort(['distance_in_km', 'price_per_month'], ['asc', 'asc'])
                .get();
                return this.activeListings;
        }

        showMarkers = ( listings : Array<IListing.ListingResponse> ) => {
            let _self = this;
            _.each( listings, ( listing : IListing.ListingResponse) => {
                if(_.has(listing, 'price_per_month')){
                    let listing_element = `listing-${listing.id}`,
                        listing_marker_element = `listing-marker-${listing.id}`;

                    let infobox : any = new InfoBox({
                        content : `<div class="listing-marker ${listing_element}" id="${listing_element}"><b>${listing.price_per_month}</b>&nbsp;<span>NOK</span></div>`,
                        disableAutoPan : false,
                        closeBoxURL: '',
                        position : new google.maps.LatLng( listing.latitude, listing.longitude ),
                        zIndex : 1,
                        pixelOffset: new google.maps.Size(-48, -44),
                        alignBottom : true,
                    }); 

                    // add click event to marker
                    google.maps.event.addListener(infobox, 'domready', ( element : any ) => {
                        angular.element(document).find(`.${listing_element}`).bind('click', () => {
                            if(this.activeMarker){
                                this.activeMarker.close();
                            }
                            this.activeMarker = infobox;

                            let active_infobox = new InfoBox( this.ResultPageService.listingAnnotation( listing, listing_marker_element ) );
                            
                            google.maps.event.addListener(active_infobox, 'domready', ( element : any ) => {
                                 angular.element(document).find(`.${listing_marker_element}`).bind('click', () => {
                                        this.navigateListingView( listing.id, listing.heading, listing.location, _self );
                                 });
                            });
                            
                            this.activeMarker = active_infobox;
                            active_infobox.open( this.mapInstance );
                        });
                    });

                    

                    // add to markers collection
                    this.markers.push( infobox );

                    // show marker to map
                    infobox.open(this.mapInstance);
                }
            });
        }

        setMapResults = ( listings : Array<IListing.ListingResponse> ) => {
            this.listings = this.ResultPageService.transformListing( listings );
            
            let options = this.getMapOptions();
            this.mapInstance.setCenter( options.center );
            this.mapInstance.setZoom( options.zoom );  
            // smart zoom
            let smart_zoom = this.ResultPageService.smartZoom( this.listings, this.mapInstance, 9 );
            
            this.showMarkers( this.filterListing( listings ) );
            
            this.defineEvents();
            this.usSpinnerService.stop( this.spinnerKey );
            this.resetRangeValues();
            this.filterOptions.price_per_month.max = this.filterOptions.price_per_month_initial.max;
            this.filterOptions.price_per_month.min = this.filterOptions.price_per_month_initial.min ;
            this.filterOptions.size.min = this.filterOptions.size_initial.min ;
            this.filterOptions.size.max = this.filterOptions.price_per_month_initial.max;
            
        }

        private resetRangeValues = () => {
            let activeListings = _.filter( this.listings, ( listing : IListing.ListingResponse) => {
                return this.mapInstance.getBounds().contains( new google.maps.LatLng( listing.latitude, listing.longitude ) );
            });
            this.filterOptions.price_per_month_initial.min = 0;
            let max_pm = _.maxBy( activeListings, (o : any) => {
                return o.price_per_month
            } );

            if( _.has( max_pm, 'price_per_month' ) ){
                    this.filterOptions.price_per_month_initial.max = max_pm.price_per_month
            }else {
                this.filterOptions.price_per_month_initial.max = 0;
            }
            this.filterOptions.size_initial.min = 0;
            let max_area = _.maxBy( activeListings, (o : any) => {
                return o.area;
            });

            if( _.has( max_area, 'area' ) ){
                    this.filterOptions.size_initial.max = max_area.area;
            }else {
                this.filterOptions.size_initial.max = 0;
            }
        }

        placeOnChanged = ( newValue : any ) => {
            if( !_.isNull( newValue ) ){
                this.setLatLng( newValue.geometry.location.lat(), newValue.geometry.location.lng() );
                this.reloadResults();
            }
        }

        useMyLocation = () => {
            return navigator.geolocation.getCurrentPosition( ( position : any ) => {
                this.setLatLng( position.coords.latitude, position.coords.longitude );
                this.reloadResults();
            } );
        }

        reloadResults = () => {
            this.reloadStateParams({}, 'reloadResults');
            this.loadResults();
        }

        getMapOptions = () => {
            return {
                center : new google.maps.LatLng( this.latitude, this.longitude ),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom : this.zoom,
                streetViewControl: false,
                styles : {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                clickableIcons : false
            }
        }

        setLatLng = ( lat : any, lng : any ) => {
            this.latitude = lat;
            this.longitude = lng;
        }

        filter = () => {
            this.removeMarkers();
            this.showMarkers( this.activeListings );
        }

        doFilter = (criteria : any, price_per_month : any, area : any) => {
            this.filterCount = 0;
            let str_criterias : string[] = [ 'access', 'own_shared' ],
                arr_criterias : string[] = [ 'types', 'accessibility', 'accessories' ],
                finalCriteria : Array<ResultPage.CriteriaFilter> = [];

            if( !_.isEqual(price_per_month, this.filterOptions.price_per_month_initial) ) {
                this.filterCount += 1;
                finalCriteria.push({ type : 'range', column : 'price_per_month', values : [ price_per_month.min, price_per_month.max  ] });
            }
            if( !_.isEqual(area, this.filterOptions.size_initial) ) {
                this.filterCount += 1;
                finalCriteria.push({ type : 'range', column : 'area', values : [ area.min, area.max  ] });
            }

            criteria = _.mapValues( criteria, ( value : any) => {
                return _.keys(_.pickBy(value, (svalue : any, skey : any) => {
                    return svalue;
                }));
            });
            
            _.each( str_criterias, ( c : any ) => {
                if( _.has( criteria, c ) ){
                    if( !_.isEmpty( criteria[c]) ){
                        this.filterCount += 1;
                        finalCriteria.push({
                            type : 'string',
                            column : c,
                            values : criteria[c]
                        });
                    }
                }
            });

            _.each( arr_criterias, ( c : any ) => {
                if( _.has( criteria, c ) ){
                    if( !_.isEmpty( criteria[c]) ){
                        this.filterCount += 1;
                        finalCriteria.push({
                            type : 'array',
                            column : c,
                            values : criteria[c]
                        });
                    }
                }
            });

            this.finalCriteria = finalCriteria;
            this.removeMarkers();
            this.activeListings = this.filterListing( this.listings )
            this.showMarkers(this.activeListings);
        }

        resetFilter = () => {
            this.filterCount = 0;
            this.finalCriteria = [];
            this.criteria.access = [];
            this.criteria.accessories = [];
            this.criteria.own_shared = [];
            this.criteria.accessibility = [];
            this.criteria.types = [];
            this.filterOptions.price_per_month.min = this.filterOptions.price_per_month_initial.min;
            this.filterOptions.price_per_month.max = this.filterOptions.price_per_month_initial.max;
            this.filterOptions.size.min = this.filterOptions.size_initial.min;
            this.filterOptions.size.max = this.filterOptions.size_initial.max;
            this.activeListings = this.filterListing( this.listings );
            this.resetRangeValues();
            this.filterOptions.size.min = this.filterOptions.size_initial.min ;
            this.filterOptions.price_per_month.max = this.filterOptions.price_per_month_initial.max;
            this.filterOptions.price_per_month.min = this.filterOptions.price_per_month_initial.min ;
            this.filterOptions.size.max = this.filterOptions.price_per_month_initial.max;
            this.showMarkers(this.activeListings);
        }

        cancelFilter = () => {
            if(_.isEmpty(this.finalCriteria)){
                this.isFilterVisible = false;
            } else {
                this.criteria = this.ResultPageService.FilterReverse( this.finalCriteria );
                if( _.has( this.criteria, 'price_per_month' ) ){
                    this.filterOptions.price_per_month.max = this.criteria.price_per_month.max;
                    this.filterOptions.price_per_month.min = this.criteria.price_per_month.min;
                }

                if( _.has(this.criteria, 'area') ){
                    this.filterOptions.size.max = this.criteria.area.max;
                    this.filterOptions.size.min = this.criteria.area.min;
                }
            }
            this.isFilterVisible = false;
        }

        navigateListingView = ( id : string, heading : string, location : string, parent : any = {} ) => {
            this.ResultPageService.selected_address = null;
            this.RequestService.removeRequest();

            // let dateFrom = _.isEmpty(parent) && !_.isNull(this.$scope['dateFrom']) ? moment(this.$scope.dateFrom, this.AppConstants.dateTimeFormatStore).format(this.AppConstants.dateFormat) : parent.$scope.dateFrom;
            let dateFrom = _.isEmpty(parent)  
                            ? !_.isNull(this.$scope['dateFrom']) ? moment(this.$scope.dateFrom, this.AppConstants.dateTimeFormatStore).format(this.AppConstants.dateFormat) : undefined
                            : parent.$scope.dateFrom;
            
            if(this.isDateChanged)
                dateFrom = this.$scope.dateFrom;

            this.$state.go('main.storage_view', {
                id : id,
                dateFrom : dateFrom,
                prev : 'result-page'
            });
        }
        
    }

    resultModule.controller( 'ResultController', ResultController );

}
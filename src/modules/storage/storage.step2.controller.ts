
module App.Modules.Storage.AddListing {
    
    import BaseController = App.Base.BaseController;
    import IListingType = App.Repositories.ListingType;
    import IApiResponse = App.Interfaces.IApiResponse;
    import IListing = App.Repositories.Listing;

    class Step2Controller extends StepController 
    {
        static $inject = [ '$scope', '$rootScope', 'AddListingService', '$state', '$timeout', '$stateParams', 'Notifications', 'HelpersService', '$window', '$q', '$uibModal' ];

        listing : IListing.ListingResponse;

        selected_address : string;

        lat : any;

        lng : any;

        map : any = {
            center : [59.9127831,10.761101],
            zoom : 15,
            marker : {
                position : [null]
            },
            styles : {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            },
            clickableIcons : false
        };
        
        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            AddListingService : AddListingService,
            $state : any,
            private $timeout : any,
            $stateParams : any,
            notify : App.Base.EventDispatcher,
            private HelpersService : App.Services.Helpers.HelpersService,
            $window : any,
            $q : any,
            $uibModal : any
        ){
            super( $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP2', $q, $window, $uibModal );
            this.init();
            this.defineListeners();
        }

        init = () => {
            this.baseInit().then( () => {
                this.defineScope();
                this.stopLoading();
            });
        }

        defineScope = () => {
            this.$scope['selected_address'] = null;

            if( _.has( this.listing, 'google_address' ) ){
                if( !_.isEmpty( this.listing.google_address ) ){
                    this.$scope['selected_address'] = this.listing.google_address;
                    this.$timeout( () => {
                        this.$scope.$apply( () => {
                            this.placeOnChanged( this.listing.google_address );
                        });
                    }, 500);
                }
            }

            this.$scope.$watch( 'selected_address', this.placeOnChanged.bind( this ) );

        }

        defineListeners = () => {
            this.$scope.$on( '$destroy', this.destroy.bind(this) );
            this.Notifications.addEventListener( 'STEPS.UNSAVED_REDIRECT', this.unsavedRedirect.bind( this ) );
        }

        destroy = () => {
            this.Notifications.removeEventListener( 'STEPS.UNSAVED_REDIRECT', this.unsavedRedirect.bind( this ) );
        }

        unsavedRedirect = () => {
            this.save(this.listing).then(() => {
                this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                swal.close();
                this.navigateTo(this.listing, this.AddListingService.afterSaveRoute);
            });
            // this.confirmOnSave().then((isConfirm : boolean) => {
            //     if(isConfirm){
            //         return this.save(this.listing).then(() => {
            //             this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
            //             swal.close();
            //             this.navigateTo(this.listing, this.AddListingService.afterSaveRoute);
            //         });
            //     }else {
            //         this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
            //         this.navigateTo(this.listing, this.AddListingService.afterSaveRoute);
            //     }
            // });
        }

        placeOnChanged = ( newValue : any ) => {
            if(_.isObject(newValue)) {
                if( _.isNumber( newValue.geometry.location.lat ) && _.isNumber( newValue.geometry.location.lng ) ){
                    this.setLatLng( parseFloat(this.listing.latitude), parseFloat( this.listing.longitude ) );
                } else {
                    this.setLatLng( newValue.geometry.location.lat(), newValue.geometry.location.lng() );
                }
                let location = [
                    this.lat,
                    this.lng
                ];
                let isNewAddress = !_.isEqual(this.listing.google_address, newValue);

                let address_component = this.HelpersService.GoogleMap.setAddressComponents(newValue);
                this.listing.location   =   isNewAddress ? address_component.getFullAddressName() : this.listing.location;
                this.listing.country    =   isNewAddress ? address_component.getCountry() : this.listing.country;
                this.listing.city       =   isNewAddress ? address_component.getCity() : this.listing.city;
                this.listing.zip        =   isNewAddress ? address_component.getPostalCode() : this.listing.zip;

                this.map.marker.position = location;
                this.map.center = location;
                this.map.zoom = 14;
            }
        }

        setLatLng = ( lat : any, lng : any ) => {
            this.lat = lat;
            this.lng = lng;
        }

        save = ( listing : IListing.ListingResponse, route_name? : string ) => {
            this.startLoading();
            return this.showAcceptTerms().then((resp) => {
                listing = angular.copy(listing);

                if(resp == 'cancel'){
                    listing = angular.copy(this.original_listing);
                    this.stopLoading();
                }

                let google_address = this.$scope['selected_address'];
                let address_component = this.HelpersService.GoogleMap.setAddressComponents(listing.google_address);
                let params : IListing.ListingResponse = {
                    google_address : google_address,
                    latitude : this.lat,
                    longitude : this.lng,
                    location : listing.location,
                    country : listing.city,
                    city : listing.city,
                    zip : listing.zip,
                    location_description : listing.location_description,
                    id : listing.id,
                };
                params['step_no'] = this.step_no;
                params['accept_terms'] = this.accepted;
                return this.AddListingService.save(params).then( ( resp : IListing.ListingResponse ) => {
                    this.stopLoading();
                    if( route_name ){
                        this.navigateTo(listing, route_name);
                    } else {
                        this.refreshFormPrestine(listing);
                    }
                }, (error : any) => {
                    this.errorBags = this.errorTranslate(error);
                    this.stopLoading();
                } );
            }, () => {
                this.stopLoading();
            });
        }
    }

    storageModule.controller( 'Step2Controller', Step2Controller );
}
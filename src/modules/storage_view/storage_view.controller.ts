
module App.Modules.StorageView {
    
    import BaseController = App.Base.BaseController;

    class StorageViewController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$stateParams', 'StorageViewService', 'AppConstants', '$timeout', '$anchorScroll', '$location', 'HelpersService', '$state', 'RequestService', '$sce' ];

        listing : App.Repositories.Listing.ListingResponse;

        map : any = {
            center : [],
            styles : {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            },
            clickableIcons : false
        };

        minDate : any;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $stateParams : any,
            private StorageViewService : StorageViewService,
            private AppConstants : App.Main.MainConstants,
            private $timeout : any,
            private $anchorScroll : any,
            private $location : any,
            private Helpers : App.Services.Helpers.HelpersService,
            private $state : any,
            private RequestService : App.Modules.Request.RequestService,
            private $sce : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.$rootScope['meta_description'] = `https://www.b4r.no/boder/lager-til-leie-i-kjeller/${this.$stateParams.id}`;
            this.loading();
            this.$scope['dateFrom'] = this.getDateFrom();
            this.StorageViewService.getListing( this.$stateParams.id ).then(this.setListing.bind(this));
            // open send request modal if theres a request saved
            if(!_.isEmpty(this.RequestService.getRequest()) && this.$stateParams.requestSaved == 1) {
                this.sendRequest()
            } else {
                this.RequestService.removeRequest();
            }
            
            this.minDate = moment();


        }

        private getDateFrom = () => {
            console.log(this.$stateParams.dateFrom);
            return ( this.$stateParams.dateFrom ) 
                    ? moment( this.$stateParams.dateFrom, this.AppConstants.dateFormat).format()
                    : moment();
        }

        setListing = ( listing : App.Repositories.Listing.ListingResponse ) => {
            this.listing = this.StorageViewService.transformListing(listing);
            this.StorageViewService.listing = this.listing;
            this.listing.photos = _.map(listing.photos, ( photo : any ) => {
                photo.path = `${this.$rootScope['baseUrl']}/${photo.path}`;
                return photo;
            });
            this.listing.created_at = moment(this.listing.created_at, this.AppConstants.dateFormat).format('Do MMM YYYY');
            this.listing.description = this.$sce.trustAsHtml(listing.description);
            console.log(this.listing.description);
            if( _.isEmpty(listing.photos) ){
                this.listing.photos = [];
                this.listing.photos.push({
                    path : `${this.$rootScope['resource_path']}/no_image_thumb.gif`
                });
            }
            this.$timeout(() => {
                this.$scope.$apply(() => {
                    this.map.center = [this.listing.google_address.geometry.location.lat, this.listing.google_address.geometry.location.lng];
                });
            }, 500);
            this.listing.user['ratings'] = _.filter(this.listing.user['ratings'], (rating : any) => {
                return rating.from_user_id;
            });
            this.listing.user['ratings'] = _.map(this.listing.user['ratings'], (rating : any) => {
                rating.reviewer = this.Helpers.transformProfilePicture(rating.reviewer);
                rating.rating = parseInt(rating.rating);
                return rating;
            });
            this.listing['listing_rating'] = _.meanBy(this.listing.user['ratings'], 'rating');

            let address_component = this.Helpers.GoogleMap.setAddressComponents(this.listing.google_address);
            this.listing.zip = !_.isEmpty( this.listing.zip ) ? this.listing.zip : address_component.getPostalCode();
            this.listing.city = !_.isEmpty( this.listing.city ) ? this.listing.city : address_component.getCity();
            this.listing.user.created_at = this.listing.user.created_at.format('MMM YYYY');
            this.listing.price_per_month = parseInt(this.listing.price_per_month); 
            this.ready();
        }   

        goToAnchor = (location : string) => {
            if(this.$location.hash() !== location){
                this.$location.hash(location);
            } else {
                this.$anchorScroll();
            }
        }

        setDateFrom = ( dateFrom : string, value : any) => {
            if(value) {
                dateFrom = value.format(this.AppConstants.dateFormat);
                this.$scope['dateFrom'] = moment( dateFrom, this.AppConstants.dateFormat).format(this.AppConstants.dateFormatStore);
                if( dateFrom !== this.$stateParams.dateFrom )
                    this.reloadStateParams({ dateFrom : dateFrom });  
            }
        }

        private reloadStateParams = ( params : any = {} ) => {
            let defaultParams = {
                id : this.$stateParams.id,
                dateFrom : this.$scope['dateFrom']
            }

            this.$state.go('main.storage_view', _.extend( defaultParams, params ), { notify : false } );
        }

        goBack = () => {
            window.history.back();
        }

        sendRequest = () => {
            this.$stateParams['dateFrom'] = this.$scope.dateFrom;
            this.RequestService.onClickSendRequest(this.$stateParams);
        }
    }

    storageViewModule.controller( 'StorageViewController', StorageViewController );

}

module App.Modules.SpecialListing {
    
    import BaseController = App.Base.BaseController;

    class SpecialListingController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'AdminListing', 'AddListingService', '$state' ];

        listings : App.Repositories.AdminListing.AdminListingResponse[];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private AdminListing : App.Repositories.AdminListing.AdminListingRepository,
            private AddListingService : App.Modules.Storage.AddListing.AddListingService,
            private $state : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        private init = () => {
            this.loading();
            this.AdminListing.getSpecialListing()
                .then(this.setListings.bind(this))
                .then(() => {
                    this.ready();
                });
        }

        private setListings = ( listings : App.Repositories.AdminListing.AdminListingResponse[] ) => {
            this.listings = listings;
        }

        updateListing = ( listing : App.Repositories.Listing.ListingResponse ) => {
            this.AddListingService.setListing( angular.copy(listing) );
            this.AddListingService.isNewListing = false;
            this.$state.go('main.account.storage.add_listing.step1_edit', { listing_id : listing.id, isNew : 0, isSpecial : 1 } );
        }
    }

    specialListingModule.controller( 'SpecialListingController', SpecialListingController );

}
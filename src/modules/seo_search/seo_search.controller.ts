
module App.Modules.SeoSearch {
    
    import BaseController = App.Base.BaseController;

    class SeoSearchController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$stateParams', 'SeoSearchService', 'ResultPageService', 'RequestService', '$state', 'Cms', '$sce', 'AppConstants', '$window' ];

        placeName : string;

        listings : App.Repositories.Listing.ListingResponse[] = [];

        cons : {
            placeString? : string,
            defaultPlace? : string
        } = {
            defaultPlace : 'oslo'
        };

        description : string = ""; 
        
        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $stateParams : any,
            private SeoSearchService : SeoSearchService,
            private ResultPageService : App.Modules.ResultPage.ResultPageService,
            private RequestService : App.Modules.Request.RequestService,
            private $state : any,
            private Cms : App.Repositories.Cms.CmsRepository,
            private $sce : any,
            private AppConstants : App.Main.MainConstants,
            private $window : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.$window.scrollTo(0, 0);
            this.placeName = this.getPlaceName();
            this.getListings();
            this.getSeoContent();
            this.setSeoTags();
        }

        setSeoTags = () => {
            this.$rootScope['pageTitle'] = `Lager ${this.placeName}`;
        }

        getSeoContent = () => {
            let placeName = this.placeName;
            if( _.indexOf(this.AppConstants.mainSeoPlaces, this.placeName) == -1 ) {
                placeName = 'SEO';
            }
            this.Cms.find(null, { name : placeName }).then((cms : App.Repositories.Cms.CmsResponse ) => {
                if( !_.isEmpty(cms) )
                    this.description = this.$sce.trustAsHtml(cms.content);
                this.$rootScope['metaDescription'] = this.description ? String(this.description).replace(/<[^>]+>/gm, '') : '';
            });
        }

        private getPlaceName = () => {
            console.log(this.$stateParams.place);
            let placeNameSplit = _.split( this.$stateParams.place, 'lager-' ),
                placeName = this.cons.defaultPlace;

            if( placeNameSplit.length == 2 ){
                placeName = placeNameSplit[1];
            }

            return placeName;
        }

        private getListings = () => {
            this.SeoSearchService.getSeoSearch( this.placeName ).then( this.setListings.bind(this) );
        }

        private setListings = ( listings : App.Repositories.Listing.ListingResponse[] ) => {
            this.listings = this.ResultPageService.transformListing(listings);
        }

        navigateListingView = ( id : string ) => {
            this.ResultPageService.selected_address = null;
            this.RequestService.removeRequest();

            this.$state.go('main.storage_view', {
                id : id
            });
        }
    }

    seoSearchModule.controller( 'SeoSearchController', SeoSearchController );

}
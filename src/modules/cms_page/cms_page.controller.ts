
module App.Modules.CmsPage {
    
    import BaseController = App.Base.BaseController;

    class CmsPageController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'CmsPageService', '$stateParams', '$sce', '$window' ];

        page : App.Repositories.Cms.CmsResponse;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private CmsPageService : CmsPageService,
            private $stateParams : any,
            private $sce : any,
            private $window : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.$window.scrollTo(0, 0);
            // this.CmsPageService.getPage( this.$stateParams.name ).then(this.setPage.bind(this));
        }

        setPage = ( page : App.Repositories.Cms.CmsResponse ) => {
            this.page = page;
            this.page.content = this.$sce.trustAsHtml(this.page.content);
        }
    }

    cmsPageModule.controller( 'CmsPageController', CmsPageController );

}
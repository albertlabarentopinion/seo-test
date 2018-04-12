let seoSearchModule : any;

module App.Modules.SeoSearch {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const SeoSearchConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'seo_search/templates/'
        }
        return cons;
    })();

    function SeoSearchConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, SeoSearchConstants : IConstants.ModuleConstants) {

        let templatePath = SeoSearchConstants.templateUrl;

        $stateProvider
            .state('main.seo_search', {
                url: "/:place",
                views : {
                    main : {
                        templateUrl: `${templatePath}seo_search.html`,
                        controller : 'SeoSearchController',
                        controllerAs : 'seoSearchCtrl'
                    }
                },
                data : {
                    pageTitle : 'PT_SEARCH_STORAGE'
                }
            });

    }

    SeoSearchConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'SeoSearchConstants' ];

    seoSearchModule = angular.module(`${App.Config.Ng.module.name}.seo_search`, [])
                    .constant('SeoSearchConstants', SeoSearchConstants)
                    .config(SeoSearchConfig);

}
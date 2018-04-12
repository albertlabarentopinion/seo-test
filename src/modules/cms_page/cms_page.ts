let cmsPageModule : any;

module App.Modules.CmsPage {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const CmsPageConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'cms_page/templates/'
        }
        return cons;
    })();

    function CmsPageConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, CmsPageConstants : IConstants.ModuleConstants) {

        let templatePath = CmsPageConstants.templateUrl;

        $stateProvider
            .state('main.cms_page', {
                url: "/Content/:name",
                views : {
                    main : {
                        templateUrl: `${templatePath}cms_page.html`,
                        controller : 'CmsPageController',
                        controllerAs : 'cmsPageCtrl'
                    }
                },
                data : {
                    pageTitle : 'PT_CONTENT'
                }
            });

    }

    CmsPageConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'CmsPageConstants' ];

    cmsPageModule = angular.module(`${App.Config.Ng.module.name}.cms_page`, [])
                    .constant('CmsPageConstants', CmsPageConstants)
                    .config(CmsPageConfig);

}
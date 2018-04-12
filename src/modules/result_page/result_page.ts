let resultModule : any;

module App.Modules.ResultPage {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const ResultPageConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'result_page/templates/'
        }
        return cons;
    })();

    function ResultConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, ResultPageConstants : IConstants.ModuleConstants) {

        let templatePath = ResultPageConstants.templateUrl;

        $stateProvider
            .state('main.result_page', {
                url: "/ResultPage/:latitude/:longitude?dateFrom&search",
                views : {
                    main : {
                        templateUrl: `${templatePath}result_page.html`,
                        controller : 'ResultController',
                        controllerAs : 'resultCtrl'
                    }
                },
                data : {
                    pageTitle : 'PT_RESULT_PAGE'
                }
            });

    }

    ResultConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'ResultPageConstants' ];

    resultModule = angular.module(`${App.Config.Ng.module.name}.result_page`, [])
                    .constant('ResultPageConstants', ResultPageConstants)
                    .config(ResultConfig);

}
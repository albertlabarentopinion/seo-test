let requestModule : any;

module App.Modules.Request {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const RequestConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'request/templates/'
        }
        return cons;
    })();

    function RequestConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, RequestConstants : IConstants.ModuleConstants) {

        let templatePath = RequestConstants.templateUrl;
    }

    RequestConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'RequestConstants' ];

    requestModule = angular.module(`${App.Config.Ng.module.name}.request`, [])
                    .constant('RequestConstants', RequestConstants)
                    .config(RequestConfig);

}
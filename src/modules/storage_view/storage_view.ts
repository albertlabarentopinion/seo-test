let storageViewModule : any;

module App.Modules.StorageView {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const StorageViewConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'storage_view/templates/'
        }
        return cons;
    })();

    function StorageViewConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, StorageViewConstants : IConstants.ModuleConstants) {

        let templatePath = StorageViewConstants.templateUrl;

        $stateProvider
            .state('main.storage_view', {
                url: "/ListingView/:id?dateFrom&prev&requestSaved",
                views : {
                    main : {
                        templateUrl: `${templatePath}storage_view.html`,
                        controller : 'StorageViewController',
                        controllerAs : 'storageViewCtrl'
                    }
                },
                data : {
                    pageTitle : 'PT_LISTING_VIEW'
                }
            });

    }

    StorageViewConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'StorageViewConstants' ];

    storageViewModule = angular.module(`${App.Config.Ng.module.name}.storage_view`, [])
                    .constant('StorageViewConstants', StorageViewConstants)
                    .config(StorageViewConfig);

}
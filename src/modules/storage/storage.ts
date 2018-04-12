let storageModule : any;

module App.Modules.Storage {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const StorageConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'storage/templates/'
        }
        return cons;
    })();

    function StorageConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, StorageConstants : IConstants.ModuleConstants) {

        let templatePath = StorageConstants.templateUrl;

        $urlRouterProvider.when( '/${App.Config.Variables.appAlias}/Account/Storage/Listing', '/${App.Config.Variables.appAlias}/Account/Storage/Listing/Step1' );

        $stateProvider
            .state('main.account.storage', {
                url: "/Storage",
                views : {
                    account : {
                        templateUrl: `${templatePath}storage.html`,
                        controller : 'StorageController',
                        controllerAs : 'storageCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_MY_STORAGE'
                }
            })
            .state('main.account.storage.add_listing', {
                url: "/Listing",
                views : {
                    "main@main" : {
                        templateUrl: `${templatePath}add_listing.html`,
                        controller : 'AddListingController',
                        controllerAs : 'addListingCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    }
                }
            })
            .state('main.account.storage.add_listing.step1', {
                url: "/Step1?isNew&isSpecial",
                views : {
                    "add_listing@main.account.storage.add_listing" : {
                        templateUrl: `${templatePath}storage.step1.html`,
                        controller : 'Step1Controller',
                        controllerAs : 'step1Ctrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_STEP_1'
                }
            })
            .state('main.account.storage.add_listing.step1_edit', {
                url: "/:listing_id/Step1?isNew&isSpecial",
                views : {
                    "add_listing@main.account.storage.add_listing" : {
                        templateUrl: `${templatePath}storage.step1.html`,
                        controller : 'Step1Controller',
                        controllerAs : 'step1Ctrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_STEP_1'
                }
            })
            .state('main.account.storage.add_listing.step2', {
                url: "/:listing_id/Step2?isNew",
                views : {
                    "add_listing@main.account.storage.add_listing" : {
                        templateUrl: `${templatePath}storage.step2.html`,
                        controller : 'Step2Controller',
                        controllerAs : 'step2Ctrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_STEP_2'
                }
            })
            .state('main.account.storage.add_listing.step3', {
                url: "/:listing_id/Step3?isNew",
                views : {
                    "add_listing@main.account.storage.add_listing" : {
                        templateUrl: `${templatePath}storage.step3.html`,
                        controller : 'Step3Controller',
                        controllerAs : 'step3Ctrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_STEP_3'
                }
            })
            .state('main.account.storage.add_listing.step4', {
                url: "/:listing_id/Step4?isNew&isAccepted",
                views : {
                    "add_listing@main.account.storage.add_listing" : {
                        templateUrl: `${templatePath}storage.step4.html`,
                        controller : 'Step4Controller',
                        controllerAs : 'step4Ctrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_STEP_4'
                }
            });

    }

    StorageConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'StorageConstants' ];

    storageModule = angular.module(`${App.Config.Ng.module.name}.storage`, [])
                    .constant('StorageConstants', StorageConstants)
                    .config(StorageConfig);

}
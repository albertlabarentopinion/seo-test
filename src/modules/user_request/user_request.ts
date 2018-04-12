let userRequestModule : any;

module App.Modules.UserRequest {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const UserRequestConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'user_request/templates/'
        }
        return cons;
    })();

    function UserRequestConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, UserRequestConstants : IConstants.ModuleConstants) {

        let templatePath = UserRequestConstants.templateUrl;

        $stateProvider
            .state('main.account.user_request', {
                url: "/UserMessages",
                views : {
                    "account" : {
                        templateUrl: `${templatePath}user_request.html`,
                        controller : 'UserRequestController',
                        controllerAs : 'userRequestCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_USER_MESSAGES'
                }
            })
            .state('main.account.user_request.request', {
                url: "/Message/:id?source_id&three_d_verification_status",
                views : {
                    "account@main.account" : {
                        templateUrl: `${templatePath}user_request.request.html`,
                        controller : 'UserRequestRequestController',
                        controllerAs : 'userByRequestCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_USER_MESSAGE'
                }
            });

    }

    UserRequestConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'UserRequestConstants' ];

    userRequestModule = angular.module(`${App.Config.Ng.module.name}.user_request`, [])
                    .constant('UserRequestConstants', UserRequestConstants)
                    .config(UserRequestConfig);

}
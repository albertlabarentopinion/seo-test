let userProfileModule : any;

module App.Modules.UserProfile {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const UserProfileConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'user_profile/templates/'
        }
        return cons;
    })();

    function UserProfileConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, UserProfileConstants : IConstants.ModuleConstants) {

        let templatePath = UserProfileConstants.templateUrl;

        $stateProvider
            .state('main.user_profile', {
                url: "/Profile/:user_id",
                views : {
                    main : {
                        templateUrl: `${templatePath}user_profile.html`,
                        controller : 'UserProfileController',
                        controllerAs : 'userProfileCtrl'
                    }
                },
                data : {
                    pageTitle : 'PT_USER_PROFILE'
                }
            });

    }

    UserProfileConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'UserProfileConstants' ];

    userProfileModule = angular.module(`${App.Config.Ng.module.name}.user_profile`, [])
                    .constant('UserProfileConstants', UserProfileConstants)
                    .config(UserProfileConfig);

}
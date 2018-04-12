let editProfileModule : any;

module App.Modules.EditProfile {

    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const EditProfileConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'edit_profile/templates/'
        }
        return cons;
    })();

    function EditProfileConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, EditProfileConstants : IConstants.ModuleConstants) {

        let templatePath = EditProfileConstants.templateUrl;

        // Account default to profile
        
        $stateProvider
            .state('main.account.edit_profile', {
                url: "/EditProfile",
                views : {
                    "account" : {
                        templateUrl: `${templatePath}edit_profile.html`,
                        controller : 'EditProfileController',
                        controllerAs : 'editProfileCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_EDIT_PROFILE'
                }
            });

    }

    EditProfileConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'EditProfileConstants' ];

    editProfileModule = angular.module(`${App.Config.Ng.module.name}.edit_profile`, [])
                            .constant('EditProfileConstants', EditProfileConstants)
                            .config(EditProfileConfig);

}
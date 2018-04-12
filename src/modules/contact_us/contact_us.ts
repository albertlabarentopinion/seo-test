let contactUsModule : any;

module App.Modules.ContactUs {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const ContactUsConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'contact_us/templates/'
        }
        return cons;
    })();

    function ContactUsConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, ContactUsConstants : IConstants.ModuleConstants) {

        let templatePath = ContactUsConstants.templateUrl;

        $stateProvider
            .state('main.contact_us', {
                url: "/ContactUs",
                views : {
                    main : {
                        templateUrl: `${templatePath}contact_us.html`,
                        controller : 'ContactUsController',
                        controllerAs : 'contactUsCtrl'
                    }
                },
                data : {
                    pageTitle : 'PT_CONTACT_US'
                }
            });

    }

    ContactUsConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'ContactUsConstants' ];

    contactUsModule = angular.module(`${App.Config.Ng.module.name}.contact_us`, [])
                    .constant('ContactUsConstants', ContactUsConstants)
                    .config(ContactUsConfig);

}
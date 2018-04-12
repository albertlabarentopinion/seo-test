let payoutModule : any;

module App.Modules.Payout {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const PayoutConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'payout/templates/'
        }
        return cons;
    })();

    function PayoutConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, PayoutConstants : IConstants.ModuleConstants) {

        let templatePath = PayoutConstants.templateUrl;

        $stateProvider
            .state('main.account.payout', {
                url: "/Payouts",
                views : {
                    account : {
                        templateUrl: `${templatePath}payout.html`,
                        controller : 'PayoutController',
                        controllerAs : 'payoutCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_PAYOUT'
                }
            });

    }

    PayoutConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'PayoutConstants' ];

    payoutModule = angular.module(`${App.Config.Ng.module.name}.payout`, [])
                    .constant('PayoutConstants', PayoutConstants)
                    .config(PayoutConfig);

}
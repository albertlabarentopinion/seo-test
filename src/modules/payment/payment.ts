let paymentModule : any;

module App.Modules.Payment {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const PaymentConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'payment/templates/'
        }
        return cons;
    })();

    function PaymentConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, PaymentConstants : IConstants.ModuleConstants) {

        let templatePath = PaymentConstants.templateUrl;

        $stateProvider
            .state('main.account.payment', {
                url: "/Payments",
                views : {
                    account : {
                        templateUrl: `${templatePath}payment.html`,
                        controller : 'PaymentController',
                        controllerAs : 'paymentCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_PAYMENTS'
                }
            })
            .state('main.account.payment.receipt', {
                url: "/Receipt/:payment_id",
                views : {
                    "account@main.account" : {
                        templateUrl: `${templatePath}payment.receipt.html`,
                        controller : 'PaymentReceiptController',
                        controllerAs : 'paymentReceiptCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_RECEIPT'
                }
            });

    }

    PaymentConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'PaymentConstants' ];

    paymentModule = angular.module(`${App.Config.Ng.module.name}.payment`, [])
                    .constant('PaymentConstants', PaymentConstants)
                    .config(PaymentConfig);

}
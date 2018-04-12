
module App.Modules.Payment.PaymentReceiptController {
    
    import BaseController = App.Base.BaseController;

    class PaymentReceiptController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$stateParams', 'PaymentService' ];

        payment : App.Repositories.Payout.PayoutResponse; // payouts are stored as payments

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $stateParams : any,
            private PaymentService : PaymentService
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.PaymentService.getPayment( this.$stateParams.payment_id ).then( this.setPayment.bind( this ) );
        }

        setPayment = ( payment : App.Repositories.Payout.PayoutResponse ) => {
            payment = this.PaymentService.paymentDatesTransformer( payment );
            this.payment = payment;
        }

    }

    paymentModule.controller( 'PaymentReceiptController', PaymentReceiptController );
}
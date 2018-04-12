
module App.Modules.Payment {
    
    import BaseController = App.Base.BaseController;

    class PaymentController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'PaymentService', '$uibModal', 'PaymentConstants', '$q', 'PayoutService', 'Billing' ];

        cardModalInstance : any;

        card : App.Repositories.Card.CardResponse;

        payments : App.Repositories.Payout.PayoutResponse[];

        payment_url : string;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,   
            private PaymentService : PaymentService,
            private $uibModal : any,
            private PaymentConstants : App.Interfaces.Constants.ModuleConstants,
            private $q : any,
            private PayoutService : App.Modules.Payout.PayoutService,
            private Billing : App.Repositories.Billing.BillingRepository
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.loading();
            this.$q.all([
                this.PaymentService.getCard( this.$rootScope['user'].id ).then(this.setCard.bind(this)),
                this.PaymentService.getPayments( this.$rootScope['user'].id ).then(this.setPayments.bind(this))
            ]).then(() => {
                this.ready();
            });
           
                
        }

        getPaymentPDFUrl = ( payout_id : string ) => {
            return this.PaymentService.getReceiptUrl( payout_id );
        } 

        setPayments = ( payments : App.Repositories.Payout.PayoutResponse[] ) => {
            this.payments = this.PayoutService.payoutsTransformer( payments );
        }

        addCard = () => {
            this.cardModalInstance = this.$uibModal.open({
                templateUrl : `${this.PaymentConstants.templateUrl}/add_card.modal.html`,
                controller : 'AddCardController',
                controllerAs : 'ctrl',
                // resolve : {
                //     payment : () : any => {
                //         return null;
                //     }
                // }
            });
        }

        removeCard = () => {
            return this.PaymentService.removeCard( this.$rootScope['user'].id ).then(() => {
                this.setCard();
            });
        }

        setCard = ( card : App.Repositories.Card.CardResponse = null ) => {
            this.card = card;
        }
    }

    paymentModule.controller( 'PaymentController', PaymentController );

}
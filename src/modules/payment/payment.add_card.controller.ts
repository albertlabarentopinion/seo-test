
module App.Modules.Payment {
    
    import BaseController = App.Base.BaseController;

    class AddCardController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$uibModalInstance', 'PaymentService', '$state' ];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $uibModalInstance : any,
            private PaymentService : PaymentService,
            private $state : any
        ){
            super( $scope, $rootScope );
        }

        createCard = ( card : App.Repositories.Card.CardResponse ) => {

            card.user_id = this.$rootScope['user'].id;

            return this.PaymentService.createCard(card).then( ( card : App.Repositories.Card.CardResponse ) => {
                this.cancel();
                this.$state.reload();
            }, (error : any) => {
                this.errorBags = this.errorTranslate(error);
            });
        }

        cancel = () => {
            this.$uibModalInstance.dismiss('close');
        }
    }

    paymentModule.controller( 'AddCardController', AddCardController );
}
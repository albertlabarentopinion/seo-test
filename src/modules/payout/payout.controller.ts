
module App.Modules.Payout {
    
    import BaseController = App.Base.BaseController;

    class PayoutController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$uibModal', 'PayoutService', 'AuthService', 'PayoutConstants', '$filter', '$state', '$q', 'PaymentService' ];

        private bankAccountModal : any;

        templateUrl : string;

        account : any;

        payouts : App.Repositories.Payout.PayoutResponse[] = [];

        warning_payout_messages = [];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $uibModal : any,
            private PayoutService : PayoutService,
            private AuthService : App.Services.AuthService,
            private PayoutConstants : App.Interfaces.Constants.ModuleConstants,
            private $filter : any,
            private $state : any,
            private $q : any,
            private PaymentService : App.Modules.Payment.PaymentService
        ){
            super( $scope, $rootScope );

            this.templateUrl = this.PayoutConstants.templateUrl;
            this.init();
        }

        init = () => {
            this.loading();
            this.$q.all([
                this.PayoutService.getAccount( this.$rootScope['user'].id ).then( this.setAccount.bind(this) ),
                this.PayoutService.getPayouts( this.$rootScope['user'].id ).then( this.setPayouts.bind(this) )
            ]).then(() => {
                this.ready();
            });
        }

        setAccount = ( account : any ) => {
            this.account = account;
            if( !_.isEmpty(account) ){
                let fields_needed = this.account.verification.fields_needed;
                let name_variants = [ 'legal_entity.first_name', 'legal_entity.last_name' ];
                let dob_variants = [ 'legal_entity.dob.day', 'legal_entity.dob.month', 'legal_entity.dob.year' ];

                // name missing
                if( _.intersection( name_variants, fields_needed ).length )
                    this.warning_payout_messages.push('FULL_NAME_IS_REQUIRED');
                // dob missing
                if( _.intersection( dob_variants, fields_needed ).length )
                    this.warning_payout_messages.push('DOB_IS_REQUIRED');
                // legal document missing
                // if( _.intersection(['legal_entity.verification.document'], fields_needed ).length )
                //     this.warning_payout_messages.push('legal_entity.verification.document');
            }
        }

        getReceiptUrl = ( payout_id : string ) => {
            return this.PaymentService.getReceiptUrl( payout_id );            
        }

        setPayouts = ( payouts : App.Repositories.Payout.PayoutResponse[] ) => {
            this.payouts = this.PayoutService.payoutsTransformer( payouts );
        }

        setUser = ( user : App.Repositories.User.UserResponse ) => {
            this.AuthService.setUserFields({
                bank_account : user.bank_account, 
                firstname : user.firstname, 
                lastname : user.lastname,
                zip : user.zip,
                street : user.street,
                city : user.city
            });
        }

        addAddUpdateAccount = () => {
            let _self = this;

            this.bankAccountModal = this.$uibModal.open({
                templateUrl : `${this.PayoutConstants.templateUrl}/add_account.modal.html`,
                controller : function($scope : any, account : any) {
                    this.errorBags = [];
                    this.templateUrl = _self.templateUrl;
                    this.account = _.isEmpty(angular.copy(account)) ? {} : angular.copy(account);
                    if(this.account.legal_entity){
                        this.account.legal_entity.additional_owners = _.isEmpty(this.account.legal_entity.additional_owners) ? {} : this.account.legal_entity.additional_owners[0];
                    } else {
                        this.account.legal_entity = {};
                    }
                    
                    this.external_account = '';
                    this.user = angular.copy(_self.$rootScope['user']);
                    this.account.legal_entity.first_name = this.user.firstname;
                    this.account.legal_entity.last_name = this.user.lastname;

                    if(!_.isEmpty(_self.$rootScope['user'].bank_account)){
                        this.external_account = _self.$rootScope['user'].bank_account;
                    }

                    this.createAccount = ( bank_account : string ) => {
                       this.account.external_account = this.external_account;
                       if(this.account.legal_entity.type == 'company' ){
                            account.legal_entity.business_tax_id = this.external_account;
                            this.account.legal_entity.business_tax_id = this.external_account;
                        }   
                        return _self.createUpdateAccount(this.account).then(() => {
                            this.cancel();
                            _self.init();
                        }, ( error : any ) => {
                            this.errorBags = _self.errorTranslate(error);
                        });
                    }

                    this.cancel = () => {
                        _self.bankAccountModal.close('dismiss');
                    }
                },
                controllerAs : 'ctrl',
                resolve :  {
                    account : () => {
                        return this.account;
                    }
                }
            });
        }

        createUpdateAccount = ( account : any ) => {
            account.user_id = this.$rootScope['user'].id;
            return this.PayoutService.createAccount(account).then( this.setUser.bind(this) );
        }

        updateBankAccount = ( bank_account : string ) => {
            return this.PayoutService.addBankAccount( bank_account, this.$rootScope['user'].id );
        }
    }

    payoutModule.controller( 'PayoutController', PayoutController );

}


module App.Modules.Payout {
    
    export class PayoutService {

        static $inject : string[] = [ 'Billing', 'Payout', 'AppConstants', 'AuthService' ];
        
        constructor( 
            private Billing : App.Repositories.Billing.BillingRepository,
            private Payout : App.Repositories.Payout.PayoutRepository,
            private AppConstants : App.Main.MainConstants,
            private AuthService : App.Services.AuthService
         ){

        }

        createAccount = ( account : any ) => {
            return this.Billing.createAccount(account);
        }

        uploadDocument = (document : any) => {
            return this.Billing.uploadDocument(document);
        }

        getAccount = ( user_id : string ) => {
            return this.Billing.getAccount( user_id );
        }

        getPayouts = ( user_id : string ) => {
            return this.Payout.getAll({ user_id : user_id });
        }
        
        payoutsTransformer = ( payouts : App.Repositories.Payout.PayoutResponse[] ) => {
            return _.map( payouts, ( payout : App.Repositories.Payout.PayoutResponse ) => {
                if( payout.payment_type == 'initial_payment' ){
                    payout.trial_end_after_days = moment( payout.trial_end_after_days, this.AppConstants.dateFormatStore ).format(this.AppConstants.dateFormat);
                    payout['from_date'] = moment( payout['from_date'], this.AppConstants.dateFormatStore ).format(this.AppConstants.dateFormat);
                } else {
                    payout.period_start = moment( payout.period_start, this.AppConstants.dateFormatStore ).format(this.AppConstants.dateFormat);
                    payout.period_end = moment( payout.period_end, this.AppConstants.dateFormatStore ).format(this.AppConstants.dateFormat);
                }

                return payout;
            });
        }

        addBankAccount = ( bank_account : string, user_id : string ) => {
            return this.Payout.addBankAccount( bank_account, user_id ).then(( user : App.Interfaces.User.IUserAuthenticated ) => {
                this.AuthService.setUserFields({
                    bank_account : user.bank_account
                });
                return user;
            });
        }

    }

    payoutModule.service( 'PayoutService', PayoutService );
}
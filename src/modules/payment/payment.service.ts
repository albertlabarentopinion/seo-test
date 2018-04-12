

module App.Modules.Payment {
    
    export class PaymentService {

        static $inject : string[] = [ 'Card', 'Billing', 'AppConstants' ];
        
        constructor(
            private Card : App.Repositories.Card.CardRepository,
            private Billing : App.Repositories.Billing.BillingRepository,
            private AppConstants : App.Main.MainConstants
        ){}

        createCard = ( card : App.Repositories.Card.CardResponse ) => {
            return this.Card.save( card );
        }

        getCard = ( user_id : string ) => {
            return this.Card.find(user_id, { user_id : user_id });
        }

        removeCard = ( user_id : string ) => {
            return this.Card.remove( user_id, { user_id : user_id } );
        }   

        getPayments = ( user_id : string ) => {
            return this.Billing.payments( user_id );
        }

        getPayment = ( payment_id : string ) => {
            return this.Billing.findPayment( payment_id );
        }

        paymentDatesTransformer = ( payment : App.Repositories.Payout.PayoutResponse ) => {
            if( payment.payment_type == 'initial_payment' ){
                payment.period_start = moment(payment.request.from_date, this.AppConstants.dateFormatStore ).format( this.AppConstants.dateFormatV1 );
                payment.period_end = moment(payment.trial_end_after_days, this.AppConstants.dateFormatStore ).format( this.AppConstants.dateFormatV1 );
            } else {
                payment.period_start = moment(payment.period_start, this.AppConstants.dateFormatStore ).format( this.AppConstants.dateFormatV1 );
                payment.period_end = moment(payment.period_end, this.AppConstants.dateFormatStore ).format( this.AppConstants.dateFormatV1 );
            }

            payment['payment_date'] = moment(payment.created_at, this.AppConstants.dateFormatStore ).format( this.AppConstants.dateFormatV1 );

            return payment;
        }

        getReceiptUrl = ( payout_id : string ) => {
            return this.Billing.getBaseControllerUrl(this.Billing.controllerName, `payment-receipt/${payout_id}`);
        }

    }

    paymentModule.service( 'PaymentService', PaymentService );
}
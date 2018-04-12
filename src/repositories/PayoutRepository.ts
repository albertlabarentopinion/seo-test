module App.Repositories.Payout {
    
        import IRepository = App.Interfaces.Repository;
        import IResponse = App.Interfaces.Response;
        import BaseRepository = App.Base.BaseRepository;
    
         export interface PayoutResponse extends IResponse.IApiResponseElement {
            price_per_month? : any,
            transfer_amount? : any,
            trial_end_after_days? : any,
            payment_type? : any,
            period_start? : any,
            period_end? : any,
            request_id? : any,
            isFailed? : boolean,
            charge_id? : string,
            transfer_id? : string
            
            // relations
            request? : App.Repositories.Request.RequestResponse;
         }
    
        export class PayoutRepository extends BaseRepository {
    
            static $inject : string[] = ['Restangular', '$q', 'Billing'];
    
            recordName = 'payout';
    
            default_id = 'id';
    
            constructor(Restangular : restangular.IService, $q : ng.IQService, private Billing : Billing.BillingRepository ) {
                super(Restangular, $q, 'payout');
            }

            addBankAccount = ( bank_account : string, user_id : string  ) => {
                let params : any = {
                    bank_account : bank_account,
                    user_id : user_id
                }; 
                return this.Restangular.all(`${this.Billing.controllerName}/add-bank-account`).post( params ).then( this.toResult.bind(this) );
            }
        }
    
        angularModule.service('Payout', PayoutRepository);
    }
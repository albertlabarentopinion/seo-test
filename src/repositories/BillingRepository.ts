module App.Repositories.Billing {
    
        import IRepository = App.Interfaces.Repository;
        import IResponse = App.Interfaces.Response;
        import BaseRepository = App.Base.BaseRepository;
    
         export interface BillingResponse extends IResponse.IApiResponseElement {
             type : string;
         }
    
        export class BillingRepository extends BaseRepository {
    
            static $inject : string[] = ['Restangular', '$q'];
    
            recordName = 'billing';

            controllerName = 'billingctrl'
    
            default_id = 'id';
    
            constructor(Restangular : restangular.IService, $q : ng.IQService) {
                super(Restangular, $q, 'billing');
            }

            createAccount = ( account : any ) => {
                let ep_type = 'individual';
                if(account.legal_entity.type == 'company')
                    ep_type = 'business';
                return this.Restangular.all(`${this.controllerName}/save-account-${ep_type}`).post(account).then( this.toResult.bind(this) );
            }

            uploadDocument = (file : any) => {
                return this.Restangular.one(`${this.controllerName}/upload-document`)
                    .withHttpConfig({transformRequest: angular.identity})
                    .customPOST(file, '', undefined, {
                        'Content-Type' : undefined
                    });
            }

            getAccount = ( user_id : string ) => {
                return this.Restangular.one(`${this.controllerName}/find-account`, user_id).get({user_id : user_id});
            }

            initialPayment = ( request_id : any) => {
                let params : any = {
                    request_id : request_id
                };

                return this.Restangular.one(`${this.controllerName}/initial-payment`).customPOST(params).then( this.toResult.bind(this) ); 
            }

            payments = ( user_id : string ) => {
                return this.Restangular.one(`${this.controllerName}/payments`).get({
                    user_id : user_id
                }).then( this.toResult.bind(this) ); 
            }

            findPayment = ( payment_id : string ) => {
                return this.Restangular.one(`${this.controllerName}/payment`, payment_id).get({ payment_id : payment_id }).then( this.toResult.bind(this) );
            }
        }
    
        angularModule.service('Billing', BillingRepository);
    }
module App.Repositories.Request {
    
        import IRepository = App.Interfaces.Repository;
        import IResponse = App.Interfaces.Response;
        import BaseRepository = App.Base.BaseRepository;
    
         export interface RequestResponse extends IResponse.IApiResponseElement {
            owner_id? : any;
            client_id? : any;
            listing_id? : any;
            request_status? : any;
            message_to_owner? : any;
            from_date? : any;
            to_date? : any;
            is_continuos? : any;
            price_per_month? : any;
            isDeactivated? : any;
            payment_due_date? : any;
            plan_id? : string;
            plan_name? : string;
            owner_termination_days? : any;
            client_termination_days? : any;
            termination_date? : any;
            subscription_id? : string;
            isRated? : boolean;
            ratings_count? : number;
            isUnpaid? : boolean;
            
            // extras
            owner ?: App.Repositories.User.UserResponse;
            client? : App.Repositories.User.UserResponse;
            listing? : App.Repositories.Listing.ListingResponse;
            user? : App.Repositories.User.UserResponse;
            log? : App.Repositories.RequestLog.RequestLogResponse;
            logs? : Array<App.Repositories.RequestLog.RequestLogResponse>;
            rating? : App.Repositories.Rating.RatingResponse;
         }
    
        export class RequestRepository extends BaseRepository {
    
            static $inject : string[] = ['Restangular', '$q'];
    
            recordName = 'requests';

            controllerName = 'requestctrl';
    
            default_id = 'id';
    
            constructor(Restangular : restangular.IService, $q : ng.IQService) {
                super(Restangular, $q, 'requests');
            }

            getAllRequests = ( id : string ) => {
                return this.getAll({ all : id });
            }

            getOwnerRequests = ( id : string ) => {
                return this.getAll({ owner : id });
            }
            
            getClientRequests = ( id : string ) => {
                return this.getAll({ client : id });
            }

            changeStatus = (user_id : any, change_to : string, id : any, params : any) => {
                params = _.extend({user_id : user_id, change_to : change_to, id : id}, params);
                return this.Restangular.one(`${this.controllerName}/change-status`, id)
                    .put(params)
                    .then( this.toResult.bind( this ) );
            }

            sendMessage = (message : string, request_id : string ) => {
                return this.Restangular.all(`${this.controllerName}/send-message`).post({
                    id : request_id,
                    message : message
                });
            }

            changeFromDate = ( from_date : any, request_id : any ) => {
                return this.Restangular.one(`${this.controllerName}/change-from-date`, request_id)
                    .put({
                        from_date : from_date,
                        request_id : request_id
                    })
                    .then( this.toResult.bind( this ) );
            }

            getRequestControls = () => {
                return this.Restangular.all(`${this.controllerName}/request-controls`).getList();
            }
        }
    
        angularModule.service('Request', RequestRepository);
    }
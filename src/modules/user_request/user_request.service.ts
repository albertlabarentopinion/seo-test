

module App.Modules.UserRequest {
    
    export class UserRequestService {

        static $inject : string[] = [ 'Request', 'HelpersService', '$filter', 'Billing', '$q', 'Rating' ];
        
        requestControls : any[] = [];

        constructor(
            private Request : App.Repositories.Request.RequestRepository,
            private HelpersService : App.Services.Helpers.HelpersService,
            private $filter : any,
            private Billing : App.Repositories.Billing.BillingRepository,
            private $q : any,
            private Rating : App.Repositories.Rating.RatingRepository
        ){

        }

        getRequests = ( id : string, type : string = 'all' ) => {
            switch( type ){
                case 'all' : 
                    return this.Request.getAllRequests(id);
                    break;
                case 'owner' : 
                    return this.Request.getOwnerRequests(id);
                    break;
                case 'client' : 
                    return this.Request.getClientRequests(id);
                    break;
                default : 
                    return this.Request.getAllRequests(id);
                    break;
            }
        }

        getRequestControls = () => {
            if( _.isEmpty( this.requestControls ) )
                return this.Request.getRequestControls().then((requestControls : any[]) => {
                    this.requestControls = requestControls;
                    return requestControls;
                });
            else 
                return this.$q(( resolve : any, reject : any ) => {
                    return resolve( this.requestControls );
                });
        }

        getRequestById = ( id : string ) => {
            return this.Request.find(id);
        }

        makePayment = ( request_id : string ) => {
            return this.Billing.initialPayment( request_id);
        }

        transformer = ( requests : Array<App.Repositories.Request.RequestResponse>, user : App.Repositories.User.UserResponse ) => {
            return _.map(requests, (request : App.Repositories.Request.RequestResponse) => {
                return this.transform(request, user);
            });
        }

        changeRequestStatus = (user_id : any, change_to : string, listing_id : any, params : any = {}) => {
            return this.Request.changeStatus(user_id, change_to, listing_id, params);
        }

        transform = ( request : App.Repositories.Request.RequestResponse, user : App.Repositories.User.UserResponse ) => {
            request.owner = this.HelpersService.transformUserPicture(request.owner);
            request.client = this.HelpersService.transformUserPicture(request.client);
            request.from_date = this.HelpersService.tzDate(request.from_date);
            request.to_date = this.HelpersService.tzDate(request.to_date);
            request['event_date'] = this.HelpersService.tzDateTimeStored(request['event_date']);
            if(request.payment_due_date) request.payment_due_date = this.HelpersService.tzDate(request.payment_due_date);
                
            if( !_.isEmpty(request.logs)){
                request.logs = this.transformerLog(request.logs.reverse());
                let log = _.filter(request.logs, (log : any) => {
                    return log.event_type == 'CHAT';
                });
                request.log = log[0];
                
                if(request.isDeactivated !== 1)
                    request['unseen_logs'] = this.getUnseenLogs(request.logs, user);

                request['latest_log'] = request.logs[0];
            }
            // get appropriate user to display
            if(parseInt(user.id) == parseInt(request.owner_id)){
                request.user = request.client;
            } else {
                request.user = request.owner;
            }
           
            // transform date last action
            // for now display request created at
            request.created_at = this.HelpersService.tzDateTime(request.created_at);

            return request;
        }

        transformerLog = ( logs : Array<App.Repositories.RequestLog.RequestLogResponse> ) => {
            return _.map(logs, this.transformLog.bind(this));
        }

        transformLog = ( log : App.Repositories.RequestLog.RequestLogResponse ) => {
            log.created_at = this.HelpersService.tzDateTimeStored(log.created_at);
            log['date'] = this.HelpersService.tzDate(log.created_at);
            if(_.has(log, 'from')){
                log['from'] = this.HelpersService.transformUserPicture(log['from']);
            }
            return log;
        }

        sendMessage = ( message : string, request_id : any ) => {
            return this.Request.sendMessage( message, request_id );
        }

        getUnseenLogsAll = (requests : App.Repositories.Request.RequestResponse[], user : App.Repositories.User.UserResponse) => {
            let logs = _.flatten(_.map(_.filter(requests, (request :  App.Repositories.Request.RequestResponse) => {
                return request.isDeactivated !== 1;
            }), 'logs'));

            return this.getUnseenLogs(logs, user);
        }

        getUnseenLogs = (logs : App.Repositories.RequestLog.RequestLogResponse[], user : App.Repositories.User.UserResponse) => {
            return _.filter(logs, (log : App.Repositories.RequestLog.RequestLogResponse) => {
                return log.seen == 0 && parseInt(log.to_id) == parseInt(user.id);
            });
        }

        changeFromDate = ( from_date : any, request_id : any ) => {
            return this.Request.changeFromDate(from_date, request_id);
        }
        
        addRating = ( rating : any, comment : string, request_id : string, rating_id : any = null ) => {
            return this.Rating.addRating( rating, comment, request_id, rating_id );
        }

    }

    userRequestModule.service( 'UserRequestService', UserRequestService );
}
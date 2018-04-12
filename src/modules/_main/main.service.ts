

module App.Modules.Main {
    
    export class MainService {

        static $inject : string[] = [ 'RequestLog' ];
        
        notifications : Array<App.Repositories.RequestLog.RequestLogResponse> = [];

        constructor(
            private RequestLog : App.Repositories.RequestLog.RequestLogRepository
        ){

        }

        getNotifications = ( id : string ) => {
            return this.RequestLog.getNotifications( id ).then(this.setNotifications.bind(this));
        }

        setNotifications = ( notifications : Array<App.Repositories.RequestLog.RequestLogResponse> = [] ) => {
            this.notifications = _.filter(notifications, (notification : App.Repositories.RequestLog.RequestLogResponse) => {
                if(notification.request)
                    return notification.request.isDeactivated !== 1;
                return true;
            });
            return this.notifications;
        }

        refreshNotifications = ( id : string ) => {
            return this.RequestLog.refreshNotifications(id).then(() => {
                this.setNotifications();
            });
        }

        seenRequestNotification = ( to_id : string, request_id : string ) => {
            return this.RequestLog.seenNotification(to_id, request_id).then(( notifications : Array<App.Repositories.RequestLog.RequestLogResponse> ) => {
                this.setNotifications(notifications);
            });
        }

        getRequestNotifications = (to_id : string, request_id : string) => {
            return _.filter(this.notifications, (notification : App.Repositories.RequestLog.RequestLogResponse) => {
                return parseInt(notification.to_id) == parseInt(to_id) && parseInt(notification.request_id) == parseInt(request_id);
            });
        }
    }

    angularModule.service( 'MainService', MainService );
}
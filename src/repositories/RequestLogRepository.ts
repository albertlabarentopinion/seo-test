module App.Repositories.RequestLog {
    
        import IRepository = App.Interfaces.Repository;
        import IResponse = App.Interfaces.Response;
        import BaseRepository = App.Base.BaseRepository;
    
         export interface RequestLogResponse extends IResponse.IApiResponseElement {
            display_text? : any,
            event_type? : any,
            seen? : any,
            from_id? : any,
            to_id? : any,
            status_from? : any,
            status_to? : any,
            request? : any,
            request_id? : any
         }
    
        export class RequestLogRepository extends BaseRepository {
    
            static $inject : string[] = ['Restangular', '$q'];
    
            recordName = 'requestlog';

            controllerName = 'requestctrl';
    
            default_id = 'id';
    
            constructor(Restangular : restangular.IService, $q : ng.IQService) {
                super(Restangular, $q, 'requestctrl');
            }

            getNotifications = ( id : string ) => {
                return this.Restangular.one( `${this.controllerName}/notifications`, id ).get().then( this.toResult.bind( this ) );
           }

           refreshNotifications = ( id : string ) => {
                return this.Restangular.one( `${this.controllerName}/notification-refresh`, id ).put({id : id}).then( this.toResult.bind( this ) );
           }

           seenNotification = ( to_id : string, request_id : string ) => {
                return this.Restangular.one(`${this.controllerName}/notification-request-seen`, to_id).put({
                    to_id : to_id,
                    request_id : request_id
                }).then( this.toResult.bind(this) );
           }
        }
    
        angularModule.service('RequestLog', RequestLogRepository);
    }
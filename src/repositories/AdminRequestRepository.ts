module App.Repositories.AdminRequest {
    
    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

        export interface AdminRequestResponse extends App.Repositories.Request.RequestResponse{
        }

    export class AdminRequestRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q'];

        recordName = 'admin/requests';

        controllerName = 'adminctrl';

        default_id = 'id';

        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'admin/requests');
        }

        activateDeactivate = ( id : string ) => {
            return this.Restangular.one( `${this.controllerName}/activate-deactivate-request`, id ).put().then( this.toResult.bind( this ) );   
       }
    }

    angularModule.service('AdminRequest', AdminRequestRepository);
}
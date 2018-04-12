module App.Modules.AdminRequest {
    
    export class AdminRequestService {

        static $inject : string[] = [ 'AdminRequest' ];

        baseUrl : string;

        initSearchUser : string = '';
        
        constructor( 
            private AdminRequest : App.Repositories.AdminRequest.AdminRequestRepository
        ){
            this.baseUrl = this.AdminRequest.getBaseUrl();
        }

        getRequests = () => {
            return this.AdminRequest.getAll();
        }

        activateDeactivate = ( id : string ) => {
            return this.AdminRequest.activateDeactivate(id);
        }


    }

    adminRequestModule.service( 'AdminRequestService', AdminRequestService );
}
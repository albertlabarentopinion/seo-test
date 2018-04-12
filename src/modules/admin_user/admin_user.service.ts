module App.Modules.AdminUser {
    
    export class AdminUserService {

        static $inject : string[] = [ 'AdminUser' ];

        baseUrl : string;

        initSearchUser : string = '';
        
        constructor( 
            private AdminUser : App.Repositories.AdminUser.AdminUserRepository
        ){
            this.baseUrl = this.AdminUser.getBaseUrl();
        }

        getUsers = () => {
            return this.AdminUser.getAll();
        }

        activateDeactivateUser = ( id : string ) => {
            return this.AdminUser.activateDeactivate( id );
        }

    }

    adminUserModule.service( 'AdminUserService', AdminUserService );
}
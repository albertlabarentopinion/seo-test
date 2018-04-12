module App.Repositories.AdminUser {

    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

     export interface AdminUserResponse extends App.Repositories.User.UserResponse {
     }

    export class AdminUserRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q'];

        recordName = 'admin/users';

        controllerName = 'adminctrl';

        default_id = 'id';

        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'admin/users');
        }

        activateDeactivate = ( id : string ) => {
             return this.Restangular.one( `${this.controllerName}/activate-deactivate-user`, id ).put().then( this.toResult.bind( this ) );   
        }

        getSpecialUsers = () => {
            return this.Restangular.all(`${this.controllerName}/special-users`).getList().then( this.toResult.bind( this ) );   
        }

        saveSpecialUser = ( user : App.Repositories.User.UserResponse ) => {
            let resource = null ;
            
            if( !_.has(user, 'id') )
                resource = this.Restangular.all(`${this.controllerName}/save-special-user`).post(user);
            else 
                resource = this.Restangular.one(`${this.controllerName}/save-special-user`, user.id).customPUT(user); 
            
            return resource.then( this.toResult.bind( this ) ); 
        }
    }

    angularModule.service('AdminUser', AdminUserRepository);
}
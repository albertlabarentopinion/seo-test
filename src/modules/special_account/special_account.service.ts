

module App.Modules.SpecialAccount {
    
    export class SpecialAccountService {

        static $inject : string[] = [ 'AdminUser' ];
        
        constructor(
            private AdminUser : App.Repositories.AdminUser.AdminUserRepository
        ){}

        getSpecialUsers = () => {
            return this.AdminUser.getSpecialUsers();
        }

        saveSpecialUser = ( user : App.Repositories.User.UserResponse ) => {
            return this.AdminUser.saveSpecialUser(user);
        }
    }

    specialAccountModule.service( 'SpecialAccountService', SpecialAccountService );
}
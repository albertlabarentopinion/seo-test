

module App.Modules.Register {

    import UserRepository = App.Repositories.User;

    export class RegisterService {

        static $inject = [ 'User' ];

        constructor(
            private User : UserRepository.UserRepository
        ){}

        register = ( user : UserRepository.UserResponse ) => {
            return this.User.post( user );
        } 

    }

    registerModule.service( 'RegisterService', RegisterService );
}
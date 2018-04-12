

module App.Modules.UserProfile {
    
    export class UserProfileService {

        static $inject : string[] = [ 'User' ];
        
        constructor(
            private User : App.Repositories.User.UserRepository
        ){}

        getUserProfile = ( user_id : string ) => {
            return this.User.getUserProfile( user_id );
        }
    }

    userProfileModule.service( 'UserProfileService', UserProfileService );
}
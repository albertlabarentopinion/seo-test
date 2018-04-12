module App.Modules.EditProfile {

    import UserRepository = App.Repositories.User;
    import IUser = App.Interfaces.User.IUserAuthenticated

    export class EditProfileService {

        static $inject = [ 'User', 'AuthService', 'Upload', '$sessionStorage' ];
        
        mobile_verification_key : string = 'onMobileVerification';

        onMobileVerification : boolean;

        constructor(
            private User : UserRepository.UserRepository,
            private AuthService : App.Services.AuthService,
            private Upload : any,
            private $sessionStorage : any
        ){
            this.onMobileVerification = this.$sessionStorage.get( this.mobile_verification_key );
        }

        update = ( user : UserRepository.UserResponse ) => {
            return this.User.update( user.id, user ).then( ( user : IUser ) => {
                this.AuthService.setUser( user );
                return user;
            });
        } 

        upload = ( profile_picture : any, id : string ) => {
            return this.Upload.upload({
                url : this.User.getBaseControllerUrl( this.User.controllerName, 'upload-profile-picture' ),
                data : {
                    profile_picture : profile_picture,
                    id : id
                }
            });
        }

        sendVerification = ( mobile : string, id : string ) => {
            return this.User.sendMobileVerification( mobile, id ).then(( resp : any ) => {
                // store verification awaiting
                this.$sessionStorage.put( this.mobile_verification_key, 1 );
                this.AuthService.setUserFields({ mobile : mobile, mobile_verified : 0 });
            });
        }

        verifyMobile = ( mobile : string, mobile_verification_code : string, id : string ) => {
            return this.User.verifyMobile( mobile_verification_code, id ).then(( resp : any ) => {
                this.$sessionStorage.remove( this.mobile_verification_key );
                this.AuthService.setUserFields({
                    mobile_verified : 1,
                    mobile : resp.mobile
                });
            });
        }

        reset = () => {
            this.AuthService.setUserFields({
                mobile_verified : 0,
                mobile : null
            });
            this.$sessionStorage.remove( this.mobile_verification_key );
        }

        sendUserEmailVerification = () => {
            return this.User.sendUserEmailVerification();
        }

    }

    editProfileModule.service( 'EditProfileService', EditProfileService );
}
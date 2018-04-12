
module App.Repositories.User {

    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;


    export interface UserResponse extends IResponse.IApiResponseElement {
        id? : string;
        firstname? : string;
        lastname? : string;
        email? : string;
        isSocial? : string;
        mobile? : string;
        city? : string;
        profile_picture? : string;
        profile_image_social? : string;
        about_me? : string;
        mobile_verified? : any;
        email_verified? : any;
        mobile_verification_code? : string;
        role? : string;
        last_login? : any;
        isDeactivated? : number;
        pverification_count? : any;
        pverification_date? : any;
        bank_account? : any;
        stripe_id? : any,
        card_brand? : any,
        card_last_four? : any,
        trial_ends_at? : any,
        card_id? : any;
        account_id? : any;
        stripe_document_id? : any;
        street? : any,
        zip? : any
        isSpecialAccount? : any;
        [ props : string ] : any
    }

    export class UserRepository extends BaseRepository implements IRepository.ICacheable{

        recordName = 'user';

        controllerName = 'userctrl';

        default_id = 'id';

        routes : {
            SEND_MOBILE_VERIFICATION : string,
            MOBILE_VERIFY : string,
            SEND_USER_EMAIL_VERIFICATION : string,
            GET_USER_PROFILE : string
        } = {
            SEND_MOBILE_VERIFICATION : 'send-mobile-verification',
            MOBILE_VERIFY : 'verify-mobile',
            SEND_USER_EMAIL_VERIFICATION : 'send-user-email-verification',
            GET_USER_PROFILE : 'user-profile'
        }

        static $inject : string[] = ['Restangular', '$q'];
        
        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'user');
        }

        sendMobileVerification = ( mobile : string, id : string ) => {
            return this.Restangular.all( `${this.controllerName}/${this.routes.SEND_MOBILE_VERIFICATION}`)
                .post({
                    mobile : mobile,
                    id : id
                }).then( this.toResult.bind( this ) );
        }

        verifyMobile = ( mobile_verification_code : string, id : string ) => {
            return this.Restangular.all( `${this.controllerName}/${this.routes.MOBILE_VERIFY}` )
                .post({
                    mobile_verification_code : mobile_verification_code,
                    id : id
                }).then( this.toResult.bind( this ) );
        }

        sendUserEmailVerification = () => {
            return this.Restangular.all( `${this.controllerName}/${this.routes.SEND_USER_EMAIL_VERIFICATION}`)
                .post({}).then( this.toResult.bind( this ) );
        }

        getUserProfile = ( user_id : string ) => {
            return this.Restangular.one(`${this.controllerName}/${this.routes.GET_USER_PROFILE}`, user_id).get({user_id : user_id}).then( this.toResult.bind( this ) );
        }
    }

    angularModule.service('User', UserRepository);
}
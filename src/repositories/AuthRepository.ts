
module App.Repositories.Auth {

    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;


    export class AuthRepository extends BaseRepository implements IRepository.ICacheable{

        recordName = 'auth';

        default_id = 'id';

        static $inject : string[] = ['Restangular', '$q', 'LoginConstants' ];

        routes : {
            BEARER_TOKEN : string,
            LOGIN : string,
            FORGOT_PASSWORD : string,
            RESET_PASSWORD : string
        } = {
            BEARER_TOKEN : 'bearer_token',
            LOGIN : 'login',
            FORGOT_PASSWORD : 'forgot_password',
            RESET_PASSWORD : 'reset_password'
        }
        
        constructor(
            Restangular : restangular.IService, 
            $q : ng.IQService, 
            private LoginConstants : App.Modules.Login.LoginConstants 
        ) {
            super(Restangular, $q, LoginConstants.ROUTE_NAME );
            this.recordName = LoginConstants.ROUTE_NAME;
        }

        loginSocial = ( token : string ) => {
            return this.Restangular.one( `${this.recordName}/${this.routes.BEARER_TOKEN}`, token ).get().then(this.toResult.bind(this));
        }

        login = ( email : string, password : string ) => {
            return this.Restangular.all( `${this.recordName}/${this.routes.LOGIN}` ).post( { email : email, password : password } ).then(this.toResult.bind(this));
        }

        forgotPassword = ( email : string ) => {
            return this.Restangular.all( `${this.recordName}/${this.routes.FORGOT_PASSWORD}` ).post( { email : email } ).then(this.toResult.bind(this));
        }

        resetPassword = ( reset : any ) => {
            return this.Restangular.all( `${this.recordName}/${this.routes.RESET_PASSWORD}` ).post( reset ).then(this.toResult.bind(this));
        }
    }

    angularModule.service('Auth', AuthRepository);
}
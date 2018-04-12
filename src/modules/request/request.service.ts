

module App.Modules.Request {

    enum statusList {
        Registered,
        UnverifiedMobile,
        UnRegistered
    };
    
    export class RequestService {

        static $inject : string[] = [ '$uibModal', 'AuthService', 'RequestConstants', '$sessionStorage', '$rootScope', 'EditProfileService', 'Request', 'AppConstants' ];

        status : number;

        user : App.Repositories.User.UserResponse;

        request : any;

        requestKey : string =  'request';

        listing : App.Repositories.Listing.ListingResponse;

        new_request : App.Repositories.Request.RequestResponse;

        isRequestSaved : boolean = false;

        constructor( 
            private $uibModal : any,
            private AuthService : App.Services.AuthService,
            private RequestConstants : App.Interfaces.Constants.ModuleConstants,
            private $sessionStorage : any,
            private $rootScope : any,
            private EditProfileService : App.Modules.EditProfile.EditProfileService,
            private Request : App.Repositories.Request.RequestRepository,
            private AppConstants : App.Main.MainConstants
         ){
        }

        private evaluate = () => {
            this.user = this.AuthService.getUser();
            if( !this.user ){
                this.status = statusList.UnRegistered;
            } else {
                if(!this.user.mobile_verified) {
                    this.status = statusList.UnverifiedMobile;
                } else {
                    this.status = statusList.Registered;
                }
            }
        }

        onClickSendRequest = ( stateParams : any = {}) => {
            if(_.isEmpty(stateParams)) stateParams = { id : this.getRequest().listing_id };
            this.evaluate();
            if(stateParams.dateFrom){
                stateParams.dateFrom = moment(stateParams.dateFrom, this.AppConstants.dateTimeFormatStore).format(this.AppConstants.dateFormat);
            }
            this.setRequest(stateParams);
            switch( this.status ){
                case statusList.Registered :
                    this.openRequestForm();
                    break;
                case statusList.UnverifiedMobile :
                    this.openMobileVerification();
                    break;
                case statusList.UnRegistered : 
                    this.openGuestOptions();
                    break;
                default : 
                    this.openGuestOptions();
                    break;
            }
        }

        setRequest = ( stateParams : any ) => {
            this.request = stateParams;
            this.$sessionStorage.putObject(this.requestKey, _.extend( this.getRequest(), this.request ));
        }

        getRequest = () => {
            return this.$sessionStorage.getObject( this.requestKey ) || {};
        }

        openGuestOptions = () => {
            this.openModal('unregistered');
        }

        openMobileVerification = () => {
            this.openModal('unverified_mobile');
        }

        openRequestForm = () => {
            this.openModal('registered');
        }

        openLogin = () => {
            this.openModal('login');
        }

        openVerifyModal = () => {
            this.openModal('verify_mobile');
        }

        openSentRequestModal = ( request : App.Repositories.Request.RequestResponse ) => {
            this.openModal('sent_request', request);
        }

        openModal = ( templateName : string, request : any = null ) => {
            this.$uibModal.open({
                templateUrl : `${this.RequestConstants.templateUrl}${templateName}.modal.html`,
                size : 'md',
                controller : 'RequestController',
                controllerAs : 'requestCtrl',
                windowClass: "animated fadeInY",
                resolve : {
                    request : () => {
                        return request || this.getRequest();
                    }
                }
            });
        }

        removeRequest = () => {
            this.request = {};
            this.$sessionStorage.remove( this.requestKey );
        }

        sendRequest = ( request : App.Repositories.Request.RequestResponse ) => {
            return this.Request.post(request);
        }
    }

    angularModule.service( 'RequestService', RequestService );
}
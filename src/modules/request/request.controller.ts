
module App.Modules.Request {
    
    import BaseController = App.Base.BaseController;

    class RequestController extends BaseController 
    {
        static $inject = [ '$scope', 
        '$rootScope', 
        '$uibModalInstance', 
        'AppConstants', 
        'RequestService', 
        '$state', 
        'LoginService', 
        'request', 
        '$timeout', 
        'EditProfileService', 
        'toaster',
        'StorageViewService',
        'RequestConstants',
        '$stateParams'
    ];

        dateFormat : any;

        loginUrlSocial : string;

        mobile : any;
        
        showVerificationCode : any;

        user : App.Repositories.User.UserResponse;

        headerTplUrl : string;

        minDate : any;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $uibModalInstance : any,
            private AppConstants : App.Main.MainConstants,
            private RequestService : RequestService,
            private $state : any,
            private LoginService : App.Modules.Login.Service,
            private request : any,
            private $timeout : any,
            private EditProfileService : App.Modules.EditProfile.EditProfileService,
            private toaster : any,
            private StorageViewService : App.Modules.StorageView.StorageViewService,
            private RequestConstants : App.Interfaces.Constants.ModuleConstants,
            private $stateParams : any
        ){
            super( $scope, $rootScope );
            this.dateFormat = this.AppConstants.dateFormat;
            this.$scope['loginUrlSocial'] = this.LoginService.loginUrlSocial;
            this.$scope['selected_toDate'] = 1;
            this.headerTplUrl = this.RequestConstants.templateUrl+'header.html';
            this.init();
        }

        init = () => {
            // set mindate
            this.minDate = moment();

            if( !_.isEmpty(this.$rootScope['user']) ){
                this.user = this.$rootScope['user'];
                this.mobile = this.user.mobile;
                this.showVerificationCode = this.EditProfileService.onMobileVerification;
            }
            if( this.mobile && this.user.mobile_verified == 0 ){
                this.showVerificationCode = true;
            }
            if( _.has(this.request, 'dateFrom') ){
                this.$timeout(() => {
                    this.$scope.$apply(() => {
                        if(this.request.dateFrom !== 'Invalid date')
                            this.$scope['fromDate'] =  moment(this.request.dateFrom, this.AppConstants.dateFormat).format();
                        else 
                            this.$scope['fromDate'] = moment();
                    });
                });
            }
        }

        cancel = () => {
            this.request = {};
            this.RequestService.removeRequest();
            this.$uibModalInstance.close('dismiss');
        }

        openLogin = () => {
            this.$uibModalInstance.close('dismiss');
            this.RequestService.openLogin();
        }

        openVerifyMobile = () => {
            this.$uibModalInstance.close('dismiss');
            this.RequestService.openVerifyModal();
        }

        gotoSignUp = () => {
            this.$uibModalInstance.close('dismiss');
            this.$state.go('main.register');
        }

        setDateFrom = ( dateFrom : string, value : any) => {
            if(value) {
                this.$scope['fromDate'] = value.format();
                // this.$timeout(() => {
                //     this.$scope.$apply(() => {
                //         this.setDateTo(null, value.add(1, 'M'));
                //     });
                // });
            } else {
                this.$scope['fromDate'] = null;
            }
        }
        
        // setDateTo = ( dateTo : string, value : any) => {
        //     if(value) {
        //         this.$scope['toDate'] = value.format();
        //     } else {
        //         this.$scope['toDate'] = null;
        //     }
        // }

        doLogin = ( email : string, password : string, remember_me : boolean ) => {
            return this.LoginService.loginCustom( email, password )
                .then( (  user : App.Interfaces.User.IUserAuthenticated ) => {
                    this.$uibModalInstance.close();
                    this.LoginService.redirectAuthenticated();
                }, ( error : App.Interfaces.IApiResponse ) => {
                    this.errorBags = this.errorTranslate( error );
                });
        }


        mobileOnChange = ( mobile : string ) => {
            if( this.user.mobile ){
                if( this.user.mobile !== mobile ){
                    this.$rootScope['user'].mobile_verified = 0;
                } else {
                    this.$rootScope['user'].mobile_verified = 1;
                }
            } 
        }

        sendVerification = ( mobile : string ) => {
            return this.EditProfileService.sendVerification( mobile, this.$rootScope['user'].id ).then( () => {
                this.showVerificationCode = true;
                this.$rootScope['user'].mobile_verified = 0;
                this.errorBags = [];
                this.toaster.pop({
                    type: 'success',
                    title: 'MOBILE_VERIFICATION_TITLE',
                    body: 'MOBILE_VERIFICATION_SENT',
                    showCloseButton: true
                });
            }, this._handleOnError.bind(this) );
        }

        verify = ( mobile : string, mobile_verification_code : string ) => {
            return this.EditProfileService.verifyMobile( mobile, mobile_verification_code, this.$rootScope['user'].id ).then(() => {
                this.showVerificationCode = false;
                this.$rootScope['user'].mobile_verified = 1;
                this.EditProfileService.onMobileVerification = false;
                this.$uibModalInstance.close();
                this.RequestService.onClickSendRequest();
            }, () => {
                this.toaster.pop({
                    type: 'error',
                    title: 'MOBILE_VERIFICATION_ERROR_TITLE',
                    body: 'MOBILE_VERIFICATION_ERROR',
                    showCloseButton: true
                });
            });
        }

        reset = () => {
            this.showVerificationCode = false;
            this.mobile = null;
            this.EditProfileService.reset();
        }

        sendRequest = ( request : App.Repositories.Request.RequestResponse ) => {
            let listing = this.StorageViewService.listing;
            let to_date = moment(this.$scope['toDate'], this.AppConstants.dateFormatStore).format(this.AppConstants.dateFormatStore);
            let from_date = moment(this.$scope['fromDate'], this.AppConstants.dateFormatStore).format(this.AppConstants.dateFormatStore);

            request = {
                owner_id : listing.user_id,
                client_id : this.$rootScope['user'].id,
                listing_id : listing.id,
                message_to_owner : request.message_to_owner,
                price_per_month : listing.price_per_month,
                // is_continuos : this.$scope['selected_toDate'] == 0 ? 1 : 0,
                is_continuos : 1,
                from_date : from_date
            };

            if(to_date !== 'Invalid date' && request.is_continuos == 0){
                request.to_date = to_date;
            }
          
            return this.RequestService.sendRequest( request ).then(( response : App.Repositories.Request.RequestResponse ) => {
                this.request = null;
                this.RequestService.removeRequest();
                this.$uibModalInstance.close('dismiss');
                this.RequestService.openSentRequestModal(response);
            }, (error : any) => {
                if(_.has(error.data, 'message')){
                    if(error.data.message == 'TOKEN_EXPIRED')
                        this.$uibModalInstance.close('dismiss');
                }
                this.errorBags = this.errorTranslate(error);
            });
        }

        goToRequestPage = () => {
            this.$uibModalInstance.close('dismiss');
            this.$state.go('main.account.user_request.request', {id : this.request.id});
        }
    }

    requestModule.controller( 'RequestController', RequestController );

}
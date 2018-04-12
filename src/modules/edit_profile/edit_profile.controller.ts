module App.Modules.EditProfile {

    import BaseController = App.Base.BaseController;
    import IApiResponse = App.Interfaces.IApiResponse;
    import IUser = App.Interfaces.User.IUserAuthenticated;

    class EditProfileController extends BaseController {

        static $inject : string[] = [ '$scope', '$rootScope', 'EditProfileService', 'toaster', 'PayoutService', '$q', 'AuthService' ];

        profile_picture : any;

        mobile : string;

        mobile_verification_code : string;

        user : IUser;

        showVerificationCode : boolean = false;

        account : any = {
            legal_entity : {
                type : 'individual'
            }
        };

        document : any = null;

        additional_owner_document_id : any = null;
        
        isDocumentUploading : boolean = false;
        
        constructor
        (
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private EditProfileService : EditProfileService,
            private toaster : any,
            private PayoutService : App.Modules.Payout.PayoutService,
            private $q : any,
            private AuthService : App.Services.AuthService
        )
        {
            super( $scope, $rootScope );
            this.user = angular.copy(this.$rootScope['user']);
            this.mobile = this.user.mobile;
            this.showVerificationCode = this.EditProfileService.onMobileVerification;
            this.init();
            this.defineScope();
        }

        init = () => {
            this.loading();
            this.PayoutService.getAccount( this.$rootScope['user'].id ).then( this.setAccount.bind( this ) ).then(() => {
                this.ready();
            });
        }

        defineScope = () => {
            this.$scope.uploadDocument = (element : any) => {
                this.$scope.$apply((scope : any) => {
                    var photofile = element.files[0];
                    var reader = new FileReader();
                    var fd = new FormData();
                    let _self = this;
    
                    reader.onload = function(e) {
                        fd.append('document', photofile);
                        fd.append('user_id', _self.$rootScope['user'].id);

                        _self.isDocumentUploading = true;
                        _self.PayoutService.uploadDocument(fd).then(() => {
                            _self.isDocumentUploading = false;
                        });
                    };
                    reader.readAsDataURL(photofile);
                });
            }
    
            this.$scope.uploadAoDocument = (element : any) => {
                this.$scope.$apply((scope : any) => {
                    var photofile = element.files[0];
                    var reader = new FileReader();
                    var fd = new FormData();
                    let _self = this;
    
                    reader.onload = function(e) {
                        fd.append('document', photofile);

                       _self.isDocumentUploading = true;
                       _self.PayoutService.uploadDocument(fd).then((document : any) => {
                            _self.isDocumentUploading = false;
                            _self.additional_owner_document_id = document.id;
                        });
                    };
                    reader.readAsDataURL(photofile);
                });
            }
        }

        setAccount = ( account : any ) => {
            if(!_.isEmpty(account)){
                this.account = account;
                if(_.has(this.account, 'legal_entity'))
                    if(_.has(this.account.legal_entity, 'additional_owners'))
                        this.account.legal_entity.additional_owners = this.account.legal_entity.additional_owners.length > 0 ? this.account.legal_entity.additional_owners[0] : {};
            }
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

        edit = ( user : IUser, account : any ) => {
            if( this.profile_picture ){
                return this.uploadProfilePicture( user.id ).then( () => {
                    this.updateUser( user );
                } );
            }

            return this.$q.all([
                this.updateUser( user ),
                this.updateOrCreateAccount( user, account )
            ]).then(() => {
                this.toaster.pop({
                    type: 'success',
                    title: 'UPDATED',
                    body: 'PROFILE_UPDATED',
                    showCloseButton: true
                });
                this.errorBags = [];
            });
        }

        updateOrCreateAccount = ( user : IUser, account : any ) => {    
                // set user 
                this.account.user_id = user.id;
                this.account.legal_entity.first_name = user.firstname;
                this.account.legal_entity.last_name = user.lastname;
                
                if( account.legal_entity.type == 'individual' ){
                    // set account address
                    this.account.legal_entity.address = {};
                    this.account.legal_entity.address = {
                        city : user.city,
                        line1 : user.street,
                        postal_code : user.zip
                    };
                } else {
                    this.account.legal_entity.personal_address = {
                        city : user.city,
                        line1 : user.street,
                        postal_code : user.zip
                    };
                }
                    
                    
            if(account.legal_entity.type == 'company' ){
                this.account.legal_entity.business_tax_id = user.business_tax_id;
                account.legal_entity.business_tax_id = user.business_tax_id;
            }    

            if(this.additional_owner_document_id){
                account.legal_entity.document_ao_id = this.additional_owner_document_id;
            }

            return this.PayoutService.createAccount(account).then( 
                this.setUserAccount.bind(this),
                this._handleOnError.bind(this)
            );    
        }

        setUserAccount = ( user : App.Repositories.User.UserResponse ) => {
            return this.PayoutService.getAccount( this.$rootScope['user'].id )
                .then( this.setAccount.bind( this ) )
                .then(() => {
                    this.AuthService.setUserFields({
                        firstname : user.firstname, 
                        lastname : user.lastname,
                        zip : user.zip,
                        street : user.street,
                        city : user.city
                    });
                });
        }

        updateUser = ( user : IUser ) => {
            return this.EditProfileService.update( user ).then( this.afterUpdate.bind( this ), this._handleOnError.bind( this ) );
        }

        afterUpdate = ( user : IUser  ) => {
            this.profile_picture = null;
            this.mobile = this.$rootScope['user'].mobile;
            this.showVerificationCode = this.EditProfileService.onMobileVerification;
        }

        uploadProfilePicture = ( id : string ) => {
            return this.EditProfileService.upload( this.profile_picture, id );
        }

        sendVerification = ( mobile : string ) => {
            return this.EditProfileService.sendVerification( mobile, this.$rootScope['user'].id ).then( () => {
                this.showVerificationCode = true;
                this.$rootScope['user'].mobile_verified = 0;
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

        sendUserEmailVerification = () => {
            return this.EditProfileService.sendUserEmailVerification().then(() => {
                this.toaster.pop({
                    type: 'success',
                    title: 'SUCCESS',
                    body: 'EMAIL_VERIFICATION_SENT',
                    showCloseButton: true
                });
            });
        }

        

    }

    editProfileModule.controller( 'EditProfileController', EditProfileController );
}
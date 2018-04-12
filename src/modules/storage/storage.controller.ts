
module App.Modules.Storage {
    
    import BaseController = App.Base.BaseController;
    import IListingType = App.Repositories.ListingType;
    import IApiResponse = App.Interfaces.IApiResponse;
    import IListing = App.Repositories.Listing;

    class StorageController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'StorageService', '$state', 'AddListingService', 'AppConstants', 'toaster', 'AuthService', '$uibModal', 'StorageConstants', 'EditProfileService' ];

        listings : Array<IListing.ListingResponse>; 

        private verificationCheckModal : any;

    
        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private StorageService : StorageService,
            private $state : any,
            private AddListingService : AddListing.AddListingService,
            private AppConstants : App.Main.MainConstants,
            private toaster : any,
            private AuthService : App.Services.AuthService,
            private $uibModal : any,
            private StorageConstants : App.Interfaces.Constants.ModuleConstants,
            private EditProfileService : App.Modules.EditProfile.EditProfileService
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.loading();
            this.StorageService.reloadListing().then(() => {
                this.listings = this.StorageService.listings;
                this.ready();
            });
        }

        addListing = () => {
            this.AddListingService.listing = {};
            this.AddListingService.isNewListing = true;
            // notify when mobile and email not yet verified
            let isEmailVerified = this.AuthService.isEmailVerified(),
                isMobileVerified = this.AuthService.isMobileVerified();

            if( !isEmailVerified || !isMobileVerified ) {
                let _self = this;
                this.verificationCheckModal = this.$uibModal.open({
                    templateUrl : `${this.StorageConstants.templateUrl}modals/email_verification_prompt.modal.html`,
                    controller : function(){
                        // Verification properties start
                        this.mobile = null;
                        this.showVerificationCode = false;
                        this.user = _self.$rootScope['user'];
                        this.errorBags = [];

                        this.mobileOnChange = ( mobile : string ) => {
                            if( this.user.mobile ){
                                if( this.user.mobile !== mobile ){
                                    this.$rootScope['user'].mobile_verified = 0;
                                } else {
                                    this.$rootScope['user'].mobile_verified = 1;
                                }
                            } 
                        }
                        this.sendVerification = ( mobile : string ) => {
                            return _self.EditProfileService.sendVerification( mobile, _self.$rootScope['user'].id ).then( () => {
                                this.showVerificationCode = true;
                                _self.$rootScope['user'].mobile_verified = 0;
                                _self.toaster.pop({
                                    type: 'success',
                                    title: 'MOBILE_VERIFICATION_TITLE',
                                    body: 'MOBILE_VERIFICATION_SENT',
                                    showCloseButton: true
                                });
                            }, (error : any) => {
                                this.errorBags = _self.errorTranslate(error);
                            });
                        }
                        this.verify = ( mobile : string, mobile_verification_code : string ) => {
                            return _self.EditProfileService.verifyMobile( mobile, mobile_verification_code, _self.$rootScope['user'].id ).then(() => {
                                this.showVerificationCode = false;
                                _self.$rootScope['user'].mobile_verified = 1;
                                this.isEmailVerified = true;
                                isEmailVerified = true;
                                _self.EditProfileService.onMobileVerification = false;
                            }, () => {
                                _self.toaster.pop({
                                    type: 'error',
                                    title: 'MOBILE_VERIFICATION_ERROR_TITLE',
                                    body: 'MOBILE_VERIFICATION_ERROR',
                                    showCloseButton: true
                                });
                            });
                        }
                        
                        this.reset = () => {
                            this.showVerificationCode = false;
                            this.mobile = null;
                            _self.EditProfileService.reset();
                        }
                        // Verification properties end

                        this.isEmailVerified = isEmailVerified;
                        this.isMobileVerified = isMobileVerified;

                        this.cancel = () => {
                            _self.verificationCheckModal.dismiss('cancel');
                        }
                    },
                    controllerAs : 'ctrl'
                });
            } else {
                this.$state.go('main.account.storage.add_listing.step1', { isNew : 1 });
            }
        }

        updateListing = ( listing : IListing.ListingResponse ) => {
            this.AddListingService.setListing( angular.copy(listing) );
            this.AddListingService.isNewListing = false;
            this.$state.go('main.account.storage.add_listing.step1_edit', { listing_id : listing.id, isNew : 0, isSpecial : listing.isSpecial } );
        }

        deleteListing = ( listing : IListing.ListingResponse ) => {
            if( !listing.heading ){
                listing.heading = 'Unamed';
            }
            swal({
                title: `Delete "${ listing.heading }"? `,
                text: `Your will not be able to recover listing named ${ listing.heading } !`,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel pls!",
                closeOnConfirm: false,
                showLoaderOnConfirm : true,
                closeOnCancel: false },
                 (isConfirm : boolean) => {
                    if (isConfirm) {
                        this.StorageService.deleteListing( listing.id ).then( () => {
                            this.StorageService.reloadListing().then(() => {
                                this.listings = this.StorageService.listings;
                            });
                            swal("Deleted!", "Your listing has been deleted", "success");
                        });
                    } else {
                        swal("Cancelled", "Cancelled deletion", "error");
                    } 
            });
        }

        navigateListingView = ( id : string, heading : string, location : string ) => {
            this.$state.go('main.storage_view', {
                id : id,
                dateFrom : moment().format(this.AppConstants.dateFormat)
            });
        }

        deactivateActivateListing = ( listing : IListing.ListingResponse ) => {
            return this.StorageService.deactivateActivateListing( listing.id, listing.isActive )
                .then(( list : IListing.ListingResponse ) => {
                    // update listing status
                    let pos = _.findIndex( this.listings, { id : listing.id } );
                    this.listings[pos].isActive = list.isActive;
                }, ( error : any ) => {
                    this.toaster.pop({
                        type: 'error',
                        title: 'Error encountered',
                        body : error.data.message,
                        showCloseButton: true
                    });
                });
        }
    }

    storageModule.controller( 'StorageController', StorageController );
}
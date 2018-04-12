
module App.Modules.Main {
    
    import BaseController = App.Base.BaseController;

    class UploadProfileController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$uibModalInstance', 'EditProfileService', 'AppConstants', 'AuthService', '$timeout', 'toaster' ];

        profile_picture : string;

        default_profile : string;

        isUploading : boolean = false;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $uibModalInstance : any,
            private EditProfileService : App.Modules.EditProfile.EditProfileService,
            private AppConstants : App.Main.MainConstants,
            private AuthService : App.Services.AuthService,
            private $timeout : any,
            private toaster : any
        ){
            super( $scope, $rootScope );
            this.default_profile = this.AppConstants.default_profile_picture;
        }

        upload = ( profile_picture : any ) => {
            this.isUploading = true;
            return this.EditProfileService.upload( profile_picture, this.AuthService.getUser().id )  
                      .then((data : any) => {
                        if(_.has(data, 'data'))
                                this.AuthService.setUserFields({profile_picture : data.data.data.profile_picture});
                        this.isUploading = false;
                        this.cancel();
                        this.toaster.pop({
                            type: 'success',
                            title: 'SUCCESS_UPLOAD',
                            body: 'PROFILE_IMAGE_HAS_BEEN_UPDATED',
                            showCloseButton: true
                        });
                      });
        }

        cancel = () => {
            this.$uibModalInstance.dismiss('close');
        }

    }

    angularModule.controller( 'UploadProfileController', UploadProfileController );

}
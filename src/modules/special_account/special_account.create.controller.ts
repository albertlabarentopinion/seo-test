module App.Modules.SpecialAccount {
    
    import BaseController = App.Base.BaseController;

    class SpecialAccountCreateController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$uibModalInstance', '$q', 'SpecialAccountService', 'EditProfileService', 'user' ];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $uibModalInstance : any,
            private $q : any,
            private SpecialAccountService : SpecialAccountService,
            private EditProfileService : App.Modules.EditProfile.EditProfileService,
            public user : any
        ){
            super( $scope, $rootScope );
        }

        cancel = ( result : any = null ) => {
            this.$uibModalInstance.close(result);
        }

        save = ( user : App.Repositories.User.UserResponse ) => {
            let defer = this.$q.defer();

            this.SpecialAccountService.saveSpecialUser( user ).then(( created_user : App.Repositories.User.UserResponse ) => {
                if( user.profile_picture && !_.isString(user.profile_picture) ){
                    this.EditProfileService.upload( user.profile_picture, created_user.id ).then((from_upload : any) => {
                        defer.resolve(from_upload.data.data);
                    });
                } else {
                    defer.resolve(created_user);
                }
                
            }, ( error : any ) => {
                this.errorBags = this.errorTranslate(error);
                defer.reject(error);
            });

            return defer.promise.then(( user : App.Repositories.User.UserResponse ) => {
                this.cancel(user);
                return user;
            });
        }
    }

    specialAccountModule.controller( 'SpecialAccountCreateController', SpecialAccountCreateController );

}
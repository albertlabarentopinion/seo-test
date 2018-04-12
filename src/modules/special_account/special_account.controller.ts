
module App.Modules.SpecialAccount {
    
    import BaseController = App.Base.BaseController;

    class SpecialAccountController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'SpecialAccountService', '$uibModal', 'SpecialAccountConstants', 'AdminUserService', 'HelpersService', '$state' ];

        users : App.Repositories.User.UserResponse[];

        createSpecialAccountInstance : any;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private SpecialAccountService : SpecialAccountService,
            private $uibModal : any,
            private SpecialAccountConstants : App.Interfaces.Constants.ModuleConstants,
            private AdminUserService : App.Modules.AdminUser.AdminUserService,
            private HelpersService : App.Services.Helpers.HelpersService,
            private $state : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        private init = () => {
            this.loading();
            this.SpecialAccountService
                .getSpecialUsers()
                .then(this.setUsers.bind(this))
                .then(() => {
                    this.ready();
                });
        }

        private setUsers = ( users : App.Repositories.User.UserResponse[] ) => {
            this.users = users;
        }

        openCreateSpecialAccount = ( user : App.Repositories.User.UserResponse = null ) => {

            if( user ) user = this.HelpersService.transformProfilePicture(user);

            this.createSpecialAccountInstance = this.$uibModal.open({
                templateUrl : `${this.SpecialAccountConstants.templateUrl}special_account.create.modal.html`,
                controller : 'SpecialAccountCreateController',
                controllerAs : 'ctrl',
                resolve : {
                    user : function(){
                        return user;
                    }
                }
            });

            this.createSpecialAccountInstance.result.then((updated_user : App.Repositories.User.UserResponse) => {
                if( updated_user ) this.$state.reload();
            });
        }

        activateDeactivate = ( user : App.Repositories.AdminUser.AdminUserResponse ) => {
            let activate_deactivate_text =  (user.isDeactivated == 1 ) ? 'Activate' : 'Deactivate';

            swal({
                    title: `${activate_deactivate_text} user ?` ,
                    showCancelButton: true,
                    confirmButtonColor: "#1D84C6",
                    confirmButtonText: 'Yes',
                    cancelButtonText: "Cancel",
                    closeOnConfirm: false,
                    showLoaderOnConfirm : true,
                    closeOnCancel: true },
                    (isConfirm : boolean) => {
                        if (isConfirm) {
                            return this.AdminUserService.activateDeactivateUser( user.id ).then(() => {
                                let index = _.findIndex(this.users, { id : user.id });
                                this.users[index].isDeactivated = (user.isDeactivated == 1 ) ? 0 : 1;
                                swal.close();
                            });
                        }
                });
        }
    }

    specialAccountModule.controller( 'SpecialAccountController', SpecialAccountController );

}
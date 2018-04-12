
module App.Modules.AdminUser {
    
    import BaseController = App.Base.BaseController;

    class AdminUserController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'DTOptionsBuilder', 'AdminUserService', 'AuthService', '$state', '$window', 'LoginService' ];

        dtOptions : any;
        
        dtColumnDefs : any;

        users : Array<App.Repositories.AdminUser.AdminUserResponse> = [];

        filterOption : any = {
            type: 'text',
            bRegex: true,
            bSmart: true
        };
        
        filteredColumnsCount : number = 5;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private DTOptionsBuilder : any,
            private AdminUserService : AdminUserService,
            private AuthService : App.Services.AuthService,
            private $state : any,
            private $window : any,
            private LoginService : App.Modules.Login.Service
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.loading();
            let filterOptions : any = [];
            while(this.filteredColumnsCount > 0) {
                filterOptions.push(this.filterOption);
                this.filteredColumnsCount--;
            }
            this.dtOptions = this.DTOptionsBuilder
                .newOptions()
                .withOption('hasColumnFilter', true)
                .withOption('lengthMenu', [25, 50, 100])
                .withOption('sDom', '<"top"l>f<"and"i>rt<"bottom"p><"clear">')
                .withOption('oSearch',  {
                    "sSearch": this.AdminUserService.initSearchUser
                })
                .withColumnFilter({
                    aoColumns: filterOptions
                });
            this.getUsers();
           
        }

        getUsers = () => {
            return  this.AdminUserService.getUsers()
                        .then((users : Array<App.Repositories.AdminUser.AdminUserResponse>) => {
                            this.users = users;
                            this.ready();
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

        loginAsUser = ( user : App.Repositories.AdminUser.AdminUserResponse ) => {
            user.role = 'admin';
            this.AuthService.setUser(user);
            this.$state.go(App.Config.Acl.redirects.member, {}, {reload: true});
        }
    }

    adminUserModule.controller( 'AdminUserController', AdminUserController );

}
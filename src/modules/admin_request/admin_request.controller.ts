
module App.Modules.AdminRequest {
    
    import BaseController = App.Base.BaseController;

    class AdminRequestController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'DTOptionsBuilder', 'AdminRequestService', 'AuthService', '$state', '$window', 'LoginService', 'AdminUserService', 'DTColumnDefBuilder' ];

        dtOptions : any;
        
        dtColumnDefs : any;

        requests : Array<App.Repositories.AdminRequest.AdminRequestResponse> = [];

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
            private AdminRequestService : AdminRequestService,
            private AuthService : App.Services.AuthService,
            private $state : any,
            private $window : any,
            private LoginService : App.Modules.Login.Service,
            private AdminUserService : App.Modules.AdminUser.AdminUserService,
            private DTColumnDefBuilder : any
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
                    "sSearch": this.AdminRequestService.initSearchUser
                })
                .withColumnFilter({
                    aoColumns: filterOptions
                });
            this.getRequests();
           
        }

        getRequests = () => {
            return  this.AdminRequestService.getRequests()
                        .then((requests : Array<App.Repositories.AdminRequest.AdminRequestResponse>) => {
                            this.requests = _.map(requests, (request : App.Repositories.Request.RequestResponse) => {
                                request.updated_at = moment(request.updated_at, 'YYYY-MM-DD HH:mm:ss');
                                return request;
                            });

                            this.ready();
                        });
        }

        goToManageUsers = ( user : App.Repositories.AdminUser.AdminUserResponse ) => {
            this.AdminUserService.initSearchUser = user.email;
            this.$state.go('main.admin.admin_user');
        }

        activateDeactivate = ( request : App.Repositories.Request.RequestResponse ) => {
            let activate_deactivate_text =  (request.isDeactivated) ? 'Activate' : 'Deactivate';
            swal({
                    title: `${activate_deactivate_text} request ?` ,
                    showCancelButton: true,
                    confirmButtonColor: "#1D84C6",
                    confirmButtonText: 'Yes',
                    cancelButtonText: "Cancel",
                    closeOnConfirm: false,
                    showLoaderOnConfirm : true,
                    closeOnCancel: true },
                    (isConfirm : boolean) => {
                        if (isConfirm) {
                            return this.AdminRequestService.activateDeactivate( request.id ).then(() => {
                                let index = _.findIndex(this.requests, { id : request.id });
                                this.requests[index].isDeactivated = (request.isDeactivated == 1 ) ? 0 : 1;
                                swal.close();
                            });
                        }
                });
        }
    }

    adminRequestModule.controller( 'AdminRequestController', AdminRequestController );

}
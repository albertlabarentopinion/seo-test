
module App.Modules.AdminListing {
    
    import BaseController = App.Base.BaseController;

    class AdminListingController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'DTOptionsBuilder', 'AdminListingService', 'AdminUserService', '$state' ];

        dtOptions : any;
        
        dtColumnDefs : any[] = [
            { targets : 3, type : 'num' }
        ];

        listings : Array<App.Repositories.AdminListing.AdminListingResponse> = [];

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
            private AdminListingService : AdminListingService,
            private AdminUserService : App.Modules.AdminUser.AdminUserService,
            private $state : any
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
                .withOption('lengthMenu', [25, 50, 100])
                .withOption('sDom', '<"top"l>f<"and"i>rt<"bottom"p><"clear">')
                .withOption('language', {
                    "decimal": ",",
                    "thousands": "."
                })
                // .withOption('scrollY', '370px')
                .withColumnFilter({
                    aoColumns: filterOptions
                });
            this.getListings();
           
        }

        getListings = () => {
            return  this.AdminListingService.getListings()
                        .then((listings : Array<App.Repositories.AdminListing.AdminListingResponse>) => {
                            this.listings = _.map(listings, (listing : App.Repositories.AdminListing.AdminListingResponse) => {
                                listing['email'] = listing.user.email;
                                listing.price_per_month = parseFloat(listing.price_per_month);
                                return listing;
                            });
                            this.ready();
                        });
        }

         activateDeactivate = ( listing :App.Repositories.AdminListing.AdminListingResponse ) => {
            let activate_deactivate_text =  (listing.isActive == 0 ) ? 'Activate' : 'Deactivate';
            console.log(listing);
            swal({
                    title: `${activate_deactivate_text} listing ?` ,
                    showCancelButton: true,
                    confirmButtonColor: "#1D84C6",
                    confirmButtonText: 'Yes',
                    cancelButtonText: "Cancel",
                    closeOnConfirm: false,
                    showLoaderOnConfirm : true,
                    closeOnCancel: true },
                    (isConfirm : boolean) => {
                        if (isConfirm) {
                            return this.AdminListingService.activateDeactivateListing( listing.id ).then(() => {
                                let index = _.findIndex(this.listings, { id : listing.id });
                                this.listings[index].isActive = (listing.isActive == 1 ) ? 0 : 1;
                                swal.close();
                            });
                        }
                });
        }

        goToManageUsers = ( user : App.Repositories.AdminUser.AdminUserResponse ) => {
            this.AdminUserService.initSearchUser = user.email;
            this.$state.go('main.admin.admin_user');
        }
    }

    adminListingModule.controller( 'AdminListingController', AdminListingController );

}

module App.Modules.AdminRating {
    
    import BaseController = App.Base.BaseController;

    class AdminRatingController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'DTOptionsBuilder', 'AdminRatingService', '$uibModal', 'RatingConstants', '$filter', '$state' ];

        dtOptions : any;
        
        dtColumnDefs : any;

        filterOption : any = {
            type: 'text',
            bRegex: true,
            bSmart: true
        };

        filteredColumnsCount : number = 5;
        
        ratings : App.Repositories.Rating.RatingResponse[];

        editRatingModalInstance : any;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private DTOptionsBuilder : any,
            private AdminRatingService : AdminRatingService,
            private $uibModal : any,
            private RatingConstants : App.Interfaces.Constants.ModuleConstants,
            private $filter : any,
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
                .withOption('hasColumnFilter', true)
                .withOption('lengthMenu', [25, 50, 100])
                .withOption('sDom', '<"top"l>f<"and"i>rt<"bottom"p><"clear">')
                .withOption('oSearch',  {
                    "sSearch": this.AdminRatingService.initSearchUser
                })
                .withColumnFilter({
                    aoColumns: filterOptions
                });
            this.getRatings();
           
        }

        getRatings = () => {
            return this.AdminRatingService.allRating().then((ratings : Array<App.Repositories.Rating.RatingResponse>) => {
                this.ratings = _.map(ratings, (rating : App.Repositories.Rating.RatingResponse) => {
                    rating.created_at =  moment(rating.created_at, 'YYYY-MM-DD HH:mm:ss'); 
                    return rating;
                });
                this.ready();
            });
        }

        editRating = ( rating : App.Repositories.Rating.RatingResponse ) => {
            let rating_copy : any = _.clone(rating);
            delete rating_copy.request;
            delete rating_copy.listing;
            rating = rating.request;
            rating.rating = rating_copy;

            this.editRatingModalInstance = this.$uibModal.open({
                templateUrl : `${this.RatingConstants.templateUrl}add_rating.modal.html`,
                controller : 'RatingAddController',
                controllerAs : 'addRatingCtrl',
                resolve : {
                    request : () => {
                        return rating;
                    },
                    forMultiple : () => {
                        return false;
                    }
                }
            });
        }

        deleteRating = ( rating_id : string ) => {
            let delete_text = this.$filter('translate')('DELETE');
            let rating_text = this.$filter('translate')('RATING');
            let cancel_text = this.$filter('translate')('CANCEL');
            let yes_text = this.$filter('translate')('YES');
            swal({
                title: `${delete_text} ${rating_text} ?` ,
                showCancelButton: true,
                confirmButtonColor: "#1D84C6",
                confirmButtonText: `${yes_text}`,
                cancelButtonText: `${cancel_text}`,
                closeOnConfirm: false,
                showLoaderOnConfirm : true,
                closeOnCancel: true },
                (isConfirm : boolean) => {
                    if (isConfirm) {
                        return this.AdminRatingService.deleteRating( rating_id ).then(() => {
                            this.$state.reload();
                            swal.close();
                        });
                    }
            });
        }
    }

    adminRatingModule.controller( 'AdminRatingController', AdminRatingController );

}
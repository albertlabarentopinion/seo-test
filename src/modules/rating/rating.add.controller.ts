
module App.Modules.Rating {
    
    import BaseController = App.Base.BaseController;

    class RatingAddController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$uibModalInstance', 'request', 'RatingService', 'forMultiple', '$state' ];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $uibModalInstance : any,
            private request : App.Repositories.Request.RequestResponse,
            private RatingService : App.Modules.Rating.RatingService,
            private forMultiple : boolean,
            private $state : any
        ){
            super( $scope, $rootScope );
        }

        addRating = ( rating : any, comment : string ) => {
            return this.RatingService.addRating( rating, comment, this.request.id, this.request.rating.id )
                .then((rating : any) => {
                    if( _.has( rating, 'id' ) )
                        this.request.rating = rating;
                    this.$uibModalInstance.dismiss('close');

                    if( !this.forMultiple )
                        this.$state.reload();
                });
        }

        cancel = () => {
            if( this.forMultiple ){
                return this.RatingService.isRated( this.request.id ).then(( request : App.Repositories.Request.RequestResponse ) => {
                    this.request.isRated = request.isRated;
                    this.$uibModalInstance.dismiss('close');
                });
            }
            this.$uibModalInstance.dismiss('close');
        }
    }

    ratingModule.controller( 'RatingAddController', RatingAddController );

}
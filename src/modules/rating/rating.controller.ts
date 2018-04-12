
module App.Modules.Rating {
    
    import BaseController = App.Base.BaseController;

    class RatingController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope' ];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService
        ){
            super( $scope, $rootScope );
        }
    }

    ratingModule.controller( 'RatingController', RatingController );

}
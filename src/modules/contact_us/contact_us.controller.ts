
module App.Modules.ContactUs {
    
    import BaseController = App.Base.BaseController;

    class ContactUsController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope' ];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService
        ){
            super( $scope, $rootScope );
        }
    }

    contactUsModule.controller( 'ContactUsController', ContactUsController );

}
module App.Modules.Account {

    import BaseController = App.Base.BaseController;
    import IApiResponse = App.Interfaces.IApiResponse;

    class AccountController extends BaseController {

        static $inject : string[] = [ '$scope', '$rootScope', 'AuthService', 'Notifications', '$state', '$stateParams' ];

        token : string;

        constructor
        (
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private AuthService : App.Services.AuthService,
            private Notifications : App.Base.EventDispatcher,
            private $state : any,
            private $stateParams : any
        )
        {
            super( $scope, $rootScope );
        }

    }

    accountModule.controller( 'AccountController', AccountController );
}
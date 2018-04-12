
module App.Modules.UserRequest {
    
    import BaseController = App.Base.BaseController;

    class UserRequestController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'UserRequestService', '$state', 'Notifications', 'MainService', '$uibModal', 'RatingConstants' ];

        requests : Array<App.Repositories.Request.RequestResponse> = [];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private UserRequestService : UserRequestService,
            private $state : any,
            private Notifications : App.Base.EventDispatcher,
            private MainService : App.Modules.Main.MainService,
            private $uibModal : any,
            private RatingConstants : App.Interfaces.Constants.ModuleConstants
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.loading();
            this.UserRequestService.getRequests(this.$rootScope['user'].id, 'all')
                    .then(this.setRequests.bind(this))
                    .then(() => {
                        this.showModalForUnratedRequests();
                    });
        }

        setRequests = ( requests : Array<App.Repositories.Request.RequestResponse> ) => {
            this.ready();
            this.requests = this.UserRequestService.transformer( requests, this.$rootScope['user'] );
            let unseen_requests = this.UserRequestService.getUnseenLogsAll(this.requests, this.$rootScope['user']);
            this.MainService.setNotifications(unseen_requests);
            this.Notifications.notify(NOTIFICATIONS.REQUEST_NOTIFICATION_UNSEEN);
        }

        showModalForUnratedRequests = () => {
              let unrated_requests  = _.filter(this.requests, ( request : App.Repositories.Request.RequestResponse ) => {
                        // is unseen rate
                 return !request.isRated 
                        // has no ratings
                        && request.ratings_count == 0 
                        // has over, expired, cancelled, reject, terminated request status
                        && _.indexOf([
                            'CANCELED',
                            'OVER',
                            'EXPIRED',
                            'TERMINATED',
                            'REJECT'
                        ], request.request_status ) > -1;
              });  

              _.each( unrated_requests, ( request : App.Repositories.Request.RequestResponse ) => {
                    this.$uibModal.open({
                        templateUrl : `${this.RatingConstants.templateUrl}add_rating.modal.html`,
                        controller : 'RatingAddController',
                        controllerAs : 'addRatingCtrl',
                        resolve : {
                            request : () => {
                                return request;
                            },
                            forMultiple : () => {
                                return true;
                            }
                        }
                    });
              });
        }

        gotoRequest = (id : string ) => {
            this.$state.go('main.account.user_request.request', { id : id });
        }
    }

    userRequestModule.controller( 'UserRequestController', UserRequestController );

}

module App.Modules.Home {
    
    import BaseController = App.Base.BaseController;
    import UserResponse = App.Repositories.User.UserResponse;
    import IApiResponse = App.Interfaces.IApiResponse;

    class HomeController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$state', '$timeout', 'ResultPageService', 'AppConstants' ];

        search : {
            date : {
                startDate : any,
                endDate : any
            }
        } = {
            date : {
                startDate : null,
                endDate : null
            }
        };

        minDate : any;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $state : any,
            private $timeout : any,
            private ResultPageService : App.Modules.ResultPage.ResultPageService,
            private AppConstants : App.Main.MainConstants
        ){
            super( $scope, $rootScope );
            this.defineScope();
        }

        defineScope = () => {
            this.$scope['selected_address'] = null;
            this.$scope.$watch( 'selected_address', this.placeOnChanged.bind( this ) );
            this.minDate = moment();
            // this.$scope['dateFrom'] = moment().format(this.AppConstants.dateFormat);
        }

        searchStorage = ( selected_address : any, dateFrom : string ) => {
            console.log(selected_address);
            this.ResultPageService.selected_address = selected_address;
            let params : any = {
                latitude :  selected_address.geometry.location.lat(),
                longitude :  selected_address.geometry.location.lng(),
                search : selected_address.formatted_address
            };

            if( dateFrom ) params.dateFrom = dateFrom;
            this.$state.go( 'main.result_page', params );
        }

        setDateFrom = ( dateFrom : string, value : any) => {
            if(value) {
                this.$scope['dateFrom'] = value.format(this.AppConstants.dateFormat);
            }
        }

        placeOnChanged = ( newValue : any ) => {
            if( _.isObject(newValue) ){
                this.$scope.selected_address = newValue;
            }
        }

        onEnter = ( selected_address : any, dateFrom : string ) => {
            this.$timeout(() => {
                this.$scope.$apply(() => {
                    this.searchStorage( this.$scope.selected_address, dateFrom );
                });
            }, 500);
        }
    }

    homeModule.controller( 'HomeController', HomeController );

}
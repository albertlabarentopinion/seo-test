
module App.Modules.UserProfile {
    
    import BaseController = App.Base.BaseController;

    class UserProfileController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'UserProfileService', '$stateParams', 'HelpersService', 'ResultPageService', 'RequestService', '$state' ];

        profile : App.Interfaces.User.User;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private UserProfileService : UserProfileService,
            private $stateParams : any,
            private HelpersService : App.Services.Helpers.HelpersService,
            private ResultPageService : App.Modules.ResultPage.ResultPageService,
            private RequestService : App.Modules.Request.RequestService,
            private $state : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.getProfile();
        }

        getProfile = () => {
            this.loading();
            this.UserProfileService.getUserProfile( this.$stateParams.user_id ).then(this.setProfile.bind(this));
        }

        private setProfile = ( profile : App.Interfaces.User.User ) => {
            this.profile = this.HelpersService.transformProfilePicture(profile);
            this.profile.created_at = moment(this.profile.created_at).format('MMM YYYY');
            this.profile['listings'] = this.ResultPageService.transformListing(this.profile['listings']);
            this.profile['ratings'] = _.map(this.profile['ratings'], (rating : App.Repositories.Rating.RatingResponse) => {
                rating['reviewer'] = this.HelpersService.transformProfilePicture(rating['reviewer']);
                rating.updated_at = moment(rating.updated_at);
                rating.rating = parseInt(rating.rating);
                return rating;
            });
            this.profile['user_rating'] = _.meanBy(this.profile['ratings'], 'rating');
            this.ready();
        }

        navigateListingView = ( id : string ) => {
            this.ResultPageService.selected_address = null;
            this.RequestService.removeRequest();

            this.$state.go('main.storage_view', {
                id : id
            });
        }
    }

    userProfileModule.controller( 'UserProfileController', UserProfileController );

}
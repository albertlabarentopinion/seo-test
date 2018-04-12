
module App.Modules.Storage.AddListing {
    
    import BaseController = App.Base.BaseController;
    import UserResponse = App.Repositories.User.UserResponse;
    import IApiResponse = App.Interfaces.IApiResponse;

    class AddListingController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'AddListingService', 'Notifications', '$state', '$stateParams', 'toaster' ];

        step_no : string = 'step1';

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private AddListingService : AddListingService,
            private notify : App.Base.EventDispatcher,
            private $state : any,
            private $stateParams : any,
            private toaster : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.loading();
            this.defineListener();
        }

        defineListener = () => {
            this.$scope.$on( '$destroy', this.destroy.bind(this) );
            this.notify.addEventListener( 'CONTROLLER.LISTING_FORM_IS_LOADING', this.loading.bind( this ) );
            this.notify.addEventListener( 'CONTROLLER.LISTING_FORM_IS_DONE', this.ready.bind( this ) );
            this.notify.addEventListener( 'STEPS.STEP1', this.wizardActivateColor.bind( this ) );
            this.notify.addEventListener( 'STEPS.STEP2', this.wizardActivateColor.bind( this ) );
            this.notify.addEventListener( 'STEPS.STEP3', this.wizardActivateColor.bind( this ) );
            this.notify.addEventListener( 'STEPS.STEP4', this.wizardActivateColor.bind( this ) );
            this.notify.addEventListener( 'STEPS.UNSAVED', this.changesDetected.bind( this ) );
            this.notify.addEventListener( 'STEPS.SAVED_OR_DISCARD', this.savedOrDiscardDetected.bind( this ) );
        }

        destroy = () => {
            this.notify.removeEventListener( CONTROLLER.LISTING_FORM_IS_LOADING, this.loading.bind( this ) );
            this.notify.removeEventListener( CONTROLLER.LISTING_FORM_IS_DONE, this.ready.bind( this ) );
            this.notify.removeEventListener( 'STEPS.STEP1', this.wizardActivateColor.bind( this ) );
            this.notify.removeEventListener( 'STEPS.STEP2', this.wizardActivateColor.bind( this ) );
            this.notify.removeEventListener( 'STEPS.STEP3', this.wizardActivateColor.bind( this ) );
            this.notify.removeEventListener( 'STEPS.STEP4', this.wizardActivateColor.bind( this ) );
            this.notify.removeEventListener( 'STEPS.UNSAVED', this.changesDetected.bind( this ) );
            this.notify.removeEventListener( 'STEPS.SAVED_OR_DISCARD', this.savedOrDiscardDetected.bind( this ) );
        }

        wizardActivateColor = ( event : string ) => {
            let step_no = _.split( event, '.' );
            this.step_no = step_no[1];
        }

        wizardTab = ( route_name : string) => {
            if(this.$state.params.isNew == 1 && !this.AddListingService.listing.id){
                this.toaster.pop({
                    type: 'error',
                    title: 'CLICK_ADD_LISTING',
                    body: 'ADD_LISTING_FIRST',
                    showCloseButton: true
                });
            } else {
                 if(this.AddListingService.isUnsaved){
                // save go to route
                this.AddListingService.afterSaveRoute = route_name;
                // notify controller
                this.notify.notify(STEPS.UNSAVED_REDIRECT);
                } else {
                    let params : any = {
                        listing_id : this.AddListingService.listing.id
                    };

                    if(this.$state.params.isNew)
                        params.isNew = this.$state.params.isNew;

                    this.$state.go( route_name, params );
                }
            }
           
        }

        changesDetected = () => {
            this.AddListingService.isUnsaved = true;
        }

        savedOrDiscardDetected = () => {
            this.AddListingService.isUnsaved = false;
        }

        
    }

    storageModule.controller( 'AddListingController', AddListingController );
}
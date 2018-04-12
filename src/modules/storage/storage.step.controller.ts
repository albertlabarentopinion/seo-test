module App.Modules.Storage.AddListing {
    
    import BaseController = App.Base.BaseController;
    import IListingType = App.Repositories.ListingType;
    import IApiResponse = App.Interfaces.IApiResponse;
    import IListing = App.Repositories.Listing;
    

    export class StepController extends BaseController {

        $scope : ng.IScope;

        $rootScope : ng.IRootScopeService;

        AddListingService : AddListingService;

        $state : any;

        $stateParams : any;

        listing : IListing.ListingResponse;

        Notifications : App.Base.EventDispatcher;

        $q : any;

        $window : any;

        $uibModal : any;

        step_no : string;

        step_no_number : number;

        max_step_no : string | number = 4;

        listing_id : string;

        isEdit : boolean = false;

        isDirty : boolean = false;

        original_listing : IListing.ListingResponse;

        isNewListing : boolean = false;

        modalInstances : {
            acceptTermsModal? : any
        } = {};

        accepted : any = false;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            AddListingService : AddListingService,
            $state : any,
            $stateParams : any,
            notify : App.Base.EventDispatcher,
            step_no : string,
            $q : any,
            $window : any,
            $uibModal : any
        ){
            super( $scope, $rootScope );
            this.AddListingService = AddListingService;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.step_no = step_no;
            this.step_no_number = parseInt(_.replace(this.step_no, 'STEP', ''));
            this.Notifications = notify;
            this.Notifications.notify( `STEPS.${step_no}` );
            this.$q = $q;
            this.$window = $window;
            this.$uibModal = $uibModal;
            this.defineListeners();
            this.$window.scrollTo(0, 0);
        }

        baseInit = () => {
            if( _.has( this.$stateParams, 'listing_id' ) ){
                this.isEdit = true;
                this.listing_id = this.$stateParams.listing_id;
                if(this.AddListingService.isNewListing && this.step_no_number > 1){
                    this.AddListingService.isNewListing = true;
                    this.isNewListing = this.AddListingService.isNewListing;
                }
                this.Notifications.notify( CONTROLLER.LISTING_FORM_IS_LOADING );
                return this.AddListingService.getListing( this.$stateParams.listing_id ).then( this._handleListing.bind( this ) );
            }  else {
                this.AddListingService.isNewListing = true;
                this.isNewListing = this.AddListingService.isNewListing;
                this.AddListingService.listing = {};
                return this.AddListingService.onReady;
            }
        }

        defineListeners = () => {
            this.$scope.$watchCollection('add_listing_form', ( newValue : any, oldValue : any ) => {
                if(newValue){
                    this.isDirty = this.$scope['add_listing_form'].$dirty;
                    if(this.isDirty) {
                        this.Notifications.notify( 'STEPS.UNSAVED' ); 
                    }
                }
            });
        }
        

        disgard = () => {
            this.refreshFormPrestine();
            this.listing = angular.copy(this.original_listing);
            if(_.isEmpty(this.listing.google_address)) {
                this.$scope['selected_address'] = null;
            } else {
                this.$scope['selected_address'] = this.listing.google_address;
            }
        }

        refreshFormPrestine = ( listing : IListing.ListingResponse = null ) => {
            this.$scope['add_listing_form'].$setPristine();
            this.Notifications.notify( 'STEPS.SAVED_OR_DISCARD' ); 
            if(listing) this.original_listing = angular.copy(listing);
        }

        private _handleListing = ( listing : IListing.ListingResponse ) => {
            console.log(listing);
            this.original_listing = angular.copy(listing);
            this.listing = listing;
        }

        stopLoading = () => {
            this.Notifications.notify( CONTROLLER.LISTING_FORM_IS_DONE );
        }

        startLoading = () => {
            this.Notifications.notify( CONTROLLER.LISTING_FORM_IS_LOADING );
        }

        confirmOnSave = () : any => {
            return this.$q(( resolve : any, reject : any ) => {
                swal({
                    title: 'Save changes?' ,
                    showCancelButton: true,
                    confirmButtonColor: "#1D84C6",
                    confirmButtonText: 'Save',
                    cancelButtonText: "Discard",
                    closeOnConfirm: false,
                    showLoaderOnConfirm : true,
                    closeOnCancel: true },
                    (isConfirm : boolean) => {
                        if (isConfirm) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                });
            });
            
        }

        navigateTo = ( listing : IListing.ListingResponse, route_name : string ) => {
            this.$state.go( route_name, { listing_id : listing.id, isNew : this.$stateParams.isNew } );
            // this.$window.scrollTo(0, 0);
        }

        showAcceptTerms = (accepted = 0) => {
            let _self = this,
                deffered = this.$q.defer();

            if(this.$state.params.isNew == 1){
                deffered.resolve('new storage');
                return deffered.promise;
            }
            
            this.modalInstances.acceptTermsModal = this.$uibModal.open({
                templateUrl : `${this.$rootScope['modulesTemplateUrl']}storage/templates/modals/accept_terms.modal.html`,
                controller : function(){
                    this.accepted = accepted;
                    this.cancel = () => {
                        _self.AddListingService.acceptTerms(0);
                        _self.accepted = 0;
                        _self.modalInstances.acceptTermsModal.close('cancel');
                    }

                    this.continue = (accepted : any) => {
                        _self.AddListingService.acceptTerms(accepted);
                        _self.accepted = accepted;
                        _self.modalInstances.acceptTermsModal.close('continue');
                    }
                },
                controllerAs : 'ctrl'
            });

            return this.modalInstances.acceptTermsModal.result;
        }
    }
}
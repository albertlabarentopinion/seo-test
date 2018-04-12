
module App.Modules.Storage.AddListing {
    
    import BaseController = App.Base.BaseController;
    import IListingType = App.Repositories.ListingType;
    import IApiResponse = App.Interfaces.IApiResponse;
    import IListing = App.Repositories.Listing;

    class Step4Controller extends StepController 
    {
        static $inject = [ '$scope', '$rootScope', 'AddListingService', '$state', '$stateParams', 'Notifications', '$q', '$window', 'AppConstants', 'PayoutService', '$uibModal' ];

        listing : IListing.ListingResponse;

        isSpecial : boolean = false;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            AddListingService : AddListingService,
            $state : any,
            $stateParams : any,
            notify : App.Base.EventDispatcher,
            $q : any,
            $window : any,
            private AppConstants : App.Main.MainConstants,
            private PayoutService : App.Modules.Payout.PayoutService,
            $uibModal : any
        ){
            super( $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP4', $q, $window, $uibModal );
            this.init();
            this.defineListeners();
        }

        init = () => {
            this.baseInit().then( () => {
                this.stopLoading();
            });
            this.isSpecial = this.$stateParams.isSpecial;
        }

        defineListeners = () => {
            this.$scope.$on( '$destroy', this.destroy.bind(this) );
            this.Notifications.addEventListener( 'STEPS.UNSAVED_REDIRECT', this.unsavedRedirect.bind( this ) );
        }

        destroy = () => {
            this.Notifications.removeEventListener( 'STEPS.UNSAVED_REDIRECT', this.unsavedRedirect.bind( this ) );
        }

        unsavedRedirect = () => {
            this.save(this.listing).then(() => {
                this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                swal.close();
                if(!this.accepted)
                    this.errorBags = ['KINDLY_ACCEPT_RENTAL_REQUEST'];

                if(!this.errorBags.length)
                    this.navigateTo(this.listing, this.AddListingService.afterSaveRoute);
            });
            // this.confirmOnSave().then((isConfirm : boolean) => {
            //     if(isConfirm){
            //         return this.save(this.listing).then(() => {
            //             this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
            //             swal.close();
            //             this.navigateTo(this.listing, this.AddListingService.afterSaveRoute);
            //         });
            //     }else {
            //         this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
            //         this.navigateTo(this.listing, this.AddListingService.afterSaveRoute);
            //     }
            // });
        }

        save = ( listing : IListing.ListingResponse, route_name? : string, isNext : boolean = false, external_account? : string ) => {
            this.startLoading();

                return this.showAcceptTerms(this.accepted).then((resp1) => {
                    listing = angular.copy(listing);

                    if(resp1 == 'cancel'){
                        listing = angular.copy(this.original_listing);
                        this.stopLoading();
                    }

                    let params : IListing.ListingResponse = {
                        price_per_month : listing.price_per_month,
                        no_restrictions_rental_period : listing.no_restrictions_rental_period,
                        id : listing.id,
                        isDone : true
                    };
                    params['step_no'] = this.step_no;
                    return this.AddListingService.save(params).then( ( resp : IListing.ListingResponse ) => {
                        if(this.accepted) {
                            this.AddListingService.acceptTerms(this.accepted);
                        }
                        // add bank account
                        // if( _.isEmpty(this.$rootScope['user'].bank_account) && !this.listing.isSpecial && resp1 !== 'cancel'){
                        //     if( !external_account){
                        //         this.errorBags = ['ACCOUNT_NUMBER_REQUIRED'];
                        //         this.stopLoading();
                        //     }
                        //     else {
                        //         this.PayoutService.addBankAccount( external_account, this.$rootScope['user'].id ).then(() => {
                        //             this.errorBags = [];
                        //             this.stopLoading();
                        //         });
                        //     }
                        // } else {
                        //     this.stopLoading();
                        // }
                        this.stopLoading();
                        if(route_name){
                            this.navigateTo(listing, route_name);
                        }else{
                            this.refreshFormPrestine(listing);
                        }
                    }, (error : any) => {
                        this._handleOnError(error);
                        this.stopLoading();
                    } );   
                }, () => {
                    this.stopLoading();
                });
                
               
        }

        navigateToView = ( ) => {
            if( this.isDirty ){
                this.confirmOnSave().then((isConfirm : boolean) => {
                    if(isConfirm){
                        return this.save(this.listing).then(() => {
                            this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                            swal.close();
                            this.proceed();
                        });
                    }else {
                        this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                        this.proceed();
                    }
                });
            }
        }

        proceed = () => {
            this.AddListingService.listing = {};
            if( this.listing.isSpecial ){
                this.$state.go('main.admin.special_listing');
            }
            else{
                this.$state.go('main.storage_view', {
                    id : this.listing.id,
                    dateFrom : moment().format(this.AppConstants.dateFormat)
                });
            }
               
        }

    }

    storageModule.controller( 'Step4Controller', Step4Controller );
}
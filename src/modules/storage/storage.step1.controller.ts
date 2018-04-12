
module App.Modules.Storage.AddListing {
    
    import BaseController = App.Base.BaseController;
    import IListingType = App.Repositories.ListingType;
    import IApiResponse = App.Interfaces.IApiResponse;
    import IListing = App.Repositories.Listing;

    class Step1Controller extends StepController
    {
        static $inject = [ '$scope', '$rootScope', 'AddListingService', '$state', '$stateParams', 'Notifications', '$window', '$q', '$uibModal', 'SpecialAccountService', 'AuthService' ];

        listing_types : Array<IListingType.ListingTypeResponse>;

        users : App.Repositories.User.UserResponse = [];

        selected_listing_types : any = {};

        selected_accessibility : any = {};

        isSpecial : any = false;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            AddListingService : AddListingService,
            $state : any,
            $stateParams : any,
            notify : App.Base.EventDispatcher,
            $window : any,
            $q : any,
            $uibModal : any,
            private SpecialAccountService : App.Modules.SpecialAccount.SpecialAccountService,
            private AuthService : App.Services.AuthService
        ){
            super( $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP1', $q, $window, $uibModal );
            this.listing = {
                access : 'After appointment',
                own_shared : 'Shared with others',
                types : {},
                size_length : 0,
                size_width : 0
            };
            this.isSpecial = this.$stateParams.isSpecial == 1;
            this.init();
            this.defineListeners();
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
                this.navigateTo(this.listing, this.AddListingService.afterSaveRoute);
            })
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

        init = () => {
            this.startLoading();
            
            this.baseInit().then(() => {
                this.AddListingService.onReady.then( () => {
                    if( this.AuthService.isAdmin() && this.isSpecial == 1 ){
                        console.log(this.AuthService.isAdmin());
                        this.SpecialAccountService.getSpecialUsers().then((users : App.Repositories.User.UserResponse[]) => {
                            console.log(users);
                            this.users = users;
                            this.reset();
                            this.stopLoading();
                        });
                    } else {
                        this.reset();
                        this.stopLoading();
                    }
                });
                // if( _.isEmpty(this.AddListingService.getListingTypes()) ) {
                //     this.AddListingService.onReady.then( () => {
                //         this.reset();
                //         this.stopLoading();
                //     });
                // } else {
                //     this.reset();
                //     this.stopLoading();
                // }
            });
        }

        reset = () => {
            this.listing_types = _.chunk(this.AddListingService.getListingTypes(), 4);
            this.listing = _.extend(this.listing, this.AddListingService.listing );

            if(this.isSpecial == 1){
                if( this.listing.user ){
                    this.listing.user = _.find(this.users, {id : this.listing.user.id});
                }else{
                    this.listing.user = this.users[0];    
                }
            }
                

        }

        next = ( listing : IListing.ListingResponse ) => {
            this.$state.go( 'main.account.storage.add_listing.step2', { listing_id : listing.id, isNew : this.$stateParams.isNew, isSpecial : this.$stateParams.isSpecial } );
            // this.$window.scrollTo(0, 0);
        }

        save = ( listing : IListing.ListingResponse, asNew : boolean = false ) => {
            this.startLoading();     
            return this.showAcceptTerms().then((resp : any) => {
                listing = angular.copy(listing);

                if(resp == 'cancel'){
                    listing = angular.copy(this.original_listing);
                    this.stopLoading();
                }

                let listing_copy = angular.copy(listing);
                listing_copy.types = this.checkInputs( listing.types );
                listing_copy.accessibility = this.checkInputs( listing.accessibility );
                
                if( _.has( listing_copy, 'other_listing' ) ){
                    if( !_.isEmpty( listing_copy.other_listing ) ) {
                        let types = _.intersection( listing_copy.types, _.map( _.flatten(this.listing_types), 'type' ) );
                        types.push( listing_copy.other_listing );
                        listing_copy.types = types;
                    }
                }
                
                listing_copy['step_no'] = this.step_no;
                listing_copy['accept_terms'] = this.accepted;
                listing_copy['isSpecial'] = listing_copy.isSpecial == 1 ? listing_copy.isSpecial : this.$stateParams.isSpecial;
                
                return this.AddListingService.step1( listing_copy ).then( ( saved_listing : IListing.ListingResponse ) => {
                    this.stopLoading();
                    this.refreshFormPrestine(listing);
                    if( asNew ){
                        this.next(saved_listing);
                    }
                }, this._handleOnError.bind( this ) );
            }, (resp) => {
                this.listing = this.original_listing;
                this.stopLoading();
            });
        }
    }

    storageModule.controller( 'Step1Controller', Step1Controller );
}

module App.Modules.Storage.AddListing {
    
    import BaseController = App.Base.BaseController;
    import IListingType = App.Repositories.ListingType;
    import IApiResponse = App.Interfaces.IApiResponse;
    import IListing = App.Repositories.Listing;

    class Step3Controller extends StepController 
    {
        static $inject = [ '$scope', '$rootScope', 'AddListingService', '$state', '$stateParams', 'Notifications', 'AppConstants', '$window', '$q', '$uibModal' ];

        listing : IListing.ListingResponse;

        uploadOptions : any = {

        }

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            AddListingService : AddListingService,
            $state : any,
            $stateParams : any,
            notify : App.Base.EventDispatcher,
            private AppConstants : App.Main.MainConstants,
            $window : any,
            $q : any,
            $uibModal : any
        ){
            super( $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP3', $q, $window, $uibModal );
            this.init();
            this.defineListeners();
        }

        init = () => {
            this.baseInit().then( () => {
                this.uploadOptions  = this.uploadConfigs();
                this.stopLoading();
            });
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

        save = ( listing : IListing.ListingResponse, route_name? : string ) => {
            this.startLoading();
            return this.showAcceptTerms().then((resp) => {
                listing = angular.copy(listing);

                if(resp == 'cancel'){
                    listing = angular.copy(this.original_listing);
                    this.stopLoading();
                }

                let params : IListing.ListingResponse = {
                    accessories : this.checkInputs( listing.accessories ),
                    heading : listing.heading,
                    description : listing.description,
                    id : this.listing.id
                };
                params['step_no'] = this.step_no;
                params['accept_terms'] = this.accepted;
                return this.AddListingService.save(params).then( ( resp : IListing.ListingResponse ) => {
                    this.stopLoading();
                    if(route_name){
                        this.navigateTo(listing, route_name);
                    } else {
                        this.refreshFormPrestine(listing);
                    }
                }, this._handleOnError.bind( this ) );
            }, () => {
                this.stopLoading();
            });
        }

        uploadConfigs = () => {
            let AddListingService = this.AddListingService,
                listing_id = this.listing_id;
            let _self = this;
            return {
                options : {
                    url : this.AddListingService.uploadUrl,
                    paramName : 'photo',
                    maxFilesize : '10',
                    acceptedFiles : 'image/jpeg, images/jpg, image/png',
                    addRemoveLinks : true,
                    params : { listing_id : this.listing.id },
                    timeout : 100000
                },
                callbacks :  {
                    addedfile : function(file){
                        console.log(file, _self.$scope['newFile']);
                    },
                    success : (file : any, xhr : any) => {
                       this.AddListingService.getListing( this.listing.id ).then( () => {
                         this.listing['photos'] = this.AddListingService.listing['photos'];
                       });
                    }, 
                    error : (file : any, xhr : any) => {
                       this.AddListingService.getListing( this.listing.id ).then( () => {
                         this.listing['photos'] = this.AddListingService.listing['photos'];
                       });
                    }
                }
            }
        }

        deleteImage = ( listing_photo : any, index : number ) => {
            swal({
                    title : 'Delete Image?',
                    text : 'You will not be able to retrieve this photo.',
                    type : 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel pls!",
                    closeOnConfirm: false,
                    showLoaderOnConfirm : true,
                    closeOnCancel: false
                },
                    (isConfirm : boolean) => {
                        if(isConfirm) {
                            this.AddListingService.deleteImage( listing_photo.id ).then(() => {
                                this.listing.photos.splice( index, 1 );
                                swal("Deleted!", "Your listing photo has been deleted", "success");
                            });
                        } else {
                            swal("Cancelled", "Cancelled deletion", "error");
                        }
                    }
            );
        }
    }

    storageModule.controller( 'Step3Controller', Step3Controller );
}
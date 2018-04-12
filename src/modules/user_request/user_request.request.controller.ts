module App.Modules.UserRequest {

    import BaseController = App.Base.BaseController;
    
    class UserRequestRequestController extends BaseController 
    {
        static $inject = [ 
            '$scope', 
            '$rootScope', 
            '$stateParams', 
            'UserRequestService', 
            'AppConstants', 
            'HelpersService', 
            'Listing', 
            '$uibModal', 
            'UserRequestConstants',
            '$q',
            '$filter',
            '$timeout',
            '$state',
            'Notifications',
            'MainService',
            'PayoutService',
            'PaymentService',
            'RatingConstants',
            '$window',
            'toaster',
            'PaymentConstants',
            'PayoutConstants',
            'AuthService'
     ];

        request : App.Repositories.Request.RequestResponse;

        specialOfferModalInstance : any;

        noPayoutModalInstance : any;

        addRatingModalInstance : any;

        message : string;

        isDeactivated : boolean;

        dateFormat : any;
        
        savingFromDate : boolean = false;

        changeDateErrorBags : string[] = [];

        makePaymentModalInstance : any;

        noCardModalInstance : any;

        card : App.Repositories.Card.CardResponse = {};

        requestControls : any[] = [];

        account : any;

        bankAccountModal : any;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $stateParams : any,
            private UserRequestService : UserRequestService,
            private AppConstants : App.Main.MainConstants,
            private HelpersService : App.Services.Helpers.HelpersService,
            private Listing : App.Repositories.Listing.ListingRepository,
            private $uibModal : any,
            private UserRequestConstants : App.Interfaces.Constants.ModuleConstants,
            private $q : any,
            private $filter : any,
            private $timeout : any,
            private $state : any,
            private Notifications : App.Base.EventDispatcher,
            private MainService : App.Modules.Main.MainService,
            private PayoutService : App.Modules.Payout.PayoutService,
            private PaymentService : App.Modules.Payment.PaymentService,
            private RatingConstants : App.Interfaces.Constants.ModuleConstants,
            private $window : any,
            private toaster : any,
            private PaymentConstants : App.Interfaces.Constants.ModuleConstants,
            private PayoutConstants : App.Interfaces.Constants.ModuleConstants,
            private AuthService : App.Services.AuthService
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.loading();
            this.dateFormat = this.AppConstants.dateFormat;
            this.$q.all([
                this.UserRequestService.getRequestById(this.$stateParams.id).then(this.setRequest.bind(this), this.handleRequestError.bind(this) ),
                this.PaymentService.getCard( this.$rootScope['user'].id ).then((card : App.Repositories.Card.CardResponse) => {
                    this.card = card;
                }),
                this.UserRequestService.getRequestControls().then(this.setRequestControls.bind(this)),
                this.PayoutService.getAccount( this.$rootScope['user'].id ).then( this.setAccount.bind(this) )
            ]).then(() => {
                this.ready();
                this.handle3DVerificationNotification();
            });
        }

        addAddUpdateAccount = () => {
            let _self = this;

            this.bankAccountModal = this.$uibModal.open({
                templateUrl : `${this.PayoutConstants.templateUrl}/add_account.modal.html`,
                controller : function($scope : any, account : any) {
                    this.errorBags = [];
                    this.templateUrl = _self.PayoutConstants.templateUrl;
                    this.account = _.isEmpty(angular.copy(account)) ? {} : angular.copy(account);
                    if(this.account.legal_entity){
                        this.account.legal_entity.additional_owners = _.isEmpty(this.account.legal_entity.additional_owners) ? {} : this.account.legal_entity.additional_owners[0];
                    } else {
                        this.account.legal_entity = {};
                    }
                    
                    this.external_account = '';
                    this.user = angular.copy(_self.$rootScope['user']);
                    this.account.legal_entity.first_name = this.user.firstname;
                    this.account.legal_entity.last_name = this.user.lastname;

                    if(!_.isEmpty(_self.$rootScope['user'].bank_account)){
                        this.external_account = _self.$rootScope['user'].bank_account;
                    }

                    this.createAccount = ( bank_account : string ) => {
                       this.account.external_account = this.external_account;
                       if(this.account.legal_entity.type == 'company' ){
                            account.legal_entity.business_tax_id = this.external_account;
                            this.account.legal_entity.business_tax_id = this.external_account;
                        }   
                        return _self.createUpdateAccount(this.account).then(() => {
                            this.cancel();
                            _self.init();
                        }, ( error : any ) => {
                            this.errorBags = _self.errorTranslate(error);
                        });
                    }

                    this.cancel = () => {
                        _self.bankAccountModal.close('dismiss');
                    }
                },
                controllerAs : 'ctrl',
                resolve :  {
                    account : () => {
                        return this.account;
                    }
                }
            });
        }

        setAccount = ( account : any ) => {
            this.account = account;
        }

        createUpdateAccount = ( account : any ) => {
            account.user_id = this.$rootScope['user'].id;
            return this.PayoutService.createAccount(account).then( this.setUser.bind(this) );
        }

        setUser = ( user : App.Repositories.User.UserResponse ) => {
            this.AuthService.setUserFields({
                bank_account : user.bank_account, 
                firstname : user.firstname, 
                lastname : user.lastname,
                zip : user.zip,
                street : user.street,
                city : user.city
            });
        }

        private handle3DVerificationNotification = () => {
            console.log(this.$stateParams);
            if(!_.isUndefined(this.$stateParams.three_d_verification_status)){
                if(this.$stateParams.three_d_verification_status == 0){
                    this.toaster.pop({
                        type: 'error',
                        title: '3D Secure Validation',
                        body: this.$filter('translate')('3D_SECURE_VALIDATION_FAILS'),
                        showCloseButton: true,
                        timeout: 5000
                    });
                }  
            }
        }

        private handleRequestError = ( error : any ) => {
            if( _.has(error.data, 'message') ) 
                if(error.data.message == 'DEACTIVATED_BY_ADMIN')
                    this.isDeactivated = true;
        }

        setRequestControls = ( requestControls : any ) => {
            this.requestControls = requestControls;
        }

        setRequest = ( request : App.Repositories.Request.RequestResponse ) => {
            
            this.request = this.UserRequestService.transform(request, this.$rootScope['user']);

            // seen notifications
            this.seenRequestNotification();
            
            if( this.$rootScope['user'].id == this.request.owner_id ){
                this.request['user'] = this.request.client;
            } else {
                this.request['user'] = this.request.owner;
            }

            this.request.owner.created_at = moment(this.HelpersService.tzDateTime(this.request.owner.created_at), this.AppConstants.dateTimeFormat).format(this.AppConstants.dateFormat);
            this.request.listing = this.Listing.transform(this.request.listing);
            this.request.listing.photos = _.map(this.request.listing.photos, ( photo : any ) => {
                photo.path = `${this.$rootScope['baseUrl']}/${photo.path}`;
                return photo;
            });
            if( _.isEmpty(this.request.listing.photos) ){
                this.request.listing.photos = [];
                this.request.listing.photos.push({
                    path : `${this.$rootScope['resource_path']}/no_image_thumb.gif`
                });
            }

            this.$timeout(() => {
                this.$scope.$apply(() => {
                    if(this.request.from_date !== 'Invalid date')
                        this.$scope['fromDate'] =  moment(this.request.from_date, this.AppConstants.dateFormat).format();
                    else 
                        this.$scope['fromDate'] = null;
                });
            });

            this.request.logs = _.orderBy(this.request.logs, 'created_at', 'desc');
        }

        controlRequest = ( status : string, confirmation_text : string ) => {
            if( status == 'special_offer' ){
                return this.openSpecialOfferModal();
            } else if( status == 'make_payment' ) {
                return this.makePayment();
            } else if( status == 'add_rating' ) {
                return this.openAddRating();
            }

            let confirmationModal = () => {
                return this.confirmationModal(confirmation_text).then((isConfirmed : boolean) => {
                    if(isConfirmed){   
                        this.changeStatus(status).then(this.reload.bind(this)).then(
                            this._handleSuccess.bind(this), 
                            this._handleOnError.bind(this))
                            .finally(() => {
                                swal.close()
                            });
                    } else {
                        swal.close();
                    }
                });
            }

            if( status == 'approved' ){
                let hasBankAccount = !_.isEmpty(this.$rootScope['user'].bank_account);
                if( !hasBankAccount  ){
                    // this.noAccountPrompt('bank_account');
                    this.addAddUpdateAccount();
                    return; 
                }
                return this.PayoutService.getAccount( this.$rootScope['user'].id ).then((account : any) => {
                    if(this.account.payouts_enabled){
                        return confirmationModal();
                    } else {
                        this.noAccountPrompt('unverified');
                        return; 
                    }
                });
            } else {
                return confirmationModal();
            }
        }

        openAddRating = () => {
            let _self = this;
            this.addRatingModalInstance = this.$uibModal.open({
                templateUrl : `${this.RatingConstants.templateUrl}add_rating.modal.html`,
                controller : 'RatingAddController',  
                controllerAs : 'addRatingCtrl',
                resolve : {
                    request : () => {
                        return this.request;
                    },
                    forMultiple : () => {
                        return false;
                    }
                }
            });
        }

        openSpecialOfferModal = () => {
            let _self = this;
            this.specialOfferModalInstance = this.$uibModal.open({
                templateUrl : `${this.UserRequestConstants.templateUrl}special_offer.modal.html`,
                size : 'md',
                controller : function(){
                    this.errorBags = [];
                    this.ok = (price_per_month : any) => {
                        return _self.changeStatus('special_offer', {price_per_month : price_per_month}).then(_self.init.bind(this)).then(() => {
                            this.cancel();
                        }, (error : any) => {
                            this.errorBags = _self.errorTranslate(error);
                        });
                    }
                    this.cancel = () => {
                        _self.specialOfferModalInstance.dismiss('cancel');
                    }
                },
                controllerAs : 'ctrl',
                windowClass: "animated fadeInY"
            });
        }

        confirmationModal = (confirmation_text : string) => {
            return this.$q(( resolve : any, reject : any ) => {
                swal({
                    title: `${this.$filter('translate')(confirmation_text)}?` ,
                    showCancelButton: true,
                    confirmButtonColor: "#1D84C6",
                    confirmButtonText: `${this.$filter('translate')(confirmation_text)}`,
                    cancelButtonText: `${this.$filter('translate')('CANCEL_BTN')}`,
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

        changeStatus = (status : string, params : any = {}) => {
            return this.UserRequestService.changeRequestStatus(this.$rootScope['user'].id, status, this.request.id, params);
        }

        noAccountPrompt = ( verification_type : string) => {
            let _self = this;
            this.noPayoutModalInstance = this.$uibModal.open({
                templateUrl : `${this.UserRequestConstants.templateUrl}no_payout.modal.html`,
                size : 'md',
                controller : function() {
                    this.verification_type = verification_type;
                    this.cancel = () => {
                        _self.noPayoutModalInstance.dismiss('cancel');
                    }

                    this.gotoPayout = () => {
                        this.cancel();
                        _self.$state.go('main.account.payout');
                    }
                },
                controllerAs : 'ctrl'
            });
        }

        sendMessage = ( message : string ) => {
            return this.UserRequestService.sendMessage( message, this.request.id ).then(() => {
                this.message = null;
                this.init();
            });
        }

        sendOnEnter = () => {
            this.$timeout(() => {
                angular.element('#chatsend').trigger('click');
            }, 100);
        }

        reload = () => {
            this.$state.go('main.account.user_request.request', { id : this.request.id, three_d_verification_status : undefined, source_id : undefined }, { reload : true });
        }

        seenRequestNotification = () => {
            if(this.MainService.getRequestNotifications(this.$rootScope['user'].id, this.request.id).length > 0)
            {
                this.MainService.seenRequestNotification(this.$rootScope['user'].id, this.request.id).then(() => {
                    this.Notifications.notify( NOTIFICATIONS.REQUEST_NOTIFICATION_SEEN );
                });
            }
        }

        makePayment = () => {
            this.openModalMakePayment();
            // if(_.isEmpty( this.card )){
            //     this.openModalNoCard();
            // } else{
            //     this.openModalMakePayment();
            // }
        }

        openModalNoCard = () => {
            let _self = this;
            
            this.noCardModalInstance = this.$uibModal.open({
                templateUrl : `${this.PaymentConstants.templateUrl}/add_card.modal.html`,
                controller : 'AddCardController',
                controllerAs : 'ctrl'
            });
        }

        openModalMakePayment = () => {
            let _self = this;
            this.makePaymentModalInstance = this.$uibModal.open({
                templateUrl : `${this.UserRequestConstants.templateUrl}make_payment.modal.html`,
                controller : function(){
                    this.card = _.clone(_self.card);
                    this.card = _.isEmpty(this.card) ? {} : this.card;
                    this.request  = angular.copy(_self.request); 
                    this.hasCard = !_.isEmpty(_self.card);
                    this.errorBags = _self.errorBags;

                    if(this.hasCard){
                        this.card.last4 = '**** **** **** '+this.card.last4;
                    }
                    
                    let source_id = _.has(_self.$stateParams, 'source_id') 
                                    ? _self.$stateParams.three_d_verification_status == 1 ? _self.$stateParams.source_id : null
                                    : null;

                    this.cancel = () => {
                        _self.makePaymentModalInstance.dismiss('cancel');
                    }

                    this.addCard = () => {
                        if(!_.has(this.card, 'id')){
                            this.card.user_id = _self.$rootScope['user'].id;
                            console.log(this.card);
                            return _self.PaymentService.createCard(this.card).then((new_card : any) => {
                                this.card = new_card;
                                this.card.last4 = '**** **** **** '+this.card.last4;
                                _self.card = this.card;
                                this.hasCard = true;
                            }, (error : any) => {
                                this.errorBags = _self.errorTranslate(error);
                            });
                        }
                    }

                    this.makePayment = () => {
                        if(_.has(this.card, 'id')){
                            return _self.UserRequestService.makePayment( this.request.id ).then((response : any) => {
                                if( _.has(response, 'is_three_d_secure') ){
                                    if(response.is_three_d_secure ){
                                        if(_.has(response, 'redirect')){
                                            _self.$window.location.href = response.redirect;
                                        } 
                                    }
                                } else {
                                    this.cancel();
                                    _self.reload();
                                }
                               
                            }, (error  : any) => {
                                this.errorBags = _self.errorTranslate(error);
                            });
                        }
                        
                    }
                },
                controllerAs : 'ctrl'
            });
        }

        setDateFrom = ( dateFrom : string, value : any) => {
            if(value) {
                this.$scope['fromDate'] = value.format();
                this.savingFromDate = true;
                this.UserRequestService.changeFromDate(
                    this.HelpersService.tzDateTimeStored(this.$scope['fromDate']),
                    this.request.id
                ).then(() => {
                    // after changing date
                    this.savingFromDate = false;
                    this.changeDateErrorBags = [];
                }, (error : any) => {
                    this.changeDateErrorBags = this.errorTranslate(error);
                    this.savingFromDate = false;
                });
            } else {
                this.$scope['fromDate'] = null;
            }
        }
    }

    userRequestModule.controller( 'UserRequestRequestController', UserRequestRequestController );
}
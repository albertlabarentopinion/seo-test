
module App.Modules.Main {
    
    import BaseController = App.Base.BaseController;
    import UserResponse = App.Repositories.User.UserResponse;
    import IApiResponse = App.Interfaces.IApiResponse;

    class MainController extends BaseController 
    {
        static $inject = [ 
            '$scope', 
            '$rootScope', 
            '$state', 
            'AppConstants', 
            '$translate', 
            'TranslationService', 
            'Notifications', 
            'toaster', 
            'AuthService', 
            'MainService', 
            '$uibModal', 
            'LoginService',
            'Cms',
            '$stateParams',
            '$filter'
        ];

        user : UserResponse = {};

        private loginSocialTpl : string;

        notifications : Array<App.Repositories.RequestLog.RequestLogResponse> = [];

        notification_messages : any = {
            'NOTIFY.REGISTERED' : [ 'success', 'REGISTERED_TITLE', 'REGISTERED' ],
            'NOTIFY.ERROR_SOCIAL_LOGIN' : [ 'error', 'UNABLE_LOGIN', 'MEMBER_NOT_ACTIVE' ],
            'NOTIFY.FORGOT_PASSWORD' : [ 'success', 'FORGOT_PASSWORD_SENT_TITLE', 'FORGOT_PASSWORD_SENT' ],
            'NOTIFY.RESET_PASSWORD' : [ 'success', 'RESET_PASSWORD_SUCCESS_TITLE', 'RESET_PASSWORD_SUCCESS' ]
        }

        tokenErrorLoginModal : any;

        pages : App.Repositories.Cms.CmsResponse[] = [];

        footerItems : App.Repositories.Cms.CmsResponse[] = [];

        cmsPage : string;

        mainSeoPlaces : string[] = [];

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $state : any,
            private AppConstants : App.Main.MainConstants,
            private $translate : any,
            private TranslationService : App.Services.TranslationService,
            private Notifications : App.Base.EventDispatcher,
            private toaster : any,
            private AuthService : App.Services.AuthService,
            private MainService : MainService,
            private $uibModal : any,
            private LoginService : App.Modules.Login.Service,
            private Cms : App.Repositories.Cms.CmsRepository,
            private $stateParams : any,
            private $filter : any
        ){
            super( $scope, $rootScope );    
            this.mainSeoPlaces = _.chunk(this.AppConstants.mainSeoPlaces, 10);
            this.init();
            this.defineListeners();
            this.defineScope();
        }

        init = () => {
            this.TranslationService.setSavedLocale();
            this.getNotifications();
            this.getPages();
        }

        changeLanguage = ( locale : string ) => {
            this.$translate.use( locale );
            this.$rootScope['pageTitle'] = this.$filter('translate')(this.$state.current.data.pageTitle);
            this.TranslationService.saveLocale( locale );
        }

        userUpdate = () => {
            
        }

        navigateToCmsPage = ( name : string ) => {
            this.$state.go('main.cms_page', { name : name });
            this.cmsPage = name;
            console.log(this.$state);
        }

        defineListeners = () => {
            this.$scope.$on( '$destroy', this.destroy.bind(this) );
            this.Notifications.addEventListener( 'NOTIFY.REGISTERED', this.handleNotification.bind( this ) );
            this.Notifications.addEventListener( 'NOTIFY.ERROR_SOCIAL_LOGIN', this.handleNotification.bind( this ) );
            this.Notifications.addEventListener( 'NOTIFY.FORGOT_PASSWORD', this.handleNotification.bind( this ) );
            this.Notifications.addEventListener( 'NOTIFY.RESET_PASSWORD', this.handleNotification.bind( this ) );
            this.Notifications.addEventListener( 'NOTIFY.ADMIN_AS_USER', this.handleNotification.bind( this ) );
            this.Notifications.addEventListener( 'NOTIFICATIONS.REQUEST_NOTIFICATION_SEEN', this.refreshNotifications.bind( this ) );
            this.Notifications.addEventListener( 'NOTIFICATIONS.REQUEST_NOTIFICATION_UNSEEN', this.refreshNotifications.bind( this ) );
            this.Notifications.addEventListener( 'ERROR.TOKEN_EXPIRED', this.tokenExpiredNotification.bind( this ) );
            this.Notifications.addEventListener( 'NOTIFY.UPLOAD_PROFILE', this.uploadProfileImage.bind( this ) );
        }

        defineScope = () => {
            this.$scope.mainCtrl = this;
        }

        private handleNotification = ( notification : any ) => {
            let data = this.notification_messages[notification];
            this.toaster.pop({
                type: data[0],
                title: data[1],
                body: data[2],
                showCloseButton: true
            });
            this.$state.go( App.Config.Acl.redirects.guest );
        }

        logout = () => {
            this.AuthService.logout();
            this.$state.go( App.Config.Acl.redirects.guest );
        }

        getPages = () => {
            this.Cms.getPages().then(( pages : App.Repositories.Cms.CmsResponse[] ) => {
                this.pages = _.filter(pages, (page : any) => {
                    return page.type == 'Page';
                });
                this.footerItems = _.filter(pages, (page : any) => {
                    return page.footerItems == 'FooterItem';
                });
            });
        }

        getNotifications = () => {
            this.$rootScope.$watch(
            () => { 
                return this.$rootScope['user']; 
            },
            () => {
                if( _.has(this.$rootScope, 'user') ){
                    if(_.has(this.$rootScope['user'], 'id'))
                        this.MainService.getNotifications( this.$rootScope['user'].id ).then(this.setNotifications.bind(this));
                }
            },true);
        }

        setNotifications = ( notifications : Array<App.Repositories.RequestLog.RequestLogResponse> = [] ) => {
            this.notifications = notifications;
        }

        refreshNotifications = () => {
            this.setNotifications( this.MainService.notifications );
        }

        tokenExpiredNotification = () => {
            let _self = this;
            this.AuthService.logout();
            this.AuthService.savePage(window.location.href);
            this.$uibModal.open({
                templateUrl : `${this.AppConstants.mainTemplateUrl}error.token_expired.modal.html`,
                size : 'md',
                controller : function($uibModalInstance : any, $scope : any){
                    $scope['loginUrlSocial'] = _self.LoginService.loginUrlSocial;

                    this.errorTokenExpiredClose = () => {
                        $uibModalInstance.close('dismiss');
                        _self.LoginService.redirectAuthenticated();
                    }

                    this.doLogin = ( email : string, password : string ) => {
                        return _self.LoginService.loginCustom( email, password )
                            .then( (  user : App.Interfaces.User.IUserAuthenticated ) => {
                                $uibModalInstance.close('dismiss');
                                // _self.$state.go(_self.$state.current, {}, {reload: true});
                            }, ( error : App.Interfaces.IApiResponse ) => {
                                _self.errorBags = _self.errorTranslate( error );
                            });
                    }
                },
                controllerAs : 'ctrl',
                windowClass: "animated fadeInY"
            });
        }

        uploadProfileImage = () => {
            this.$uibModal.open({
                templateUrl : `${this.AppConstants.mainTemplateUrl}upload_profile.modal.html`,
                controller : 'UploadProfileController',
                controllerAs : 'ctrl',
                size : 'sm'
            });
        }

        onClickListing = () => {
            // this.$state.go('main.account.user_request', {}, {reload : true});
            this.$state.reload();
        }

        destroy = () => {
            this.Notifications.removeEventListener( NOTIFY.REGISTERED, this.handleNotification.bind( this ) );
            this.Notifications.removeEventListener( NOTIFY.ERROR_SOCIAL_LOGIN, this.handleNotification.bind( this ) );
            this.Notifications.removeEventListener( NOTIFY.FORGOT_PASSWORD, this.handleNotification.bind( this ) );
            this.Notifications.removeEventListener( NOTIFY.RESET_PASSWORD, this.handleNotification.bind( this ) );
            this.Notifications.removeEventListener( NOTIFICATIONS.REQUEST_NOTIFICATION_SEEN, this.refreshNotifications.bind( this ) );
            this.Notifications.removeEventListener( NOTIFICATIONS.REQUEST_NOTIFICATION_UNSEEN, this.refreshNotifications.bind( this ) );
            this.Notifications.removeEventListener( ERROR.TOKEN_EXPIRED, this.tokenExpiredNotification.bind( this ) );
            this.Notifications.removeEventListener( NOTIFY.UPLOAD_PROFILE, this.uploadProfileImage.bind( this ) );
        }
    }

    angularModule.controller( 'MainController', MainController );

}
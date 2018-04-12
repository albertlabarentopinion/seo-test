/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces/IAppConstants.ts" />

let angularModule = angular.module(App.Config.Ng.module.name, App.Config.Ng.module.dependencies);

declare let jstz : any;
declare let unescape : any;
// declare let escape : any;
declare let namespace : any;
declare let toaster : any;
declare let swal : any;
declare let google : any;
declare let InfoBubble : any;
declare let InfoBox : any;
declare let moment : any;
declare let ga : any;

module App.Main {

    import AppConfig = App.Config;
    import Interfaces = App.Interfaces;
    import IConstants = Interfaces.Constants;

    export interface MainConstants extends IConstants.AppConstants {
        mainTemplateUrl? : string;
        guest_topnavbar? : string;
        user_topnavbar? : string;
        resource_path? : string;
        default_profile_picture? : string;
        dateFormat? : string;
        adminRole? : string;
        timeZone? : string;
        dateTimeFormat? : string;
        dateFormatStore? : string;
        dateTimeFormatStore? : string;
        footerTplUrl? : string;
        defaultLocale? : string;
        mainSeoPlaces? : string[];
        dateFormatV1? : string;
    }

    const AppConstants = (() : IConstants.AppConstants => {
        function makeApiUrl( appEnv : string, apiCons : any, protocol : any) : string {
            let apiObj =  apiCons[appEnv];
            return `${protocol}${apiObj.url}/${apiObj.version}`;
        }

        function makeBaseUrl(protocol : string, baseUrl : string) : string {
            return `${protocol}${baseUrl}`;
        }

        let cons : MainConstants;
            cons = AppConfig.Variables;
            cons.baseUrl = makeBaseUrl(cons.protocol, cons.baseUrl); 
            cons.baseClientUrl = makeBaseUrl(cons.protocol, cons.baseClientUrl); 
            cons.apiUrl = makeApiUrl( cons.environment, cons.api, cons.protocol);
            cons.userToken = '_token';
            cons.userKey = 'user';
            cons.adminRole = 'admin';
            cons.mainTemplateUrl = cons.modulesTemplateUrl+'_main/templates/';
            cons.guest_topnavbar = cons.mainTemplateUrl+'guest_topnavbar.html';
            cons.user_topnavbar = cons.mainTemplateUrl+'user_topnavbar.html';
            cons.resource_path = `${cons.basePath}common/resources/`;
            cons.default_profile_picture = `${cons.resource_path}default_profile_picture.png`;
            cons.dateFormat = 'DD-MM-YYYY';
            cons.dateFormatStore = 'YYYY-MM-DD';
            cons.dateTimeFormatStore = 'YYYY-MM-DD HH:mm:ss';
            cons.dateTimeFormat = 'DD-MM-YYYY HH:mm:ss';
            cons.dateFormatV1 = 'DD.MM.YYYY';
            cons.timeZone = 'UTC';
            cons.footerTplUrl = cons.mainTemplateUrl+'footer.html';
            cons.defaultLocale = 'no';
            cons.mainSeoPlaces = [
                'By/tettsted',
                'Oslo',
                'Bergen',
                'Stavanger',
                'Sandnes',
                'Trondheim',
                'Drammen',
                'Fredrikstad',
                'Sarpsborg',
                'Porsgrunn',
                'Skien',
                'Kristiansand',
                'Ålesund',
                'Tønsberg',
                'Moss',
                'Haugesund',
                'Sandefjord',
                'Arendal',
                'Bodø',
                'Tromsø',
                'Hamar',
                'Halden',
                'Larvik',
                'Askøy',
                'Kongsberg',
                'Harstad',
                'Molde',
                'Lillehammer',
                'Horten',
                'Gjøvik',
                'Ski',
                'Mo i Rana',
                'Kristiansund',
                'Jessheim',
                'Korsvik',
                'Tromsdalen',
                'Hønefoss',
                'Alta',
                'Elverum',
                'Narvik',
                'Askim',
                'Leirvik',
                'Drøbak',
                'Vennesla',
                'Grimstad',
                'Nesoddtangen',
                'Steinkjer',
                'Kongsvinger',
                'Bryne',
                'Egersund',
                'Kopervik',
                'Lommedalen',
                'Ålgård',
                'Mandal',
                'Førde',
                'Ås',
                'Levanger',
                'Brumunddal'
            ];
            return cons;
    })();

    function Config(
        $urlRouterProvider : ng.ui.IUrlRouterProvider , 
        $stateProvider : ng.ui.IStateProvider, 
        AppConstants : App.Main.MainConstants, 
        // $ocLazyLoadProvider : any,
        angularPromiseButtonsProvider : any,
        RestangularProvider : restangular.IProvider,
        $translateProvider : any,
        $locationProvider : any,
        $provide : any,
        $httpProvider : any
        ){

        let templatePath = AppConstants.modulesTemplateUrl+'_main/templates/';
        
        // $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            // debug: false
        // });

        $httpProvider.interceptors.push('preventTemplateCache');

        // RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        //      if (data.hasOwnProperty("data"))
        //         return data.data;
        //     return data;
        // });
        // $provide.decorator('$sniffer', function($delegate) {
        //     $delegate.history = false;
        //     return $delegate;
        //   });
        $urlRouterProvider.otherwise( function( $injector : any) {
            var $state = $injector.get("$state");
            $state.go( App.Config.Acl.redirects.guest );
        });


        $stateProvider.state('main', {
            abstract: true,
            // url: `/${AppConstants.appAlias}`,
            templateUrl: `${templatePath}content.html`,
            controller : 'MainController',
            controllerAs : 'mainCtrl'
        });

        angularPromiseButtonsProvider.extendConfig({
            spinnerTpl: '<i class="fa pull-left fa-spinner fa-spin fa-1x fa-fw"></i>',
            disableBtn: true,
            btnLoadingClass: 'is-loading',
            addClassToCurrentBtnOnly: false,
            disableCurrentBtnOnly: false
        });

        $translateProvider.useStaticFilesLoader({
            prefix: `${AppConstants.languagePath}`,
            suffix: '.json'
        });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        // $locationProvider.html5Mode(true);
    }


    Config.$inject = [
        '$urlRouterProvider', 
        '$stateProvider', 
        'AppConstants', 
        // '$ocLazyLoadProvider', 
        'angularPromiseButtonsProvider', 
        'RestangularProvider', 
        '$translateProvider',
        '$locationProvider',
        '$provide',
        '$httpProvider'
    ];

    function Init(
        Restangular:restangular.IService, 
        $q : any, 
        $http : any, 
        AppConstants : App.Main.MainConstants,
        $state : any,
        $rootScope : any,
        AuthService : App.Services.AuthService,
        $translate : any,
        $templateCache : ng.ITemplateCacheService,
        AclAuth : App.Services.AclAuth,
        Notifications : App.Base.EventDispatcher,
        $location : any,
        $filter : any,
        $timeout : any
        ) 
        {
            
        Restangular.setBaseUrl(AppConstants.apiUrl);

        let templatePath = AppConstants.modulesTemplateUrl+'_main/templates/';
        
        $rootScope.mainTemplateUrl = templatePath;
        $rootScope.modulesTemplateUrl = AppConstants.modulesTemplateUrl;
        $rootScope.AppName = AppConstants.appAlias;
        $rootScope.baseUrl = AppConstants.baseUrl;
        $rootScope.baseClientUrl = AppConstants.baseClientUrl;
        $rootScope.resource_path = AppConstants.resource_path;
        $rootScope.$state = $state;
        $rootScope.footerTpl = AppConstants.footerTplUrl;
        $rootScope.gPlacesOptions = {
            componentRestrictions: { country: 'no' }
        };

        let begin = moment().isoWeekday(1);
        begin.startOf('week');
        // set roles and permissions
        AclAuth.setRoles();

        // set user if authenticated
        if( AuthService.isAuthenticated() ){
            AuthService.setUser();
            // if user has no profile
            
        } 

        Restangular.setErrorInterceptor((response) => {
            if (response.hasOwnProperty("data"))
                 if(response.data.message == 'TOKEN_EXPIRED')
                    Notifications.notify('ERROR.TOKEN_EXPIRED');
        });
        
        Restangular.addFullRequestInterceptor((element : any, operation : string, what : string, url : string, headers : any, params : any, httpConfig : ng.IRequestShortcutConfig) => {
            // Bearer token for authenticated user for every request
            if( AuthService.isAuthenticated() )
                headers['Authorization'] = 'Bearer '+AuthService.getToken();
            if( AuthService.isAdmin() )
                headers['AutorizationUserID'] = $rootScope['user'].id;

            return {
                headers : headers,
                params : params,
                element : element,
                httpConfig : httpConfig
            }

        });

        Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            if (data.hasOwnProperty("data"))
               return Restangular.stripRestangular(data.data);
           return data;
       });
        // $rootScope.$on('$viewContentLoaded', function() {
        //     $templateCache.removeAll();
        // });

        $translate.use(AppConstants.defaultLocale);

        let views = [ 'main', 'account' ];
        $rootScope.$on('$stateChangeStart', function (event : any, toState : any, current : any) {
            $timeout(() => {
                $rootScope['pageTitle'] = $filter('translate')(toState.data.pageTitle) + ' | Latell.no';
            }, 500)
            // if (typeof (current) !== 'undefined') {
            //     _.each( views, ( view : string ) => {
            //         if( _.has( toState.views, view ) ){
            //             $templateCache.remove(toState.views[view].templateUrl);
            //         }
            //     });+
            // }
        });

        $rootScope.$on('$stateChangeSuccess', function (event : any, toState : any) {
            window['dataLayer'].push({
                event: 'pageView',
                action: $location.url(),
            });

            window['ga']('set', 'page', $location.url());
            window['ga']('send', 'pageview', { page : $location.url() });
        });

    }

     Init.$inject = ['Restangular', '$q', '$http', 'AppConstants', '$state', '$rootScope', 'AuthService', '$translate', '$templateCache', 'AclAuth', 'Notifications', '$location', '$filter', '$timeout' ];

    
    angularModule
        .config(Config)
        .run(Init)
        .constant('AppConstants', AppConstants);

    // filters temp 
     angularModule.filter('utc', [function() {
        return function(date : any) {
        if(angular.isNumber(date)) {
            date = new Date(date);
        }
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        }   
    } ]);


    angularModule.factory('preventTemplateCache', function() {
        return {
            'request': function(config) {

                if (config.url.indexOf('modules') !== -1) {
                    config.url = config.url + '?t=' + (new Date).getTime();
                }
                return config;
            }
        }
    }).directive('googleplace', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, model : any) {
                var options = {
                    types: [],
                    componentRestrictions: { country : 'no' }
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
    
                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        model.$setViewValue(scope.gPlace.getPlace());   
                    });
                });
            }
        };
    });
}
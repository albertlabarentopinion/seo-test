var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Config;
    (function (Config) {
        Config.Variables = {
            appName: 'bod4rent',
            appAlias: 'Latell',
            environment: 'development',
            protocol: 'http://',
            baseUrl: 'bod4rent-api.test',
            baseClientUrl: 'bod4rent.test',
            api: {
                development: {
                    url: 'bod4rent-api.test/api',
                    version: 'v1'
                },
                production: {
                    url: 'bod4rent-api.test',
                    version: 'v1'
                }
            },
            basePath: './src/',
            modulesTemplateUrl: './src/modules/',
            languagePath: './languages/'
        };
    })(Config = App.Config || (App.Config = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Config;
    (function (Config) {
        Config.Ng = {
            module: {
                name: 'bod4rent',
                dependencies: [
                    'ui.router',
                    'ui.bootstrap',
                    'restangular',
                    'angularPromiseButtons',
                    'cgNotify',
                    'ngSessionStorage',
                    'base64',
                    'pascalprecht.translate',
                    'toaster',
                    'permission',
                    'permission.ui',
                    'notifications',
                    'ngFileUpload',
                    'google.places',
                    'GoogleMapsNative',
                    'dynamicNumber',
                    'thatisuday.dropzone',
                    'ui.blueimp.gallery',
                    'seo',
                    'datePicker',
                    'angularSpinner',
                    'ui-rangeSlider',
                    'datatables',
                    'datatables.columnfilter',
                    'yaru22.angular-timeago',
                    'ng-file-model',
                    'angular-input-stars',
                    'ngLocale',
                    'summernote',
                    'ngSanitize',
                    'bod4rent.login',
                    'bod4rent.register',
                    'bod4rent.home',
                    'bod4rent.forgot_password',
                    'bod4rent.account',
                    'bod4rent.edit_profile',
                    'bod4rent.storage',
                    'bod4rent.result_page',
                    'bod4rent.storage_view',
                    'bod4rent.admin',
                    'bod4rent.admin_user',
                    'bod4rent.admin_listing',
                    'bod4rent.admin_request',
                    'bod4rent.admin_cms',
                    'bod4rent.request',
                    'bod4rent.user_request',
                    'bod4rent.payout',
                    'bod4rent.payment',
                    'bod4rent.rating',
                    'bod4rent.admin_rating',
                    'bod4rent.seo_search',
                    'bod4rent.cms_page',
                    'bod4rent.user_profile',
                    'bod4rent.contact_us',
                    'bod4rent.special_account',
                    'bod4rent.special_listing'
                ]
            },
            templates: {
                guest_header: App.Config.Variables.modulesTemplateUrl + "_main/templates/guest_topnavbar.html",
                member_header: App.Config.Variables.modulesTemplateUrl + "_main/templates/member_topnavbar.html"
            },
            modules: {
                LOGIN: 'login',
                LOGOUT: 'logout',
                PROFILE: 'profile'
            }
        };
        Config.Acl = {
            roles: {
                guest: [
                    Config.Ng.modules.LOGIN,
                ],
                member: [
                    Config.Ng.modules.PROFILE
                ]
            },
            redirects: {
                member: 'main.home',
                guest: 'main.home'
            }
        };
    })(Config = App.Config || (App.Config = {}));
})(App || (App = {}));
var angularModule = angular.module(App.Config.Ng.module.name, App.Config.Ng.module.dependencies);
var App;
(function (App) {
    var Main;
    (function (Main) {
        var AppConfig = App.Config;
        var AppConstants = (function () {
            function makeApiUrl(appEnv, apiCons, protocol) {
                var apiObj = apiCons[appEnv];
                return "" + protocol + apiObj.url + "/" + apiObj.version;
            }
            function makeBaseUrl(protocol, baseUrl) {
                return "" + protocol + baseUrl;
            }
            var cons;
            cons = AppConfig.Variables;
            cons.baseUrl = makeBaseUrl(cons.protocol, cons.baseUrl);
            cons.baseClientUrl = makeBaseUrl(cons.protocol, cons.baseClientUrl);
            cons.apiUrl = makeApiUrl(cons.environment, cons.api, cons.protocol);
            cons.userToken = '_token';
            cons.userKey = 'user';
            cons.adminRole = 'admin';
            cons.mainTemplateUrl = cons.modulesTemplateUrl + '_main/templates/';
            cons.guest_topnavbar = cons.mainTemplateUrl + 'guest_topnavbar.html';
            cons.user_topnavbar = cons.mainTemplateUrl + 'user_topnavbar.html';
            cons.resource_path = cons.basePath + "common/resources/";
            cons.default_profile_picture = cons.resource_path + "default_profile_picture.png";
            cons.dateFormat = 'DD-MM-YYYY';
            cons.dateFormatStore = 'YYYY-MM-DD';
            cons.dateTimeFormatStore = 'YYYY-MM-DD HH:mm:ss';
            cons.dateTimeFormat = 'DD-MM-YYYY HH:mm:ss';
            cons.dateFormatV1 = 'DD.MM.YYYY';
            cons.timeZone = 'UTC';
            cons.footerTplUrl = cons.mainTemplateUrl + 'footer.html';
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
        function Config($urlRouterProvider, $stateProvider, AppConstants, angularPromiseButtonsProvider, RestangularProvider, $translateProvider, $locationProvider, $provide, $httpProvider) {
            var templatePath = AppConstants.modulesTemplateUrl + '_main/templates/';
            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get("$state");
                $state.go(App.Config.Acl.redirects.guest);
            });
            $stateProvider.state('main', {
                abstract: true,
                templateUrl: templatePath + "content.html",
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            });
            angularPromiseButtonsProvider.extendConfig({
                spinnerTpl: '<i class="fa pull-left fa-spinner fa-spin fa-1x fa-fw"></i>',
                disableBtn: true,
                btnLoadingClass: 'is-loading',
                addClassToCurrentBtnOnly: false,
                disableCurrentBtnOnly: false
            });
            $translateProvider.useStaticFilesLoader({
                prefix: "" + AppConstants.languagePath,
                suffix: '.json'
            });
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }
        Config.$inject = [
            '$urlRouterProvider',
            '$stateProvider',
            'AppConstants',
            'angularPromiseButtonsProvider',
            'RestangularProvider',
            '$translateProvider',
            '$locationProvider',
            '$provide',
            '$httpProvider'
        ];
        function Init(Restangular, $q, $http, AppConstants, $state, $rootScope, AuthService, $translate, $templateCache, AclAuth, Notifications, $location, $filter, $timeout) {
            Restangular.setBaseUrl(AppConstants.apiUrl);
            var templatePath = AppConstants.modulesTemplateUrl + '_main/templates/';
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
            var begin = moment().isoWeekday(1);
            begin.startOf('week');
            AclAuth.setRoles();
            if (AuthService.isAuthenticated()) {
                AuthService.setUser();
            }
            Restangular.setErrorInterceptor(function (response) {
                if (response.hasOwnProperty("data"))
                    if (response.data.message == 'TOKEN_EXPIRED')
                        Notifications.notify('ERROR.TOKEN_EXPIRED');
            });
            Restangular.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
                if (AuthService.isAuthenticated())
                    headers['Authorization'] = 'Bearer ' + AuthService.getToken();
                if (AuthService.isAdmin())
                    headers['AutorizationUserID'] = $rootScope['user'].id;
                return {
                    headers: headers,
                    params: params,
                    element: element,
                    httpConfig: httpConfig
                };
            });
            Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                if (data.hasOwnProperty("data"))
                    return Restangular.stripRestangular(data.data);
                return data;
            });
            $translate.use(AppConstants.defaultLocale);
            var views = ['main', 'account'];
            $rootScope.$on('$stateChangeStart', function (event, toState, current) {
                $timeout(function () {
                    $rootScope['pageTitle'] = $filter('translate')(toState.data.pageTitle) + ' | Latell.no';
                }, 500);
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                window['dataLayer'].push({
                    event: 'pageView',
                    action: $location.url()
                });
                window['ga']('set', 'page', $location.url());
                window['ga']('send', 'pageview', { page: $location.url() });
            });
        }
        Init.$inject = ['Restangular', '$q', '$http', 'AppConstants', '$state', '$rootScope', 'AuthService', '$translate', '$templateCache', 'AclAuth', 'Notifications', '$location', '$filter', '$timeout'];
        angularModule
            .config(Config)
            .run(Init)
            .constant('AppConstants', AppConstants);
        angularModule.filter('utc', [function () {
                return function (date) {
                    if (angular.isNumber(date)) {
                        date = new Date(date);
                    }
                    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                };
            }]);
        angularModule.factory('preventTemplateCache', function () {
            return {
                'request': function (config) {
                    if (config.url.indexOf('modules') !== -1) {
                        config.url = config.url + '?t=' + (new Date).getTime();
                    }
                    return config;
                }
            };
        }).directive('googleplace', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, model) {
                    var options = {
                        types: [],
                        componentRestrictions: { country: 'no' }
                    };
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                        scope.$apply(function () {
                            model.$setViewValue(scope.gPlace.getPlace());
                        });
                    });
                }
            };
        });
    })(Main = App.Main || (App.Main = {}));
})(App || (App = {}));
namespace('NOTIFY').REGISTERED = 'NOTIFY.REGISTERED';
namespace('NOTIFY').ERROR_SOCIAL_LOGIN = 'NOTIFY.ERROR_SOCIAL_LOGIN';
namespace('NOTIFY').FORGOT_PASSWORD = 'NOTIFY.FORGOT_PASSWORD';
namespace('NOTIFY').RESET_PASSWORD = 'NOTIFY.RESET_PASSWORD';
namespace('NOTIFY').UPLOAD_PROFILE = 'NOTIFY.UPLOAD_PROFILE';
namespace('CONTROLLER').LISTING_FORM_IS_LOADING = 'CONTROLLER.LISTING_FORM_IS_LOADING';
namespace('CONTROLLER').LISTING_FORM_IS_DONE = 'CONTROLLER.LISTING_FORM_IS_DONE';
namespace('STEPS').STEP1 = 'STEPS.STEP1';
namespace('STEPS').STEP1 = 'STEPS.STEP2';
namespace('STEPS').STEP1 = 'STEPS.STEP3';
namespace('STEPS').STEP1 = 'STEPS.STEP4';
namespace('STEPS').UNSAVED = 'STEPS.UNSAVED';
namespace('STEPS').SAVED_OR_DISCARD = 'STEPS.SAVED_OR_DISCARD';
namespace('STEPS').UNSAVED_REDIRECT = 'STEPS.UNSAVED_REDIRECT';
namespace('NOTIFICATIONS').REQUEST_NOTIFICATION_SEEN = 'NOTIFICATIONS.REQUEST_NOTIFICATION_SEEN';
namespace('NOTIFICATIONS').REQUEST_NOTIFICATION_UNSEEN = 'NOTIFICATIONS.REQUEST_NOTIFICATION_UNSEEN';
namespace('ERROR').TOKEN_EXPIRED = 'ERROR.TOKEN_EXPIRED';
var App;
(function (App) {
    var Base;
    (function (Base) {
        var BaseRepository = (function () {
            function BaseRepository(Restangular, $q, recordName, controllerName) {
                var _this = this;
                if (controllerName === void 0) { controllerName = ''; }
                this.allowCache = false;
                this.asController = false;
                this.results = new Array();
                this.paginateMetas = ['total', 'per_page', 'current_page', 'last_page', 'next_page_url', 'prev_page_url', 'from', 'to'];
                this.paginationData = {};
                this.toController = function (methodName) {
                    _this.recordName = _this.controllerName + '/' + methodName;
                    ;
                    _this.asController = true;
                    return _this;
                };
                this.resetRecordName = function () { };
                this.toResult = function (resp) {
                    _this.asController = false;
                    _this.recordName = _this.recordNameReserved;
                    var respMetas = _.keys(resp[0]);
                    if (_.intersection(_this.paginateMetas, respMetas).length == _this.paginateMetas.length) {
                        _.each(_this.paginateMetas, function (meta) {
                            _this.paginationData[meta] = resp[0][meta];
                        });
                        return resp[0].data;
                    }
                    return _this.Restangular.stripRestangular(resp);
                };
                this.find = function (id, params) {
                    if (params === void 0) { params = {}; }
                    return _this.Restangular.one(_this.recordName, id).get(params).then(_this.toResult.bind(_this));
                };
                this.findPopulate = function (id, repository) {
                    var param = {};
                    param.populate = repository.recordName;
                    return _this.Restangular.one(_this.recordName, id).get(param).then(_this.toResult.bind(_this));
                };
                this.findWith = function (id, relations) {
                    var promise = _this.Restangular.one(_this.recordName, id);
                    _.each(relations, function (relation) {
                        if (relation.id && relations.length == relations.length - 1) {
                            promise.all(relation.repository.recordName);
                        }
                        else {
                            promise = promise.one(relation.repository.recordName, relation.id);
                        }
                    });
                    return promise;
                };
                this.update = function (id, data) {
                    return _this.Restangular.one(_this.recordName, id).put(data).then(_this.toResult.bind(_this));
                };
                this.post = function (data) {
                    return _this.insert(data).then(_this.toResult.bind(_this));
                };
                this.updateCustom = function (id, data) {
                    return _this.Restangular.one(_this.recordName, id).customPUT(data).then(_this.toResult.bind(_this));
                };
                this.insert = function (data) {
                    return _this.Restangular.all(_this.recordName).post(data);
                };
                this.removeColletion = function (queryParams) {
                    return _this.Restangular.one(_this.recordName).remove(queryParams).then(_this.toResult.bind(_this));
                };
                this.cache = function (params) {
                    if (params === void 0) { params = {}; }
                    if (!_this.hasResults()) {
                        return _this.Restangular.all(_this.recordName).getList(params).then(function (response) {
                            _this.results = response;
                            _this.asController = false;
                            return _this.results;
                        });
                    }
                    else {
                        return _this.$q.resolve(_this.results).then(_this.toResult.bind(_this));
                    }
                };
                this.hasResults = function () {
                    return _this.results.length > 0;
                };
                this.getBaseUrl = function (route) {
                    if (route === void 0) { route = ''; }
                    return _this.Restangular.configuration.baseUrl + "/" + _this.recordName + "/" + route;
                };
                this.getBaseControllerUrl = function (controllerName, route) {
                    if (route === void 0) { route = ''; }
                    return _this.Restangular.configuration.baseUrl + "/" + controllerName + "/" + route;
                };
                this.Restangular = Restangular;
                this.$q = $q;
                this.recordName = recordName;
                this.recordNameReserved = recordName;
                this.controllerName = controllerName;
            }
            BaseRepository.prototype.getAll = function (params) {
                if (params === void 0) { params = {}; }
                if (this.allowCache) {
                    return this.cache(params).then(this.toResult.bind(this));
                }
                else {
                    return this.Restangular.all(this.recordName).getList(params).then(this.toResult.bind(this));
                }
            };
            BaseRepository.prototype.updateSeveral = function (ids, params) {
                if (params === void 0) { params = {}; }
                return this.Restangular.several(this.recordName, ids).customPUT(params).then(this.toResult.bind(this));
            };
            BaseRepository.prototype.save = function (data) {
                if (_.has(data, this.default_id))
                    return this.updateCustom(data[this.default_id], data);
                else
                    return this.insert(data);
            };
            BaseRepository.prototype.remove = function (id, params) {
                if (params === void 0) { params = {}; }
                return this.Restangular.one(this.recordName, id).remove(params).then(this.toResult.bind(this));
            };
            BaseRepository.prototype.removeSeveral = function (ids, params) {
                if (params === void 0) { params = {}; }
                return this.Restangular.several(this.recordName, ids).remove(params).then(this.toResult.bind(this));
            };
            BaseRepository.$inject = ['Restangular', '$q'];
            return BaseRepository;
        }());
        Base.BaseRepository = BaseRepository;
    })(Base = App.Base || (App.Base = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Base;
    (function (Base_1) {
        var BaseController = (function () {
            function BaseController($scope, $rootScope) {
                var _this = this;
                this.errorBags = [];
                this.successBags = [];
                this.isLoading = true;
                this.defineListeners = function () {
                    _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                };
                this.destroy = function () {
                    var observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutationRecord) {
                            document.getElementById('searchPlaces').removeAttribute('style');
                        });
                    });
                    if (document.getElementById('searchPlaces')) {
                        var target = document.getElementById('searchPlaces');
                        observer.observe(target, { attributes: true, attributeFirlter: ['style'] });
                    }
                    setTimeout(function () {
                        var observer = new MutationObserver(function (mutations) {
                            mutations.forEach(function (mutationRecord) {
                                document.getElementById('searchPlaces').removeAttribute('style');
                            });
                        });
                        if (document.getElementById('searchPlaces')) {
                            var target = document.getElementById('searchPlaces');
                            observer.observe(target, { attributes: true, attributeFirlter: ['style'] });
                        }
                    }, 1000);
                };
                this.errorTranslate = function (error) {
                    if (_.has(error.data, 'message')) {
                        return _.filter(_.split(error.data.message, '.'), function (eitem) {
                            return eitem.length > 0;
                        });
                    }
                    else {
                        return _this.errorTranslateGeneric(error);
                    }
                };
                this.errorTranslateGeneric = function (error) {
                    if (_.values(error.data).length > 30) {
                        return ['01_ERROR_SERVER'];
                    }
                    return _.concat(_.join(_.values(error.data), ', '));
                };
                this.loading = function () {
                    _this.isLoading = true;
                };
                this.ready = function () {
                    _this.isLoading = false;
                };
                this.checkInputs = function (selected) {
                    return _.keys(_.pickBy(selected, function (value, key) {
                        return value;
                    }));
                };
                this.checkInputModel = function (selected) {
                    console.log(selected);
                };
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.destroy();
            }
            BaseController.prototype._handleSuccess = function (response) {
                this.errorBags = [];
            };
            BaseController.prototype._handleOnError = function (error) {
                this.errorBags = this.errorTranslate(error);
            };
            return BaseController;
        }());
        Base_1.BaseController = BaseController;
    })(Base = App.Base || (App.Base = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Base;
    (function (Base) {
        var EventDispatcher = (function () {
            function EventDispatcher() {
                var _this = this;
                this.listeners = {};
                this.addEventListener = function (type, listener) {
                    if (!_this.isEventExists(type))
                        _this.listeners[type] = [];
                    return _this.listeners[type] = [listener];
                };
                this.removeEventListener = function (type, listener) {
                    if (_this.isEventExists(type)) {
                        delete _this.listeners[type];
                    }
                };
                this.notify = function (eventName) {
                    var lst;
                    if (typeof arguments[0] !== 'string') {
                        console.warn('EventDispatcher', 'First params must be an event type (String)');
                    }
                    else {
                        lst = this.listeners[arguments[0]];
                        for (var key in lst) {
                            lst[key].apply(this, arguments);
                        }
                    }
                };
                this.isEventExists = function (type) {
                    return _this.listeners[type];
                };
            }
            return EventDispatcher;
        }());
        Base.EventDispatcher = EventDispatcher;
    })(Base = App.Base || (App.Base = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Base;
    (function (Base) {
        var EventDispatcher = App.Base.EventDispatcher;
        var NotificationsProvider = (function (_super) {
            __extends(NotificationsProvider, _super);
            function NotificationsProvider() {
                var _this = this;
                _super.call(this);
                this.$get = [function () {
                        return _this.instance;
                    }];
                this.instance = new EventDispatcher();
            }
            return NotificationsProvider;
        }(EventDispatcher));
        angular.module('notifications', [])
            .provider('Notifications', NotificationsProvider);
    })(Base = App.Base || (App.Base = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Main;
        (function (Main) {
            var BaseController = App.Base.BaseController;
            var MainController = (function (_super) {
                __extends(MainController, _super);
                function MainController($scope, $rootScope, $state, AppConstants, $translate, TranslationService, Notifications, toaster, AuthService, MainService, $uibModal, LoginService, Cms, $stateParams, $filter) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$state = $state;
                    this.AppConstants = AppConstants;
                    this.$translate = $translate;
                    this.TranslationService = TranslationService;
                    this.Notifications = Notifications;
                    this.toaster = toaster;
                    this.AuthService = AuthService;
                    this.MainService = MainService;
                    this.$uibModal = $uibModal;
                    this.LoginService = LoginService;
                    this.Cms = Cms;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.user = {};
                    this.notifications = [];
                    this.notification_messages = {
                        'NOTIFY.REGISTERED': ['success', 'REGISTERED_TITLE', 'REGISTERED'],
                        'NOTIFY.ERROR_SOCIAL_LOGIN': ['error', 'UNABLE_LOGIN', 'MEMBER_NOT_ACTIVE'],
                        'NOTIFY.FORGOT_PASSWORD': ['success', 'FORGOT_PASSWORD_SENT_TITLE', 'FORGOT_PASSWORD_SENT'],
                        'NOTIFY.RESET_PASSWORD': ['success', 'RESET_PASSWORD_SUCCESS_TITLE', 'RESET_PASSWORD_SUCCESS']
                    };
                    this.pages = [];
                    this.footerItems = [];
                    this.mainSeoPlaces = [];
                    this.init = function () {
                        _this.TranslationService.setSavedLocale();
                        _this.getNotifications();
                    };
                    this.changeLanguage = function (locale) {
                        _this.$translate.use(locale);
                        _this.$rootScope['pageTitle'] = _this.$filter('translate')(_this.$state.current.data.pageTitle);
                        _this.TranslationService.saveLocale(locale);
                    };
                    this.userUpdate = function () {
                    };
                    this.navigateToCmsPage = function (name) {
                        _this.$state.go('main.cms_page', { name: name });
                        _this.cmsPage = name;
                        console.log(_this.$state);
                    };
                    this.defineListeners = function () {
                        _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                        _this.Notifications.addEventListener('NOTIFY.REGISTERED', _this.handleNotification.bind(_this));
                        _this.Notifications.addEventListener('NOTIFY.ERROR_SOCIAL_LOGIN', _this.handleNotification.bind(_this));
                        _this.Notifications.addEventListener('NOTIFY.FORGOT_PASSWORD', _this.handleNotification.bind(_this));
                        _this.Notifications.addEventListener('NOTIFY.RESET_PASSWORD', _this.handleNotification.bind(_this));
                        _this.Notifications.addEventListener('NOTIFY.ADMIN_AS_USER', _this.handleNotification.bind(_this));
                        _this.Notifications.addEventListener('NOTIFICATIONS.REQUEST_NOTIFICATION_SEEN', _this.refreshNotifications.bind(_this));
                        _this.Notifications.addEventListener('NOTIFICATIONS.REQUEST_NOTIFICATION_UNSEEN', _this.refreshNotifications.bind(_this));
                        _this.Notifications.addEventListener('ERROR.TOKEN_EXPIRED', _this.tokenExpiredNotification.bind(_this));
                        _this.Notifications.addEventListener('NOTIFY.UPLOAD_PROFILE', _this.uploadProfileImage.bind(_this));
                    };
                    this.defineScope = function () {
                        _this.$scope.mainCtrl = _this;
                    };
                    this.handleNotification = function (notification) {
                        var data = _this.notification_messages[notification];
                        _this.toaster.pop({
                            type: data[0],
                            title: data[1],
                            body: data[2],
                            showCloseButton: true
                        });
                        _this.$state.go(App.Config.Acl.redirects.guest);
                    };
                    this.logout = function () {
                        _this.AuthService.logout();
                        _this.$state.go(App.Config.Acl.redirects.guest);
                    };
                    this.getPages = function () {
                        _this.Cms.getPages().then(function (pages) {
                            _this.pages = _.filter(pages, function (page) {
                                return page.type == 'Page';
                            });
                            _this.footerItems = _.filter(pages, function (page) {
                                return page.footerItems == 'FooterItem';
                            });
                        });
                    };
                    this.getNotifications = function () {
                        _this.$rootScope.$watch(function () {
                            return _this.$rootScope['user'];
                        }, function () {
                            if (_.has(_this.$rootScope, 'user')) {
                                if (_.has(_this.$rootScope['user'], 'id'))
                                    _this.MainService.getNotifications(_this.$rootScope['user'].id).then(_this.setNotifications.bind(_this));
                            }
                        }, true);
                    };
                    this.setNotifications = function (notifications) {
                        if (notifications === void 0) { notifications = []; }
                        _this.notifications = notifications;
                    };
                    this.refreshNotifications = function () {
                        _this.setNotifications(_this.MainService.notifications);
                    };
                    this.tokenExpiredNotification = function () {
                        var _self = _this;
                        _this.AuthService.logout();
                        _this.AuthService.savePage(window.location.href);
                        _this.$uibModal.open({
                            templateUrl: _this.AppConstants.mainTemplateUrl + "error.token_expired.modal.html",
                            size: 'md',
                            controller: function ($uibModalInstance, $scope) {
                                $scope['loginUrlSocial'] = _self.LoginService.loginUrlSocial;
                                this.errorTokenExpiredClose = function () {
                                    $uibModalInstance.close('dismiss');
                                    _self.LoginService.redirectAuthenticated();
                                };
                                this.doLogin = function (email, password) {
                                    return _self.LoginService.loginCustom(email, password)
                                        .then(function (user) {
                                        $uibModalInstance.close('dismiss');
                                    }, function (error) {
                                        _self.errorBags = _self.errorTranslate(error);
                                    });
                                };
                            },
                            controllerAs: 'ctrl',
                            windowClass: "animated fadeInY"
                        });
                    };
                    this.uploadProfileImage = function () {
                        _this.$uibModal.open({
                            templateUrl: _this.AppConstants.mainTemplateUrl + "upload_profile.modal.html",
                            controller: 'UploadProfileController',
                            controllerAs: 'ctrl',
                            size: 'sm'
                        });
                    };
                    this.onClickListing = function () {
                        _this.$state.reload();
                    };
                    this.destroy = function () {
                        _this.Notifications.removeEventListener(NOTIFY.REGISTERED, _this.handleNotification.bind(_this));
                        _this.Notifications.removeEventListener(NOTIFY.ERROR_SOCIAL_LOGIN, _this.handleNotification.bind(_this));
                        _this.Notifications.removeEventListener(NOTIFY.FORGOT_PASSWORD, _this.handleNotification.bind(_this));
                        _this.Notifications.removeEventListener(NOTIFY.RESET_PASSWORD, _this.handleNotification.bind(_this));
                        _this.Notifications.removeEventListener(NOTIFICATIONS.REQUEST_NOTIFICATION_SEEN, _this.refreshNotifications.bind(_this));
                        _this.Notifications.removeEventListener(NOTIFICATIONS.REQUEST_NOTIFICATION_UNSEEN, _this.refreshNotifications.bind(_this));
                        _this.Notifications.removeEventListener(ERROR.TOKEN_EXPIRED, _this.tokenExpiredNotification.bind(_this));
                        _this.Notifications.removeEventListener(NOTIFY.UPLOAD_PROFILE, _this.uploadProfileImage.bind(_this));
                    };
                    this.mainSeoPlaces = _.chunk(this.AppConstants.mainSeoPlaces, 10);
                    this.init();
                    this.defineListeners();
                    this.defineScope();
                }
                MainController.$inject = [
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
                return MainController;
            }(BaseController));
            angularModule.controller('MainController', MainController);
        })(Main = Modules.Main || (Modules.Main = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Main;
        (function (Main) {
            var BaseController = App.Base.BaseController;
            var UploadProfileController = (function (_super) {
                __extends(UploadProfileController, _super);
                function UploadProfileController($scope, $rootScope, $uibModalInstance, EditProfileService, AppConstants, AuthService, $timeout, toaster) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$uibModalInstance = $uibModalInstance;
                    this.EditProfileService = EditProfileService;
                    this.AppConstants = AppConstants;
                    this.AuthService = AuthService;
                    this.$timeout = $timeout;
                    this.toaster = toaster;
                    this.isUploading = false;
                    this.upload = function (profile_picture) {
                        _this.isUploading = true;
                        return _this.EditProfileService.upload(profile_picture, _this.AuthService.getUser().id)
                            .then(function (data) {
                            if (_.has(data, 'data'))
                                _this.AuthService.setUserFields({ profile_picture: data.data.data.profile_picture });
                            _this.isUploading = false;
                            _this.cancel();
                            _this.toaster.pop({
                                type: 'success',
                                title: 'SUCCESS_UPLOAD',
                                body: 'PROFILE_IMAGE_HAS_BEEN_UPDATED',
                                showCloseButton: true
                            });
                        });
                    };
                    this.cancel = function () {
                        _this.$uibModalInstance.dismiss('close');
                    };
                    this.default_profile = this.AppConstants.default_profile_picture;
                }
                UploadProfileController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'EditProfileService', 'AppConstants', 'AuthService', '$timeout', 'toaster'];
                return UploadProfileController;
            }(BaseController));
            angularModule.controller('UploadProfileController', UploadProfileController);
        })(Main = Modules.Main || (Modules.Main = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Main;
        (function (Main) {
            var MainService = (function () {
                function MainService(RequestLog) {
                    var _this = this;
                    this.RequestLog = RequestLog;
                    this.notifications = [];
                    this.getNotifications = function (id) {
                        return _this.RequestLog.getNotifications(id).then(_this.setNotifications.bind(_this));
                    };
                    this.setNotifications = function (notifications) {
                        if (notifications === void 0) { notifications = []; }
                        _this.notifications = _.filter(notifications, function (notification) {
                            if (notification.request)
                                return notification.request.isDeactivated !== 1;
                            return true;
                        });
                        return _this.notifications;
                    };
                    this.refreshNotifications = function (id) {
                        return _this.RequestLog.refreshNotifications(id).then(function () {
                            _this.setNotifications();
                        });
                    };
                    this.seenRequestNotification = function (to_id, request_id) {
                        return _this.RequestLog.seenNotification(to_id, request_id).then(function (notifications) {
                            _this.setNotifications(notifications);
                        });
                    };
                    this.getRequestNotifications = function (to_id, request_id) {
                        return _.filter(_this.notifications, function (notification) {
                            return parseInt(notification.to_id) == parseInt(to_id) && parseInt(notification.request_id) == parseInt(request_id);
                        });
                    };
                }
                MainService.$inject = ['RequestLog'];
                return MainService;
            }());
            Main.MainService = MainService;
            angularModule.service('MainService', MainService);
        })(Main = Modules.Main || (Modules.Main = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var registerModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Register;
        (function (Register) {
            var RegisterConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'register/templates/'
                };
                return cons;
            })();
            function RegisterConfig($urlRouterProvider, $stateProvider, RegisterConstants) {
                var templatePath = RegisterConstants.templateUrl;
                $stateProvider
                    .state('main.register', {
                    url: "/SignUp",
                    views: {
                        main: {
                            templateUrl: templatePath + "register.html",
                            controller: 'RegisterController',
                            controllerAs: 'registerCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'guest',
                            redirectTo: App.Config.Acl.redirects.member
                        },
                        pageTitle: 'PT_SIGN_UP'
                    }
                });
            }
            RegisterConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'RegisterConstants'];
            registerModule = angular.module(App.Config.Ng.module.name + ".register", [])
                .constant('RegisterConstants', RegisterConstants)
                .config(RegisterConfig);
        })(Register = Modules.Register || (Modules.Register = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Register;
        (function (Register) {
            var RegisterService = (function () {
                function RegisterService(User) {
                    var _this = this;
                    this.User = User;
                    this.register = function (user) {
                        return _this.User.post(user);
                    };
                }
                RegisterService.$inject = ['User'];
                return RegisterService;
            }());
            Register.RegisterService = RegisterService;
            registerModule.service('RegisterService', RegisterService);
        })(Register = Modules.Register || (Modules.Register = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Register;
        (function (Register) {
            var BaseController = App.Base.BaseController;
            var RegisterController = (function (_super) {
                __extends(RegisterController, _super);
                function RegisterController($scope, $rootScope, RegisterService, $state, LoginConstants, AppConstants, Notifications, RequestService, LoginService) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.RegisterService = RegisterService;
                    this.$state = $state;
                    this.LoginConstants = LoginConstants;
                    this.AppConstants = AppConstants;
                    this.Notifications = Notifications;
                    this.RequestService = RequestService;
                    this.LoginService = LoginService;
                    this.user = {};
                    this.defineScope = function () {
                        _this.$scope.loginSocialUrl = _this.AppConstants.apiUrl + "/auth/";
                    };
                    this.register = function (user) {
                        _this.user = user;
                        return _this.RegisterService.register(user).then(_this._handleRegistered.bind(_this), _this._handleOnError.bind(_this));
                    };
                    this._handleRegistered = function (response) {
                        _this._handleSuccess(response);
                        var request = _this.RequestService.getRequest();
                        if (!_.isEmpty(request)) {
                            _this.LoginService.loginCustom(_this.user.email, _this.user['password']).then(function () {
                                _this.LoginService.welcomePopup(_this.user.firstname);
                                _this.LoginService.redirectAuthenticated();
                            });
                        }
                        else {
                            _this.Notifications.notify(NOTIFY.REGISTERED);
                        }
                    };
                    this.defineScope();
                }
                RegisterController.$inject = ['$scope', '$rootScope', 'RegisterService', '$state', 'LoginConstants', 'AppConstants', 'Notifications', 'RequestService', 'LoginService'];
                return RegisterController;
            }(BaseController));
            registerModule.controller('RegisterController', RegisterController);
        })(Register = Modules.Register || (Modules.Register = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var loginModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Login;
        (function (Login) {
            var LoginConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'login/templates/',
                    messages: {
                        EMAIL_VERIFIED: 'email_verified',
                        REGISTERED: 'registered',
                        EMAIL_VERIFIED_ERROR: 'email_verified_error'
                    },
                    ROUTE_NAME: 'auth',
                    routes: {
                        BEARER_TOKEN: 'bearer_token'
                    }
                };
                return cons;
            })();
            function LoginConfig($urlRouterProvider, $stateProvider, LoginConstants) {
                var templatePath = LoginConstants.templateUrl;
                $stateProvider
                    .state('main.login', {
                    url: "/login/:message",
                    views: {
                        main: {
                            templateUrl: templatePath + "login.html",
                            controller: 'LoginController',
                            controllerAs: 'loginCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'guest',
                            redirectTo: App.Config.Acl.redirects.member
                        },
                        pageTitle: 'PT_LOGIN'
                    }
                })
                    .state('main.login.auth_social', {
                    url: "/auth_social/:token",
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl',
                    views: {
                        main: {
                            templateUrl: templatePath + "login.html",
                            controller: 'LoginController',
                            controllerAs: 'loginCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'guest',
                            redirectTo: App.Config.Acl.redirects.member
                        },
                        pageTitle: 'PT_LOGIN'
                    }
                });
            }
            LoginConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'LoginConstants'];
            loginModule = angular.module(App.Config.Ng.module.name + ".login", [])
                .constant('LoginConstants', LoginConstants)
                .config(LoginConfig);
        })(Login = Modules.Login || (Modules.Login = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Login;
        (function (Login) {
            var Service = (function () {
                function Service(Restangular, LoginConstants, AuthService, $state, $remember, $forget, $base64, Notifications, toaster, AppConstants, RequestService) {
                    var _this = this;
                    this.Restangular = Restangular;
                    this.LoginConstants = LoginConstants;
                    this.AuthService = AuthService;
                    this.$state = $state;
                    this.$remember = $remember;
                    this.$forget = $forget;
                    this.$base64 = $base64;
                    this.Notifications = Notifications;
                    this.toaster = toaster;
                    this.AppConstants = AppConstants;
                    this.RequestService = RequestService;
                    this.email_secret = '7ZXYZ@L';
                    this.password_secret = 'UU@#90';
                    this.loginWithSocial = function (token) {
                        return _this.AuthService.loginSocial(token)
                            .then(function (user) {
                            var saved_page = _this.AuthService.getSavedPage();
                            if (saved_page) {
                                window.location.href = saved_page;
                            }
                            else {
                                _this.redirectAuthenticated();
                            }
                            return user;
                        }, function () {
                            _this.Notifications.notify(NOTIFY.ERROR_SOCIAL_LOGIN);
                            return 'error';
                        });
                    };
                    this.loginCustom = function (email, password) {
                        return _this.AuthService.login(email, password)
                            .then(_this.loginCheckProfile.bind(_this));
                    };
                    this.loginCheckProfile = function (user) {
                        if (!user.isSocial && user.profile_picture == _this.AppConstants.default_profile_picture) {
                            _this.Notifications.notify(NOTIFY.UPLOAD_PROFILE);
                        }
                        return user;
                    };
                    this.redirectAuthenticated = function () {
                        var request = _this.RequestService.getRequest();
                        _this.RequestService.isRequestSaved = true;
                        if (!_.isEmpty(request)) {
                            _this.$state.go('main.storage_view', _.extend(request, { requestSaved: 1 }));
                        }
                        else {
                            _this.$state.go(App.Config.Acl.redirects.member);
                        }
                    };
                    this.setRememberMe = function (email, password) {
                        _this.$remember(_this.email_secret, email);
                        _this.$remember(_this.password_secret, password);
                    };
                    this.getRememberMe = function () {
                        var email = _this.$remember(_this.email_secret), password = _this.$remember(_this.password_secret);
                        if (email && password) {
                            return {
                                email: email,
                                password: password
                            };
                        }
                        return null;
                    };
                    this.forgetRememberMe = function () {
                        _this.$forget(_this.email_secret);
                        _this.$forget(_this.password_secret);
                    };
                    this.welcomePopup = function (firstname) {
                        _this.toaster.pop({
                            type: 'success',
                            title: 'Login Successful',
                            body: "Welcome " + firstname,
                            showCloseButton: true,
                            timeout: 1000
                        });
                    };
                    this.loginUrlSocial = this.AppConstants.apiUrl + "/auth/";
                }
                Service.$inject = ['Restangular', 'LoginConstants', 'AuthService', '$state', '$remember', '$forget', '$base64', 'Notifications', 'toaster', 'AppConstants', 'RequestService'];
                return Service;
            }());
            Login.Service = Service;
            loginModule.service('LoginService', Service);
        })(Login = Modules.Login || (Modules.Login = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Login;
        (function (Login) {
            var BaseController = App.Base.BaseController;
            var LoginController = (function (_super) {
                __extends(LoginController, _super);
                function LoginController($scope, $rootScope, RegisterService, $state, $stateParams, notify, LoginConstants, AppConstants, $window, LoginService, toaster) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.RegisterService = RegisterService;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.notify = notify;
                    this.LoginConstants = LoginConstants;
                    this.AppConstants = AppConstants;
                    this.$window = $window;
                    this.LoginService = LoginService;
                    this.toaster = toaster;
                    this.user = {};
                    this.isVerified = false;
                    this.isExpired = false;
                    this.loggingIn = false;
                    this.login = {};
                    this.defineScope = function () {
                        _this.$scope.loginSocialUrl = _this.LoginService.loginUrlSocial;
                    };
                    this.init = function () {
                        _this.showLoggingInWithSocial();
                        _this.setRememberMe();
                        switch (_this.$stateParams.message) {
                            case _this.LoginConstants.messages.EMAIL_VERIFIED:
                                _this.showEmailVerified();
                                break;
                            case _this.LoginConstants.messages.EMAIL_VERIFIED_ERROR:
                                _this.showEmailVerified(false);
                                break;
                            default:
                                return;
                        }
                    };
                    this.doLogin = function (email, password, remember_me) {
                        return _this.LoginService.loginCustom(email, password)
                            .then(function (user) {
                            _this.LoginService.welcomePopup(user.firstname);
                            if (remember_me) {
                                _this.LoginService.setRememberMe(email, password);
                            }
                            else {
                                _this.LoginService.forgetRememberMe();
                            }
                            _this.LoginService.redirectAuthenticated();
                        }, function (error) {
                            _this.errorBags = _this.errorTranslate(error);
                        });
                    };
                    this.setRememberMe = function () {
                        var remember_me = _this.LoginService.getRememberMe();
                        if (remember_me) {
                            _this.login.email = remember_me.email;
                            _this.login.password = remember_me.password;
                            _this.login.remember_me = true;
                        }
                    };
                    this.showEmailVerified = function (success) {
                        if (success === void 0) { success = true; }
                        if (success) {
                            _this.isVerified = true;
                        }
                        else {
                            _this.isExpired = true;
                        }
                    };
                    this.showRegistered = function () {
                        _this.notify({
                            message: 'Successfully Registered. Check Your email for verification!',
                            classes: 'alert-success',
                            position: 'right',
                            templateUrl: _this.$rootScope['mainTemplateUrl'] + "notify.html"
                        });
                    };
                    this.init();
                    this.defineScope();
                }
                LoginController.prototype.showLoggingInWithSocial = function () {
                    var _this = this;
                    if (this.$state.current.name == 'main.login.auth_social') {
                        this.loggingIn = true;
                        this.LoginService.loginWithSocial(this.$state.params.token).then(function (msg) {
                            if (msg == 'error')
                                _this.loggingIn = false;
                            else
                                _this.LoginService.welcomePopup(msg.firstname);
                        });
                    }
                };
                LoginController.$inject = [
                    '$scope',
                    '$rootScope',
                    'RegisterService',
                    '$state',
                    '$stateParams',
                    'notify',
                    'LoginConstants',
                    'AppConstants',
                    '$window',
                    'LoginService',
                    'toaster'
                ];
                return LoginController;
            }(BaseController));
            loginModule.controller('LoginController', LoginController);
        })(Login = Modules.Login || (Modules.Login = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var homeModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Home;
        (function (Home) {
            var HomeConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'home/templates/'
                };
                return cons;
            })();
            function HomeConfig($urlRouterProvider, $stateProvider, HomeConstants) {
                var templatePath = HomeConstants.templateUrl;
                $stateProvider
                    .state('main.home', {
                    url: "/",
                    views: {
                        main: {
                            templateUrl: templatePath + "home.html",
                            controller: 'HomeController',
                            controllerAs: 'homeCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['member', 'guest'],
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_HOME'
                    }
                });
            }
            HomeConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'HomeConstants'];
            homeModule = angular.module(App.Config.Ng.module.name + ".home", [])
                .constant('HomeConstants', HomeConstants)
                .config(HomeConfig);
        })(Home = Modules.Home || (Modules.Home = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Home;
        (function (Home) {
            var BaseController = App.Base.BaseController;
            var HomeController = (function (_super) {
                __extends(HomeController, _super);
                function HomeController($scope, $rootScope, $state, $timeout, ResultPageService, AppConstants) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$state = $state;
                    this.$timeout = $timeout;
                    this.ResultPageService = ResultPageService;
                    this.AppConstants = AppConstants;
                    this.search = {
                        date: {
                            startDate: null,
                            endDate: null
                        }
                    };
                    this.defineScope = function () {
                        _this.$scope['selected_address'] = null;
                        _this.$scope.$watch('selected_address', _this.placeOnChanged.bind(_this));
                        _this.minDate = moment();
                    };
                    this.searchStorage = function (selected_address, dateFrom) {
                        console.log(selected_address);
                        _this.ResultPageService.selected_address = selected_address;
                        var params = {
                            latitude: selected_address.geometry.location.lat(),
                            longitude: selected_address.geometry.location.lng(),
                            search: selected_address.formatted_address
                        };
                        if (dateFrom)
                            params.dateFrom = dateFrom;
                        _this.$state.go('main.result_page', params);
                    };
                    this.setDateFrom = function (dateFrom, value) {
                        if (value) {
                            _this.$scope['dateFrom'] = value.format(_this.AppConstants.dateFormat);
                        }
                    };
                    this.placeOnChanged = function (newValue) {
                        if (_.isObject(newValue)) {
                            _this.$scope.selected_address = newValue;
                        }
                    };
                    this.onEnter = function (selected_address, dateFrom) {
                        _this.$timeout(function () {
                            _this.$scope.$apply(function () {
                                _this.searchStorage(_this.$scope.selected_address, dateFrom);
                            });
                        }, 500);
                    };
                    this.defineScope();
                }
                HomeController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'ResultPageService', 'AppConstants'];
                return HomeController;
            }(BaseController));
            homeModule.controller('HomeController', HomeController);
        })(Home = Modules.Home || (Modules.Home = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var forgotPasswordModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ForgotPassword;
        (function (ForgotPassword) {
            var ForgotPasswordConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'forgot_password/templates/'
                };
                return cons;
            })();
            function ForgotPasswordConfig($urlRouterProvider, $stateProvider, ForgotPasswordConstants) {
                var templatePath = ForgotPasswordConstants.templateUrl;
                $stateProvider
                    .state('main.forgot_password', {
                    url: "/ForgotPassword",
                    views: {
                        main: {
                            templateUrl: templatePath + "forgot_password.html",
                            controller: 'ForgotPasswordController',
                            controllerAs: 'forgotPasswordCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'guest',
                            redirectTo: App.Config.Acl.redirects.member
                        },
                        pageTitle: 'PT_FORGOT_PASSWORD'
                    }
                })
                    .state('main.reset_password', {
                    url: "/ResetPassword/:token",
                    views: {
                        main: {
                            templateUrl: templatePath + "reset_password.html",
                            controller: 'ForgotPasswordController',
                            controllerAs: 'forgotPasswordCtrl'
                        },
                        topnavbar: {
                            templateUrl: "" + App.Config.Ng.templates.guest_header,
                            controller: 'MainController',
                            controllerAs: 'mainCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'guest',
                            redirectTo: App.Config.Acl.redirects.member
                        },
                        pageTitle: 'PT_RESET_PASSWORD'
                    }
                });
            }
            ForgotPasswordConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'ForgotPasswordConstants'];
            forgotPasswordModule = angular.module(App.Config.Ng.module.name + ".forgot_password", [])
                .constant('ForgotPasswordConstants', ForgotPasswordConstants)
                .config(ForgotPasswordConfig);
        })(ForgotPassword = Modules.ForgotPassword || (Modules.ForgotPassword = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ForgotPassword;
        (function (ForgotPassword) {
            var BaseController = App.Base.BaseController;
            var ForgotPasswordController = (function (_super) {
                __extends(ForgotPasswordController, _super);
                function ForgotPasswordController($scope, $rootScope, AuthService, Notifications, $state, $stateParams) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.AuthService = AuthService;
                    this.Notifications = Notifications;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.init = function () {
                        if (_.has(_this.$stateParams, 'token')) {
                            _this.token = _this.$stateParams.token;
                        }
                    };
                    this.forgotPassword = function (email) {
                        return _this.AuthService.forgotPassword(email).then(_this.handleSuccess.bind(_this), _this._handleOnError.bind(_this));
                    };
                    this.resetPassword = function (reset) {
                        reset.token = _this.token;
                        return _this.AuthService.resetPassword(reset).then(_this.handleSuccess.bind(_this), _this._handleOnError.bind(_this));
                    };
                    this.handleSuccess = function (resp) {
                        _this.$state.go('main.login');
                        _this.Notifications.notify(resp.notification);
                    };
                    this.init();
                }
                ForgotPasswordController.$inject = ['$scope', '$rootScope', 'AuthService', 'Notifications', '$state', '$stateParams'];
                return ForgotPasswordController;
            }(BaseController));
            forgotPasswordModule.controller('ForgotPasswordController', ForgotPasswordController);
        })(ForgotPassword = Modules.ForgotPassword || (Modules.ForgotPassword = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var accountModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Account;
        (function (Account) {
            var AccountConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'account/templates/'
                };
                return cons;
            })();
            function AccountConfig($urlRouterProvider, $stateProvider, AccountConstants) {
                var templatePath = AccountConstants.templateUrl;
                $urlRouterProvider.when('/${App.Config.Variables.appAlias}/Account', '/${App.Config.Variables.appAlias}/Account/EditProfile');
                $stateProvider
                    .state('main.account', {
                    abstract: true,
                    url: "/Account",
                    views: {
                        main: {
                            templateUrl: templatePath + "account.html",
                            controller: 'AccountController',
                            controllerAs: 'accountCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        }
                    }
                });
            }
            AccountConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'AccountConstants'];
            accountModule = angular.module(App.Config.Ng.module.name + ".account", [])
                .constant('AccountConstants', AccountConstants)
                .config(AccountConfig);
        })(Account = Modules.Account || (Modules.Account = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Account;
        (function (Account) {
            var BaseController = App.Base.BaseController;
            var AccountController = (function (_super) {
                __extends(AccountController, _super);
                function AccountController($scope, $rootScope, AuthService, Notifications, $state, $stateParams) {
                    _super.call(this, $scope, $rootScope);
                    this.AuthService = AuthService;
                    this.Notifications = Notifications;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                }
                AccountController.$inject = ['$scope', '$rootScope', 'AuthService', 'Notifications', '$state', '$stateParams'];
                return AccountController;
            }(BaseController));
            accountModule.controller('AccountController', AccountController);
        })(Account = Modules.Account || (Modules.Account = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var editProfileModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var EditProfile;
        (function (EditProfile) {
            var EditProfileConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'edit_profile/templates/'
                };
                return cons;
            })();
            function EditProfileConfig($urlRouterProvider, $stateProvider, EditProfileConstants) {
                var templatePath = EditProfileConstants.templateUrl;
                $stateProvider
                    .state('main.account.edit_profile', {
                    url: "/EditProfile",
                    views: {
                        "account": {
                            templateUrl: templatePath + "edit_profile.html",
                            controller: 'EditProfileController',
                            controllerAs: 'editProfileCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_EDIT_PROFILE'
                    }
                });
            }
            EditProfileConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'EditProfileConstants'];
            editProfileModule = angular.module(App.Config.Ng.module.name + ".edit_profile", [])
                .constant('EditProfileConstants', EditProfileConstants)
                .config(EditProfileConfig);
        })(EditProfile = Modules.EditProfile || (Modules.EditProfile = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var EditProfile;
        (function (EditProfile) {
            var EditProfileService = (function () {
                function EditProfileService(User, AuthService, Upload, $sessionStorage) {
                    var _this = this;
                    this.User = User;
                    this.AuthService = AuthService;
                    this.Upload = Upload;
                    this.$sessionStorage = $sessionStorage;
                    this.mobile_verification_key = 'onMobileVerification';
                    this.update = function (user) {
                        return _this.User.update(user.id, user).then(function (user) {
                            _this.AuthService.setUser(user);
                            return user;
                        });
                    };
                    this.upload = function (profile_picture, id) {
                        return _this.Upload.upload({
                            url: _this.User.getBaseControllerUrl(_this.User.controllerName, 'upload-profile-picture'),
                            data: {
                                profile_picture: profile_picture,
                                id: id
                            }
                        });
                    };
                    this.sendVerification = function (mobile, id) {
                        return _this.User.sendMobileVerification(mobile, id).then(function (resp) {
                            _this.$sessionStorage.put(_this.mobile_verification_key, 1);
                            _this.AuthService.setUserFields({ mobile: mobile, mobile_verified: 0 });
                        });
                    };
                    this.verifyMobile = function (mobile, mobile_verification_code, id) {
                        return _this.User.verifyMobile(mobile_verification_code, id).then(function (resp) {
                            _this.$sessionStorage.remove(_this.mobile_verification_key);
                            _this.AuthService.setUserFields({
                                mobile_verified: 1,
                                mobile: resp.mobile
                            });
                        });
                    };
                    this.reset = function () {
                        _this.AuthService.setUserFields({
                            mobile_verified: 0,
                            mobile: null
                        });
                        _this.$sessionStorage.remove(_this.mobile_verification_key);
                    };
                    this.sendUserEmailVerification = function () {
                        return _this.User.sendUserEmailVerification();
                    };
                    this.onMobileVerification = this.$sessionStorage.get(this.mobile_verification_key);
                }
                EditProfileService.$inject = ['User', 'AuthService', 'Upload', '$sessionStorage'];
                return EditProfileService;
            }());
            EditProfile.EditProfileService = EditProfileService;
            editProfileModule.service('EditProfileService', EditProfileService);
        })(EditProfile = Modules.EditProfile || (Modules.EditProfile = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var EditProfile;
        (function (EditProfile) {
            var BaseController = App.Base.BaseController;
            var EditProfileController = (function (_super) {
                __extends(EditProfileController, _super);
                function EditProfileController($scope, $rootScope, EditProfileService, toaster, PayoutService, $q, AuthService) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.EditProfileService = EditProfileService;
                    this.toaster = toaster;
                    this.PayoutService = PayoutService;
                    this.$q = $q;
                    this.AuthService = AuthService;
                    this.showVerificationCode = false;
                    this.account = {
                        legal_entity: {
                            type: 'individual'
                        }
                    };
                    this.document = null;
                    this.additional_owner_document_id = null;
                    this.isDocumentUploading = false;
                    this.init = function () {
                        _this.loading();
                        _this.PayoutService.getAccount(_this.$rootScope['user'].id).then(_this.setAccount.bind(_this)).then(function () {
                            _this.ready();
                        });
                    };
                    this.defineScope = function () {
                        _this.$scope.uploadDocument = function (element) {
                            _this.$scope.$apply(function (scope) {
                                var photofile = element.files[0];
                                var reader = new FileReader();
                                var fd = new FormData();
                                var _self = _this;
                                reader.onload = function (e) {
                                    fd.append('document', photofile);
                                    fd.append('user_id', _self.$rootScope['user'].id);
                                    _self.isDocumentUploading = true;
                                    _self.PayoutService.uploadDocument(fd).then(function () {
                                        _self.isDocumentUploading = false;
                                    });
                                };
                                reader.readAsDataURL(photofile);
                            });
                        };
                        _this.$scope.uploadAoDocument = function (element) {
                            _this.$scope.$apply(function (scope) {
                                var photofile = element.files[0];
                                var reader = new FileReader();
                                var fd = new FormData();
                                var _self = _this;
                                reader.onload = function (e) {
                                    fd.append('document', photofile);
                                    _self.isDocumentUploading = true;
                                    _self.PayoutService.uploadDocument(fd).then(function (document) {
                                        _self.isDocumentUploading = false;
                                        _self.additional_owner_document_id = document.id;
                                    });
                                };
                                reader.readAsDataURL(photofile);
                            });
                        };
                    };
                    this.setAccount = function (account) {
                        if (!_.isEmpty(account)) {
                            _this.account = account;
                            if (_.has(_this.account, 'legal_entity'))
                                if (_.has(_this.account.legal_entity, 'additional_owners'))
                                    _this.account.legal_entity.additional_owners = _this.account.legal_entity.additional_owners.length > 0 ? _this.account.legal_entity.additional_owners[0] : {};
                        }
                    };
                    this.mobileOnChange = function (mobile) {
                        if (_this.user.mobile) {
                            if (_this.user.mobile !== mobile) {
                                _this.$rootScope['user'].mobile_verified = 0;
                            }
                            else {
                                _this.$rootScope['user'].mobile_verified = 1;
                            }
                        }
                    };
                    this.edit = function (user, account) {
                        if (_this.profile_picture) {
                            return _this.uploadProfilePicture(user.id).then(function () {
                                _this.updateUser(user);
                            });
                        }
                        return _this.$q.all([
                            _this.updateUser(user),
                            _this.updateOrCreateAccount(user, account)
                        ]).then(function () {
                            _this.toaster.pop({
                                type: 'success',
                                title: 'UPDATED',
                                body: 'PROFILE_UPDATED',
                                showCloseButton: true
                            });
                            _this.errorBags = [];
                        });
                    };
                    this.updateOrCreateAccount = function (user, account) {
                        _this.account.user_id = user.id;
                        _this.account.legal_entity.first_name = user.firstname;
                        _this.account.legal_entity.last_name = user.lastname;
                        if (account.legal_entity.type == 'individual') {
                            _this.account.legal_entity.address = {};
                            _this.account.legal_entity.address = {
                                city: user.city,
                                line1: user.street,
                                postal_code: user.zip
                            };
                        }
                        else {
                            _this.account.legal_entity.personal_address = {
                                city: user.city,
                                line1: user.street,
                                postal_code: user.zip
                            };
                        }
                        if (account.legal_entity.type == 'company') {
                            _this.account.legal_entity.business_tax_id = user.business_tax_id;
                            account.legal_entity.business_tax_id = user.business_tax_id;
                        }
                        if (_this.additional_owner_document_id) {
                            account.legal_entity.document_ao_id = _this.additional_owner_document_id;
                        }
                        return _this.PayoutService.createAccount(account).then(_this.setUserAccount.bind(_this), _this._handleOnError.bind(_this));
                    };
                    this.setUserAccount = function (user) {
                        return _this.PayoutService.getAccount(_this.$rootScope['user'].id)
                            .then(_this.setAccount.bind(_this))
                            .then(function () {
                            _this.AuthService.setUserFields({
                                firstname: user.firstname,
                                lastname: user.lastname,
                                zip: user.zip,
                                street: user.street,
                                city: user.city
                            });
                        });
                    };
                    this.updateUser = function (user) {
                        return _this.EditProfileService.update(user).then(_this.afterUpdate.bind(_this), _this._handleOnError.bind(_this));
                    };
                    this.afterUpdate = function (user) {
                        _this.profile_picture = null;
                        _this.mobile = _this.$rootScope['user'].mobile;
                        _this.showVerificationCode = _this.EditProfileService.onMobileVerification;
                    };
                    this.uploadProfilePicture = function (id) {
                        return _this.EditProfileService.upload(_this.profile_picture, id);
                    };
                    this.sendVerification = function (mobile) {
                        return _this.EditProfileService.sendVerification(mobile, _this.$rootScope['user'].id).then(function () {
                            _this.showVerificationCode = true;
                            _this.$rootScope['user'].mobile_verified = 0;
                            _this.toaster.pop({
                                type: 'success',
                                title: 'MOBILE_VERIFICATION_TITLE',
                                body: 'MOBILE_VERIFICATION_SENT',
                                showCloseButton: true
                            });
                        }, _this._handleOnError.bind(_this));
                    };
                    this.verify = function (mobile, mobile_verification_code) {
                        return _this.EditProfileService.verifyMobile(mobile, mobile_verification_code, _this.$rootScope['user'].id).then(function () {
                            _this.showVerificationCode = false;
                            _this.$rootScope['user'].mobile_verified = 1;
                            _this.EditProfileService.onMobileVerification = false;
                        }, function () {
                            _this.toaster.pop({
                                type: 'error',
                                title: 'MOBILE_VERIFICATION_ERROR_TITLE',
                                body: 'MOBILE_VERIFICATION_ERROR',
                                showCloseButton: true
                            });
                        });
                    };
                    this.reset = function () {
                        _this.showVerificationCode = false;
                        _this.mobile = null;
                        _this.EditProfileService.reset();
                    };
                    this.sendUserEmailVerification = function () {
                        return _this.EditProfileService.sendUserEmailVerification().then(function () {
                            _this.toaster.pop({
                                type: 'success',
                                title: 'SUCCESS',
                                body: 'EMAIL_VERIFICATION_SENT',
                                showCloseButton: true
                            });
                        });
                    };
                    this.user = angular.copy(this.$rootScope['user']);
                    this.mobile = this.user.mobile;
                    this.showVerificationCode = this.EditProfileService.onMobileVerification;
                    this.init();
                    this.defineScope();
                }
                EditProfileController.$inject = ['$scope', '$rootScope', 'EditProfileService', 'toaster', 'PayoutService', '$q', 'AuthService'];
                return EditProfileController;
            }(BaseController));
            editProfileModule.controller('EditProfileController', EditProfileController);
        })(EditProfile = Modules.EditProfile || (Modules.EditProfile = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var storageModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var StorageConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'storage/templates/'
                };
                return cons;
            })();
            function StorageConfig($urlRouterProvider, $stateProvider, StorageConstants) {
                var templatePath = StorageConstants.templateUrl;
                $urlRouterProvider.when('/${App.Config.Variables.appAlias}/Account/Storage/Listing', '/${App.Config.Variables.appAlias}/Account/Storage/Listing/Step1');
                $stateProvider
                    .state('main.account.storage', {
                    url: "/Storage",
                    views: {
                        account: {
                            templateUrl: templatePath + "storage.html",
                            controller: 'StorageController',
                            controllerAs: 'storageCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_MY_STORAGE'
                    }
                })
                    .state('main.account.storage.add_listing', {
                    url: "/Listing",
                    views: {
                        "main@main": {
                            templateUrl: templatePath + "add_listing.html",
                            controller: 'AddListingController',
                            controllerAs: 'addListingCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        }
                    }
                })
                    .state('main.account.storage.add_listing.step1', {
                    url: "/Step1?isNew&isSpecial",
                    views: {
                        "add_listing@main.account.storage.add_listing": {
                            templateUrl: templatePath + "storage.step1.html",
                            controller: 'Step1Controller',
                            controllerAs: 'step1Ctrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_STEP_1'
                    }
                })
                    .state('main.account.storage.add_listing.step1_edit', {
                    url: "/:listing_id/Step1?isNew&isSpecial",
                    views: {
                        "add_listing@main.account.storage.add_listing": {
                            templateUrl: templatePath + "storage.step1.html",
                            controller: 'Step1Controller',
                            controllerAs: 'step1Ctrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_STEP_1'
                    }
                })
                    .state('main.account.storage.add_listing.step2', {
                    url: "/:listing_id/Step2?isNew",
                    views: {
                        "add_listing@main.account.storage.add_listing": {
                            templateUrl: templatePath + "storage.step2.html",
                            controller: 'Step2Controller',
                            controllerAs: 'step2Ctrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_STEP_2'
                    }
                })
                    .state('main.account.storage.add_listing.step3', {
                    url: "/:listing_id/Step3?isNew",
                    views: {
                        "add_listing@main.account.storage.add_listing": {
                            templateUrl: templatePath + "storage.step3.html",
                            controller: 'Step3Controller',
                            controllerAs: 'step3Ctrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_STEP_3'
                    }
                })
                    .state('main.account.storage.add_listing.step4', {
                    url: "/:listing_id/Step4?isNew&isAccepted",
                    views: {
                        "add_listing@main.account.storage.add_listing": {
                            templateUrl: templatePath + "storage.step4.html",
                            controller: 'Step4Controller',
                            controllerAs: 'step4Ctrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_STEP_4'
                    }
                });
            }
            StorageConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'StorageConstants'];
            storageModule = angular.module(App.Config.Ng.module.name + ".storage", [])
                .constant('StorageConstants', StorageConstants)
                .config(StorageConfig);
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var StorageService = (function () {
                function StorageService($q, Listing, AuthService, Helpers) {
                    var _this = this;
                    this.$q = $q;
                    this.Listing = Listing;
                    this.AuthService = AuthService;
                    this.Helpers = Helpers;
                    this.reloadListing = function () {
                        return _this.$q.all([
                            _this.Listing.getAll({ user_id: _this.AuthService.getUser().id }).then(_this.setListings.bind(_this))
                        ]);
                    };
                    this.setListings = function (listings) {
                        _this.listings = listings;
                    };
                    this.deleteListing = function (id) {
                        return _this.Listing.remove(id);
                    };
                    this.deactivateActivateListing = function (id, isActive) {
                        if (isActive) {
                            return _this.Listing.deactivate(id);
                        }
                        else {
                            return _this.Listing.activate(id);
                        }
                    };
                }
                StorageService.$inject = ['$q', 'Listing', 'AuthService', 'HelpersService'];
                return StorageService;
            }());
            Storage.StorageService = StorageService;
            angularModule.service('StorageService', StorageService);
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var BaseController = App.Base.BaseController;
            var StorageController = (function (_super) {
                __extends(StorageController, _super);
                function StorageController($scope, $rootScope, StorageService, $state, AddListingService, AppConstants, toaster, AuthService, $uibModal, StorageConstants, EditProfileService) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.StorageService = StorageService;
                    this.$state = $state;
                    this.AddListingService = AddListingService;
                    this.AppConstants = AppConstants;
                    this.toaster = toaster;
                    this.AuthService = AuthService;
                    this.$uibModal = $uibModal;
                    this.StorageConstants = StorageConstants;
                    this.EditProfileService = EditProfileService;
                    this.init = function () {
                        _this.loading();
                        _this.StorageService.reloadListing().then(function () {
                            _this.listings = _this.StorageService.listings;
                            _this.ready();
                        });
                    };
                    this.addListing = function () {
                        _this.AddListingService.listing = {};
                        _this.AddListingService.isNewListing = true;
                        var isEmailVerified = _this.AuthService.isEmailVerified(), isMobileVerified = _this.AuthService.isMobileVerified();
                        if (!isEmailVerified || !isMobileVerified) {
                            var _self_1 = _this;
                            _this.verificationCheckModal = _this.$uibModal.open({
                                templateUrl: _this.StorageConstants.templateUrl + "modals/email_verification_prompt.modal.html",
                                controller: function () {
                                    var _this = this;
                                    this.mobile = null;
                                    this.showVerificationCode = false;
                                    this.user = _self_1.$rootScope['user'];
                                    this.errorBags = [];
                                    this.mobileOnChange = function (mobile) {
                                        if (_this.user.mobile) {
                                            if (_this.user.mobile !== mobile) {
                                                _this.$rootScope['user'].mobile_verified = 0;
                                            }
                                            else {
                                                _this.$rootScope['user'].mobile_verified = 1;
                                            }
                                        }
                                    };
                                    this.sendVerification = function (mobile) {
                                        return _self_1.EditProfileService.sendVerification(mobile, _self_1.$rootScope['user'].id).then(function () {
                                            _this.showVerificationCode = true;
                                            _self_1.$rootScope['user'].mobile_verified = 0;
                                            _self_1.toaster.pop({
                                                type: 'success',
                                                title: 'MOBILE_VERIFICATION_TITLE',
                                                body: 'MOBILE_VERIFICATION_SENT',
                                                showCloseButton: true
                                            });
                                        }, function (error) {
                                            _this.errorBags = _self_1.errorTranslate(error);
                                        });
                                    };
                                    this.verify = function (mobile, mobile_verification_code) {
                                        return _self_1.EditProfileService.verifyMobile(mobile, mobile_verification_code, _self_1.$rootScope['user'].id).then(function () {
                                            _this.showVerificationCode = false;
                                            _self_1.$rootScope['user'].mobile_verified = 1;
                                            _this.isEmailVerified = true;
                                            isEmailVerified = true;
                                            _self_1.EditProfileService.onMobileVerification = false;
                                        }, function () {
                                            _self_1.toaster.pop({
                                                type: 'error',
                                                title: 'MOBILE_VERIFICATION_ERROR_TITLE',
                                                body: 'MOBILE_VERIFICATION_ERROR',
                                                showCloseButton: true
                                            });
                                        });
                                    };
                                    this.reset = function () {
                                        _this.showVerificationCode = false;
                                        _this.mobile = null;
                                        _self_1.EditProfileService.reset();
                                    };
                                    this.isEmailVerified = isEmailVerified;
                                    this.isMobileVerified = isMobileVerified;
                                    this.cancel = function () {
                                        _self_1.verificationCheckModal.dismiss('cancel');
                                    };
                                },
                                controllerAs: 'ctrl'
                            });
                        }
                        else {
                            _this.$state.go('main.account.storage.add_listing.step1', { isNew: 1 });
                        }
                    };
                    this.updateListing = function (listing) {
                        _this.AddListingService.setListing(angular.copy(listing));
                        _this.AddListingService.isNewListing = false;
                        _this.$state.go('main.account.storage.add_listing.step1_edit', { listing_id: listing.id, isNew: 0, isSpecial: listing.isSpecial });
                    };
                    this.deleteListing = function (listing) {
                        if (!listing.heading) {
                            listing.heading = 'Unamed';
                        }
                        swal({
                            title: "Delete \"" + listing.heading + "\"? ",
                            text: "Your will not be able to recover listing named " + listing.heading + " !",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel pls!",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: false }, function (isConfirm) {
                            if (isConfirm) {
                                _this.StorageService.deleteListing(listing.id).then(function () {
                                    _this.StorageService.reloadListing().then(function () {
                                        _this.listings = _this.StorageService.listings;
                                    });
                                    swal("Deleted!", "Your listing has been deleted", "success");
                                });
                            }
                            else {
                                swal("Cancelled", "Cancelled deletion", "error");
                            }
                        });
                    };
                    this.navigateListingView = function (id, heading, location) {
                        _this.$state.go('main.storage_view', {
                            id: id,
                            dateFrom: moment().format(_this.AppConstants.dateFormat)
                        });
                    };
                    this.deactivateActivateListing = function (listing) {
                        return _this.StorageService.deactivateActivateListing(listing.id, listing.isActive)
                            .then(function (list) {
                            var pos = _.findIndex(_this.listings, { id: listing.id });
                            _this.listings[pos].isActive = list.isActive;
                        }, function (error) {
                            _this.toaster.pop({
                                type: 'error',
                                title: 'Error encountered',
                                body: error.data.message,
                                showCloseButton: true
                            });
                        });
                    };
                    this.init();
                }
                StorageController.$inject = ['$scope', '$rootScope', 'StorageService', '$state', 'AddListingService', 'AppConstants', 'toaster', 'AuthService', '$uibModal', 'StorageConstants', 'EditProfileService'];
                return StorageController;
            }(BaseController));
            storageModule.controller('StorageController', StorageController);
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var AddListing;
            (function (AddListing) {
                var BaseController = App.Base.BaseController;
                var StepController = (function (_super) {
                    __extends(StepController, _super);
                    function StepController($scope, $rootScope, AddListingService, $state, $stateParams, notify, step_no, $q, $window, $uibModal) {
                        var _this = this;
                        _super.call(this, $scope, $rootScope);
                        this.max_step_no = 4;
                        this.isEdit = false;
                        this.isDirty = false;
                        this.isNewListing = false;
                        this.modalInstances = {};
                        this.accepted = false;
                        this.baseInit = function () {
                            if (_.has(_this.$stateParams, 'listing_id')) {
                                _this.isEdit = true;
                                _this.listing_id = _this.$stateParams.listing_id;
                                if (_this.AddListingService.isNewListing && _this.step_no_number > 1) {
                                    _this.AddListingService.isNewListing = true;
                                    _this.isNewListing = _this.AddListingService.isNewListing;
                                }
                                _this.Notifications.notify(CONTROLLER.LISTING_FORM_IS_LOADING);
                                return _this.AddListingService.getListing(_this.$stateParams.listing_id).then(_this._handleListing.bind(_this));
                            }
                            else {
                                _this.AddListingService.isNewListing = true;
                                _this.isNewListing = _this.AddListingService.isNewListing;
                                _this.AddListingService.listing = {};
                                return _this.AddListingService.onReady;
                            }
                        };
                        this.defineListeners = function () {
                            _this.$scope.$watchCollection('add_listing_form', function (newValue, oldValue) {
                                if (newValue) {
                                    _this.isDirty = _this.$scope['add_listing_form'].$dirty;
                                    if (_this.isDirty) {
                                        _this.Notifications.notify('STEPS.UNSAVED');
                                    }
                                }
                            });
                        };
                        this.disgard = function () {
                            _this.refreshFormPrestine();
                            _this.listing = angular.copy(_this.original_listing);
                            if (_.isEmpty(_this.listing.google_address)) {
                                _this.$scope['selected_address'] = null;
                            }
                            else {
                                _this.$scope['selected_address'] = _this.listing.google_address;
                            }
                        };
                        this.refreshFormPrestine = function (listing) {
                            if (listing === void 0) { listing = null; }
                            _this.$scope['add_listing_form'].$setPristine();
                            _this.Notifications.notify('STEPS.SAVED_OR_DISCARD');
                            if (listing)
                                _this.original_listing = angular.copy(listing);
                        };
                        this._handleListing = function (listing) {
                            console.log(listing);
                            _this.original_listing = angular.copy(listing);
                            _this.listing = listing;
                        };
                        this.stopLoading = function () {
                            _this.Notifications.notify(CONTROLLER.LISTING_FORM_IS_DONE);
                        };
                        this.startLoading = function () {
                            _this.Notifications.notify(CONTROLLER.LISTING_FORM_IS_LOADING);
                        };
                        this.confirmOnSave = function () {
                            return _this.$q(function (resolve, reject) {
                                swal({
                                    title: 'Save changes?',
                                    showCancelButton: true,
                                    confirmButtonColor: "#1D84C6",
                                    confirmButtonText: 'Save',
                                    cancelButtonText: "Discard",
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: true,
                                    closeOnCancel: true }, function (isConfirm) {
                                    if (isConfirm) {
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                });
                            });
                        };
                        this.navigateTo = function (listing, route_name) {
                            _this.$state.go(route_name, { listing_id: listing.id, isNew: _this.$stateParams.isNew });
                        };
                        this.showAcceptTerms = function (accepted) {
                            if (accepted === void 0) { accepted = 0; }
                            var _self = _this, deffered = _this.$q.defer();
                            if (_this.$state.params.isNew == 1) {
                                deffered.resolve('new storage');
                                return deffered.promise;
                            }
                            _this.modalInstances.acceptTermsModal = _this.$uibModal.open({
                                templateUrl: _this.$rootScope['modulesTemplateUrl'] + "storage/templates/modals/accept_terms.modal.html",
                                controller: function () {
                                    this.accepted = accepted;
                                    this.cancel = function () {
                                        _self.AddListingService.acceptTerms(0);
                                        _self.accepted = 0;
                                        _self.modalInstances.acceptTermsModal.close('cancel');
                                    };
                                    this.continue = function (accepted) {
                                        _self.AddListingService.acceptTerms(accepted);
                                        _self.accepted = accepted;
                                        _self.modalInstances.acceptTermsModal.close('continue');
                                    };
                                },
                                controllerAs: 'ctrl'
                            });
                            return _this.modalInstances.acceptTermsModal.result;
                        };
                        this.AddListingService = AddListingService;
                        this.$state = $state;
                        this.$stateParams = $stateParams;
                        this.step_no = step_no;
                        this.step_no_number = parseInt(_.replace(this.step_no, 'STEP', ''));
                        this.Notifications = notify;
                        this.Notifications.notify("STEPS." + step_no);
                        this.$q = $q;
                        this.$window = $window;
                        this.$uibModal = $uibModal;
                        this.defineListeners();
                        this.$window.scrollTo(0, 0);
                    }
                    return StepController;
                }(BaseController));
                AddListing.StepController = StepController;
            })(AddListing = Storage.AddListing || (Storage.AddListing = {}));
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var AddListing;
            (function (AddListing) {
                var Step1Controller = (function (_super) {
                    __extends(Step1Controller, _super);
                    function Step1Controller($scope, $rootScope, AddListingService, $state, $stateParams, notify, $window, $q, $uibModal, SpecialAccountService, AuthService) {
                        var _this = this;
                        _super.call(this, $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP1', $q, $window, $uibModal);
                        this.SpecialAccountService = SpecialAccountService;
                        this.AuthService = AuthService;
                        this.users = [];
                        this.selected_listing_types = {};
                        this.selected_accessibility = {};
                        this.isSpecial = false;
                        this.defineListeners = function () {
                            _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                            _this.Notifications.addEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.destroy = function () {
                            _this.Notifications.removeEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.unsavedRedirect = function () {
                            _this.save(_this.listing).then(function () {
                                _this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                                swal.close();
                                _this.navigateTo(_this.listing, _this.AddListingService.afterSaveRoute);
                            });
                        };
                        this.init = function () {
                            _this.startLoading();
                            _this.baseInit().then(function () {
                                _this.AddListingService.onReady.then(function () {
                                    if (_this.AuthService.isAdmin() && _this.isSpecial == 1) {
                                        console.log(_this.AuthService.isAdmin());
                                        _this.SpecialAccountService.getSpecialUsers().then(function (users) {
                                            console.log(users);
                                            _this.users = users;
                                            _this.reset();
                                            _this.stopLoading();
                                        });
                                    }
                                    else {
                                        _this.reset();
                                        _this.stopLoading();
                                    }
                                });
                            });
                        };
                        this.reset = function () {
                            _this.listing_types = _.chunk(_this.AddListingService.getListingTypes(), 4);
                            _this.listing = _.extend(_this.listing, _this.AddListingService.listing);
                            if (_this.isSpecial == 1) {
                                if (_this.listing.user) {
                                    _this.listing.user = _.find(_this.users, { id: _this.listing.user.id });
                                }
                                else {
                                    _this.listing.user = _this.users[0];
                                }
                            }
                        };
                        this.next = function (listing) {
                            _this.$state.go('main.account.storage.add_listing.step2', { listing_id: listing.id, isNew: _this.$stateParams.isNew, isSpecial: _this.$stateParams.isSpecial });
                        };
                        this.save = function (listing, asNew) {
                            if (asNew === void 0) { asNew = false; }
                            _this.startLoading();
                            return _this.showAcceptTerms().then(function (resp) {
                                listing = angular.copy(listing);
                                if (resp == 'cancel') {
                                    listing = angular.copy(_this.original_listing);
                                    _this.stopLoading();
                                }
                                var listing_copy = angular.copy(listing);
                                listing_copy.types = _this.checkInputs(listing.types);
                                listing_copy.accessibility = _this.checkInputs(listing.accessibility);
                                if (_.has(listing_copy, 'other_listing')) {
                                    if (!_.isEmpty(listing_copy.other_listing)) {
                                        var types = _.intersection(listing_copy.types, _.map(_.flatten(_this.listing_types), 'type'));
                                        types.push(listing_copy.other_listing);
                                        listing_copy.types = types;
                                    }
                                }
                                listing_copy['step_no'] = _this.step_no;
                                listing_copy['accept_terms'] = _this.accepted;
                                listing_copy['isSpecial'] = listing_copy.isSpecial == 1 ? listing_copy.isSpecial : _this.$stateParams.isSpecial;
                                return _this.AddListingService.step1(listing_copy).then(function (saved_listing) {
                                    _this.stopLoading();
                                    _this.refreshFormPrestine(listing);
                                    if (asNew) {
                                        _this.next(saved_listing);
                                    }
                                }, _this._handleOnError.bind(_this));
                            }, function (resp) {
                                _this.listing = _this.original_listing;
                                _this.stopLoading();
                            });
                        };
                        this.listing = {
                            access: 'After appointment',
                            own_shared: 'Shared with others',
                            types: {},
                            size_length: 0,
                            size_width: 0
                        };
                        this.isSpecial = this.$stateParams.isSpecial == 1;
                        this.init();
                        this.defineListeners();
                    }
                    Step1Controller.$inject = ['$scope', '$rootScope', 'AddListingService', '$state', '$stateParams', 'Notifications', '$window', '$q', '$uibModal', 'SpecialAccountService', 'AuthService'];
                    return Step1Controller;
                }(AddListing.StepController));
                storageModule.controller('Step1Controller', Step1Controller);
            })(AddListing = Storage.AddListing || (Storage.AddListing = {}));
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var AddListing;
            (function (AddListing) {
                var Step2Controller = (function (_super) {
                    __extends(Step2Controller, _super);
                    function Step2Controller($scope, $rootScope, AddListingService, $state, $timeout, $stateParams, notify, HelpersService, $window, $q, $uibModal) {
                        var _this = this;
                        _super.call(this, $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP2', $q, $window, $uibModal);
                        this.$timeout = $timeout;
                        this.HelpersService = HelpersService;
                        this.map = {
                            center: [59.9127831, 10.761101],
                            zoom: 15,
                            marker: {
                                position: [null]
                            },
                            styles: {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [
                                    { visibility: "off" }
                                ]
                            },
                            clickableIcons: false
                        };
                        this.init = function () {
                            _this.baseInit().then(function () {
                                _this.defineScope();
                                _this.stopLoading();
                            });
                        };
                        this.defineScope = function () {
                            _this.$scope['selected_address'] = null;
                            if (_.has(_this.listing, 'google_address')) {
                                if (!_.isEmpty(_this.listing.google_address)) {
                                    _this.$scope['selected_address'] = _this.listing.google_address;
                                    _this.$timeout(function () {
                                        _this.$scope.$apply(function () {
                                            _this.placeOnChanged(_this.listing.google_address);
                                        });
                                    }, 500);
                                }
                            }
                            _this.$scope.$watch('selected_address', _this.placeOnChanged.bind(_this));
                        };
                        this.defineListeners = function () {
                            _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                            _this.Notifications.addEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.destroy = function () {
                            _this.Notifications.removeEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.unsavedRedirect = function () {
                            _this.save(_this.listing).then(function () {
                                _this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                                swal.close();
                                _this.navigateTo(_this.listing, _this.AddListingService.afterSaveRoute);
                            });
                        };
                        this.placeOnChanged = function (newValue) {
                            if (_.isObject(newValue)) {
                                if (_.isNumber(newValue.geometry.location.lat) && _.isNumber(newValue.geometry.location.lng)) {
                                    _this.setLatLng(parseFloat(_this.listing.latitude), parseFloat(_this.listing.longitude));
                                }
                                else {
                                    _this.setLatLng(newValue.geometry.location.lat(), newValue.geometry.location.lng());
                                }
                                var location_1 = [
                                    _this.lat,
                                    _this.lng
                                ];
                                var isNewAddress = !_.isEqual(_this.listing.google_address, newValue);
                                var address_component = _this.HelpersService.GoogleMap.setAddressComponents(newValue);
                                _this.listing.location = isNewAddress ? address_component.getFullAddressName() : _this.listing.location;
                                _this.listing.country = isNewAddress ? address_component.getCountry() : _this.listing.country;
                                _this.listing.city = isNewAddress ? address_component.getCity() : _this.listing.city;
                                _this.listing.zip = isNewAddress ? address_component.getPostalCode() : _this.listing.zip;
                                _this.map.marker.position = location_1;
                                _this.map.center = location_1;
                                _this.map.zoom = 14;
                            }
                        };
                        this.setLatLng = function (lat, lng) {
                            _this.lat = lat;
                            _this.lng = lng;
                        };
                        this.save = function (listing, route_name) {
                            _this.startLoading();
                            return _this.showAcceptTerms().then(function (resp) {
                                listing = angular.copy(listing);
                                if (resp == 'cancel') {
                                    listing = angular.copy(_this.original_listing);
                                    _this.stopLoading();
                                }
                                var google_address = _this.$scope['selected_address'];
                                var address_component = _this.HelpersService.GoogleMap.setAddressComponents(listing.google_address);
                                var params = {
                                    google_address: google_address,
                                    latitude: _this.lat,
                                    longitude: _this.lng,
                                    location: listing.location,
                                    country: listing.city,
                                    city: listing.city,
                                    zip: listing.zip,
                                    location_description: listing.location_description,
                                    id: listing.id
                                };
                                params['step_no'] = _this.step_no;
                                params['accept_terms'] = _this.accepted;
                                return _this.AddListingService.save(params).then(function (resp) {
                                    _this.stopLoading();
                                    if (route_name) {
                                        _this.navigateTo(listing, route_name);
                                    }
                                    else {
                                        _this.refreshFormPrestine(listing);
                                    }
                                }, function (error) {
                                    _this.errorBags = _this.errorTranslate(error);
                                    _this.stopLoading();
                                });
                            }, function () {
                                _this.stopLoading();
                            });
                        };
                        this.init();
                        this.defineListeners();
                    }
                    Step2Controller.$inject = ['$scope', '$rootScope', 'AddListingService', '$state', '$timeout', '$stateParams', 'Notifications', 'HelpersService', '$window', '$q', '$uibModal'];
                    return Step2Controller;
                }(AddListing.StepController));
                storageModule.controller('Step2Controller', Step2Controller);
            })(AddListing = Storage.AddListing || (Storage.AddListing = {}));
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var AddListing;
            (function (AddListing) {
                var Step3Controller = (function (_super) {
                    __extends(Step3Controller, _super);
                    function Step3Controller($scope, $rootScope, AddListingService, $state, $stateParams, notify, AppConstants, $window, $q, $uibModal) {
                        var _this = this;
                        _super.call(this, $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP3', $q, $window, $uibModal);
                        this.AppConstants = AppConstants;
                        this.uploadOptions = {};
                        this.init = function () {
                            _this.baseInit().then(function () {
                                _this.uploadOptions = _this.uploadConfigs();
                                _this.stopLoading();
                            });
                        };
                        this.defineListeners = function () {
                            _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                            _this.Notifications.addEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.destroy = function () {
                            _this.Notifications.removeEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.unsavedRedirect = function () {
                            _this.save(_this.listing).then(function () {
                                _this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                                swal.close();
                                _this.navigateTo(_this.listing, _this.AddListingService.afterSaveRoute);
                            });
                        };
                        this.save = function (listing, route_name) {
                            _this.startLoading();
                            return _this.showAcceptTerms().then(function (resp) {
                                listing = angular.copy(listing);
                                if (resp == 'cancel') {
                                    listing = angular.copy(_this.original_listing);
                                    _this.stopLoading();
                                }
                                var params = {
                                    accessories: _this.checkInputs(listing.accessories),
                                    heading: listing.heading,
                                    description: listing.description,
                                    id: _this.listing.id
                                };
                                params['step_no'] = _this.step_no;
                                params['accept_terms'] = _this.accepted;
                                return _this.AddListingService.save(params).then(function (resp) {
                                    _this.stopLoading();
                                    if (route_name) {
                                        _this.navigateTo(listing, route_name);
                                    }
                                    else {
                                        _this.refreshFormPrestine(listing);
                                    }
                                }, _this._handleOnError.bind(_this));
                            }, function () {
                                _this.stopLoading();
                            });
                        };
                        this.uploadConfigs = function () {
                            var AddListingService = _this.AddListingService, listing_id = _this.listing_id;
                            var _self = _this;
                            return {
                                options: {
                                    url: _this.AddListingService.uploadUrl,
                                    paramName: 'photo',
                                    maxFilesize: '10',
                                    acceptedFiles: 'image/jpeg, images/jpg, image/png',
                                    addRemoveLinks: true,
                                    params: { listing_id: _this.listing.id },
                                    timeout: 100000
                                },
                                callbacks: {
                                    addedfile: function (file) {
                                        console.log(file, _self.$scope['newFile']);
                                    },
                                    success: function (file, xhr) {
                                        _this.AddListingService.getListing(_this.listing.id).then(function () {
                                            _this.listing['photos'] = _this.AddListingService.listing['photos'];
                                        });
                                    },
                                    error: function (file, xhr) {
                                        _this.AddListingService.getListing(_this.listing.id).then(function () {
                                            _this.listing['photos'] = _this.AddListingService.listing['photos'];
                                        });
                                    }
                                }
                            };
                        };
                        this.deleteImage = function (listing_photo, index) {
                            swal({
                                title: 'Delete Image?',
                                text: 'You will not be able to retrieve this photo.',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, delete it!",
                                cancelButtonText: "No, cancel pls!",
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                                closeOnCancel: false
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    _this.AddListingService.deleteImage(listing_photo.id).then(function () {
                                        _this.listing.photos.splice(index, 1);
                                        swal("Deleted!", "Your listing photo has been deleted", "success");
                                    });
                                }
                                else {
                                    swal("Cancelled", "Cancelled deletion", "error");
                                }
                            });
                        };
                        this.init();
                        this.defineListeners();
                    }
                    Step3Controller.$inject = ['$scope', '$rootScope', 'AddListingService', '$state', '$stateParams', 'Notifications', 'AppConstants', '$window', '$q', '$uibModal'];
                    return Step3Controller;
                }(AddListing.StepController));
                storageModule.controller('Step3Controller', Step3Controller);
            })(AddListing = Storage.AddListing || (Storage.AddListing = {}));
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var AddListing;
            (function (AddListing) {
                var Step4Controller = (function (_super) {
                    __extends(Step4Controller, _super);
                    function Step4Controller($scope, $rootScope, AddListingService, $state, $stateParams, notify, $q, $window, AppConstants, PayoutService, $uibModal) {
                        var _this = this;
                        _super.call(this, $scope, $rootScope, AddListingService, $state, $stateParams, notify, 'STEP4', $q, $window, $uibModal);
                        this.AppConstants = AppConstants;
                        this.PayoutService = PayoutService;
                        this.isSpecial = false;
                        this.init = function () {
                            _this.baseInit().then(function () {
                                _this.stopLoading();
                            });
                            _this.isSpecial = _this.$stateParams.isSpecial;
                        };
                        this.defineListeners = function () {
                            _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                            _this.Notifications.addEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.destroy = function () {
                            _this.Notifications.removeEventListener('STEPS.UNSAVED_REDIRECT', _this.unsavedRedirect.bind(_this));
                        };
                        this.unsavedRedirect = function () {
                            _this.save(_this.listing).then(function () {
                                _this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                                swal.close();
                                if (!_this.accepted)
                                    _this.errorBags = ['KINDLY_ACCEPT_RENTAL_REQUEST'];
                                if (!_this.errorBags.length)
                                    _this.navigateTo(_this.listing, _this.AddListingService.afterSaveRoute);
                            });
                        };
                        this.save = function (listing, route_name, isNext, external_account) {
                            if (isNext === void 0) { isNext = false; }
                            _this.startLoading();
                            return _this.showAcceptTerms(_this.accepted).then(function (resp1) {
                                listing = angular.copy(listing);
                                if (resp1 == 'cancel') {
                                    listing = angular.copy(_this.original_listing);
                                    _this.stopLoading();
                                }
                                var params = {
                                    price_per_month: listing.price_per_month,
                                    no_restrictions_rental_period: listing.no_restrictions_rental_period,
                                    id: listing.id,
                                    isDone: true
                                };
                                params['step_no'] = _this.step_no;
                                return _this.AddListingService.save(params).then(function (resp) {
                                    if (_this.accepted) {
                                        _this.AddListingService.acceptTerms(_this.accepted);
                                    }
                                    _this.stopLoading();
                                    if (route_name) {
                                        _this.navigateTo(listing, route_name);
                                    }
                                    else {
                                        _this.refreshFormPrestine(listing);
                                    }
                                }, function (error) {
                                    _this._handleOnError(error);
                                    _this.stopLoading();
                                });
                            }, function () {
                                _this.stopLoading();
                            });
                        };
                        this.navigateToView = function () {
                            if (_this.isDirty) {
                                _this.confirmOnSave().then(function (isConfirm) {
                                    if (isConfirm) {
                                        return _this.save(_this.listing).then(function () {
                                            _this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                                            swal.close();
                                            _this.proceed();
                                        });
                                    }
                                    else {
                                        _this.Notifications.notify(STEPS.SAVED_OR_DISCARD);
                                        _this.proceed();
                                    }
                                });
                            }
                        };
                        this.proceed = function () {
                            _this.AddListingService.listing = {};
                            if (_this.listing.isSpecial) {
                                _this.$state.go('main.admin.special_listing');
                            }
                            else {
                                _this.$state.go('main.storage_view', {
                                    id: _this.listing.id,
                                    dateFrom: moment().format(_this.AppConstants.dateFormat)
                                });
                            }
                        };
                        this.init();
                        this.defineListeners();
                    }
                    Step4Controller.$inject = ['$scope', '$rootScope', 'AddListingService', '$state', '$stateParams', 'Notifications', '$q', '$window', 'AppConstants', 'PayoutService', '$uibModal'];
                    return Step4Controller;
                }(AddListing.StepController));
                storageModule.controller('Step4Controller', Step4Controller);
            })(AddListing = Storage.AddListing || (Storage.AddListing = {}));
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var AddListing;
            (function (AddListing) {
                var BaseController = App.Base.BaseController;
                var AddListingController = (function (_super) {
                    __extends(AddListingController, _super);
                    function AddListingController($scope, $rootScope, AddListingService, notify, $state, $stateParams, toaster) {
                        var _this = this;
                        _super.call(this, $scope, $rootScope);
                        this.AddListingService = AddListingService;
                        this.notify = notify;
                        this.$state = $state;
                        this.$stateParams = $stateParams;
                        this.toaster = toaster;
                        this.step_no = 'step1';
                        this.init = function () {
                            _this.loading();
                            _this.defineListener();
                        };
                        this.defineListener = function () {
                            _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                            _this.notify.addEventListener('CONTROLLER.LISTING_FORM_IS_LOADING', _this.loading.bind(_this));
                            _this.notify.addEventListener('CONTROLLER.LISTING_FORM_IS_DONE', _this.ready.bind(_this));
                            _this.notify.addEventListener('STEPS.STEP1', _this.wizardActivateColor.bind(_this));
                            _this.notify.addEventListener('STEPS.STEP2', _this.wizardActivateColor.bind(_this));
                            _this.notify.addEventListener('STEPS.STEP3', _this.wizardActivateColor.bind(_this));
                            _this.notify.addEventListener('STEPS.STEP4', _this.wizardActivateColor.bind(_this));
                            _this.notify.addEventListener('STEPS.UNSAVED', _this.changesDetected.bind(_this));
                            _this.notify.addEventListener('STEPS.SAVED_OR_DISCARD', _this.savedOrDiscardDetected.bind(_this));
                        };
                        this.destroy = function () {
                            _this.notify.removeEventListener(CONTROLLER.LISTING_FORM_IS_LOADING, _this.loading.bind(_this));
                            _this.notify.removeEventListener(CONTROLLER.LISTING_FORM_IS_DONE, _this.ready.bind(_this));
                            _this.notify.removeEventListener('STEPS.STEP1', _this.wizardActivateColor.bind(_this));
                            _this.notify.removeEventListener('STEPS.STEP2', _this.wizardActivateColor.bind(_this));
                            _this.notify.removeEventListener('STEPS.STEP3', _this.wizardActivateColor.bind(_this));
                            _this.notify.removeEventListener('STEPS.STEP4', _this.wizardActivateColor.bind(_this));
                            _this.notify.removeEventListener('STEPS.UNSAVED', _this.changesDetected.bind(_this));
                            _this.notify.removeEventListener('STEPS.SAVED_OR_DISCARD', _this.savedOrDiscardDetected.bind(_this));
                        };
                        this.wizardActivateColor = function (event) {
                            var step_no = _.split(event, '.');
                            _this.step_no = step_no[1];
                        };
                        this.wizardTab = function (route_name) {
                            if (_this.$state.params.isNew == 1 && !_this.AddListingService.listing.id) {
                                _this.toaster.pop({
                                    type: 'error',
                                    title: 'CLICK_ADD_LISTING',
                                    body: 'ADD_LISTING_FIRST',
                                    showCloseButton: true
                                });
                            }
                            else {
                                if (_this.AddListingService.isUnsaved) {
                                    _this.AddListingService.afterSaveRoute = route_name;
                                    _this.notify.notify(STEPS.UNSAVED_REDIRECT);
                                }
                                else {
                                    var params = {
                                        listing_id: _this.AddListingService.listing.id
                                    };
                                    if (_this.$state.params.isNew)
                                        params.isNew = _this.$state.params.isNew;
                                    _this.$state.go(route_name, params);
                                }
                            }
                        };
                        this.changesDetected = function () {
                            _this.AddListingService.isUnsaved = true;
                        };
                        this.savedOrDiscardDetected = function () {
                            _this.AddListingService.isUnsaved = false;
                        };
                        this.init();
                    }
                    AddListingController.$inject = ['$scope', '$rootScope', 'AddListingService', 'Notifications', '$state', '$stateParams', 'toaster'];
                    return AddListingController;
                }(BaseController));
                storageModule.controller('AddListingController', AddListingController);
            })(AddListing = Storage.AddListing || (Storage.AddListing = {}));
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Storage;
        (function (Storage) {
            var AddListing;
            (function (AddListing) {
                var AddListingService = (function () {
                    function AddListingService(ListingType, $q, Listing, AuthService, $stateParams, AppConstants, ListingPhoto, SpecialAccountService) {
                        var _this = this;
                        this.ListingType = ListingType;
                        this.$q = $q;
                        this.Listing = Listing;
                        this.AuthService = AuthService;
                        this.$stateParams = $stateParams;
                        this.AppConstants = AppConstants;
                        this.ListingPhoto = ListingPhoto;
                        this.SpecialAccountService = SpecialAccountService;
                        this.listing_types = [];
                        this.users = [];
                        this.isNewListing = false;
                        this.isUnsaved = false;
                        this.init = function () {
                            _this.uploadUrl = _this.AppConstants.apiUrl + "/" + _this.Listing.controllerName + "/upload-listing-photo";
                            var queue = [
                                _this.ListingType.getAll().then(_this.setListingTypes.bind(_this))
                            ];
                            _this.onReady = _this.$q.all(queue);
                        };
                        this.setUsers = function (users) {
                            _this.users = users;
                        };
                        this.getUsers = function () {
                            return _this.users;
                        };
                        this.getListingTypes = function () {
                            return _.filter(_this.listing_types, function (listing_type) {
                                var only_for = _.split(listing_type.only_for_listing, '_');
                                if (_this.$stateParams.isSpecial == 1) {
                                    return _.indexOf(only_for, 'special') > -1;
                                }
                                return _.indexOf(only_for, 'original') > -1;
                            });
                        };
                        this.getListing = function (id) {
                            return _this.Listing.find(id, { listing_id: id }).then(_this.setListing.bind(_this));
                        };
                        this.deleteImage = function (id) {
                            return _this.ListingPhoto.remove(id);
                        };
                        this.setListingTypes = function (listing_types) {
                            _this.listing_types = listing_types;
                        };
                        this.step1 = function (listing) {
                            listing.user_id = listing.isSpecial == 1 ? listing.user.id : _this.AuthService.getUser().id;
                            return _this.save(listing);
                        };
                        this.save = function (listing) {
                            listing.user_id = listing.user_id;
                            return _this.Listing.save(listing).then(_this.setListing.bind(_this));
                        };
                        this.setListing = function (listing) {
                            _this.listing = _this.transformListing(listing);
                            _this.listing.photos = _this.mapPhotos(listing.photos);
                            return _this.listing;
                        };
                        this.transformListing = function (listing) {
                            listing.other_listing = _this.includeOthers(listing.types);
                            listing.types = _this.transformTypes(listing.types, listing);
                            listing.accessibility = _this.checkboxTransform(listing.accessibility);
                            listing.accessories = _this.checkboxTransform(listing.accessories);
                            return listing;
                        };
                        this.transformTypes = function (types, listing) {
                            if (_.isArray(types)) {
                                types = _.intersection(listing.types, _.map(_this.listing_types, 'type'));
                                types = _this.checkboxTransform(listing.types);
                            }
                            return types;
                        };
                        this.includeOthers = function (types) {
                            if (!_.isArray(types)) {
                                types = _.keys(types);
                            }
                            var ltypes = _.map(_this.listing_types, 'type');
                            return _.join(_.filter(types, function (type) {
                                return _.indexOf(ltypes, type) == -1;
                            }), ', ');
                            return types;
                        };
                        this.checkboxTransform = function (keys) {
                            if (_.isArray(keys)) {
                                var ndata_1 = {};
                                _.each(keys, function (key) {
                                    ndata_1[key] = true;
                                });
                                return ndata_1;
                            }
                            return keys;
                        };
                        this.mapPhotos = function (photos) {
                            var baseUrl = App.Config.Variables.baseUrl;
                            return _.map(photos, function (photo) {
                                return {
                                    href: baseUrl + "/" + photo.path,
                                    thumb: baseUrl + "/" + photo.path,
                                    id: photo.id
                                };
                            });
                        };
                        this.acceptTerms = function (accept_terms) {
                            var user = _this.AuthService.getUser();
                            if (!_.isEmpty(user)) {
                                if (!user.accept_terms) {
                                    _this.AuthService.setUserFields({ accept_terms: accept_terms });
                                }
                            }
                        };
                        this.init();
                    }
                    AddListingService.$inject = ['ListingType', '$q', 'Listing', 'AuthService', '$stateParams', 'AppConstants', 'ListingPhoto', 'SpecialAccountService'];
                    return AddListingService;
                }());
                AddListing.AddListingService = AddListingService;
                angularModule.service('AddListingService', AddListingService);
            })(AddListing = Storage.AddListing || (Storage.AddListing = {}));
        })(Storage = Modules.Storage || (Modules.Storage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var resultModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ResultPage;
        (function (ResultPage) {
            var ResultPageConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'result_page/templates/'
                };
                return cons;
            })();
            function ResultConfig($urlRouterProvider, $stateProvider, ResultPageConstants) {
                var templatePath = ResultPageConstants.templateUrl;
                $stateProvider
                    .state('main.result_page', {
                    url: "/ResultPage/:latitude/:longitude?dateFrom&search",
                    views: {
                        main: {
                            templateUrl: templatePath + "result_page.html",
                            controller: 'ResultController',
                            controllerAs: 'resultCtrl'
                        }
                    },
                    data: {
                        pageTitle: 'PT_RESULT_PAGE'
                    }
                });
            }
            ResultConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'ResultPageConstants'];
            resultModule = angular.module(App.Config.Ng.module.name + ".result_page", [])
                .constant('ResultPageConstants', ResultPageConstants)
                .config(ResultConfig);
        })(ResultPage = Modules.ResultPage || (Modules.ResultPage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ResultPage;
        (function (ResultPage) {
            var ResultFilter = (function () {
                function ResultFilter(listings) {
                    var _this = this;
                    this.criteria = [];
                    this.get = function () {
                        return _this.listings;
                    };
                    this.set = function (listings) {
                        _this.listings = listings;
                        return _this;
                    };
                    this.filter = function (criteria) {
                        if (criteria === void 0) { criteria = []; }
                        _this.criteria = criteria;
                        var ranges = _.filter(_this.criteria, { type: 'range' });
                        var strings = _.filter(_this.criteria, { type: 'string' });
                        var arrays = _.filter(_this.criteria, { type: 'array' });
                        _this.listings = _.filter(_this.listings, function (listing) {
                            return _this.frange(listing, ranges)
                                && _this.fstring(listing, strings)
                                && _this.farrays(listing, arrays);
                        });
                        return _this;
                    };
                    this.sort = function (column, order) {
                        if (order === void 0) { order = 'asc'; }
                        _this.listings = _.orderBy(_this.listings, column, order);
                        return _this;
                    };
                    this.addPointsCriteria = function () {
                        var max_distance = _.maxBy(_this.listings, 'distance_in_km');
                        if (!_.isEmpty(max_distance))
                            max_distance = max_distance.distance_in_km;
                        _this.listings = _.map(_this.listings, function (listing) {
                            listing.points = (parseFloat(listing.price_per_month) / 100) + parseFloat(listing.distance_in_km);
                            return listing;
                        });
                        return _this;
                    };
                    this.frange = function (listing, ranges) {
                        var result = true;
                        _.each(ranges, function (range) {
                            if ((listing[range.column] >= range.values[0] && listing[range.column] <= range.values[1]) == false)
                                result = false;
                        });
                        return result;
                    };
                    this.fnumber = function (listing, numbers) {
                        return true;
                    };
                    this.farrays = function (listing, arrays) {
                        var result = true;
                        _.each(arrays, function (arr) {
                            if (!_.isEqual(_.intersection(arr.values, listing[arr.column]), arr.values)) {
                                result = false;
                            }
                        });
                        return result;
                    };
                    this.fstring = function (listing, strings) {
                        var result = true;
                        _.each(strings, function (str) {
                            if (_.indexOf(str.values, listing[str.column]) == -1)
                                return result = false;
                        });
                        return result;
                    };
                    this.listings = listings;
                }
                ResultFilter.filterReverse = function (criteria) {
                    if (criteria === void 0) { criteria = []; }
                    var ranges = _.filter(criteria, { type: 'range' });
                    var strings = _.filter(criteria, { type: 'string' });
                    var arrays = _.filter(criteria, { type: 'array' });
                    var filters = {};
                    _.each(ranges, function (o) {
                        filters[o.column] = {};
                        filters[o.column]['min'] = o.values[0];
                        filters[o.column]['max'] = o.values[1];
                    });
                    _.each(_.concat(strings, arrays), function (o) {
                        filters[o.column] = {};
                        _.each(o.values, function (so) {
                            filters[o.column][so] = true;
                        });
                    });
                    return filters;
                };
                return ResultFilter;
            }());
            ResultPage.ResultFilter = ResultFilter;
            var ResultPageService = (function () {
                function ResultPageService(Listing, $rootScope, AppConstants, $filter, Helpers) {
                    var _this = this;
                    this.Listing = Listing;
                    this.$rootScope = $rootScope;
                    this.AppConstants = AppConstants;
                    this.$filter = $filter;
                    this.Helpers = Helpers;
                    this.smartZoomConfig = {
                        noOfListings: 5,
                        maxZoom: 50,
                        minZoom: .5
                    };
                    this.getResults = function (coordinates, params) {
                        if (params === void 0) { params = {}; }
                        return _this.Listing.getResults(coordinates[0], coordinates[1]);
                    };
                    this.raduisToZoom = function (radius) {
                        return Math.round(14 - Math.log(radius) / Math.LN2);
                    };
                    this.ResultFilter = function (listings) {
                        return (new ResultFilter(listings));
                    };
                    this.FilterReverse = function (criteria) {
                        if (criteria === void 0) { criteria = []; }
                        return ResultFilter.filterReverse(criteria);
                    };
                    this.transformListing = function (listings) {
                        return _.map(listings, function (listing) {
                            listing = _this.Listing.transform(listing);
                            var cover_image = _this.$rootScope['resource_path'] + "/no_image_thumb.gif";
                            if (listing.photos.length == 0)
                                listing['cover_image'] = cover_image;
                            if (listing.photos.length > 0)
                                listing['cover_image'] = _this.$rootScope['baseUrl'] + "/" + listing.photos[0].path;
                            listing.price_per_month = parseInt(listing.price_per_month);
                            var address_component = _this.Helpers.GoogleMap.setAddressComponents(listing.google_address);
                            listing.location = address_component.getFullAddressName();
                            listing.zip = !_.isEmpty(listing.zip) ? listing.zip : address_component.getPostalCode();
                            listing.city = !_.isEmpty(listing.city) ? listing.city : address_component.getCity();
                            return listing;
                        });
                    };
                    this.smartZoom = function (listings, mapInstance, default_zoom) {
                        var listings_in_range = _.filter(listings, function (listing) {
                            return listing.distance_in_km <= _this.smartZoomConfig.maxZoom;
                        });
                        if (listings_in_range.length >= _this.smartZoomConfig.noOfListings) {
                            listings_in_range = listings_in_range.slice(0, _this.smartZoomConfig.noOfListings);
                        }
                        console.log(listings_in_range);
                        _this.applyFitBounds(listings_in_range, mapInstance);
                        return listings_in_range;
                    };
                    this.applyFitBounds = function (listings, mapInstance) {
                        var center = mapInstance.getCenter();
                        var _a = [center.lat(), center.lng()], lat = _a[0], lng = _a[1];
                        if (!_.isEmpty(listings)) {
                            listings = _.orderBy(listings, 'distance_in_km', 'asc');
                            var distance = listings[listings.length - 1].distance_in_km;
                            if (listings[listings.length - 1].distance_in_km < _this.smartZoomConfig.minZoom) {
                                distance = _this.smartZoomConfig.minZoom;
                            }
                            var bound = new google.maps.LatLngBounds();
                            var circle = new google.maps.Circle({
                                center: { lat: lat, lng: lng },
                                radius: distance * 1000
                            });
                            mapInstance.fitBounds(circle.getBounds());
                        }
                        return listings;
                    };
                    this.listingAnnotation = function (listing, listing_element) {
                        listing = _.clone(listing);
                        if (!_.isEmpty(listing.description)) {
                            if (listing.description.length > 20) {
                                listing.description = listing.description.substring(0, 20) + '...';
                            }
                            if (listing.heading.length > 20) {
                                listing.heading = listing.heading.substring(0, 20) + '...';
                            }
                        }
                        return {
                            content: "<div class=\"marker-view " + listing_element + " cursor-pointer\">\n                            <div class=\"picture overflow-hidden\">\n                                <img src=\"" + listing['cover_image'] + "\" alt=\"\">\n                            </div>\n                            <div class=\"price\">\n                                <h4>" + listing.price_per_month + "</h4>\n                                <h5>NOK/MND</h5>\n                            </div>\n                            <div class=\"info\">\n                                <div class=\"img-container\">\n                                    <div class=\"contain\">\n                                        <img src=\"" + listing.user.profile_picture + "\" alt=\"\">\n                                    </div>\n                                </div>\n                                <div class=\"details\">\n                                    <h4>" + listing.heading + "</h4>\n                                    <h5>" + listing.description + "</h5>\n                                </div>\n                            </div>\n                        </div>",
                            position: new google.maps.LatLng(listing.latitude, listing.longitude),
                            closeBoxMargin: "12px 4px 2px 2px",
                            infoBoxClearance: new google.maps.Size(1, 1),
                            pixelOffset: new google.maps.Size(-112, -193),
                            alignBottom: true,
                            closeBoxURL: '',
                            zIndex: 10
                        };
                    };
                }
                ResultPageService.$inject = ['Listing', '$rootScope', 'AppConstants', '$filter', 'HelpersService'];
                return ResultPageService;
            }());
            ResultPage.ResultPageService = ResultPageService;
            registerModule.service('ResultPageService', ResultPageService);
        })(ResultPage = Modules.ResultPage || (Modules.ResultPage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ResultPage;
        (function (ResultPage) {
            var BaseController = App.Base.BaseController;
            var ResultController = (function (_super) {
                __extends(ResultController, _super);
                function ResultController($scope, $rootScope, $stateParams, $timeout, ResultPageService, $state, usSpinnerService, $filter, AppConstants, RequestService, HelpersService) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$stateParams = $stateParams;
                    this.$timeout = $timeout;
                    this.ResultPageService = ResultPageService;
                    this.$state = $state;
                    this.usSpinnerService = usSpinnerService;
                    this.$filter = $filter;
                    this.AppConstants = AppConstants;
                    this.RequestService = RequestService;
                    this.HelpersService = HelpersService;
                    this.map = {
                        center: [59.9127831, 10.761101],
                        zoom: 13,
                        marker: {
                            position: [59.9127831, 10.761101],
                            draggable: false,
                            icon: '/img/marker.png'
                        },
                        markers: []
                    };
                    this.zoom = 9;
                    this.listings = [];
                    this.spinnerKey = 'map-spinner';
                    this.markers = [];
                    this.activeListings = [];
                    this.isFilterVisible = false;
                    this.filterOptions = {
                        price_per_month: {
                            min: 0,
                            max: 5000
                        },
                        price_per_month_initial: {
                            min: 0,
                            max: 5000
                        },
                        size: {
                            min: 0,
                            max: 5000
                        },
                        size_initial: {
                            min: 0,
                            max: 5000
                        }
                    };
                    this.finalCriteria = [];
                    this.criteria = [];
                    this.criteriaTemp = [];
                    this.filterCount = 0;
                    this.definedEvents = false;
                    this.isDateChanged = false;
                    this.init = function () {
                        _this.$scope.$on('$destroy', _this.destroy.bind(_this));
                        _this.usSpinnerService.spin(_this.spinnerKey);
                        _this.loadResults();
                        var selected_address = _this.ResultPageService.selected_address;
                        if (selected_address) {
                            _this.$timeout(function () {
                                _this.$scope.$apply(function () {
                                    _this.$scope.selected_address = _this.ResultPageService.selected_address;
                                });
                            }, 100);
                        }
                    };
                    this.destroy = function () {
                        if (_this.reloadParamsTimeout)
                            _this.$timeout.cancel(_this.reloadParamsTimeout);
                    };
                    this.defineScope = function () {
                        _this.$scope['selected_address'] = null;
                        _this.$scope['dateFrom'] = _this.getDateFrom();
                        _this.$scope.$watch('selected_address', _this.placeOnChanged.bind(_this));
                    };
                    this.getDateFrom = function () {
                        return (_this.$stateParams.dateFrom)
                            ? moment(_this.$stateParams.dateFrom, _this.AppConstants.dateFormat).format()
                            : null;
                    };
                    this.reloadStateParams = function (params, from) {
                        if (params === void 0) { params = {}; }
                        if (_this.reloadParamsTimeout) {
                            _this.$timeout.cancel(_this.reloadParamsTimeout);
                        }
                        _this.reloadParamsTimeout = _this.$timeout(function () {
                            var defaultParams = {
                                latitude: _this.latitude,
                                longitude: _this.longitude
                            };
                            if (!_.isEmpty(_this.$scope['selected_address'])) {
                                defaultParams.search = _this.$scope['selected_address'].formatted_address;
                                _this.HelpersService.gtmSearch();
                            }
                            _this.$state.go('main.result_page', _.extend(defaultParams, params), { notify: false });
                            history.replaceState({}, _this.$state.current.data, window.location.href);
                        }, 500);
                    };
                    this.setDateFrom = function (dateFrom, value) {
                        if (value) {
                            dateFrom = value.format(_this.AppConstants.dateFormat);
                            _this.dateFrom = dateFrom;
                            _this.$scope.dateFrom = dateFrom;
                            _this.isDateChanged = true;
                            if (dateFrom !== _this.$stateParams.dateFrom)
                                _this.reloadStateParams({ dateFrom: dateFrom }, 'setDateFrom');
                        }
                    };
                    this.defineEvents = function () {
                        if (!_this.definedEvents) {
                            _this.mapInstance.addListener('dragend', _this.dragEnd.bind(_this));
                            _this.mapInstance.addListener('dragstart', _this.dragStart.bind(_this));
                            _this.mapInstance.addListener('zoom_changed', _this.zoomChanged.bind(_this));
                            _this.mapInstance.addListener('click', _this.mapClicked.bind(_this));
                            google.maps.event.trigger(_this.mapInstance, 'resize');
                            _this.definedEvents = true;
                        }
                    };
                    this.mapClicked = function () {
                        if (_this.activeMarker) {
                            _this.activeMarker.close();
                        }
                    };
                    this.boundsChanged = function () {
                        if (_this.bouncedChangedTimeout) {
                            _this.$timeout.cancel(_this.bouncedChangedTimeout);
                        }
                        _this.bouncedChangedTimeout = _this.$timeout(function () {
                            var center = _this.mapInstance.getCenter();
                            _this.zoom = _this.mapInstance.getZoom();
                            _this.setLatLng(center.lat(), center.lng());
                            _this.reloadStateParams({}, 'bounsedChanged');
                        }, 500);
                    };
                    this.zoomChanged = function () {
                        _this.dragStart();
                        _this.dragEnd();
                    };
                    this.dragStart = function () {
                        _this.usSpinnerService.spin(_this.spinnerKey);
                        _.each(_this.markers, function (marker) {
                            if (!_this.mapInstance.getBounds().contains(marker.getPosition())) {
                                marker.close();
                            }
                        });
                    };
                    this.removeMarkers = function () {
                        _.each(_this.markers, function (marker) {
                            marker.close();
                        });
                    };
                    this.dragEnd = function () {
                        _this.$timeout(function () {
                            _this.showMarkers(_this.filterListing(_this.listings));
                            _this.resetRangeValues();
                            _this.filterOptions.size.min = _this.filterOptions.size_initial.min;
                            _this.filterOptions.price_per_month.max = _this.filterOptions.price_per_month_initial.max;
                            _this.filterOptions.price_per_month.min = _this.filterOptions.price_per_month_initial.min;
                            _this.filterOptions.size.max = _this.filterOptions.price_per_month_initial.max;
                            _this.usSpinnerService.stop(_this.spinnerKey);
                            var center = _this.mapInstance.getCenter();
                            _this.zoom = _this.mapInstance.getZoom();
                            _this.setLatLng(center.lat(), center.lng());
                            _this.reloadStateParams({}, 'dragEnd');
                        }, 1500);
                    };
                    this.loadResults = function () {
                        _this.usSpinnerService.spin(_this.spinnerKey);
                        return _this.ResultPageService.getResults([_this.latitude, _this.longitude]).then(_this.setMapResults.bind(_this));
                    };
                    this.filterListing = function (listings) {
                        google.maps.event.trigger(_this.mapInstance, 'resize');
                        _this.activeListings = _.filter(listings, function (listing) {
                            return _this.mapInstance.getBounds().contains(new google.maps.LatLng(listing.latitude, listing.longitude));
                        });
                        _this.activeListings = _this.ResultPageService.ResultFilter(_this.activeListings)
                            .filter(_this.finalCriteria)
                            .addPointsCriteria()
                            .sort('points', 'asc')
                            .get();
                        return _this.activeListings;
                    };
                    this.showMarkers = function (listings) {
                        var _self = _this;
                        _.each(listings, function (listing) {
                            if (_.has(listing, 'price_per_month')) {
                                var listing_element_1 = "listing-" + listing.id, listing_marker_element_1 = "listing-marker-" + listing.id;
                                var infobox_1 = new InfoBox({
                                    content: "<div class=\"listing-marker " + listing_element_1 + "\" id=\"" + listing_element_1 + "\"><b>" + listing.price_per_month + "</b>&nbsp;<span>NOK</span></div>",
                                    disableAutoPan: false,
                                    closeBoxURL: '',
                                    position: new google.maps.LatLng(listing.latitude, listing.longitude),
                                    zIndex: 1,
                                    pixelOffset: new google.maps.Size(-48, -44),
                                    alignBottom: true
                                });
                                google.maps.event.addListener(infobox_1, 'domready', function (element) {
                                    angular.element(document).find("." + listing_element_1).bind('click', function () {
                                        if (_this.activeMarker) {
                                            _this.activeMarker.close();
                                        }
                                        _this.activeMarker = infobox_1;
                                        var active_infobox = new InfoBox(_this.ResultPageService.listingAnnotation(listing, listing_marker_element_1));
                                        google.maps.event.addListener(active_infobox, 'domready', function (element) {
                                            angular.element(document).find("." + listing_marker_element_1).bind('click', function () {
                                                _this.navigateListingView(listing.id, listing.heading, listing.location, _self);
                                            });
                                        });
                                        _this.activeMarker = active_infobox;
                                        active_infobox.open(_this.mapInstance);
                                    });
                                });
                                _this.markers.push(infobox_1);
                                infobox_1.open(_this.mapInstance);
                            }
                        });
                    };
                    this.setMapResults = function (listings) {
                        _this.listings = _this.ResultPageService.transformListing(listings);
                        var options = _this.getMapOptions();
                        _this.mapInstance.setCenter(options.center);
                        _this.mapInstance.setZoom(options.zoom);
                        var smart_zoom = _this.ResultPageService.smartZoom(_this.listings, _this.mapInstance, 9);
                        _this.showMarkers(_this.filterListing(listings));
                        _this.defineEvents();
                        _this.usSpinnerService.stop(_this.spinnerKey);
                        _this.resetRangeValues();
                        _this.filterOptions.price_per_month.max = _this.filterOptions.price_per_month_initial.max;
                        _this.filterOptions.price_per_month.min = _this.filterOptions.price_per_month_initial.min;
                        _this.filterOptions.size.min = _this.filterOptions.size_initial.min;
                        _this.filterOptions.size.max = _this.filterOptions.price_per_month_initial.max;
                    };
                    this.resetRangeValues = function () {
                        var activeListings = _.filter(_this.listings, function (listing) {
                            return _this.mapInstance.getBounds().contains(new google.maps.LatLng(listing.latitude, listing.longitude));
                        });
                        _this.filterOptions.price_per_month_initial.min = 0;
                        var max_pm = _.maxBy(activeListings, function (o) {
                            return o.price_per_month;
                        });
                        if (_.has(max_pm, 'price_per_month')) {
                            _this.filterOptions.price_per_month_initial.max = max_pm.price_per_month;
                        }
                        else {
                            _this.filterOptions.price_per_month_initial.max = 0;
                        }
                        _this.filterOptions.size_initial.min = 0;
                        var max_area = _.maxBy(activeListings, function (o) {
                            return o.area;
                        });
                        if (_.has(max_area, 'area')) {
                            _this.filterOptions.size_initial.max = max_area.area;
                        }
                        else {
                            _this.filterOptions.size_initial.max = 0;
                        }
                    };
                    this.placeOnChanged = function (newValue) {
                        if (!_.isNull(newValue)) {
                            _this.setLatLng(newValue.geometry.location.lat(), newValue.geometry.location.lng());
                            _this.reloadResults();
                        }
                    };
                    this.useMyLocation = function () {
                        return navigator.geolocation.getCurrentPosition(function (position) {
                            _this.setLatLng(position.coords.latitude, position.coords.longitude);
                            _this.reloadResults();
                        });
                    };
                    this.reloadResults = function () {
                        _this.reloadStateParams({}, 'reloadResults');
                        _this.loadResults();
                    };
                    this.getMapOptions = function () {
                        return {
                            center: new google.maps.LatLng(_this.latitude, _this.longitude),
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            zoom: _this.zoom,
                            streetViewControl: false,
                            styles: {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [
                                    { visibility: "off" }
                                ]
                            },
                            clickableIcons: false
                        };
                    };
                    this.setLatLng = function (lat, lng) {
                        _this.latitude = lat;
                        _this.longitude = lng;
                    };
                    this.filter = function () {
                        _this.removeMarkers();
                        _this.showMarkers(_this.activeListings);
                    };
                    this.doFilter = function (criteria, price_per_month, area) {
                        _this.filterCount = 0;
                        var str_criterias = ['access', 'own_shared'], arr_criterias = ['types', 'accessibility', 'accessories'], finalCriteria = [];
                        if (!_.isEqual(price_per_month, _this.filterOptions.price_per_month_initial)) {
                            _this.filterCount += 1;
                            finalCriteria.push({ type: 'range', column: 'price_per_month', values: [price_per_month.min, price_per_month.max] });
                        }
                        if (!_.isEqual(area, _this.filterOptions.size_initial)) {
                            _this.filterCount += 1;
                            finalCriteria.push({ type: 'range', column: 'area', values: [area.min, area.max] });
                        }
                        criteria = _.mapValues(criteria, function (value) {
                            return _.keys(_.pickBy(value, function (svalue, skey) {
                                return svalue;
                            }));
                        });
                        _.each(str_criterias, function (c) {
                            if (_.has(criteria, c)) {
                                if (!_.isEmpty(criteria[c])) {
                                    _this.filterCount += 1;
                                    finalCriteria.push({
                                        type: 'string',
                                        column: c,
                                        values: criteria[c]
                                    });
                                }
                            }
                        });
                        _.each(arr_criterias, function (c) {
                            if (_.has(criteria, c)) {
                                if (!_.isEmpty(criteria[c])) {
                                    _this.filterCount += 1;
                                    finalCriteria.push({
                                        type: 'array',
                                        column: c,
                                        values: criteria[c]
                                    });
                                }
                            }
                        });
                        _this.finalCriteria = finalCriteria;
                        _this.removeMarkers();
                        _this.activeListings = _this.filterListing(_this.listings);
                        _this.showMarkers(_this.activeListings);
                    };
                    this.resetFilter = function () {
                        _this.filterCount = 0;
                        _this.finalCriteria = [];
                        _this.criteria.access = [];
                        _this.criteria.accessories = [];
                        _this.criteria.own_shared = [];
                        _this.criteria.accessibility = [];
                        _this.criteria.types = [];
                        _this.filterOptions.price_per_month.min = _this.filterOptions.price_per_month_initial.min;
                        _this.filterOptions.price_per_month.max = _this.filterOptions.price_per_month_initial.max;
                        _this.filterOptions.size.min = _this.filterOptions.size_initial.min;
                        _this.filterOptions.size.max = _this.filterOptions.size_initial.max;
                        _this.activeListings = _this.filterListing(_this.listings);
                        _this.resetRangeValues();
                        _this.filterOptions.size.min = _this.filterOptions.size_initial.min;
                        _this.filterOptions.price_per_month.max = _this.filterOptions.price_per_month_initial.max;
                        _this.filterOptions.price_per_month.min = _this.filterOptions.price_per_month_initial.min;
                        _this.filterOptions.size.max = _this.filterOptions.price_per_month_initial.max;
                        _this.showMarkers(_this.activeListings);
                    };
                    this.cancelFilter = function () {
                        if (_.isEmpty(_this.finalCriteria)) {
                            _this.isFilterVisible = false;
                        }
                        else {
                            _this.criteria = _this.ResultPageService.FilterReverse(_this.finalCriteria);
                            if (_.has(_this.criteria, 'price_per_month')) {
                                _this.filterOptions.price_per_month.max = _this.criteria.price_per_month.max;
                                _this.filterOptions.price_per_month.min = _this.criteria.price_per_month.min;
                            }
                            if (_.has(_this.criteria, 'area')) {
                                _this.filterOptions.size.max = _this.criteria.area.max;
                                _this.filterOptions.size.min = _this.criteria.area.min;
                            }
                        }
                        _this.isFilterVisible = false;
                    };
                    this.navigateListingView = function (id, heading, location, parent) {
                        if (parent === void 0) { parent = {}; }
                        _this.ResultPageService.selected_address = null;
                        _this.RequestService.removeRequest();
                        var dateFrom = _.isEmpty(parent)
                            ? !_.isNull(_this.$scope['dateFrom']) ? moment(_this.$scope.dateFrom, _this.AppConstants.dateTimeFormatStore).format(_this.AppConstants.dateFormat) : undefined
                            : parent.$scope.dateFrom;
                        if (_this.isDateChanged)
                            dateFrom = _this.$scope.dateFrom;
                        _this.$state.go('main.storage_view', {
                            id: id,
                            dateFrom: dateFrom,
                            prev: 'result-page'
                        });
                    };
                    this.latitude = this.$stateParams.latitude;
                    this.longitude = this.$stateParams.longitude;
                    this.mapInstance = new google.maps.Map(document.getElementById("mapInstance"), this.getMapOptions());
                    this.minDate = moment();
                    this.init();
                    this.defineScope();
                }
                ResultController.$inject = ['$scope', '$rootScope', '$stateParams', '$timeout', 'ResultPageService', '$state', 'usSpinnerService', '$filter', 'AppConstants', 'RequestService', 'HelpersService'];
                return ResultController;
            }(BaseController));
            resultModule.controller('ResultController', ResultController);
        })(ResultPage = Modules.ResultPage || (Modules.ResultPage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var storageViewModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var StorageView;
        (function (StorageView) {
            var StorageViewConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'storage_view/templates/'
                };
                return cons;
            })();
            function StorageViewConfig($urlRouterProvider, $stateProvider, StorageViewConstants) {
                var templatePath = StorageViewConstants.templateUrl;
                $stateProvider
                    .state('main.storage_view', {
                    url: "/ListingView/:id?dateFrom&prev&requestSaved",
                    views: {
                        main: {
                            templateUrl: templatePath + "storage_view.html",
                            controller: 'StorageViewController',
                            controllerAs: 'storageViewCtrl'
                        }
                    },
                    data: {
                        pageTitle: 'PT_LISTING_VIEW'
                    }
                });
            }
            StorageViewConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'StorageViewConstants'];
            storageViewModule = angular.module(App.Config.Ng.module.name + ".storage_view", [])
                .constant('StorageViewConstants', StorageViewConstants)
                .config(StorageViewConfig);
        })(StorageView = Modules.StorageView || (Modules.StorageView = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var StorageView;
        (function (StorageView) {
            var StorageViewService = (function () {
                function StorageViewService(Listing) {
                    var _this = this;
                    this.Listing = Listing;
                    this.getListing = function (id) {
                        return _this.Listing.getListing(id, { listing_id: id });
                    };
                    this.transformListing = function (listing) {
                        return _this.Listing.transform(listing);
                    };
                }
                StorageViewService.$inject = ['Listing'];
                return StorageViewService;
            }());
            StorageView.StorageViewService = StorageViewService;
            storageViewModule.service('StorageViewService', StorageViewService);
        })(StorageView = Modules.StorageView || (Modules.StorageView = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var StorageView;
        (function (StorageView) {
            var BaseController = App.Base.BaseController;
            var StorageViewController = (function (_super) {
                __extends(StorageViewController, _super);
                function StorageViewController($scope, $rootScope, $stateParams, StorageViewService, AppConstants, $timeout, $anchorScroll, $location, Helpers, $state, RequestService, $sce) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$stateParams = $stateParams;
                    this.StorageViewService = StorageViewService;
                    this.AppConstants = AppConstants;
                    this.$timeout = $timeout;
                    this.$anchorScroll = $anchorScroll;
                    this.$location = $location;
                    this.Helpers = Helpers;
                    this.$state = $state;
                    this.RequestService = RequestService;
                    this.$sce = $sce;
                    this.map = {
                        center: [],
                        styles: {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [
                                { visibility: "off" }
                            ]
                        },
                        clickableIcons: false
                    };
                    this.init = function () {
                        _this.$rootScope['meta_description'] = "https://www.b4r.no/boder/lager-til-leie-i-kjeller/" + _this.$stateParams.id;
                        _this.loading();
                        _this.$scope['dateFrom'] = _this.getDateFrom();
                        _this.StorageViewService.getListing(_this.$stateParams.id).then(_this.setListing.bind(_this));
                        if (!_.isEmpty(_this.RequestService.getRequest()) && _this.$stateParams.requestSaved == 1) {
                            _this.sendRequest();
                        }
                        else {
                            _this.RequestService.removeRequest();
                        }
                        _this.minDate = moment();
                    };
                    this.getDateFrom = function () {
                        console.log(_this.$stateParams.dateFrom);
                        return (_this.$stateParams.dateFrom)
                            ? moment(_this.$stateParams.dateFrom, _this.AppConstants.dateFormat).format()
                            : moment();
                    };
                    this.setListing = function (listing) {
                        _this.listing = _this.StorageViewService.transformListing(listing);
                        _this.StorageViewService.listing = _this.listing;
                        _this.listing.photos = _.map(listing.photos, function (photo) {
                            photo.path = _this.$rootScope['baseUrl'] + "/" + photo.path;
                            return photo;
                        });
                        _this.listing.created_at = moment(_this.listing.created_at, _this.AppConstants.dateFormat).format('Do MMM YYYY');
                        _this.listing.description = _this.$sce.trustAsHtml(listing.description);
                        console.log(_this.listing.description);
                        if (_.isEmpty(listing.photos)) {
                            _this.listing.photos = [];
                            _this.listing.photos.push({
                                path: _this.$rootScope['resource_path'] + "/no_image_thumb.gif"
                            });
                        }
                        _this.$timeout(function () {
                            _this.$scope.$apply(function () {
                                _this.map.center = [_this.listing.google_address.geometry.location.lat, _this.listing.google_address.geometry.location.lng];
                            });
                        }, 500);
                        _this.listing.user['ratings'] = _.filter(_this.listing.user['ratings'], function (rating) {
                            return rating.from_user_id;
                        });
                        _this.listing.user['ratings'] = _.map(_this.listing.user['ratings'], function (rating) {
                            rating.reviewer = _this.Helpers.transformProfilePicture(rating.reviewer);
                            rating.rating = parseInt(rating.rating);
                            return rating;
                        });
                        _this.listing['listing_rating'] = _.meanBy(_this.listing.user['ratings'], 'rating');
                        var address_component = _this.Helpers.GoogleMap.setAddressComponents(_this.listing.google_address);
                        _this.listing.zip = !_.isEmpty(_this.listing.zip) ? _this.listing.zip : address_component.getPostalCode();
                        _this.listing.city = !_.isEmpty(_this.listing.city) ? _this.listing.city : address_component.getCity();
                        _this.listing.user.created_at = _this.listing.user.created_at.format('MMM YYYY');
                        _this.listing.price_per_month = parseInt(_this.listing.price_per_month);
                        _this.ready();
                    };
                    this.goToAnchor = function (location) {
                        if (_this.$location.hash() !== location) {
                            _this.$location.hash(location);
                        }
                        else {
                            _this.$anchorScroll();
                        }
                    };
                    this.setDateFrom = function (dateFrom, value) {
                        if (value) {
                            dateFrom = value.format(_this.AppConstants.dateFormat);
                            _this.$scope['dateFrom'] = moment(dateFrom, _this.AppConstants.dateFormat).format(_this.AppConstants.dateFormatStore);
                            if (dateFrom !== _this.$stateParams.dateFrom)
                                _this.reloadStateParams({ dateFrom: dateFrom });
                        }
                    };
                    this.reloadStateParams = function (params) {
                        if (params === void 0) { params = {}; }
                        var defaultParams = {
                            id: _this.$stateParams.id,
                            dateFrom: _this.$scope['dateFrom']
                        };
                        _this.$state.go('main.storage_view', _.extend(defaultParams, params), { notify: false });
                    };
                    this.goBack = function () {
                        window.history.back();
                    };
                    this.sendRequest = function () {
                        _this.$stateParams['dateFrom'] = _this.$scope.dateFrom;
                        _this.RequestService.onClickSendRequest(_this.$stateParams);
                    };
                    this.init();
                }
                StorageViewController.$inject = ['$scope', '$rootScope', '$stateParams', 'StorageViewService', 'AppConstants', '$timeout', '$anchorScroll', '$location', 'HelpersService', '$state', 'RequestService', '$sce'];
                return StorageViewController;
            }(BaseController));
            storageViewModule.controller('StorageViewController', StorageViewController);
        })(StorageView = Modules.StorageView || (Modules.StorageView = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var adminModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Admin;
        (function (Admin) {
            var AdminConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'admin/templates/'
                };
                return cons;
            })();
            function AdminConfig($urlRouterProvider, $stateProvider, AdminConstants) {
                var templatePath = AdminConstants.templateUrl;
                $urlRouterProvider.when('/${App.Config.Variables.appAlias}/Admin', '/${App.Config.Variables.appAlias}/Account/Users');
                $stateProvider
                    .state('main.admin', {
                    url: "/Admin",
                    abstract: true,
                    views: {
                        main: {
                            templateUrl: templatePath + "admin.html",
                            controller: 'AccountController',
                            controllerAs: 'accountCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        }
                    }
                });
            }
            AdminConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'AdminConstants'];
            adminModule = angular.module(App.Config.Ng.module.name + ".admin", [])
                .constant('AdminConstants', AdminConstants)
                .config(AdminConfig);
        })(Admin = Modules.Admin || (Modules.Admin = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var adminUserModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminUser;
        (function (AdminUser) {
            var AdminUserConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'admin_user/templates/'
                };
                return cons;
            })();
            function AdminUserConfig($urlRouterProvider, $stateProvider, AdminUserConstants) {
                var templatePath = AdminUserConstants.templateUrl;
                $stateProvider
                    .state('main.admin.admin_user', {
                    url: "/Users",
                    views: {
                        "admin": {
                            templateUrl: templatePath + "admin_user.html",
                            controller: 'AdminUserController',
                            controllerAs: 'adminUserCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_MANAGE_USERS'
                    }
                });
            }
            AdminUserConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'AdminUserConstants'];
            adminUserModule = angular.module(App.Config.Ng.module.name + ".admin_user", [])
                .constant('AdminUserConstants', AdminUserConstants)
                .config(AdminUserConfig);
        })(AdminUser = Modules.AdminUser || (Modules.AdminUser = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminUser;
        (function (AdminUser_1) {
            var AdminUserService = (function () {
                function AdminUserService(AdminUser) {
                    var _this = this;
                    this.AdminUser = AdminUser;
                    this.initSearchUser = '';
                    this.getUsers = function () {
                        return _this.AdminUser.getAll();
                    };
                    this.activateDeactivateUser = function (id) {
                        return _this.AdminUser.activateDeactivate(id);
                    };
                    this.baseUrl = this.AdminUser.getBaseUrl();
                }
                AdminUserService.$inject = ['AdminUser'];
                return AdminUserService;
            }());
            AdminUser_1.AdminUserService = AdminUserService;
            adminUserModule.service('AdminUserService', AdminUserService);
        })(AdminUser = Modules.AdminUser || (Modules.AdminUser = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminUser;
        (function (AdminUser) {
            var BaseController = App.Base.BaseController;
            var AdminUserController = (function (_super) {
                __extends(AdminUserController, _super);
                function AdminUserController($scope, $rootScope, DTOptionsBuilder, AdminUserService, AuthService, $state, $window, LoginService) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.DTOptionsBuilder = DTOptionsBuilder;
                    this.AdminUserService = AdminUserService;
                    this.AuthService = AuthService;
                    this.$state = $state;
                    this.$window = $window;
                    this.LoginService = LoginService;
                    this.users = [];
                    this.filterOption = {
                        type: 'text',
                        bRegex: true,
                        bSmart: true
                    };
                    this.filteredColumnsCount = 5;
                    this.init = function () {
                        _this.loading();
                        var filterOptions = [];
                        while (_this.filteredColumnsCount > 0) {
                            filterOptions.push(_this.filterOption);
                            _this.filteredColumnsCount--;
                        }
                        _this.dtOptions = _this.DTOptionsBuilder
                            .newOptions()
                            .withOption('hasColumnFilter', true)
                            .withOption('lengthMenu', [25, 50, 100])
                            .withOption('sDom', '<"top"l>f<"and"i>rt<"bottom"p><"clear">')
                            .withOption('oSearch', {
                            "sSearch": _this.AdminUserService.initSearchUser
                        })
                            .withColumnFilter({
                            aoColumns: filterOptions
                        });
                        _this.getUsers();
                    };
                    this.getUsers = function () {
                        return _this.AdminUserService.getUsers()
                            .then(function (users) {
                            _this.users = users;
                            _this.ready();
                        });
                    };
                    this.activateDeactivate = function (user) {
                        var activate_deactivate_text = (user.isDeactivated == 1) ? 'Activate' : 'Deactivate';
                        swal({
                            title: activate_deactivate_text + " user ?",
                            showCancelButton: true,
                            confirmButtonColor: "#1D84C6",
                            confirmButtonText: 'Yes',
                            cancelButtonText: "Cancel",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true }, function (isConfirm) {
                            if (isConfirm) {
                                return _this.AdminUserService.activateDeactivateUser(user.id).then(function () {
                                    var index = _.findIndex(_this.users, { id: user.id });
                                    _this.users[index].isDeactivated = (user.isDeactivated == 1) ? 0 : 1;
                                    swal.close();
                                });
                            }
                        });
                    };
                    this.loginAsUser = function (user) {
                        user.role = 'admin';
                        _this.AuthService.setUser(user);
                        _this.$state.go(App.Config.Acl.redirects.member, {}, { reload: true });
                    };
                    this.init();
                }
                AdminUserController.$inject = ['$scope', '$rootScope', 'DTOptionsBuilder', 'AdminUserService', 'AuthService', '$state', '$window', 'LoginService'];
                return AdminUserController;
            }(BaseController));
            adminUserModule.controller('AdminUserController', AdminUserController);
        })(AdminUser = Modules.AdminUser || (Modules.AdminUser = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var adminListingModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminListing;
        (function (AdminListing) {
            var AdminListingConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'admin_listing/templates/'
                };
                return cons;
            })();
            function AdminListingConfig($urlRouterProvider, $stateProvider, AdminListingConstants) {
                var templatePath = AdminListingConstants.templateUrl;
                $stateProvider
                    .state('main.admin.admin_listing', {
                    url: "/Listings",
                    views: {
                        "admin": {
                            templateUrl: templatePath + "admin_listing.html",
                            controller: 'AdminListingController',
                            controllerAs: 'adminListingCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_MANAGE_LISTING'
                    }
                });
            }
            AdminListingConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'AdminListingConstants'];
            adminListingModule = angular.module(App.Config.Ng.module.name + ".admin_listing", [])
                .constant('AdminListingConstants', AdminListingConstants)
                .config(AdminListingConfig);
        })(AdminListing = Modules.AdminListing || (Modules.AdminListing = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminListing;
        (function (AdminListing_1) {
            var AdminListingService = (function () {
                function AdminListingService(AdminListing) {
                    var _this = this;
                    this.AdminListing = AdminListing;
                    this.getListings = function () {
                        return _this.AdminListing.getAll();
                    };
                    this.activateDeactivateListing = function (id) {
                        return _this.AdminListing.activateDeactivate(id);
                    };
                    this.baseUrl = this.AdminListing.getBaseUrl();
                }
                AdminListingService.$inject = ['AdminListing'];
                return AdminListingService;
            }());
            AdminListing_1.AdminListingService = AdminListingService;
            adminListingModule.service('AdminListingService', AdminListingService);
        })(AdminListing = Modules.AdminListing || (Modules.AdminListing = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminListing;
        (function (AdminListing) {
            var BaseController = App.Base.BaseController;
            var AdminListingController = (function (_super) {
                __extends(AdminListingController, _super);
                function AdminListingController($scope, $rootScope, DTOptionsBuilder, AdminListingService, AdminUserService, $state) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.DTOptionsBuilder = DTOptionsBuilder;
                    this.AdminListingService = AdminListingService;
                    this.AdminUserService = AdminUserService;
                    this.$state = $state;
                    this.dtColumnDefs = [
                        { targets: 3, type: 'num' }
                    ];
                    this.listings = [];
                    this.filterOption = {
                        type: 'text',
                        bRegex: true,
                        bSmart: true
                    };
                    this.filteredColumnsCount = 5;
                    this.init = function () {
                        _this.loading();
                        var filterOptions = [];
                        while (_this.filteredColumnsCount > 0) {
                            filterOptions.push(_this.filterOption);
                            _this.filteredColumnsCount--;
                        }
                        _this.dtOptions = _this.DTOptionsBuilder
                            .newOptions()
                            .withOption('lengthMenu', [25, 50, 100])
                            .withOption('sDom', '<"top"l>f<"and"i>rt<"bottom"p><"clear">')
                            .withOption('language', {
                            "decimal": ",",
                            "thousands": "."
                        })
                            .withColumnFilter({
                            aoColumns: filterOptions
                        });
                        _this.getListings();
                    };
                    this.getListings = function () {
                        return _this.AdminListingService.getListings()
                            .then(function (listings) {
                            _this.listings = _.map(listings, function (listing) {
                                listing['email'] = listing.user.email;
                                listing.price_per_month = parseFloat(listing.price_per_month);
                                return listing;
                            });
                            _this.ready();
                        });
                    };
                    this.activateDeactivate = function (listing) {
                        var activate_deactivate_text = (listing.isActive == 0) ? 'Activate' : 'Deactivate';
                        console.log(listing);
                        swal({
                            title: activate_deactivate_text + " listing ?",
                            showCancelButton: true,
                            confirmButtonColor: "#1D84C6",
                            confirmButtonText: 'Yes',
                            cancelButtonText: "Cancel",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true }, function (isConfirm) {
                            if (isConfirm) {
                                return _this.AdminListingService.activateDeactivateListing(listing.id).then(function () {
                                    var index = _.findIndex(_this.listings, { id: listing.id });
                                    _this.listings[index].isActive = (listing.isActive == 1) ? 0 : 1;
                                    swal.close();
                                });
                            }
                        });
                    };
                    this.goToManageUsers = function (user) {
                        _this.AdminUserService.initSearchUser = user.email;
                        _this.$state.go('main.admin.admin_user');
                    };
                    this.init();
                }
                AdminListingController.$inject = ['$scope', '$rootScope', 'DTOptionsBuilder', 'AdminListingService', 'AdminUserService', '$state'];
                return AdminListingController;
            }(BaseController));
            adminListingModule.controller('AdminListingController', AdminListingController);
        })(AdminListing = Modules.AdminListing || (Modules.AdminListing = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var adminRequestModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminRequest;
        (function (AdminRequest) {
            var AdminRequestConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'admin_request/templates/'
                };
                return cons;
            })();
            function AdminRequestConfig($urlRouterProvider, $stateProvider, AdminRequestConstants) {
                var templatePath = AdminRequestConstants.templateUrl;
                $stateProvider
                    .state('main.admin.admin_request', {
                    url: "/Requests",
                    views: {
                        "admin": {
                            templateUrl: templatePath + "admin_request.html",
                            controller: 'AdminRequestController',
                            controllerAs: 'adminRequestCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_MANAGE_REQUESTS'
                    }
                });
            }
            AdminRequestConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'AdminRequestConstants'];
            adminRequestModule = angular.module(App.Config.Ng.module.name + ".admin_request", [])
                .constant('AdminRequestConstants', AdminRequestConstants)
                .config(AdminRequestConfig);
        })(AdminRequest = Modules.AdminRequest || (Modules.AdminRequest = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminRequest;
        (function (AdminRequest_1) {
            var AdminRequestService = (function () {
                function AdminRequestService(AdminRequest) {
                    var _this = this;
                    this.AdminRequest = AdminRequest;
                    this.initSearchUser = '';
                    this.getRequests = function () {
                        return _this.AdminRequest.getAll();
                    };
                    this.activateDeactivate = function (id) {
                        return _this.AdminRequest.activateDeactivate(id);
                    };
                    this.baseUrl = this.AdminRequest.getBaseUrl();
                }
                AdminRequestService.$inject = ['AdminRequest'];
                return AdminRequestService;
            }());
            AdminRequest_1.AdminRequestService = AdminRequestService;
            adminRequestModule.service('AdminRequestService', AdminRequestService);
        })(AdminRequest = Modules.AdminRequest || (Modules.AdminRequest = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminRequest;
        (function (AdminRequest) {
            var BaseController = App.Base.BaseController;
            var AdminRequestController = (function (_super) {
                __extends(AdminRequestController, _super);
                function AdminRequestController($scope, $rootScope, DTOptionsBuilder, AdminRequestService, AuthService, $state, $window, LoginService, AdminUserService, DTColumnDefBuilder) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.DTOptionsBuilder = DTOptionsBuilder;
                    this.AdminRequestService = AdminRequestService;
                    this.AuthService = AuthService;
                    this.$state = $state;
                    this.$window = $window;
                    this.LoginService = LoginService;
                    this.AdminUserService = AdminUserService;
                    this.DTColumnDefBuilder = DTColumnDefBuilder;
                    this.requests = [];
                    this.filterOption = {
                        type: 'text',
                        bRegex: true,
                        bSmart: true
                    };
                    this.filteredColumnsCount = 5;
                    this.init = function () {
                        _this.loading();
                        var filterOptions = [];
                        while (_this.filteredColumnsCount > 0) {
                            filterOptions.push(_this.filterOption);
                            _this.filteredColumnsCount--;
                        }
                        _this.dtOptions = _this.DTOptionsBuilder
                            .newOptions()
                            .withOption('hasColumnFilter', true)
                            .withOption('lengthMenu', [25, 50, 100])
                            .withOption('sDom', '<"top"l>f<"and"i>rt<"bottom"p><"clear">')
                            .withOption('oSearch', {
                            "sSearch": _this.AdminRequestService.initSearchUser
                        })
                            .withColumnFilter({
                            aoColumns: filterOptions
                        });
                        _this.getRequests();
                    };
                    this.getRequests = function () {
                        return _this.AdminRequestService.getRequests()
                            .then(function (requests) {
                            _this.requests = _.map(requests, function (request) {
                                request.updated_at = moment(request.updated_at, 'YYYY-MM-DD HH:mm:ss');
                                return request;
                            });
                            _this.ready();
                        });
                    };
                    this.goToManageUsers = function (user) {
                        _this.AdminUserService.initSearchUser = user.email;
                        _this.$state.go('main.admin.admin_user');
                    };
                    this.activateDeactivate = function (request) {
                        var activate_deactivate_text = (request.isDeactivated) ? 'Activate' : 'Deactivate';
                        swal({
                            title: activate_deactivate_text + " request ?",
                            showCancelButton: true,
                            confirmButtonColor: "#1D84C6",
                            confirmButtonText: 'Yes',
                            cancelButtonText: "Cancel",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true }, function (isConfirm) {
                            if (isConfirm) {
                                return _this.AdminRequestService.activateDeactivate(request.id).then(function () {
                                    var index = _.findIndex(_this.requests, { id: request.id });
                                    _this.requests[index].isDeactivated = (request.isDeactivated == 1) ? 0 : 1;
                                    swal.close();
                                });
                            }
                        });
                    };
                    this.init();
                }
                AdminRequestController.$inject = ['$scope', '$rootScope', 'DTOptionsBuilder', 'AdminRequestService', 'AuthService', '$state', '$window', 'LoginService', 'AdminUserService', 'DTColumnDefBuilder'];
                return AdminRequestController;
            }(BaseController));
            adminRequestModule.controller('AdminRequestController', AdminRequestController);
        })(AdminRequest = Modules.AdminRequest || (Modules.AdminRequest = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var requestModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Request;
        (function (Request) {
            var RequestConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'request/templates/'
                };
                return cons;
            })();
            function RequestConfig($urlRouterProvider, $stateProvider, RequestConstants) {
                var templatePath = RequestConstants.templateUrl;
            }
            RequestConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'RequestConstants'];
            requestModule = angular.module(App.Config.Ng.module.name + ".request", [])
                .constant('RequestConstants', RequestConstants)
                .config(RequestConfig);
        })(Request = Modules.Request || (Modules.Request = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Request;
        (function (Request_1) {
            var statusList;
            (function (statusList) {
                statusList[statusList["Registered"] = 0] = "Registered";
                statusList[statusList["UnverifiedMobile"] = 1] = "UnverifiedMobile";
                statusList[statusList["UnRegistered"] = 2] = "UnRegistered";
            })(statusList || (statusList = {}));
            ;
            var RequestService = (function () {
                function RequestService($uibModal, AuthService, RequestConstants, $sessionStorage, $rootScope, EditProfileService, Request, AppConstants) {
                    var _this = this;
                    this.$uibModal = $uibModal;
                    this.AuthService = AuthService;
                    this.RequestConstants = RequestConstants;
                    this.$sessionStorage = $sessionStorage;
                    this.$rootScope = $rootScope;
                    this.EditProfileService = EditProfileService;
                    this.Request = Request;
                    this.AppConstants = AppConstants;
                    this.requestKey = 'request';
                    this.isRequestSaved = false;
                    this.evaluate = function () {
                        _this.user = _this.AuthService.getUser();
                        if (!_this.user) {
                            _this.status = statusList.UnRegistered;
                        }
                        else {
                            if (!_this.user.mobile_verified) {
                                _this.status = statusList.UnverifiedMobile;
                            }
                            else {
                                _this.status = statusList.Registered;
                            }
                        }
                    };
                    this.onClickSendRequest = function (stateParams) {
                        if (stateParams === void 0) { stateParams = {}; }
                        if (_.isEmpty(stateParams))
                            stateParams = { id: _this.getRequest().listing_id };
                        _this.evaluate();
                        if (stateParams.dateFrom) {
                            stateParams.dateFrom = moment(stateParams.dateFrom, _this.AppConstants.dateTimeFormatStore).format(_this.AppConstants.dateFormat);
                        }
                        _this.setRequest(stateParams);
                        switch (_this.status) {
                            case statusList.Registered:
                                _this.openRequestForm();
                                break;
                            case statusList.UnverifiedMobile:
                                _this.openMobileVerification();
                                break;
                            case statusList.UnRegistered:
                                _this.openGuestOptions();
                                break;
                            default:
                                _this.openGuestOptions();
                                break;
                        }
                    };
                    this.setRequest = function (stateParams) {
                        _this.request = stateParams;
                        _this.$sessionStorage.putObject(_this.requestKey, _.extend(_this.getRequest(), _this.request));
                    };
                    this.getRequest = function () {
                        return _this.$sessionStorage.getObject(_this.requestKey) || {};
                    };
                    this.openGuestOptions = function () {
                        _this.openModal('unregistered');
                    };
                    this.openMobileVerification = function () {
                        _this.openModal('unverified_mobile');
                    };
                    this.openRequestForm = function () {
                        _this.openModal('registered');
                    };
                    this.openLogin = function () {
                        _this.openModal('login');
                    };
                    this.openVerifyModal = function () {
                        _this.openModal('verify_mobile');
                    };
                    this.openSentRequestModal = function (request) {
                        _this.openModal('sent_request', request);
                    };
                    this.openModal = function (templateName, request) {
                        if (request === void 0) { request = null; }
                        _this.$uibModal.open({
                            templateUrl: "" + _this.RequestConstants.templateUrl + templateName + ".modal.html",
                            size: 'md',
                            controller: 'RequestController',
                            controllerAs: 'requestCtrl',
                            windowClass: "animated fadeInY",
                            resolve: {
                                request: function () {
                                    return request || _this.getRequest();
                                }
                            }
                        });
                    };
                    this.removeRequest = function () {
                        _this.request = {};
                        _this.$sessionStorage.remove(_this.requestKey);
                    };
                    this.sendRequest = function (request) {
                        return _this.Request.post(request);
                    };
                }
                RequestService.$inject = ['$uibModal', 'AuthService', 'RequestConstants', '$sessionStorage', '$rootScope', 'EditProfileService', 'Request', 'AppConstants'];
                return RequestService;
            }());
            Request_1.RequestService = RequestService;
            angularModule.service('RequestService', RequestService);
        })(Request = Modules.Request || (Modules.Request = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Request;
        (function (Request) {
            var BaseController = App.Base.BaseController;
            var RequestController = (function (_super) {
                __extends(RequestController, _super);
                function RequestController($scope, $rootScope, $uibModalInstance, AppConstants, RequestService, $state, LoginService, request, $timeout, EditProfileService, toaster, StorageViewService, RequestConstants, $stateParams) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$uibModalInstance = $uibModalInstance;
                    this.AppConstants = AppConstants;
                    this.RequestService = RequestService;
                    this.$state = $state;
                    this.LoginService = LoginService;
                    this.request = request;
                    this.$timeout = $timeout;
                    this.EditProfileService = EditProfileService;
                    this.toaster = toaster;
                    this.StorageViewService = StorageViewService;
                    this.RequestConstants = RequestConstants;
                    this.$stateParams = $stateParams;
                    this.init = function () {
                        _this.minDate = moment();
                        if (!_.isEmpty(_this.$rootScope['user'])) {
                            _this.user = _this.$rootScope['user'];
                            _this.mobile = _this.user.mobile;
                            _this.showVerificationCode = _this.EditProfileService.onMobileVerification;
                        }
                        if (_this.mobile && _this.user.mobile_verified == 0) {
                            _this.showVerificationCode = true;
                        }
                        if (_.has(_this.request, 'dateFrom')) {
                            _this.$timeout(function () {
                                _this.$scope.$apply(function () {
                                    if (_this.request.dateFrom !== 'Invalid date')
                                        _this.$scope['fromDate'] = moment(_this.request.dateFrom, _this.AppConstants.dateFormat).format();
                                    else
                                        _this.$scope['fromDate'] = moment();
                                });
                            });
                        }
                    };
                    this.cancel = function () {
                        _this.request = {};
                        _this.RequestService.removeRequest();
                        _this.$uibModalInstance.close('dismiss');
                    };
                    this.openLogin = function () {
                        _this.$uibModalInstance.close('dismiss');
                        _this.RequestService.openLogin();
                    };
                    this.openVerifyMobile = function () {
                        _this.$uibModalInstance.close('dismiss');
                        _this.RequestService.openVerifyModal();
                    };
                    this.gotoSignUp = function () {
                        _this.$uibModalInstance.close('dismiss');
                        _this.$state.go('main.register');
                    };
                    this.setDateFrom = function (dateFrom, value) {
                        if (value) {
                            _this.$scope['fromDate'] = value.format();
                        }
                        else {
                            _this.$scope['fromDate'] = null;
                        }
                    };
                    this.doLogin = function (email, password, remember_me) {
                        return _this.LoginService.loginCustom(email, password)
                            .then(function (user) {
                            _this.$uibModalInstance.close();
                            _this.LoginService.redirectAuthenticated();
                        }, function (error) {
                            _this.errorBags = _this.errorTranslate(error);
                        });
                    };
                    this.mobileOnChange = function (mobile) {
                        if (_this.user.mobile) {
                            if (_this.user.mobile !== mobile) {
                                _this.$rootScope['user'].mobile_verified = 0;
                            }
                            else {
                                _this.$rootScope['user'].mobile_verified = 1;
                            }
                        }
                    };
                    this.sendVerification = function (mobile) {
                        return _this.EditProfileService.sendVerification(mobile, _this.$rootScope['user'].id).then(function () {
                            _this.showVerificationCode = true;
                            _this.$rootScope['user'].mobile_verified = 0;
                            _this.errorBags = [];
                            _this.toaster.pop({
                                type: 'success',
                                title: 'MOBILE_VERIFICATION_TITLE',
                                body: 'MOBILE_VERIFICATION_SENT',
                                showCloseButton: true
                            });
                        }, _this._handleOnError.bind(_this));
                    };
                    this.verify = function (mobile, mobile_verification_code) {
                        return _this.EditProfileService.verifyMobile(mobile, mobile_verification_code, _this.$rootScope['user'].id).then(function () {
                            _this.showVerificationCode = false;
                            _this.$rootScope['user'].mobile_verified = 1;
                            _this.EditProfileService.onMobileVerification = false;
                            _this.$uibModalInstance.close();
                            _this.RequestService.onClickSendRequest();
                        }, function () {
                            _this.toaster.pop({
                                type: 'error',
                                title: 'MOBILE_VERIFICATION_ERROR_TITLE',
                                body: 'MOBILE_VERIFICATION_ERROR',
                                showCloseButton: true
                            });
                        });
                    };
                    this.reset = function () {
                        _this.showVerificationCode = false;
                        _this.mobile = null;
                        _this.EditProfileService.reset();
                    };
                    this.sendRequest = function (request) {
                        var listing = _this.StorageViewService.listing;
                        var to_date = moment(_this.$scope['toDate'], _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormatStore);
                        var from_date = moment(_this.$scope['fromDate'], _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormatStore);
                        request = {
                            owner_id: listing.user_id,
                            client_id: _this.$rootScope['user'].id,
                            listing_id: listing.id,
                            message_to_owner: request.message_to_owner,
                            price_per_month: listing.price_per_month,
                            is_continuos: 1,
                            from_date: from_date
                        };
                        if (to_date !== 'Invalid date' && request.is_continuos == 0) {
                            request.to_date = to_date;
                        }
                        return _this.RequestService.sendRequest(request).then(function (response) {
                            _this.request = null;
                            _this.RequestService.removeRequest();
                            _this.$uibModalInstance.close('dismiss');
                            _this.RequestService.openSentRequestModal(response);
                        }, function (error) {
                            if (_.has(error.data, 'message')) {
                                if (error.data.message == 'TOKEN_EXPIRED')
                                    _this.$uibModalInstance.close('dismiss');
                            }
                            _this.errorBags = _this.errorTranslate(error);
                        });
                    };
                    this.goToRequestPage = function () {
                        _this.$uibModalInstance.close('dismiss');
                        _this.$state.go('main.account.user_request.request', { id: _this.request.id });
                    };
                    this.dateFormat = this.AppConstants.dateFormat;
                    this.$scope['loginUrlSocial'] = this.LoginService.loginUrlSocial;
                    this.$scope['selected_toDate'] = 1;
                    this.headerTplUrl = this.RequestConstants.templateUrl + 'header.html';
                    this.init();
                }
                RequestController.$inject = ['$scope',
                    '$rootScope',
                    '$uibModalInstance',
                    'AppConstants',
                    'RequestService',
                    '$state',
                    'LoginService',
                    'request',
                    '$timeout',
                    'EditProfileService',
                    'toaster',
                    'StorageViewService',
                    'RequestConstants',
                    '$stateParams'
                ];
                return RequestController;
            }(BaseController));
            requestModule.controller('RequestController', RequestController);
        })(Request = Modules.Request || (Modules.Request = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var userRequestModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var UserRequest;
        (function (UserRequest) {
            var UserRequestConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'user_request/templates/'
                };
                return cons;
            })();
            function UserRequestConfig($urlRouterProvider, $stateProvider, UserRequestConstants) {
                var templatePath = UserRequestConstants.templateUrl;
                $stateProvider
                    .state('main.account.user_request', {
                    url: "/UserMessages",
                    views: {
                        "account": {
                            templateUrl: templatePath + "user_request.html",
                            controller: 'UserRequestController',
                            controllerAs: 'userRequestCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_USER_MESSAGES'
                    }
                })
                    .state('main.account.user_request.request', {
                    url: "/Message/:id?source_id&three_d_verification_status",
                    views: {
                        "account@main.account": {
                            templateUrl: templatePath + "user_request.request.html",
                            controller: 'UserRequestRequestController',
                            controllerAs: 'userByRequestCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_USER_MESSAGE'
                    }
                });
            }
            UserRequestConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'UserRequestConstants'];
            userRequestModule = angular.module(App.Config.Ng.module.name + ".user_request", [])
                .constant('UserRequestConstants', UserRequestConstants)
                .config(UserRequestConfig);
        })(UserRequest = Modules.UserRequest || (Modules.UserRequest = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var UserRequest;
        (function (UserRequest) {
            var UserRequestService = (function () {
                function UserRequestService(Request, HelpersService, $filter, Billing, $q, Rating) {
                    var _this = this;
                    this.Request = Request;
                    this.HelpersService = HelpersService;
                    this.$filter = $filter;
                    this.Billing = Billing;
                    this.$q = $q;
                    this.Rating = Rating;
                    this.requestControls = [];
                    this.getRequests = function (id, type) {
                        if (type === void 0) { type = 'all'; }
                        switch (type) {
                            case 'all':
                                return _this.Request.getAllRequests(id);
                                break;
                            case 'owner':
                                return _this.Request.getOwnerRequests(id);
                                break;
                            case 'client':
                                return _this.Request.getClientRequests(id);
                                break;
                            default:
                                return _this.Request.getAllRequests(id);
                                break;
                        }
                    };
                    this.getRequestControls = function () {
                        if (_.isEmpty(_this.requestControls))
                            return _this.Request.getRequestControls().then(function (requestControls) {
                                _this.requestControls = requestControls;
                                return requestControls;
                            });
                        else
                            return _this.$q(function (resolve, reject) {
                                return resolve(_this.requestControls);
                            });
                    };
                    this.getRequestById = function (id) {
                        return _this.Request.find(id);
                    };
                    this.makePayment = function (request_id) {
                        return _this.Billing.initialPayment(request_id);
                    };
                    this.transformer = function (requests, user) {
                        return _.map(requests, function (request) {
                            return _this.transform(request, user);
                        });
                    };
                    this.changeRequestStatus = function (user_id, change_to, listing_id, params) {
                        if (params === void 0) { params = {}; }
                        return _this.Request.changeStatus(user_id, change_to, listing_id, params);
                    };
                    this.transform = function (request, user) {
                        request.owner = _this.HelpersService.transformUserPicture(request.owner);
                        request.client = _this.HelpersService.transformUserPicture(request.client);
                        request.from_date = _this.HelpersService.tzDate(request.from_date);
                        request.to_date = _this.HelpersService.tzDate(request.to_date);
                        request['event_date'] = _this.HelpersService.tzDateTimeStored(request['event_date']);
                        if (request.payment_due_date)
                            request.payment_due_date = _this.HelpersService.tzDate(request.payment_due_date);
                        if (!_.isEmpty(request.logs)) {
                            request.logs = _this.transformerLog(request.logs.reverse());
                            var log = _.filter(request.logs, function (log) {
                                return log.event_type == 'CHAT';
                            });
                            request.log = log[0];
                            if (request.isDeactivated !== 1)
                                request['unseen_logs'] = _this.getUnseenLogs(request.logs, user);
                            request['latest_log'] = request.logs[0];
                        }
                        if (parseInt(user.id) == parseInt(request.owner_id)) {
                            request.user = request.client;
                        }
                        else {
                            request.user = request.owner;
                        }
                        request.created_at = _this.HelpersService.tzDateTime(request.created_at);
                        return request;
                    };
                    this.transformerLog = function (logs) {
                        return _.map(logs, _this.transformLog.bind(_this));
                    };
                    this.transformLog = function (log) {
                        log.created_at = _this.HelpersService.tzDateTimeStored(log.created_at);
                        log['date'] = _this.HelpersService.tzDate(log.created_at);
                        if (_.has(log, 'from')) {
                            log['from'] = _this.HelpersService.transformUserPicture(log['from']);
                        }
                        return log;
                    };
                    this.sendMessage = function (message, request_id) {
                        return _this.Request.sendMessage(message, request_id);
                    };
                    this.getUnseenLogsAll = function (requests, user) {
                        var logs = _.flatten(_.map(_.filter(requests, function (request) {
                            return request.isDeactivated !== 1;
                        }), 'logs'));
                        return _this.getUnseenLogs(logs, user);
                    };
                    this.getUnseenLogs = function (logs, user) {
                        return _.filter(logs, function (log) {
                            return log.seen == 0 && parseInt(log.to_id) == parseInt(user.id);
                        });
                    };
                    this.changeFromDate = function (from_date, request_id) {
                        return _this.Request.changeFromDate(from_date, request_id);
                    };
                    this.addRating = function (rating, comment, request_id, rating_id) {
                        if (rating_id === void 0) { rating_id = null; }
                        return _this.Rating.addRating(rating, comment, request_id, rating_id);
                    };
                }
                UserRequestService.$inject = ['Request', 'HelpersService', '$filter', 'Billing', '$q', 'Rating'];
                return UserRequestService;
            }());
            UserRequest.UserRequestService = UserRequestService;
            userRequestModule.service('UserRequestService', UserRequestService);
        })(UserRequest = Modules.UserRequest || (Modules.UserRequest = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var UserRequest;
        (function (UserRequest) {
            var BaseController = App.Base.BaseController;
            var UserRequestController = (function (_super) {
                __extends(UserRequestController, _super);
                function UserRequestController($scope, $rootScope, UserRequestService, $state, Notifications, MainService, $uibModal, RatingConstants) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.UserRequestService = UserRequestService;
                    this.$state = $state;
                    this.Notifications = Notifications;
                    this.MainService = MainService;
                    this.$uibModal = $uibModal;
                    this.RatingConstants = RatingConstants;
                    this.requests = [];
                    this.init = function () {
                        _this.loading();
                        _this.UserRequestService.getRequests(_this.$rootScope['user'].id, 'all')
                            .then(_this.setRequests.bind(_this))
                            .then(function () {
                            _this.showModalForUnratedRequests();
                        });
                    };
                    this.setRequests = function (requests) {
                        _this.ready();
                        _this.requests = _this.UserRequestService.transformer(requests, _this.$rootScope['user']);
                        var unseen_requests = _this.UserRequestService.getUnseenLogsAll(_this.requests, _this.$rootScope['user']);
                        _this.MainService.setNotifications(unseen_requests);
                        _this.Notifications.notify(NOTIFICATIONS.REQUEST_NOTIFICATION_UNSEEN);
                    };
                    this.showModalForUnratedRequests = function () {
                        var unrated_requests = _.filter(_this.requests, function (request) {
                            return !request.isRated
                                && request.ratings_count == 0
                                && _.indexOf([
                                    'CANCELED',
                                    'OVER',
                                    'EXPIRED',
                                    'TERMINATED',
                                    'REJECT'
                                ], request.request_status) > -1;
                        });
                        _.each(unrated_requests, function (request) {
                            _this.$uibModal.open({
                                templateUrl: _this.RatingConstants.templateUrl + "add_rating.modal.html",
                                controller: 'RatingAddController',
                                controllerAs: 'addRatingCtrl',
                                resolve: {
                                    request: function () {
                                        return request;
                                    },
                                    forMultiple: function () {
                                        return true;
                                    }
                                }
                            });
                        });
                    };
                    this.gotoRequest = function (id) {
                        _this.$state.go('main.account.user_request.request', { id: id });
                    };
                    this.init();
                }
                UserRequestController.$inject = ['$scope', '$rootScope', 'UserRequestService', '$state', 'Notifications', 'MainService', '$uibModal', 'RatingConstants'];
                return UserRequestController;
            }(BaseController));
            userRequestModule.controller('UserRequestController', UserRequestController);
        })(UserRequest = Modules.UserRequest || (Modules.UserRequest = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var UserRequest;
        (function (UserRequest) {
            var BaseController = App.Base.BaseController;
            var UserRequestRequestController = (function (_super) {
                __extends(UserRequestRequestController, _super);
                function UserRequestRequestController($scope, $rootScope, $stateParams, UserRequestService, AppConstants, HelpersService, Listing, $uibModal, UserRequestConstants, $q, $filter, $timeout, $state, Notifications, MainService, PayoutService, PaymentService, RatingConstants, $window, toaster, PaymentConstants, PayoutConstants, AuthService) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$stateParams = $stateParams;
                    this.UserRequestService = UserRequestService;
                    this.AppConstants = AppConstants;
                    this.HelpersService = HelpersService;
                    this.Listing = Listing;
                    this.$uibModal = $uibModal;
                    this.UserRequestConstants = UserRequestConstants;
                    this.$q = $q;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$state = $state;
                    this.Notifications = Notifications;
                    this.MainService = MainService;
                    this.PayoutService = PayoutService;
                    this.PaymentService = PaymentService;
                    this.RatingConstants = RatingConstants;
                    this.$window = $window;
                    this.toaster = toaster;
                    this.PaymentConstants = PaymentConstants;
                    this.PayoutConstants = PayoutConstants;
                    this.AuthService = AuthService;
                    this.savingFromDate = false;
                    this.changeDateErrorBags = [];
                    this.card = {};
                    this.requestControls = [];
                    this.init = function () {
                        _this.loading();
                        _this.dateFormat = _this.AppConstants.dateFormat;
                        _this.$q.all([
                            _this.UserRequestService.getRequestById(_this.$stateParams.id).then(_this.setRequest.bind(_this), _this.handleRequestError.bind(_this)),
                            _this.PaymentService.getCard(_this.$rootScope['user'].id).then(function (card) {
                                _this.card = card;
                            }),
                            _this.UserRequestService.getRequestControls().then(_this.setRequestControls.bind(_this)),
                            _this.PayoutService.getAccount(_this.$rootScope['user'].id).then(_this.setAccount.bind(_this))
                        ]).then(function () {
                            _this.ready();
                            _this.handle3DVerificationNotification();
                        });
                    };
                    this.addAddUpdateAccount = function () {
                        var _self = _this;
                        _this.bankAccountModal = _this.$uibModal.open({
                            templateUrl: _this.PayoutConstants.templateUrl + "/add_account.modal.html",
                            controller: function ($scope, account) {
                                var _this = this;
                                this.errorBags = [];
                                this.templateUrl = _self.PayoutConstants.templateUrl;
                                this.account = _.isEmpty(angular.copy(account)) ? {} : angular.copy(account);
                                if (this.account.legal_entity) {
                                    this.account.legal_entity.additional_owners = _.isEmpty(this.account.legal_entity.additional_owners) ? {} : this.account.legal_entity.additional_owners[0];
                                }
                                else {
                                    this.account.legal_entity = {};
                                }
                                this.external_account = '';
                                this.user = angular.copy(_self.$rootScope['user']);
                                this.account.legal_entity.first_name = this.user.firstname;
                                this.account.legal_entity.last_name = this.user.lastname;
                                if (!_.isEmpty(_self.$rootScope['user'].bank_account)) {
                                    this.external_account = _self.$rootScope['user'].bank_account;
                                }
                                this.createAccount = function (bank_account) {
                                    _this.account.external_account = _this.external_account;
                                    if (_this.account.legal_entity.type == 'company') {
                                        account.legal_entity.business_tax_id = _this.external_account;
                                        _this.account.legal_entity.business_tax_id = _this.external_account;
                                    }
                                    return _self.createUpdateAccount(_this.account).then(function () {
                                        _this.cancel();
                                        _self.init();
                                    }, function (error) {
                                        _this.errorBags = _self.errorTranslate(error);
                                    });
                                };
                                this.cancel = function () {
                                    _self.bankAccountModal.close('dismiss');
                                };
                            },
                            controllerAs: 'ctrl',
                            resolve: {
                                account: function () {
                                    return _this.account;
                                }
                            }
                        });
                    };
                    this.setAccount = function (account) {
                        _this.account = account;
                    };
                    this.createUpdateAccount = function (account) {
                        account.user_id = _this.$rootScope['user'].id;
                        return _this.PayoutService.createAccount(account).then(_this.setUser.bind(_this));
                    };
                    this.setUser = function (user) {
                        _this.AuthService.setUserFields({
                            bank_account: user.bank_account,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            zip: user.zip,
                            street: user.street,
                            city: user.city
                        });
                    };
                    this.handle3DVerificationNotification = function () {
                        console.log(_this.$stateParams);
                        if (!_.isUndefined(_this.$stateParams.three_d_verification_status)) {
                            if (_this.$stateParams.three_d_verification_status == 0) {
                                _this.toaster.pop({
                                    type: 'error',
                                    title: '3D Secure Validation',
                                    body: _this.$filter('translate')('3D_SECURE_VALIDATION_FAILS'),
                                    showCloseButton: true,
                                    timeout: 5000
                                });
                            }
                        }
                    };
                    this.handleRequestError = function (error) {
                        if (_.has(error.data, 'message'))
                            if (error.data.message == 'DEACTIVATED_BY_ADMIN')
                                _this.isDeactivated = true;
                    };
                    this.setRequestControls = function (requestControls) {
                        _this.requestControls = requestControls;
                    };
                    this.setRequest = function (request) {
                        _this.request = _this.UserRequestService.transform(request, _this.$rootScope['user']);
                        _this.seenRequestNotification();
                        if (_this.$rootScope['user'].id == _this.request.owner_id) {
                            _this.request['user'] = _this.request.client;
                        }
                        else {
                            _this.request['user'] = _this.request.owner;
                        }
                        _this.request.owner.created_at = moment(_this.HelpersService.tzDateTime(_this.request.owner.created_at), _this.AppConstants.dateTimeFormat).format(_this.AppConstants.dateFormat);
                        _this.request.listing = _this.Listing.transform(_this.request.listing);
                        _this.request.listing.photos = _.map(_this.request.listing.photos, function (photo) {
                            photo.path = _this.$rootScope['baseUrl'] + "/" + photo.path;
                            return photo;
                        });
                        if (_.isEmpty(_this.request.listing.photos)) {
                            _this.request.listing.photos = [];
                            _this.request.listing.photos.push({
                                path: _this.$rootScope['resource_path'] + "/no_image_thumb.gif"
                            });
                        }
                        _this.$timeout(function () {
                            _this.$scope.$apply(function () {
                                if (_this.request.from_date !== 'Invalid date')
                                    _this.$scope['fromDate'] = moment(_this.request.from_date, _this.AppConstants.dateFormat).format();
                                else
                                    _this.$scope['fromDate'] = null;
                            });
                        });
                        _this.request.logs = _.orderBy(_this.request.logs, 'created_at', 'desc');
                    };
                    this.controlRequest = function (status, confirmation_text) {
                        if (status == 'special_offer') {
                            return _this.openSpecialOfferModal();
                        }
                        else if (status == 'make_payment') {
                            return _this.makePayment();
                        }
                        else if (status == 'add_rating') {
                            return _this.openAddRating();
                        }
                        var confirmationModal = function () {
                            return _this.confirmationModal(confirmation_text).then(function (isConfirmed) {
                                if (isConfirmed) {
                                    _this.changeStatus(status).then(_this.reload.bind(_this)).then(_this._handleSuccess.bind(_this), _this._handleOnError.bind(_this))
                                        .finally(function () {
                                        swal.close();
                                    });
                                }
                                else {
                                    swal.close();
                                }
                            });
                        };
                        if (status == 'approved') {
                            var hasBankAccount = !_.isEmpty(_this.$rootScope['user'].bank_account);
                            if (!hasBankAccount) {
                                _this.addAddUpdateAccount();
                                return;
                            }
                            return _this.PayoutService.getAccount(_this.$rootScope['user'].id).then(function (account) {
                                if (_this.account.payouts_enabled) {
                                    return confirmationModal();
                                }
                                else {
                                    _this.noAccountPrompt('unverified');
                                    return;
                                }
                            });
                        }
                        else {
                            return confirmationModal();
                        }
                    };
                    this.openAddRating = function () {
                        var _self = _this;
                        _this.addRatingModalInstance = _this.$uibModal.open({
                            templateUrl: _this.RatingConstants.templateUrl + "add_rating.modal.html",
                            controller: 'RatingAddController',
                            controllerAs: 'addRatingCtrl',
                            resolve: {
                                request: function () {
                                    return _this.request;
                                },
                                forMultiple: function () {
                                    return false;
                                }
                            }
                        });
                    };
                    this.openSpecialOfferModal = function () {
                        var _self = _this;
                        _this.specialOfferModalInstance = _this.$uibModal.open({
                            templateUrl: _this.UserRequestConstants.templateUrl + "special_offer.modal.html",
                            size: 'md',
                            controller: function () {
                                var _this = this;
                                this.errorBags = [];
                                this.ok = function (price_per_month) {
                                    return _self.changeStatus('special_offer', { price_per_month: price_per_month }).then(_self.init.bind(_this)).then(function () {
                                        _this.cancel();
                                    }, function (error) {
                                        _this.errorBags = _self.errorTranslate(error);
                                    });
                                };
                                this.cancel = function () {
                                    _self.specialOfferModalInstance.dismiss('cancel');
                                };
                            },
                            controllerAs: 'ctrl',
                            windowClass: "animated fadeInY"
                        });
                    };
                    this.confirmationModal = function (confirmation_text) {
                        return _this.$q(function (resolve, reject) {
                            swal({
                                title: _this.$filter('translate')(confirmation_text) + "?",
                                showCancelButton: true,
                                confirmButtonColor: "#1D84C6",
                                confirmButtonText: "" + _this.$filter('translate')(confirmation_text),
                                cancelButtonText: "" + _this.$filter('translate')('CANCEL_BTN'),
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                                closeOnCancel: true }, function (isConfirm) {
                                if (isConfirm) {
                                    resolve(true);
                                }
                                else {
                                    resolve(false);
                                }
                            });
                        });
                    };
                    this.changeStatus = function (status, params) {
                        if (params === void 0) { params = {}; }
                        return _this.UserRequestService.changeRequestStatus(_this.$rootScope['user'].id, status, _this.request.id, params);
                    };
                    this.noAccountPrompt = function (verification_type) {
                        var _self = _this;
                        _this.noPayoutModalInstance = _this.$uibModal.open({
                            templateUrl: _this.UserRequestConstants.templateUrl + "no_payout.modal.html",
                            size: 'md',
                            controller: function () {
                                var _this = this;
                                this.verification_type = verification_type;
                                this.cancel = function () {
                                    _self.noPayoutModalInstance.dismiss('cancel');
                                };
                                this.gotoPayout = function () {
                                    _this.cancel();
                                    _self.$state.go('main.account.payout');
                                };
                            },
                            controllerAs: 'ctrl'
                        });
                    };
                    this.sendMessage = function (message) {
                        return _this.UserRequestService.sendMessage(message, _this.request.id).then(function () {
                            _this.message = null;
                            _this.init();
                        });
                    };
                    this.sendOnEnter = function () {
                        _this.$timeout(function () {
                            angular.element('#chatsend').trigger('click');
                        }, 100);
                    };
                    this.reload = function () {
                        _this.$state.go('main.account.user_request.request', { id: _this.request.id, three_d_verification_status: undefined, source_id: undefined }, { reload: true });
                    };
                    this.seenRequestNotification = function () {
                        if (_this.MainService.getRequestNotifications(_this.$rootScope['user'].id, _this.request.id).length > 0) {
                            _this.MainService.seenRequestNotification(_this.$rootScope['user'].id, _this.request.id).then(function () {
                                _this.Notifications.notify(NOTIFICATIONS.REQUEST_NOTIFICATION_SEEN);
                            });
                        }
                    };
                    this.makePayment = function () {
                        _this.openModalMakePayment();
                    };
                    this.openModalNoCard = function () {
                        var _self = _this;
                        _this.noCardModalInstance = _this.$uibModal.open({
                            templateUrl: _this.PaymentConstants.templateUrl + "/add_card.modal.html",
                            controller: 'AddCardController',
                            controllerAs: 'ctrl'
                        });
                    };
                    this.openModalMakePayment = function () {
                        var _self = _this;
                        _this.makePaymentModalInstance = _this.$uibModal.open({
                            templateUrl: _this.UserRequestConstants.templateUrl + "make_payment.modal.html",
                            controller: function () {
                                var _this = this;
                                this.card = _.clone(_self.card);
                                this.card = _.isEmpty(this.card) ? {} : this.card;
                                this.request = angular.copy(_self.request);
                                this.hasCard = !_.isEmpty(_self.card);
                                this.errorBags = _self.errorBags;
                                if (this.hasCard) {
                                    this.card.last4 = '**** **** **** ' + this.card.last4;
                                }
                                var source_id = _.has(_self.$stateParams, 'source_id')
                                    ? _self.$stateParams.three_d_verification_status == 1 ? _self.$stateParams.source_id : null
                                    : null;
                                this.cancel = function () {
                                    _self.makePaymentModalInstance.dismiss('cancel');
                                };
                                this.addCard = function () {
                                    if (!_.has(_this.card, 'id')) {
                                        _this.card.user_id = _self.$rootScope['user'].id;
                                        console.log(_this.card);
                                        return _self.PaymentService.createCard(_this.card).then(function (new_card) {
                                            _this.card = new_card;
                                            _this.card.last4 = '**** **** **** ' + _this.card.last4;
                                            _self.card = _this.card;
                                            _this.hasCard = true;
                                        }, function (error) {
                                            _this.errorBags = _self.errorTranslate(error);
                                        });
                                    }
                                };
                                this.makePayment = function () {
                                    if (_.has(_this.card, 'id')) {
                                        return _self.UserRequestService.makePayment(_this.request.id).then(function (response) {
                                            if (_.has(response, 'is_three_d_secure')) {
                                                if (response.is_three_d_secure) {
                                                    if (_.has(response, 'redirect')) {
                                                        _self.$window.location.href = response.redirect;
                                                    }
                                                }
                                            }
                                            else {
                                                _this.cancel();
                                                _self.reload();
                                            }
                                        }, function (error) {
                                            _this.errorBags = _self.errorTranslate(error);
                                        });
                                    }
                                };
                            },
                            controllerAs: 'ctrl'
                        });
                    };
                    this.setDateFrom = function (dateFrom, value) {
                        if (value) {
                            _this.$scope['fromDate'] = value.format();
                            _this.savingFromDate = true;
                            _this.UserRequestService.changeFromDate(_this.HelpersService.tzDateTimeStored(_this.$scope['fromDate']), _this.request.id).then(function () {
                                _this.savingFromDate = false;
                                _this.changeDateErrorBags = [];
                            }, function (error) {
                                _this.changeDateErrorBags = _this.errorTranslate(error);
                                _this.savingFromDate = false;
                            });
                        }
                        else {
                            _this.$scope['fromDate'] = null;
                        }
                    };
                    this.init();
                }
                UserRequestRequestController.$inject = [
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
                return UserRequestRequestController;
            }(BaseController));
            userRequestModule.controller('UserRequestRequestController', UserRequestRequestController);
        })(UserRequest = Modules.UserRequest || (Modules.UserRequest = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var payoutModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payout;
        (function (Payout) {
            var PayoutConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'payout/templates/'
                };
                return cons;
            })();
            function PayoutConfig($urlRouterProvider, $stateProvider, PayoutConstants) {
                var templatePath = PayoutConstants.templateUrl;
                $stateProvider
                    .state('main.account.payout', {
                    url: "/Payouts",
                    views: {
                        account: {
                            templateUrl: templatePath + "payout.html",
                            controller: 'PayoutController',
                            controllerAs: 'payoutCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_PAYOUT'
                    }
                });
            }
            PayoutConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'PayoutConstants'];
            payoutModule = angular.module(App.Config.Ng.module.name + ".payout", [])
                .constant('PayoutConstants', PayoutConstants)
                .config(PayoutConfig);
        })(Payout = Modules.Payout || (Modules.Payout = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payout;
        (function (Payout_1) {
            var PayoutService = (function () {
                function PayoutService(Billing, Payout, AppConstants, AuthService) {
                    var _this = this;
                    this.Billing = Billing;
                    this.Payout = Payout;
                    this.AppConstants = AppConstants;
                    this.AuthService = AuthService;
                    this.createAccount = function (account) {
                        return _this.Billing.createAccount(account);
                    };
                    this.uploadDocument = function (document) {
                        return _this.Billing.uploadDocument(document);
                    };
                    this.getAccount = function (user_id) {
                        return _this.Billing.getAccount(user_id);
                    };
                    this.getPayouts = function (user_id) {
                        return _this.Payout.getAll({ user_id: user_id });
                    };
                    this.payoutsTransformer = function (payouts) {
                        return _.map(payouts, function (payout) {
                            if (payout.payment_type == 'initial_payment') {
                                payout.trial_end_after_days = moment(payout.trial_end_after_days, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormat);
                                payout['from_date'] = moment(payout['from_date'], _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormat);
                            }
                            else {
                                payout.period_start = moment(payout.period_start, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormat);
                                payout.period_end = moment(payout.period_end, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormat);
                            }
                            return payout;
                        });
                    };
                    this.addBankAccount = function (bank_account, user_id) {
                        return _this.Payout.addBankAccount(bank_account, user_id).then(function (user) {
                            _this.AuthService.setUserFields({
                                bank_account: user.bank_account
                            });
                            return user;
                        });
                    };
                }
                PayoutService.$inject = ['Billing', 'Payout', 'AppConstants', 'AuthService'];
                return PayoutService;
            }());
            Payout_1.PayoutService = PayoutService;
            payoutModule.service('PayoutService', PayoutService);
        })(Payout = Modules.Payout || (Modules.Payout = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payout;
        (function (Payout) {
            var BaseController = App.Base.BaseController;
            var PayoutController = (function (_super) {
                __extends(PayoutController, _super);
                function PayoutController($scope, $rootScope, $uibModal, PayoutService, AuthService, PayoutConstants, $filter, $state, $q, PaymentService) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$uibModal = $uibModal;
                    this.PayoutService = PayoutService;
                    this.AuthService = AuthService;
                    this.PayoutConstants = PayoutConstants;
                    this.$filter = $filter;
                    this.$state = $state;
                    this.$q = $q;
                    this.PaymentService = PaymentService;
                    this.payouts = [];
                    this.warning_payout_messages = [];
                    this.init = function () {
                        _this.loading();
                        _this.$q.all([
                            _this.PayoutService.getAccount(_this.$rootScope['user'].id).then(_this.setAccount.bind(_this)),
                            _this.PayoutService.getPayouts(_this.$rootScope['user'].id).then(_this.setPayouts.bind(_this))
                        ]).then(function () {
                            _this.ready();
                        });
                    };
                    this.setAccount = function (account) {
                        _this.account = account;
                        if (!_.isEmpty(account)) {
                            var fields_needed = _this.account.verification.fields_needed;
                            var name_variants = ['legal_entity.first_name', 'legal_entity.last_name'];
                            var dob_variants = ['legal_entity.dob.day', 'legal_entity.dob.month', 'legal_entity.dob.year'];
                            if (_.intersection(name_variants, fields_needed).length)
                                _this.warning_payout_messages.push('FULL_NAME_IS_REQUIRED');
                            if (_.intersection(dob_variants, fields_needed).length)
                                _this.warning_payout_messages.push('DOB_IS_REQUIRED');
                        }
                    };
                    this.getReceiptUrl = function (payout_id) {
                        return _this.PaymentService.getReceiptUrl(payout_id);
                    };
                    this.setPayouts = function (payouts) {
                        _this.payouts = _this.PayoutService.payoutsTransformer(payouts);
                    };
                    this.setUser = function (user) {
                        _this.AuthService.setUserFields({
                            bank_account: user.bank_account,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            zip: user.zip,
                            street: user.street,
                            city: user.city
                        });
                    };
                    this.addAddUpdateAccount = function () {
                        var _self = _this;
                        _this.bankAccountModal = _this.$uibModal.open({
                            templateUrl: _this.PayoutConstants.templateUrl + "/add_account.modal.html",
                            controller: function ($scope, account) {
                                var _this = this;
                                this.errorBags = [];
                                this.templateUrl = _self.templateUrl;
                                this.account = _.isEmpty(angular.copy(account)) ? {} : angular.copy(account);
                                if (this.account.legal_entity) {
                                    this.account.legal_entity.additional_owners = _.isEmpty(this.account.legal_entity.additional_owners) ? {} : this.account.legal_entity.additional_owners[0];
                                }
                                else {
                                    this.account.legal_entity = {};
                                }
                                this.external_account = '';
                                this.user = angular.copy(_self.$rootScope['user']);
                                this.account.legal_entity.first_name = this.user.firstname;
                                this.account.legal_entity.last_name = this.user.lastname;
                                if (!_.isEmpty(_self.$rootScope['user'].bank_account)) {
                                    this.external_account = _self.$rootScope['user'].bank_account;
                                }
                                this.createAccount = function (bank_account) {
                                    _this.account.external_account = _this.external_account;
                                    if (_this.account.legal_entity.type == 'company') {
                                        account.legal_entity.business_tax_id = _this.external_account;
                                        _this.account.legal_entity.business_tax_id = _this.external_account;
                                    }
                                    return _self.createUpdateAccount(_this.account).then(function () {
                                        _this.cancel();
                                        _self.init();
                                    }, function (error) {
                                        _this.errorBags = _self.errorTranslate(error);
                                    });
                                };
                                this.cancel = function () {
                                    _self.bankAccountModal.close('dismiss');
                                };
                            },
                            controllerAs: 'ctrl',
                            resolve: {
                                account: function () {
                                    return _this.account;
                                }
                            }
                        });
                    };
                    this.createUpdateAccount = function (account) {
                        account.user_id = _this.$rootScope['user'].id;
                        return _this.PayoutService.createAccount(account).then(_this.setUser.bind(_this));
                    };
                    this.updateBankAccount = function (bank_account) {
                        return _this.PayoutService.addBankAccount(bank_account, _this.$rootScope['user'].id);
                    };
                    this.templateUrl = this.PayoutConstants.templateUrl;
                    this.init();
                }
                PayoutController.$inject = ['$scope', '$rootScope', '$uibModal', 'PayoutService', 'AuthService', 'PayoutConstants', '$filter', '$state', '$q', 'PaymentService'];
                return PayoutController;
            }(BaseController));
            payoutModule.controller('PayoutController', PayoutController);
        })(Payout = Modules.Payout || (Modules.Payout = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var paymentModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payment;
        (function (Payment) {
            var PaymentConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'payment/templates/'
                };
                return cons;
            })();
            function PaymentConfig($urlRouterProvider, $stateProvider, PaymentConstants) {
                var templatePath = PaymentConstants.templateUrl;
                $stateProvider
                    .state('main.account.payment', {
                    url: "/Payments",
                    views: {
                        account: {
                            templateUrl: templatePath + "payment.html",
                            controller: 'PaymentController',
                            controllerAs: 'paymentCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_PAYMENTS'
                    }
                })
                    .state('main.account.payment.receipt', {
                    url: "/Receipt/:payment_id",
                    views: {
                        "account@main.account": {
                            templateUrl: templatePath + "payment.receipt.html",
                            controller: 'PaymentReceiptController',
                            controllerAs: 'paymentReceiptCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'member',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_RECEIPT'
                    }
                });
            }
            PaymentConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'PaymentConstants'];
            paymentModule = angular.module(App.Config.Ng.module.name + ".payment", [])
                .constant('PaymentConstants', PaymentConstants)
                .config(PaymentConfig);
        })(Payment = Modules.Payment || (Modules.Payment = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payment;
        (function (Payment) {
            var PaymentService = (function () {
                function PaymentService(Card, Billing, AppConstants) {
                    var _this = this;
                    this.Card = Card;
                    this.Billing = Billing;
                    this.AppConstants = AppConstants;
                    this.createCard = function (card) {
                        return _this.Card.save(card);
                    };
                    this.getCard = function (user_id) {
                        return _this.Card.find(user_id, { user_id: user_id });
                    };
                    this.removeCard = function (user_id) {
                        return _this.Card.remove(user_id, { user_id: user_id });
                    };
                    this.getPayments = function (user_id) {
                        return _this.Billing.payments(user_id);
                    };
                    this.getPayment = function (payment_id) {
                        return _this.Billing.findPayment(payment_id);
                    };
                    this.paymentDatesTransformer = function (payment) {
                        if (payment.payment_type == 'initial_payment') {
                            payment.period_start = moment(payment.request.from_date, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormatV1);
                            payment.period_end = moment(payment.trial_end_after_days, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormatV1);
                        }
                        else {
                            payment.period_start = moment(payment.period_start, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormatV1);
                            payment.period_end = moment(payment.period_end, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormatV1);
                        }
                        payment['payment_date'] = moment(payment.created_at, _this.AppConstants.dateFormatStore).format(_this.AppConstants.dateFormatV1);
                        return payment;
                    };
                    this.getReceiptUrl = function (payout_id) {
                        return _this.Billing.getBaseControllerUrl(_this.Billing.controllerName, "payment-receipt/" + payout_id);
                    };
                }
                PaymentService.$inject = ['Card', 'Billing', 'AppConstants'];
                return PaymentService;
            }());
            Payment.PaymentService = PaymentService;
            paymentModule.service('PaymentService', PaymentService);
        })(Payment = Modules.Payment || (Modules.Payment = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payment;
        (function (Payment) {
            var BaseController = App.Base.BaseController;
            var PaymentController = (function (_super) {
                __extends(PaymentController, _super);
                function PaymentController($scope, $rootScope, PaymentService, $uibModal, PaymentConstants, $q, PayoutService, Billing) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.PaymentService = PaymentService;
                    this.$uibModal = $uibModal;
                    this.PaymentConstants = PaymentConstants;
                    this.$q = $q;
                    this.PayoutService = PayoutService;
                    this.Billing = Billing;
                    this.init = function () {
                        _this.loading();
                        _this.$q.all([
                            _this.PaymentService.getCard(_this.$rootScope['user'].id).then(_this.setCard.bind(_this)),
                            _this.PaymentService.getPayments(_this.$rootScope['user'].id).then(_this.setPayments.bind(_this))
                        ]).then(function () {
                            _this.ready();
                        });
                    };
                    this.getPaymentPDFUrl = function (payout_id) {
                        return _this.PaymentService.getReceiptUrl(payout_id);
                    };
                    this.setPayments = function (payments) {
                        _this.payments = _this.PayoutService.payoutsTransformer(payments);
                    };
                    this.addCard = function () {
                        _this.cardModalInstance = _this.$uibModal.open({
                            templateUrl: _this.PaymentConstants.templateUrl + "/add_card.modal.html",
                            controller: 'AddCardController',
                            controllerAs: 'ctrl'
                        });
                    };
                    this.removeCard = function () {
                        return _this.PaymentService.removeCard(_this.$rootScope['user'].id).then(function () {
                            _this.setCard();
                        });
                    };
                    this.setCard = function (card) {
                        if (card === void 0) { card = null; }
                        _this.card = card;
                    };
                    this.init();
                }
                PaymentController.$inject = ['$scope', '$rootScope', 'PaymentService', '$uibModal', 'PaymentConstants', '$q', 'PayoutService', 'Billing'];
                return PaymentController;
            }(BaseController));
            paymentModule.controller('PaymentController', PaymentController);
        })(Payment = Modules.Payment || (Modules.Payment = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payment;
        (function (Payment) {
            var PaymentReceiptController;
            (function (PaymentReceiptController_1) {
                var BaseController = App.Base.BaseController;
                var PaymentReceiptController = (function (_super) {
                    __extends(PaymentReceiptController, _super);
                    function PaymentReceiptController($scope, $rootScope, $stateParams, PaymentService) {
                        var _this = this;
                        _super.call(this, $scope, $rootScope);
                        this.$stateParams = $stateParams;
                        this.PaymentService = PaymentService;
                        this.init = function () {
                            _this.PaymentService.getPayment(_this.$stateParams.payment_id).then(_this.setPayment.bind(_this));
                        };
                        this.setPayment = function (payment) {
                            payment = _this.PaymentService.paymentDatesTransformer(payment);
                            _this.payment = payment;
                        };
                        this.init();
                    }
                    PaymentReceiptController.$inject = ['$scope', '$rootScope', '$stateParams', 'PaymentService'];
                    return PaymentReceiptController;
                }(BaseController));
                paymentModule.controller('PaymentReceiptController', PaymentReceiptController);
            })(PaymentReceiptController = Payment.PaymentReceiptController || (Payment.PaymentReceiptController = {}));
        })(Payment = Modules.Payment || (Modules.Payment = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Payment;
        (function (Payment) {
            var BaseController = App.Base.BaseController;
            var AddCardController = (function (_super) {
                __extends(AddCardController, _super);
                function AddCardController($scope, $rootScope, $uibModalInstance, PaymentService, $state) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$uibModalInstance = $uibModalInstance;
                    this.PaymentService = PaymentService;
                    this.$state = $state;
                    this.createCard = function (card) {
                        card.user_id = _this.$rootScope['user'].id;
                        return _this.PaymentService.createCard(card).then(function (card) {
                            _this.cancel();
                            _this.$state.reload();
                        }, function (error) {
                            _this.errorBags = _this.errorTranslate(error);
                        });
                    };
                    this.cancel = function () {
                        _this.$uibModalInstance.dismiss('close');
                    };
                }
                AddCardController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'PaymentService', '$state'];
                return AddCardController;
            }(BaseController));
            paymentModule.controller('AddCardController', AddCardController);
        })(Payment = Modules.Payment || (Modules.Payment = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var ratingModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var RatingConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'rating/templates/'
                };
                return cons;
            })();
            function RatingConfig($urlRouterProvider, $stateProvider, RatingConstants) {
                var templatePath = RatingConstants.templateUrl;
                $stateProvider
                    .state('main.rating', {
                    url: "",
                    views: {
                        main: {
                            templateUrl: templatePath + "rating.html",
                            controller: 'RatingController',
                            controllerAs: 'ratingCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'guest',
                            redirectTo: App.Config.Acl.redirects.member
                        },
                        pageTitle: 'PT_RATING'
                    }
                });
            }
            RatingConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'RatingConstants'];
            ratingModule = angular.module(App.Config.Ng.module.name + ".rating", [])
                .constant('RatingConstants', RatingConstants)
                .config(RatingConfig);
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating_1) {
            var RatingService = (function () {
                function RatingService(Rating) {
                    var _this = this;
                    this.Rating = Rating;
                    this.addRating = function (rating, comment, request_id, rating_id) {
                        if (rating_id === void 0) { rating_id = null; }
                        return _this.Rating.addRating(rating, comment, request_id, rating_id);
                    };
                    this.isRated = function (request_id) {
                        return _this.Rating.isRated(request_id);
                    };
                }
                RatingService.$inject = ['Rating'];
                return RatingService;
            }());
            Rating_1.RatingService = RatingService;
            ratingModule.service('RatingService', RatingService);
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var BaseController = App.Base.BaseController;
            var RatingController = (function (_super) {
                __extends(RatingController, _super);
                function RatingController($scope, $rootScope) {
                    _super.call(this, $scope, $rootScope);
                }
                RatingController.$inject = ['$scope', '$rootScope'];
                return RatingController;
            }(BaseController));
            ratingModule.controller('RatingController', RatingController);
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var BaseController = App.Base.BaseController;
            var RatingAddController = (function (_super) {
                __extends(RatingAddController, _super);
                function RatingAddController($scope, $rootScope, $uibModalInstance, request, RatingService, forMultiple, $state) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$uibModalInstance = $uibModalInstance;
                    this.request = request;
                    this.RatingService = RatingService;
                    this.forMultiple = forMultiple;
                    this.$state = $state;
                    this.addRating = function (rating, comment) {
                        return _this.RatingService.addRating(rating, comment, _this.request.id, _this.request.rating.id)
                            .then(function (rating) {
                            if (_.has(rating, 'id'))
                                _this.request.rating = rating;
                            _this.$uibModalInstance.dismiss('close');
                            if (!_this.forMultiple)
                                _this.$state.reload();
                        });
                    };
                    this.cancel = function () {
                        if (_this.forMultiple) {
                            return _this.RatingService.isRated(_this.request.id).then(function (request) {
                                _this.request.isRated = request.isRated;
                                _this.$uibModalInstance.dismiss('close');
                            });
                        }
                        _this.$uibModalInstance.dismiss('close');
                    };
                }
                RatingAddController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'request', 'RatingService', 'forMultiple', '$state'];
                return RatingAddController;
            }(BaseController));
            ratingModule.controller('RatingAddController', RatingAddController);
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var adminRatingModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminRating;
        (function (AdminRating) {
            var AdminRatingConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'admin_rating/templates/'
                };
                return cons;
            })();
            function AdminRatingConfig($urlRouterProvider, $stateProvider, AdminRatingConstants) {
                var templatePath = AdminRatingConstants.templateUrl;
                $stateProvider
                    .state('main.admin.admin_rating', {
                    url: "",
                    views: {
                        admin: {
                            templateUrl: templatePath + "admin_rating.html",
                            controller: 'AdminRatingController',
                            controllerAs: 'adminRatingCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_ADMIN_RATING'
                    }
                });
            }
            AdminRatingConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'AdminRatingConstants'];
            adminRatingModule = angular.module(App.Config.Ng.module.name + ".admin_rating", [])
                .constant('AdminRatingConstants', AdminRatingConstants)
                .config(AdminRatingConfig);
        })(AdminRating = Modules.AdminRating || (Modules.AdminRating = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminRating;
        (function (AdminRating) {
            var AdminRatingService = (function () {
                function AdminRatingService(Rating) {
                    var _this = this;
                    this.Rating = Rating;
                    this.initSearchUser = '';
                    this.allRating = function () {
                        return _this.Rating.getAll();
                    };
                    this.deleteRating = function (rating_id) {
                        return _this.Rating.remove(rating_id);
                    };
                }
                AdminRatingService.$inject = ['Rating'];
                return AdminRatingService;
            }());
            AdminRating.AdminRatingService = AdminRatingService;
            adminRatingModule.service('AdminRatingService', AdminRatingService);
        })(AdminRating = Modules.AdminRating || (Modules.AdminRating = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminRating;
        (function (AdminRating) {
            var BaseController = App.Base.BaseController;
            var AdminRatingController = (function (_super) {
                __extends(AdminRatingController, _super);
                function AdminRatingController($scope, $rootScope, DTOptionsBuilder, AdminRatingService, $uibModal, RatingConstants, $filter, $state) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.DTOptionsBuilder = DTOptionsBuilder;
                    this.AdminRatingService = AdminRatingService;
                    this.$uibModal = $uibModal;
                    this.RatingConstants = RatingConstants;
                    this.$filter = $filter;
                    this.$state = $state;
                    this.filterOption = {
                        type: 'text',
                        bRegex: true,
                        bSmart: true
                    };
                    this.filteredColumnsCount = 5;
                    this.init = function () {
                        _this.loading();
                        var filterOptions = [];
                        while (_this.filteredColumnsCount > 0) {
                            filterOptions.push(_this.filterOption);
                            _this.filteredColumnsCount--;
                        }
                        _this.dtOptions = _this.DTOptionsBuilder
                            .newOptions()
                            .withOption('hasColumnFilter', true)
                            .withOption('lengthMenu', [25, 50, 100])
                            .withOption('sDom', '<"top"l>f<"and"i>rt<"bottom"p><"clear">')
                            .withOption('oSearch', {
                            "sSearch": _this.AdminRatingService.initSearchUser
                        })
                            .withColumnFilter({
                            aoColumns: filterOptions
                        });
                        _this.getRatings();
                    };
                    this.getRatings = function () {
                        return _this.AdminRatingService.allRating().then(function (ratings) {
                            _this.ratings = _.map(ratings, function (rating) {
                                rating.created_at = moment(rating.created_at, 'YYYY-MM-DD HH:mm:ss');
                                return rating;
                            });
                            _this.ready();
                        });
                    };
                    this.editRating = function (rating) {
                        var rating_copy = _.clone(rating);
                        delete rating_copy.request;
                        delete rating_copy.listing;
                        rating = rating.request;
                        rating.rating = rating_copy;
                        _this.editRatingModalInstance = _this.$uibModal.open({
                            templateUrl: _this.RatingConstants.templateUrl + "add_rating.modal.html",
                            controller: 'RatingAddController',
                            controllerAs: 'addRatingCtrl',
                            resolve: {
                                request: function () {
                                    return rating;
                                },
                                forMultiple: function () {
                                    return false;
                                }
                            }
                        });
                    };
                    this.deleteRating = function (rating_id) {
                        var delete_text = _this.$filter('translate')('DELETE');
                        var rating_text = _this.$filter('translate')('RATING');
                        var cancel_text = _this.$filter('translate')('CANCEL');
                        var yes_text = _this.$filter('translate')('YES');
                        swal({
                            title: delete_text + " " + rating_text + " ?",
                            showCancelButton: true,
                            confirmButtonColor: "#1D84C6",
                            confirmButtonText: "" + yes_text,
                            cancelButtonText: "" + cancel_text,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true }, function (isConfirm) {
                            if (isConfirm) {
                                return _this.AdminRatingService.deleteRating(rating_id).then(function () {
                                    _this.$state.reload();
                                    swal.close();
                                });
                            }
                        });
                    };
                    this.init();
                }
                AdminRatingController.$inject = ['$scope', '$rootScope', 'DTOptionsBuilder', 'AdminRatingService', '$uibModal', 'RatingConstants', '$filter', '$state'];
                return AdminRatingController;
            }(BaseController));
            adminRatingModule.controller('AdminRatingController', AdminRatingController);
        })(AdminRating = Modules.AdminRating || (Modules.AdminRating = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var seoSearchModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SeoSearch;
        (function (SeoSearch) {
            var SeoSearchConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'seo_search/templates/'
                };
                return cons;
            })();
            function SeoSearchConfig($urlRouterProvider, $stateProvider, SeoSearchConstants) {
                var templatePath = SeoSearchConstants.templateUrl;
                $stateProvider
                    .state('main.seo_search', {
                    url: "/:place",
                    views: {
                        main: {
                            templateUrl: templatePath + "seo_search.html",
                            controller: 'SeoSearchController',
                            controllerAs: 'seoSearchCtrl'
                        }
                    },
                    data: {
                        pageTitle: 'PT_SEARCH_STORAGE'
                    }
                });
            }
            SeoSearchConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'SeoSearchConstants'];
            seoSearchModule = angular.module(App.Config.Ng.module.name + ".seo_search", [])
                .constant('SeoSearchConstants', SeoSearchConstants)
                .config(SeoSearchConfig);
        })(SeoSearch = Modules.SeoSearch || (Modules.SeoSearch = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SeoSearch;
        (function (SeoSearch) {
            var SeoSearchService = (function () {
                function SeoSearchService(Listing) {
                    var _this = this;
                    this.Listing = Listing;
                    this.getSeoSearch = function (placeName) {
                        return _this.Listing.getSeoSearchResults(placeName);
                    };
                }
                SeoSearchService.$inject = ['Listing'];
                return SeoSearchService;
            }());
            SeoSearch.SeoSearchService = SeoSearchService;
            seoSearchModule.service('SeoSearchService', SeoSearchService);
        })(SeoSearch = Modules.SeoSearch || (Modules.SeoSearch = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SeoSearch;
        (function (SeoSearch) {
            var BaseController = App.Base.BaseController;
            var SeoSearchController = (function (_super) {
                __extends(SeoSearchController, _super);
                function SeoSearchController($scope, $rootScope, $stateParams, SeoSearchService, ResultPageService, RequestService, $state, Cms, $sce, AppConstants, $window) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$stateParams = $stateParams;
                    this.SeoSearchService = SeoSearchService;
                    this.ResultPageService = ResultPageService;
                    this.RequestService = RequestService;
                    this.$state = $state;
                    this.Cms = Cms;
                    this.$sce = $sce;
                    this.AppConstants = AppConstants;
                    this.$window = $window;
                    this.listings = [];
                    this.cons = {
                        defaultPlace: 'oslo'
                    };
                    this.description = "";
                    this.init = function () {
                        _this.$window.scrollTo(0, 0);
                        _this.placeName = _this.getPlaceName();
                        _this.getListings();
                        _this.getSeoContent();
                        _this.setSeoTags();
                    };
                    this.setSeoTags = function () {
                        _this.$rootScope['pageTitle'] = "Lager " + _this.placeName;
                    };
                    this.getSeoContent = function () {
                        var placeName = _this.placeName;
                        if (_.indexOf(_this.AppConstants.mainSeoPlaces, _this.placeName) == -1) {
                            placeName = 'SEO';
                        }
                        _this.Cms.find(null, { name: placeName }).then(function (cms) {
                            if (!_.isEmpty(cms))
                                _this.description = _this.$sce.trustAsHtml(cms.content);
                            _this.$rootScope['metaDescription'] = _this.description ? String(_this.description).replace(/<[^>]+>/gm, '') : '';
                        });
                    };
                    this.getPlaceName = function () {
                        console.log(_this.$stateParams.place);
                        var placeNameSplit = _.split(_this.$stateParams.place, 'lager-'), placeName = _this.cons.defaultPlace;
                        if (placeNameSplit.length == 2) {
                            placeName = placeNameSplit[1];
                        }
                        return placeName;
                    };
                    this.getListings = function () {
                        _this.SeoSearchService.getSeoSearch(_this.placeName).then(_this.setListings.bind(_this));
                    };
                    this.setListings = function (listings) {
                        _this.listings = _this.ResultPageService.transformListing(listings);
                    };
                    this.navigateListingView = function (id) {
                        _this.ResultPageService.selected_address = null;
                        _this.RequestService.removeRequest();
                        _this.$state.go('main.storage_view', {
                            id: id
                        });
                    };
                    this.init();
                }
                SeoSearchController.$inject = ['$scope', '$rootScope', '$stateParams', 'SeoSearchService', 'ResultPageService', 'RequestService', '$state', 'Cms', '$sce', 'AppConstants', '$window'];
                return SeoSearchController;
            }(BaseController));
            seoSearchModule.controller('SeoSearchController', SeoSearchController);
        })(SeoSearch = Modules.SeoSearch || (Modules.SeoSearch = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var adminCmsModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminCms;
        (function (AdminCms) {
            var AdminCmsConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'admin_cms/templates/'
                };
                return cons;
            })();
            function AdminCmsConfig($urlRouterProvider, $stateProvider, AdminCmsConstants) {
                var templatePath = AdminCmsConstants.templateUrl;
                $stateProvider
                    .state('main.admin.admin_cms', {
                    url: "/ContentManagement",
                    views: {
                        "admin": {
                            templateUrl: templatePath + "admin_cms.html",
                            controller: 'AdminCmsController',
                            controllerAs: 'adminCmsCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_CONTENT_MANANGEMENT'
                    }
                });
            }
            AdminCmsConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'AdminCmsConstants'];
            adminCmsModule = angular.module(App.Config.Ng.module.name + ".admin_cms", [])
                .constant('AdminCmsConstants', AdminCmsConstants)
                .config(AdminCmsConfig);
        })(AdminCms = Modules.AdminCms || (Modules.AdminCms = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminCms;
        (function (AdminCms) {
            var AdminCmsService = (function () {
                function AdminCmsService(Cms) {
                    var _this = this;
                    this.Cms = Cms;
                    this.saveContent = function (type, name, content) {
                        if (content === void 0) { content = ''; }
                        return _this.Cms.save({
                            type: type,
                            name: name,
                            content: content
                        });
                    };
                }
                AdminCmsService.$inject = [
                    'Cms'
                ];
                return AdminCmsService;
            }());
            AdminCms.AdminCmsService = AdminCmsService;
            adminCmsModule.service('AdminCmsService', AdminCmsService);
        })(AdminCms = Modules.AdminCms || (Modules.AdminCms = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var AdminCms;
        (function (AdminCms) {
            var BaseController = App.Base.BaseController;
            var AdminCmsController = (function (_super) {
                __extends(AdminCmsController, _super);
                function AdminCmsController($scope, $rootScope, $sce, Cms, AdminCmsService, $filter) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$sce = $sce;
                    this.Cms = Cms;
                    this.AdminCmsService = AdminCmsService;
                    this.$filter = $filter;
                    this.previewHtml = '';
                    this.editorHtml = '';
                    this.onPreview = false;
                    this.test = {
                        name: 'searchContent'
                    };
                    this.cmsTypes = ['Page', 'Content'];
                    this.newCms = {
                        type: 'Page'
                    };
                    this.contents = [];
                    this.cmsOptions = {
                        height: 300,
                        toolbar: [
                            ['edit', ['undo', 'redo']],
                            ['headline', ['style']],
                            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                            ['fontface', ['fontname']],
                            ['textsize', ['fontsize']],
                            ['fontclr', ['color']],
                            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                            ['height', ['height']],
                            ['table', ['table']],
                            ['insert', ['link', 'picture', 'video', 'hr']],
                            ['view', ['fullscreen', 'codeview']],
                            ['help', ['help']]
                        ]
                    };
                    this.init = function () {
                        _this.getCmsContents();
                    };
                    this.getCmsContents = function () {
                        _this.Cms.getAll().then(_this.setContents.bind(_this)).then(function () {
                            _this.ready();
                        });
                    };
                    this.preview = function (editorHtml) {
                        _this.previewHtml = _this.$sce.trustAsHtml(editorHtml);
                        _this.onPreview = true;
                    };
                    this.save = function (content) {
                        var cms = _.extend(_this.cms, {
                            content: content,
                            name: _this.selectedContent.name,
                            id: _this.selectedContent.id
                        });
                        _this.loading();
                        return _this.Cms.save(cms).then(function (content) {
                            _this.ready();
                        });
                    };
                    this.remove = function (content) {
                        swal({
                            title: _this.$filter('translate')('DELETE_CONTENT'),
                            showCancelButton: true,
                            confirmButtonColor: "#1D84C6",
                            confirmButtonText: 'Yes',
                            cancelButtonText: "Cancel",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true }, function (isConfirm) {
                            if (isConfirm) {
                                _this.loading();
                                return _this.Cms.remove(content.id).then(function () {
                                    swal.close();
                                    _.remove(_this.contents, function (content_rem) {
                                        return content.id == content_rem.id;
                                    });
                                    _this.setContents(_this.contents);
                                    _this.ready();
                                });
                            }
                        });
                    };
                    this.addContent = function (type, name) {
                        _this.loading();
                        return _this.AdminCmsService.saveContent(type, name).then(function (addded_content) {
                            _this.ready();
                            _this.newCms.name = null;
                            _this.contents.unshift(addded_content);
                            _this.setContents(_this.contents);
                        });
                    };
                    this.setContents = function (contents) {
                        _this.contents = contents;
                        if (contents.length > 0)
                            _this.setContent(contents[0]);
                    };
                    this.setContent = function (content) {
                        _this.selectedContent = content;
                    };
                    this.init();
                }
                AdminCmsController.$inject = ['$scope', '$rootScope', '$sce', 'Cms', 'AdminCmsService', '$filter'];
                return AdminCmsController;
            }(BaseController));
            adminCmsModule.controller('AdminCmsController', AdminCmsController);
        })(AdminCms = Modules.AdminCms || (Modules.AdminCms = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var cmsPageModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var CmsPage;
        (function (CmsPage) {
            var CmsPageConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'cms_page/templates/'
                };
                return cons;
            })();
            function CmsPageConfig($urlRouterProvider, $stateProvider, CmsPageConstants) {
                var templatePath = CmsPageConstants.templateUrl;
                $stateProvider
                    .state('main.cms_page', {
                    url: "/Content/:name",
                    views: {
                        main: {
                            templateUrl: templatePath + "cms_page.html",
                            controller: 'CmsPageController',
                            controllerAs: 'cmsPageCtrl'
                        }
                    },
                    data: {
                        pageTitle: 'PT_CONTENT'
                    }
                });
            }
            CmsPageConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'CmsPageConstants'];
            cmsPageModule = angular.module(App.Config.Ng.module.name + ".cms_page", [])
                .constant('CmsPageConstants', CmsPageConstants)
                .config(CmsPageConfig);
        })(CmsPage = Modules.CmsPage || (Modules.CmsPage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var CmsPage;
        (function (CmsPage) {
            var CmsPageService = (function () {
                function CmsPageService(Cms) {
                    var _this = this;
                    this.Cms = Cms;
                    this.getPage = function (name) {
                        return _this.Cms.find(null, { name: name });
                    };
                }
                CmsPageService.$inject = ['Cms'];
                return CmsPageService;
            }());
            CmsPage.CmsPageService = CmsPageService;
            cmsPageModule.service('CmsPageService', CmsPageService);
        })(CmsPage = Modules.CmsPage || (Modules.CmsPage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var CmsPage;
        (function (CmsPage) {
            var BaseController = App.Base.BaseController;
            var CmsPageController = (function (_super) {
                __extends(CmsPageController, _super);
                function CmsPageController($scope, $rootScope, CmsPageService, $stateParams, $sce, $window) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.CmsPageService = CmsPageService;
                    this.$stateParams = $stateParams;
                    this.$sce = $sce;
                    this.$window = $window;
                    this.init = function () {
                        _this.$window.scrollTo(0, 0);
                    };
                    this.setPage = function (page) {
                        _this.page = page;
                        _this.page.content = _this.$sce.trustAsHtml(_this.page.content);
                    };
                    this.init();
                }
                CmsPageController.$inject = ['$scope', '$rootScope', 'CmsPageService', '$stateParams', '$sce', '$window'];
                return CmsPageController;
            }(BaseController));
            cmsPageModule.controller('CmsPageController', CmsPageController);
        })(CmsPage = Modules.CmsPage || (Modules.CmsPage = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var userProfileModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var UserProfile;
        (function (UserProfile) {
            var UserProfileConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'user_profile/templates/'
                };
                return cons;
            })();
            function UserProfileConfig($urlRouterProvider, $stateProvider, UserProfileConstants) {
                var templatePath = UserProfileConstants.templateUrl;
                $stateProvider
                    .state('main.user_profile', {
                    url: "/Profile/:user_id",
                    views: {
                        main: {
                            templateUrl: templatePath + "user_profile.html",
                            controller: 'UserProfileController',
                            controllerAs: 'userProfileCtrl'
                        }
                    },
                    data: {
                        pageTitle: 'PT_USER_PROFILE'
                    }
                });
            }
            UserProfileConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'UserProfileConstants'];
            userProfileModule = angular.module(App.Config.Ng.module.name + ".user_profile", [])
                .constant('UserProfileConstants', UserProfileConstants)
                .config(UserProfileConfig);
        })(UserProfile = Modules.UserProfile || (Modules.UserProfile = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var UserProfile;
        (function (UserProfile) {
            var UserProfileService = (function () {
                function UserProfileService(User) {
                    var _this = this;
                    this.User = User;
                    this.getUserProfile = function (user_id) {
                        return _this.User.getUserProfile(user_id);
                    };
                }
                UserProfileService.$inject = ['User'];
                return UserProfileService;
            }());
            UserProfile.UserProfileService = UserProfileService;
            userProfileModule.service('UserProfileService', UserProfileService);
        })(UserProfile = Modules.UserProfile || (Modules.UserProfile = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var UserProfile;
        (function (UserProfile) {
            var BaseController = App.Base.BaseController;
            var UserProfileController = (function (_super) {
                __extends(UserProfileController, _super);
                function UserProfileController($scope, $rootScope, UserProfileService, $stateParams, HelpersService, ResultPageService, RequestService, $state) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.UserProfileService = UserProfileService;
                    this.$stateParams = $stateParams;
                    this.HelpersService = HelpersService;
                    this.ResultPageService = ResultPageService;
                    this.RequestService = RequestService;
                    this.$state = $state;
                    this.init = function () {
                        _this.getProfile();
                    };
                    this.getProfile = function () {
                        _this.loading();
                        _this.UserProfileService.getUserProfile(_this.$stateParams.user_id).then(_this.setProfile.bind(_this));
                    };
                    this.setProfile = function (profile) {
                        _this.profile = _this.HelpersService.transformProfilePicture(profile);
                        _this.profile.created_at = moment(_this.profile.created_at).format('MMM YYYY');
                        _this.profile['listings'] = _this.ResultPageService.transformListing(_this.profile['listings']);
                        _this.profile['ratings'] = _.map(_this.profile['ratings'], function (rating) {
                            rating['reviewer'] = _this.HelpersService.transformProfilePicture(rating['reviewer']);
                            rating.updated_at = moment(rating.updated_at);
                            rating.rating = parseInt(rating.rating);
                            return rating;
                        });
                        _this.profile['user_rating'] = _.meanBy(_this.profile['ratings'], 'rating');
                        _this.ready();
                    };
                    this.navigateListingView = function (id) {
                        _this.ResultPageService.selected_address = null;
                        _this.RequestService.removeRequest();
                        _this.$state.go('main.storage_view', {
                            id: id
                        });
                    };
                    this.init();
                }
                UserProfileController.$inject = ['$scope', '$rootScope', 'UserProfileService', '$stateParams', 'HelpersService', 'ResultPageService', 'RequestService', '$state'];
                return UserProfileController;
            }(BaseController));
            userProfileModule.controller('UserProfileController', UserProfileController);
        })(UserProfile = Modules.UserProfile || (Modules.UserProfile = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var contactUsModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ContactUs;
        (function (ContactUs) {
            var ContactUsConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'contact_us/templates/'
                };
                return cons;
            })();
            function ContactUsConfig($urlRouterProvider, $stateProvider, ContactUsConstants) {
                var templatePath = ContactUsConstants.templateUrl;
                $stateProvider
                    .state('main.contact_us', {
                    url: "/ContactUs",
                    views: {
                        main: {
                            templateUrl: templatePath + "contact_us.html",
                            controller: 'ContactUsController',
                            controllerAs: 'contactUsCtrl'
                        }
                    },
                    data: {
                        pageTitle: 'PT_CONTACT_US'
                    }
                });
            }
            ContactUsConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'ContactUsConstants'];
            contactUsModule = angular.module(App.Config.Ng.module.name + ".contact_us", [])
                .constant('ContactUsConstants', ContactUsConstants)
                .config(ContactUsConfig);
        })(ContactUs = Modules.ContactUs || (Modules.ContactUs = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ContactUs;
        (function (ContactUs) {
            var ContactUsService = (function () {
                function ContactUsService() {
                }
                ContactUsService.$inject = [];
                return ContactUsService;
            }());
            ContactUs.ContactUsService = ContactUsService;
            contactUsModule.service('ContactUsService', ContactUsService);
        })(ContactUs = Modules.ContactUs || (Modules.ContactUs = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var ContactUs;
        (function (ContactUs) {
            var BaseController = App.Base.BaseController;
            var ContactUsController = (function (_super) {
                __extends(ContactUsController, _super);
                function ContactUsController($scope, $rootScope) {
                    _super.call(this, $scope, $rootScope);
                }
                ContactUsController.$inject = ['$scope', '$rootScope'];
                return ContactUsController;
            }(BaseController));
            contactUsModule.controller('ContactUsController', ContactUsController);
        })(ContactUs = Modules.ContactUs || (Modules.ContactUs = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var specialAccountModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SpecialAccount;
        (function (SpecialAccount) {
            var SpecialAccountConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'special_account/templates/'
                };
                return cons;
            })();
            function SpecialAccountConfig($urlRouterProvider, $stateProvider, SpecialAccountConstants) {
                var templatePath = SpecialAccountConstants.templateUrl;
                $stateProvider
                    .state('main.admin.special_account', {
                    url: "/SpecialAccount",
                    views: {
                        admin: {
                            templateUrl: templatePath + "special_account.html",
                            controller: 'SpecialAccountController',
                            controllerAs: 'specialAccountCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_SPECIAL_ACCOUNT'
                    }
                });
            }
            SpecialAccountConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'SpecialAccountConstants'];
            specialAccountModule = angular.module(App.Config.Ng.module.name + ".special_account", [])
                .constant('SpecialAccountConstants', SpecialAccountConstants)
                .config(SpecialAccountConfig);
        })(SpecialAccount = Modules.SpecialAccount || (Modules.SpecialAccount = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SpecialAccount;
        (function (SpecialAccount) {
            var SpecialAccountService = (function () {
                function SpecialAccountService(AdminUser) {
                    var _this = this;
                    this.AdminUser = AdminUser;
                    this.getSpecialUsers = function () {
                        return _this.AdminUser.getSpecialUsers();
                    };
                    this.saveSpecialUser = function (user) {
                        return _this.AdminUser.saveSpecialUser(user);
                    };
                }
                SpecialAccountService.$inject = ['AdminUser'];
                return SpecialAccountService;
            }());
            SpecialAccount.SpecialAccountService = SpecialAccountService;
            specialAccountModule.service('SpecialAccountService', SpecialAccountService);
        })(SpecialAccount = Modules.SpecialAccount || (Modules.SpecialAccount = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SpecialAccount;
        (function (SpecialAccount) {
            var BaseController = App.Base.BaseController;
            var SpecialAccountController = (function (_super) {
                __extends(SpecialAccountController, _super);
                function SpecialAccountController($scope, $rootScope, SpecialAccountService, $uibModal, SpecialAccountConstants, AdminUserService, HelpersService, $state) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.SpecialAccountService = SpecialAccountService;
                    this.$uibModal = $uibModal;
                    this.SpecialAccountConstants = SpecialAccountConstants;
                    this.AdminUserService = AdminUserService;
                    this.HelpersService = HelpersService;
                    this.$state = $state;
                    this.init = function () {
                        _this.loading();
                        _this.SpecialAccountService
                            .getSpecialUsers()
                            .then(_this.setUsers.bind(_this))
                            .then(function () {
                            _this.ready();
                        });
                    };
                    this.setUsers = function (users) {
                        _this.users = users;
                    };
                    this.openCreateSpecialAccount = function (user) {
                        if (user === void 0) { user = null; }
                        if (user)
                            user = _this.HelpersService.transformProfilePicture(user);
                        _this.createSpecialAccountInstance = _this.$uibModal.open({
                            templateUrl: _this.SpecialAccountConstants.templateUrl + "special_account.create.modal.html",
                            controller: 'SpecialAccountCreateController',
                            controllerAs: 'ctrl',
                            resolve: {
                                user: function () {
                                    return user;
                                }
                            }
                        });
                        _this.createSpecialAccountInstance.result.then(function (updated_user) {
                            if (updated_user)
                                _this.$state.reload();
                        });
                    };
                    this.activateDeactivate = function (user) {
                        var activate_deactivate_text = (user.isDeactivated == 1) ? 'Activate' : 'Deactivate';
                        swal({
                            title: activate_deactivate_text + " user ?",
                            showCancelButton: true,
                            confirmButtonColor: "#1D84C6",
                            confirmButtonText: 'Yes',
                            cancelButtonText: "Cancel",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true }, function (isConfirm) {
                            if (isConfirm) {
                                return _this.AdminUserService.activateDeactivateUser(user.id).then(function () {
                                    var index = _.findIndex(_this.users, { id: user.id });
                                    _this.users[index].isDeactivated = (user.isDeactivated == 1) ? 0 : 1;
                                    swal.close();
                                });
                            }
                        });
                    };
                    this.init();
                }
                SpecialAccountController.$inject = ['$scope', '$rootScope', 'SpecialAccountService', '$uibModal', 'SpecialAccountConstants', 'AdminUserService', 'HelpersService', '$state'];
                return SpecialAccountController;
            }(BaseController));
            specialAccountModule.controller('SpecialAccountController', SpecialAccountController);
        })(SpecialAccount = Modules.SpecialAccount || (Modules.SpecialAccount = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SpecialAccount;
        (function (SpecialAccount) {
            var BaseController = App.Base.BaseController;
            var SpecialAccountCreateController = (function (_super) {
                __extends(SpecialAccountCreateController, _super);
                function SpecialAccountCreateController($scope, $rootScope, $uibModalInstance, $q, SpecialAccountService, EditProfileService, user) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.$uibModalInstance = $uibModalInstance;
                    this.$q = $q;
                    this.SpecialAccountService = SpecialAccountService;
                    this.EditProfileService = EditProfileService;
                    this.user = user;
                    this.cancel = function (result) {
                        if (result === void 0) { result = null; }
                        _this.$uibModalInstance.close(result);
                    };
                    this.save = function (user) {
                        var defer = _this.$q.defer();
                        _this.SpecialAccountService.saveSpecialUser(user).then(function (created_user) {
                            if (user.profile_picture && !_.isString(user.profile_picture)) {
                                _this.EditProfileService.upload(user.profile_picture, created_user.id).then(function (from_upload) {
                                    defer.resolve(from_upload.data.data);
                                });
                            }
                            else {
                                defer.resolve(created_user);
                            }
                        }, function (error) {
                            _this.errorBags = _this.errorTranslate(error);
                            defer.reject(error);
                        });
                        return defer.promise.then(function (user) {
                            _this.cancel(user);
                            return user;
                        });
                    };
                }
                SpecialAccountCreateController.$inject = ['$scope', '$rootScope', '$uibModalInstance', '$q', 'SpecialAccountService', 'EditProfileService', 'user'];
                return SpecialAccountCreateController;
            }(BaseController));
            specialAccountModule.controller('SpecialAccountCreateController', SpecialAccountCreateController);
        })(SpecialAccount = Modules.SpecialAccount || (Modules.SpecialAccount = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var specialListingModule;
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SpecialListing;
        (function (SpecialListing) {
            var SpecialListingConstants = (function () {
                var cons = {
                    templateUrl: App.Config.Variables.modulesTemplateUrl + 'special_listing/templates/'
                };
                return cons;
            })();
            function SpecialListingConfig($urlRouterProvider, $stateProvider, SpecialListingConstants) {
                var templatePath = SpecialListingConstants.templateUrl;
                $stateProvider
                    .state('main.admin.special_listing', {
                    url: "/SpecialListings",
                    views: {
                        admin: {
                            templateUrl: templatePath + "special_listing.html",
                            controller: 'SpecialListingController',
                            controllerAs: 'specialListingCtrl'
                        }
                    },
                    data: {
                        permissions: {
                            only: 'admin',
                            redirectTo: App.Config.Acl.redirects.guest
                        },
                        pageTitle: 'PT_SPECIAL_LISTINGS'
                    }
                });
            }
            SpecialListingConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'SpecialListingConstants'];
            specialListingModule = angular.module(App.Config.Ng.module.name + ".special_listing", [])
                .constant('SpecialListingConstants', SpecialListingConstants)
                .config(SpecialListingConfig);
        })(SpecialListing = Modules.SpecialListing || (Modules.SpecialListing = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SpecialListing;
        (function (SpecialListing) {
            var SpecialListingService = (function () {
                function SpecialListingService() {
                }
                SpecialListingService.$inject = [];
                return SpecialListingService;
            }());
            SpecialListing.SpecialListingService = SpecialListingService;
            specialListingModule.service('SpecialListingService', SpecialListingService);
        })(SpecialListing = Modules.SpecialListing || (Modules.SpecialListing = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Modules;
    (function (Modules) {
        var SpecialListing;
        (function (SpecialListing) {
            var BaseController = App.Base.BaseController;
            var SpecialListingController = (function (_super) {
                __extends(SpecialListingController, _super);
                function SpecialListingController($scope, $rootScope, AdminListing, AddListingService, $state) {
                    var _this = this;
                    _super.call(this, $scope, $rootScope);
                    this.AdminListing = AdminListing;
                    this.AddListingService = AddListingService;
                    this.$state = $state;
                    this.init = function () {
                        _this.loading();
                        _this.AdminListing.getSpecialListing()
                            .then(_this.setListings.bind(_this))
                            .then(function () {
                            _this.ready();
                        });
                    };
                    this.setListings = function (listings) {
                        _this.listings = listings;
                    };
                    this.updateListing = function (listing) {
                        _this.AddListingService.setListing(angular.copy(listing));
                        _this.AddListingService.isNewListing = false;
                        _this.$state.go('main.account.storage.add_listing.step1_edit', { listing_id: listing.id, isNew: 0, isSpecial: 1 });
                    };
                    this.init();
                }
                SpecialListingController.$inject = ['$scope', '$rootScope', 'AdminListing', 'AddListingService', '$state'];
                return SpecialListingController;
            }(BaseController));
            specialListingModule.controller('SpecialListingController', SpecialListingController);
        })(SpecialListing = Modules.SpecialListing || (Modules.SpecialListing = {}));
    })(Modules = App.Modules || (App.Modules = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var User;
        (function (User) {
            var BaseRepository = App.Base.BaseRepository;
            var UserRepository = (function (_super) {
                __extends(UserRepository, _super);
                function UserRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'user');
                    this.recordName = 'user';
                    this.controllerName = 'userctrl';
                    this.default_id = 'id';
                    this.routes = {
                        SEND_MOBILE_VERIFICATION: 'send-mobile-verification',
                        MOBILE_VERIFY: 'verify-mobile',
                        SEND_USER_EMAIL_VERIFICATION: 'send-user-email-verification',
                        GET_USER_PROFILE: 'user-profile'
                    };
                    this.sendMobileVerification = function (mobile, id) {
                        return _this.Restangular.all(_this.controllerName + "/" + _this.routes.SEND_MOBILE_VERIFICATION)
                            .post({
                            mobile: mobile,
                            id: id
                        }).then(_this.toResult.bind(_this));
                    };
                    this.verifyMobile = function (mobile_verification_code, id) {
                        return _this.Restangular.all(_this.controllerName + "/" + _this.routes.MOBILE_VERIFY)
                            .post({
                            mobile_verification_code: mobile_verification_code,
                            id: id
                        }).then(_this.toResult.bind(_this));
                    };
                    this.sendUserEmailVerification = function () {
                        return _this.Restangular.all(_this.controllerName + "/" + _this.routes.SEND_USER_EMAIL_VERIFICATION)
                            .post({}).then(_this.toResult.bind(_this));
                    };
                    this.getUserProfile = function (user_id) {
                        return _this.Restangular.one(_this.controllerName + "/" + _this.routes.GET_USER_PROFILE, user_id).get({ user_id: user_id }).then(_this.toResult.bind(_this));
                    };
                }
                UserRepository.$inject = ['Restangular', '$q'];
                return UserRepository;
            }(BaseRepository));
            User.UserRepository = UserRepository;
            angularModule.service('User', UserRepository);
        })(User = Repositories.User || (Repositories.User = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Auth;
        (function (Auth) {
            var BaseRepository = App.Base.BaseRepository;
            var AuthRepository = (function (_super) {
                __extends(AuthRepository, _super);
                function AuthRepository(Restangular, $q, LoginConstants) {
                    var _this = this;
                    _super.call(this, Restangular, $q, LoginConstants.ROUTE_NAME);
                    this.LoginConstants = LoginConstants;
                    this.recordName = 'auth';
                    this.default_id = 'id';
                    this.routes = {
                        BEARER_TOKEN: 'bearer_token',
                        LOGIN: 'login',
                        FORGOT_PASSWORD: 'forgot_password',
                        RESET_PASSWORD: 'reset_password'
                    };
                    this.loginSocial = function (token) {
                        return _this.Restangular.one(_this.recordName + "/" + _this.routes.BEARER_TOKEN, token).get().then(_this.toResult.bind(_this));
                    };
                    this.login = function (email, password) {
                        return _this.Restangular.all(_this.recordName + "/" + _this.routes.LOGIN).post({ email: email, password: password }).then(_this.toResult.bind(_this));
                    };
                    this.forgotPassword = function (email) {
                        return _this.Restangular.all(_this.recordName + "/" + _this.routes.FORGOT_PASSWORD).post({ email: email }).then(_this.toResult.bind(_this));
                    };
                    this.resetPassword = function (reset) {
                        return _this.Restangular.all(_this.recordName + "/" + _this.routes.RESET_PASSWORD).post(reset).then(_this.toResult.bind(_this));
                    };
                    this.recordName = LoginConstants.ROUTE_NAME;
                }
                AuthRepository.$inject = ['Restangular', '$q', 'LoginConstants'];
                return AuthRepository;
            }(BaseRepository));
            Auth.AuthRepository = AuthRepository;
            angularModule.service('Auth', AuthRepository);
        })(Auth = Repositories.Auth || (Repositories.Auth = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var ListingType;
        (function (ListingType) {
            var BaseRepository = App.Base.BaseRepository;
            var ListingTypeRepository = (function (_super) {
                __extends(ListingTypeRepository, _super);
                function ListingTypeRepository(Restangular, $q) {
                    _super.call(this, Restangular, $q, 'listing_types');
                    this.recordName = 'listing_types';
                    this.default_id = 'id';
                }
                ListingTypeRepository.$inject = ['Restangular', '$q'];
                return ListingTypeRepository;
            }(BaseRepository));
            ListingType.ListingTypeRepository = ListingTypeRepository;
            angularModule.service('ListingType', ListingTypeRepository);
        })(ListingType = Repositories.ListingType || (Repositories.ListingType = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Listing;
        (function (Listing) {
            var BaseRepository = App.Base.BaseRepository;
            var ListingRepository = (function (_super) {
                __extends(ListingRepository, _super);
                function ListingRepository(Restangular, $q, AppConstants, $rootScope, HelpersService) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'listings');
                    this.AppConstants = AppConstants;
                    this.$rootScope = $rootScope;
                    this.HelpersService = HelpersService;
                    this.recordName = 'listings';
                    this.controllerName = 'listingsctrl';
                    this.default_id = 'id';
                    this.routes = {
                        RESULTS: 'search-results',
                        LISTING: 'search-result-listing',
                        DEACTIVATE: 'deactivate',
                        ACTIVATE: 'activate'
                    };
                    this.getResults = function (latitude, longitude, params) {
                        if (params === void 0) { params = {}; }
                        params = _.extend(params, { latitude: latitude, longitude: longitude });
                        return _this.Restangular.all(_this.controllerName + "/" + _this.routes.RESULTS)
                            .getList(params).then(_this.toResult.bind(_this));
                    };
                    this.getSeoSearchResults = function (placeName) {
                        return _this.Restangular.all(_this.controllerName + "/" + _this.routes.RESULTS)
                            .getList({ placeName: placeName }).then(_this.toResult.bind(_this));
                    };
                    this.getListing = function (id, params) {
                        return _this.Restangular.one(_this.controllerName + "/" + _this.routes.LISTING, id)
                            .get(params).then(_this.toResult.bind(_this));
                    };
                    this.transformer = function (listings) {
                        return _.map(listings, _this.transform.bind(_this));
                    };
                    this.transform = function (listing) {
                        listing.size_length = (listing.size_length) ? parseInt(listing.size_length) : 0;
                        listing.size_width = (listing.size_width) ? parseInt(listing.size_width) : 0;
                        listing.size_height = (listing.size_height) ? parseInt(listing.size_height) : 0;
                        listing['types_string'] = _.join(listing.types, ', ') ? _.join(listing.types, ', ') : '';
                        listing['accessibilty_string'] = _.join(listing.accessibility, ', ') ? _.join(listing.accessibility, ', ') : '';
                        listing.area = listing.size_length * listing.size_width;
                        if (_.has(listing, 'requests')) {
                            listing.requests = _.map(listing.requests, function (request) {
                                request.updated_at = _this.HelpersService.tzDateTimeStored(request.updated_at);
                                return _this.HelpersService.transformProfilePicture(request);
                            });
                        }
                        var profile_img = _this.$rootScope['resource_path'] + "/default_profile_picture.png";
                        if (_.has(listing.user, 'profile_picture')) {
                            if (_.isEmpty(listing.user.profile_picture)) {
                                listing.user.profile_picture = profile_img;
                            }
                            else if (_.startsWith(listing.user.profile_picture, 'users')) {
                                listing.user.profile_picture = _this.AppConstants.baseUrl + "/" + listing.user.profile_picture;
                            }
                        }
                        if (_.has(listing, 'user')) {
                            var username = _.split(listing.user.firstname, ' ');
                            listing['user']['username'] = !_.isEmpty(username) ? username[0] : 'No name';
                            listing.user.created_at = moment(listing.user.created_at);
                        }
                        listing.created_at = moment(listing.created_at);
                        if (!listing.heading)
                            listing.heading = 'No name';
                        if (!listing.description)
                            listing.description = 'No description';
                        return listing;
                    };
                    this.deactivate = function (id) {
                        return _this.Restangular.one(_this.controllerName + "/" + _this.routes.DEACTIVATE, id).put().then(_this.toResult.bind(_this));
                    };
                    this.activate = function (id) {
                        return _this.Restangular.one(_this.controllerName + "/" + _this.routes.ACTIVATE, id).put().then(_this.toResult.bind(_this));
                    };
                }
                ListingRepository.$inject = ['Restangular', '$q', 'AppConstants', '$rootScope', 'HelpersService'];
                return ListingRepository;
            }(BaseRepository));
            Listing.ListingRepository = ListingRepository;
            angularModule.service('Listing', ListingRepository);
        })(Listing = Repositories.Listing || (Repositories.Listing = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var ListingPhoto;
        (function (ListingPhoto) {
            var BaseRepository = App.Base.BaseRepository;
            var ListingPhotoRepository = (function (_super) {
                __extends(ListingPhotoRepository, _super);
                function ListingPhotoRepository(Restangular, $q) {
                    _super.call(this, Restangular, $q, 'listing_photo');
                    this.recordName = 'listing_photo';
                    this.default_id = 'id';
                }
                ListingPhotoRepository.$inject = ['Restangular', '$q'];
                return ListingPhotoRepository;
            }(BaseRepository));
            ListingPhoto.ListingPhotoRepository = ListingPhotoRepository;
            angularModule.service('ListingPhoto', ListingPhotoRepository);
        })(ListingPhoto = Repositories.ListingPhoto || (Repositories.ListingPhoto = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var AdminUser;
        (function (AdminUser) {
            var BaseRepository = App.Base.BaseRepository;
            var AdminUserRepository = (function (_super) {
                __extends(AdminUserRepository, _super);
                function AdminUserRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'admin/users');
                    this.recordName = 'admin/users';
                    this.controllerName = 'adminctrl';
                    this.default_id = 'id';
                    this.activateDeactivate = function (id) {
                        return _this.Restangular.one(_this.controllerName + "/activate-deactivate-user", id).put().then(_this.toResult.bind(_this));
                    };
                    this.getSpecialUsers = function () {
                        return _this.Restangular.all(_this.controllerName + "/special-users").getList().then(_this.toResult.bind(_this));
                    };
                    this.saveSpecialUser = function (user) {
                        var resource = null;
                        if (!_.has(user, 'id'))
                            resource = _this.Restangular.all(_this.controllerName + "/save-special-user").post(user);
                        else
                            resource = _this.Restangular.one(_this.controllerName + "/save-special-user", user.id).customPUT(user);
                        return resource.then(_this.toResult.bind(_this));
                    };
                }
                AdminUserRepository.$inject = ['Restangular', '$q'];
                return AdminUserRepository;
            }(BaseRepository));
            AdminUser.AdminUserRepository = AdminUserRepository;
            angularModule.service('AdminUser', AdminUserRepository);
        })(AdminUser = Repositories.AdminUser || (Repositories.AdminUser = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var AdminListing;
        (function (AdminListing) {
            var BaseRepository = App.Base.BaseRepository;
            var AdminListingRepository = (function (_super) {
                __extends(AdminListingRepository, _super);
                function AdminListingRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'admin/listings');
                    this.recordName = 'admin/listings';
                    this.controllerName = 'adminctrl';
                    this.default_id = 'id';
                    this.activateDeactivate = function (id) {
                        return _this.Restangular.one(_this.controllerName + "/activate-deactivate-listing", id).put().then(_this.toResult.bind(_this));
                    };
                    this.getSpecialListing = function () {
                        return _this.Restangular.all(_this.controllerName + "/special-listings").getList().then(_this.toResult.bind(_this));
                    };
                }
                AdminListingRepository.$inject = ['Restangular', '$q'];
                return AdminListingRepository;
            }(BaseRepository));
            AdminListing.AdminListingRepository = AdminListingRepository;
            angularModule.service('AdminListing', AdminListingRepository);
        })(AdminListing = Repositories.AdminListing || (Repositories.AdminListing = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var AdminRequest;
        (function (AdminRequest) {
            var BaseRepository = App.Base.BaseRepository;
            var AdminRequestRepository = (function (_super) {
                __extends(AdminRequestRepository, _super);
                function AdminRequestRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'admin/requests');
                    this.recordName = 'admin/requests';
                    this.controllerName = 'adminctrl';
                    this.default_id = 'id';
                    this.activateDeactivate = function (id) {
                        return _this.Restangular.one(_this.controllerName + "/activate-deactivate-request", id).put().then(_this.toResult.bind(_this));
                    };
                }
                AdminRequestRepository.$inject = ['Restangular', '$q'];
                return AdminRequestRepository;
            }(BaseRepository));
            AdminRequest.AdminRequestRepository = AdminRequestRepository;
            angularModule.service('AdminRequest', AdminRequestRepository);
        })(AdminRequest = Repositories.AdminRequest || (Repositories.AdminRequest = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Request;
        (function (Request) {
            var BaseRepository = App.Base.BaseRepository;
            var RequestRepository = (function (_super) {
                __extends(RequestRepository, _super);
                function RequestRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'requests');
                    this.recordName = 'requests';
                    this.controllerName = 'requestctrl';
                    this.default_id = 'id';
                    this.getAllRequests = function (id) {
                        return _this.getAll({ all: id });
                    };
                    this.getOwnerRequests = function (id) {
                        return _this.getAll({ owner: id });
                    };
                    this.getClientRequests = function (id) {
                        return _this.getAll({ client: id });
                    };
                    this.changeStatus = function (user_id, change_to, id, params) {
                        params = _.extend({ user_id: user_id, change_to: change_to, id: id }, params);
                        return _this.Restangular.one(_this.controllerName + "/change-status", id)
                            .put(params)
                            .then(_this.toResult.bind(_this));
                    };
                    this.sendMessage = function (message, request_id) {
                        return _this.Restangular.all(_this.controllerName + "/send-message").post({
                            id: request_id,
                            message: message
                        });
                    };
                    this.changeFromDate = function (from_date, request_id) {
                        return _this.Restangular.one(_this.controllerName + "/change-from-date", request_id)
                            .put({
                            from_date: from_date,
                            request_id: request_id
                        })
                            .then(_this.toResult.bind(_this));
                    };
                    this.getRequestControls = function () {
                        return _this.Restangular.all(_this.controllerName + "/request-controls").getList();
                    };
                }
                RequestRepository.$inject = ['Restangular', '$q'];
                return RequestRepository;
            }(BaseRepository));
            Request.RequestRepository = RequestRepository;
            angularModule.service('Request', RequestRepository);
        })(Request = Repositories.Request || (Repositories.Request = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var RequestLog;
        (function (RequestLog) {
            var BaseRepository = App.Base.BaseRepository;
            var RequestLogRepository = (function (_super) {
                __extends(RequestLogRepository, _super);
                function RequestLogRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'requestctrl');
                    this.recordName = 'requestlog';
                    this.controllerName = 'requestctrl';
                    this.default_id = 'id';
                    this.getNotifications = function (id) {
                        return _this.Restangular.one(_this.controllerName + "/notifications", id).get().then(_this.toResult.bind(_this));
                    };
                    this.refreshNotifications = function (id) {
                        return _this.Restangular.one(_this.controllerName + "/notification-refresh", id).put({ id: id }).then(_this.toResult.bind(_this));
                    };
                    this.seenNotification = function (to_id, request_id) {
                        return _this.Restangular.one(_this.controllerName + "/notification-request-seen", to_id).put({
                            to_id: to_id,
                            request_id: request_id
                        }).then(_this.toResult.bind(_this));
                    };
                }
                RequestLogRepository.$inject = ['Restangular', '$q'];
                return RequestLogRepository;
            }(BaseRepository));
            RequestLog.RequestLogRepository = RequestLogRepository;
            angularModule.service('RequestLog', RequestLogRepository);
        })(RequestLog = Repositories.RequestLog || (Repositories.RequestLog = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Billing;
        (function (Billing) {
            var BaseRepository = App.Base.BaseRepository;
            var BillingRepository = (function (_super) {
                __extends(BillingRepository, _super);
                function BillingRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'billing');
                    this.recordName = 'billing';
                    this.controllerName = 'billingctrl';
                    this.default_id = 'id';
                    this.createAccount = function (account) {
                        var ep_type = 'individual';
                        if (account.legal_entity.type == 'company')
                            ep_type = 'business';
                        return _this.Restangular.all(_this.controllerName + "/save-account-" + ep_type).post(account).then(_this.toResult.bind(_this));
                    };
                    this.uploadDocument = function (file) {
                        return _this.Restangular.one(_this.controllerName + "/upload-document")
                            .withHttpConfig({ transformRequest: angular.identity })
                            .customPOST(file, '', undefined, {
                            'Content-Type': undefined
                        });
                    };
                    this.getAccount = function (user_id) {
                        return _this.Restangular.one(_this.controllerName + "/find-account", user_id).get({ user_id: user_id });
                    };
                    this.initialPayment = function (request_id) {
                        var params = {
                            request_id: request_id
                        };
                        return _this.Restangular.one(_this.controllerName + "/initial-payment").customPOST(params).then(_this.toResult.bind(_this));
                    };
                    this.payments = function (user_id) {
                        return _this.Restangular.one(_this.controllerName + "/payments").get({
                            user_id: user_id
                        }).then(_this.toResult.bind(_this));
                    };
                    this.findPayment = function (payment_id) {
                        return _this.Restangular.one(_this.controllerName + "/payment", payment_id).get({ payment_id: payment_id }).then(_this.toResult.bind(_this));
                    };
                }
                BillingRepository.$inject = ['Restangular', '$q'];
                return BillingRepository;
            }(BaseRepository));
            Billing.BillingRepository = BillingRepository;
            angularModule.service('Billing', BillingRepository);
        })(Billing = Repositories.Billing || (Repositories.Billing = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Card;
        (function (Card) {
            var BaseRepository = App.Base.BaseRepository;
            var CardRepository = (function (_super) {
                __extends(CardRepository, _super);
                function CardRepository(Restangular, $q) {
                    _super.call(this, Restangular, $q, 'card');
                    this.recordName = 'card';
                    this.default_id = 'id';
                }
                CardRepository.$inject = ['Restangular', '$q'];
                return CardRepository;
            }(BaseRepository));
            Card.CardRepository = CardRepository;
            angularModule.service('Card', CardRepository);
        })(Card = Repositories.Card || (Repositories.Card = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Payout;
        (function (Payout) {
            var BaseRepository = App.Base.BaseRepository;
            var PayoutRepository = (function (_super) {
                __extends(PayoutRepository, _super);
                function PayoutRepository(Restangular, $q, Billing) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'payout');
                    this.Billing = Billing;
                    this.recordName = 'payout';
                    this.default_id = 'id';
                    this.addBankAccount = function (bank_account, user_id) {
                        var params = {
                            bank_account: bank_account,
                            user_id: user_id
                        };
                        return _this.Restangular.all(_this.Billing.controllerName + "/add-bank-account").post(params).then(_this.toResult.bind(_this));
                    };
                }
                PayoutRepository.$inject = ['Restangular', '$q', 'Billing'];
                return PayoutRepository;
            }(BaseRepository));
            Payout.PayoutRepository = PayoutRepository;
            angularModule.service('Payout', PayoutRepository);
        })(Payout = Repositories.Payout || (Repositories.Payout = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Rating;
        (function (Rating) {
            var BaseRepository = App.Base.BaseRepository;
            var RatingRepository = (function (_super) {
                __extends(RatingRepository, _super);
                function RatingRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'rating');
                    this.recordName = 'rating';
                    this.controllerName = 'ratingctrl';
                    this.default_id = 'id';
                    this.addRating = function (rating, comment, request_id, rating_id) {
                        if (rating_id === void 0) { rating_id = null; }
                        var params = {
                            rating: rating,
                            comment: comment,
                            request_id: request_id
                        };
                        if (rating_id)
                            params.rating_id = rating_id;
                        return _this.Restangular.all(_this.controllerName + "/add-rating").post(params);
                    };
                    this.isRated = function (request_id) {
                        return _this.Restangular.all(_this.controllerName + "/is-rated").customPUT({ request_id: request_id });
                    };
                }
                RatingRepository.$inject = ['Restangular', '$q'];
                return RatingRepository;
            }(BaseRepository));
            Rating.RatingRepository = RatingRepository;
            angularModule.service('Rating', RatingRepository);
        })(Rating = Repositories.Rating || (Repositories.Rating = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Repositories;
    (function (Repositories) {
        var Cms;
        (function (Cms) {
            var BaseRepository = App.Base.BaseRepository;
            var CmsRepository = (function (_super) {
                __extends(CmsRepository, _super);
                function CmsRepository(Restangular, $q) {
                    var _this = this;
                    _super.call(this, Restangular, $q, 'cms');
                    this.recordName = 'cms';
                    this.controllerName = 'cmsctrl';
                    this.default_id = 'id';
                    this.getPages = function () {
                        return _this.Restangular.all(_this.controllerName + "/pages").getList({ types: 'Page,FooterItem' }).then(_this.toResult.bind(_this));
                    };
                }
                CmsRepository.$inject = ['Restangular', '$q'];
                return CmsRepository;
            }(BaseRepository));
            Cms.CmsRepository = CmsRepository;
            angularModule.service('Cms', CmsRepository);
        })(Cms = Repositories.Cms || (Repositories.Cms = {}));
    })(Repositories = App.Repositories || (App.Repositories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Services;
    (function (Services) {
        var AuthService = (function () {
            function AuthService($sessionStorage, AppConstants, Auth, $rootScope, HelpersService) {
                var _this = this;
                this.$sessionStorage = $sessionStorage;
                this.AppConstants = AppConstants;
                this.Auth = Auth;
                this.$rootScope = $rootScope;
                this.HelpersService = HelpersService;
                this.setUser = function (user) {
                    if (user === void 0) { user = null; }
                    if (_.isNull(user)) {
                        user = _this.getUser();
                    }
                    user = _this.HelpersService.transformUserPicture(user);
                    _this.$rootScope['user'] = user;
                    _this.$sessionStorage.putObject(_this.AppConstants.userKey, user);
                    if (_.has(user, '_token'))
                        _this.setToken(user._token);
                    delete _this.$rootScope['user']._token;
                    return user;
                };
                this.setToken = function (token) {
                    _this.$sessionStorage.put(_this.AppConstants.userToken, token);
                };
                this.getUser = function () {
                    return _this.$sessionStorage.getObject(_this.AppConstants.userKey);
                };
                this.getToken = function () {
                    return _this.$sessionStorage.get(_this.AppConstants.userToken);
                };
                this.isAuthenticated = function () {
                    return !_.isEmpty(_this.getUser());
                };
                this.isMobileVerified = function () {
                    return _this.getUser().mobile_verified;
                };
                this.isEmailVerified = function () {
                    return _this.getUser().email_verified;
                };
                this.login = function (email, password) {
                    return _this.Auth.login(email, password).then(_this.setUser.bind(_this));
                };
                this.loginSocial = function (token) {
                    return _this.Auth.loginSocial(token).then(_this.setUser.bind(_this));
                };
                this.logout = function () {
                    _this.$sessionStorage.remove(_this.AppConstants.userKey);
                    _this.$sessionStorage.remove(_this.AppConstants.userToken);
                    _this.$sessionStorage.remove('onMobileVerification');
                    _this.$sessionStorage.remove('saved_page');
                    _this.$rootScope['user'] = null;
                };
                this.savePage = function (page) {
                    _this.$sessionStorage.put('saved_page', page);
                };
                this.getSavedPage = function () {
                    return _this.$sessionStorage.get('saved_page');
                };
                this.removeSavedPage = function () {
                    _this.$sessionStorage.remove('saved_page');
                };
                this.forgotPassword = function (email) {
                    return _this.Auth.forgotPassword(email);
                };
                this.resetPassword = function (reset) {
                    return _this.Auth.resetPassword(reset);
                };
                this.setUserFields = function (fields) {
                    var user = _.extend(_this.getUser(), fields);
                    _this.setUser(user);
                };
                this.isAdmin = function () {
                    return _.has(_this.getUser(), 'role') ? _this.getUser().role == _this.AppConstants.adminRole : false;
                };
            }
            AuthService.$inject = ['$sessionStorage', 'AppConstants', 'Auth', '$rootScope', 'HelpersService'];
            return AuthService;
        }());
        Services.AuthService = AuthService;
        angularModule.service('AuthService', AuthService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Services;
    (function (Services) {
        angularModule.factory('$remember', function () {
            function fetchValue(name) {
                var gCookieVal = document.cookie.split("; ");
                for (var i = 0; i < gCookieVal.length; i++) {
                    var gCrumb = gCookieVal[i].split("=");
                    if (name === gCrumb[0]) {
                        var value = '';
                        try {
                            value = angular.fromJson(gCrumb[1]);
                        }
                        catch (e) {
                            value = unescape(gCrumb[1]);
                        }
                        return value;
                    }
                }
                return null;
            }
            return function (name, values) {
                if (arguments.length === 1)
                    return fetchValue(name);
                var cookie = name + '=';
                if (typeof values === 'object') {
                    var expires = '';
                    cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
                    if (values.expires) {
                        var date = new Date();
                        date.setTime(date.getTime() + (values.expires * 24 * 60 * 60 * 1000));
                        expires = date.toGMTString();
                    }
                    cookie += (!values.session) ? 'expires=' + expires + ';' : '';
                    cookie += (values.path) ? 'path=' + values.path + ';' : '';
                    cookie += (values.secure) ? 'secure;' : '';
                }
                else {
                    cookie += values + ';';
                }
                document.cookie = cookie;
            };
        });
        angularModule.factory('$forget', function () {
            return function (name) {
                var cookie = name + '=;';
                cookie += 'expires=' + (new Date()).toString() + ';';
                document.cookie = cookie;
            };
        });
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Services;
    (function (Services) {
        var TranslationService = (function () {
            function TranslationService($sessionStorage, AppConstants, $translate) {
                var _this = this;
                this.$sessionStorage = $sessionStorage;
                this.AppConstants = AppConstants;
                this.$translate = $translate;
                this.localeKey = 'locale';
                this.setSavedLocale = function (locale) {
                    if (locale === void 0) { locale = _this.AppConstants.defaultLocale; }
                    var savedLocale = _this.getStoredLocale();
                    if (!savedLocale) {
                        _this.saveLocale(locale);
                    }
                    else {
                        _this.$translate.use(savedLocale);
                    }
                };
                this.saveLocale = function (locale) {
                    _this.$sessionStorage.put(_this.localeKey, locale);
                };
                this.getStoredLocale = function () {
                    return _this.$sessionStorage.get(_this.localeKey);
                };
            }
            TranslationService.$inject = ['$sessionStorage', 'AppConstants', '$translate'];
            return TranslationService;
        }());
        Services.TranslationService = TranslationService;
        angularModule.service('TranslationService', TranslationService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Services;
    (function (Services) {
        var AclAuth = (function () {
            function AclAuth(PermPermissionStore, AuthService) {
                var _this = this;
                this.PermPermissionStore = PermPermissionStore;
                this.AuthService = AuthService;
                this.roles = {
                    member: {
                        name: 'member',
                        permissions: []
                    },
                    guest: {
                        name: 'guest',
                        permissions: []
                    },
                    admin: {
                        name: 'admin',
                        permissions: []
                    }
                };
                this.setRoles = function () {
                    _this.PermPermissionStore
                        .definePermission(_this.roles.member.name, function () {
                        return _this.isMember();
                    });
                    _this.PermPermissionStore
                        .definePermission(_this.roles.guest.name, function () {
                        return _this.isGuest();
                    });
                    _this.PermPermissionStore
                        .definePermission(_this.roles.admin.name, function () {
                        return _this.isAdmin();
                    });
                };
                this.isMember = function () {
                    return _this.AuthService.isAuthenticated();
                };
                this.isGuest = function () {
                    return !_this.AuthService.isAuthenticated();
                };
                this.isAdmin = function () {
                    return _this.AuthService.isAuthenticated() && _this.AuthService.isAdmin();
                };
            }
            AclAuth.$inject = ['PermPermissionStore', 'AuthService'];
            return AclAuth;
        }());
        Services.AclAuth = AclAuth;
        angularModule.service('AclAuth', AclAuth);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Services;
    (function (Services) {
        var Helpers;
        (function (Helpers) {
            var GoogleMapHelpers = (function () {
                function GoogleMapHelpers() {
                    var _this = this;
                    this.setAddressComponents = function (google_address) {
                        _this.google_address = google_address;
                        if (_.has(google_address, 'address_components')) {
                            _this.address_components = google_address.address_components;
                        }
                        else {
                            _this.address_components = null;
                        }
                        return _this;
                    };
                    this.getAddressComponents = function () {
                        return _this.address_components;
                    };
                    this.getAddressByCategory = function (type, defaultMsg) {
                        var addr_position = _.findIndex(_this.address_components, function (component) {
                            return _.indexOf(component.types, type) > -1;
                        });
                        if (addr_position == -1)
                            return defaultMsg;
                        return _this.address_components[addr_position].long_name;
                    };
                    this.getCity = function () {
                        return _this.getAddressByCategory('postal_town', '');
                    };
                    this.getPostalCode = function () {
                        return _this.getAddressByCategory('postal_code', '');
                    };
                    this.getCountry = function () {
                        return _this.getAddressByCategory('country', '');
                    };
                    this.getFullAddressName = function () {
                        if (_this.address_components) {
                            return _this.getPostalCode() + " " + _this.getCity();
                        }
                        else {
                            if (_.has(_this.google_address, 'formatted_address') && _this.google_address) {
                                return "" + _this.google_address.formatted_address;
                            }
                            else {
                                return 'No address';
                            }
                        }
                    };
                }
                return GoogleMapHelpers;
            }());
            Helpers.GoogleMapHelpers = GoogleMapHelpers;
            var HelpersService = (function () {
                function HelpersService(AppConstants, $rootScope, $location) {
                    var _this = this;
                    this.AppConstants = AppConstants;
                    this.$rootScope = $rootScope;
                    this.$location = $location;
                    this.gtmSearch = function () {
                        window['dataLayer'].push({
                            event: 'pageView',
                            action: _this.$location.url()
                        });
                        window['ga']('set', 'page', _this.$location.url());
                        window['ga']('send', 'pageview', { page: _this.$location.url() });
                    };
                    this.transformProfilePicture = function (user) {
                        var profile_img = _this.$rootScope['resource_path'] + "/default_profile_picture.png";
                        if (_.isEmpty(user.profile_picture)) {
                            user.profile_picture = profile_img;
                        }
                        else if (_.startsWith(user.profile_picture, 'users')) {
                            user.profile_picture = _this.AppConstants.baseUrl + "/" + user.profile_picture;
                        }
                        return user;
                    };
                    this.tzDateTime = function (datetime) {
                        return moment.tz(datetime, _this.AppConstants.timeZone).clone().tz(_this.getTz()).format(_this.AppConstants.dateTimeFormat);
                    };
                    this.tzDate = function (datetime) {
                        return moment.tz(datetime, _this.AppConstants.timeZone).clone().tz(_this.getTz()).format(_this.AppConstants.dateFormat);
                    };
                    this.tzDateTimeStored = function (datetime) {
                        return moment.tz(datetime, _this.AppConstants.timeZone).clone().tz(_this.getTz()).format(_this.AppConstants.dateTimeFormatStore);
                    };
                    this.getTz = function () {
                        return jstz.determine().name();
                    };
                    this.transformUserPicture = function (user) {
                        if (_.isEmpty(user.profile_picture)) {
                            user.profile_picture = _this.AppConstants.default_profile_picture;
                        }
                        else if (user.profile_picture !== _this.AppConstants.default_profile_picture && !_.startsWith(user.profile_picture, App.Config.Variables.baseUrl)) {
                            if (user.isSocial && _.startsWith(user.profile_picture, 'users')) {
                                user.profile_picture = App.Config.Variables.baseUrl + "/" + user.profile_picture;
                            }
                            else if (!user.isSocial && _.startsWith(user.profile_picture, 'users')) {
                                user.profile_picture = App.Config.Variables.baseUrl + "/" + user.profile_picture;
                            }
                        }
                        return user;
                    };
                    this.GoogleMap = new GoogleMapHelpers;
                }
                HelpersService.$inject = ['AppConstants', '$rootScope', '$location'];
                return HelpersService;
            }());
            Helpers.HelpersService = HelpersService;
            angularModule.service('HelpersService', HelpersService);
        })(Helpers = Services.Helpers || (Services.Helpers = {}));
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var FormError = (function () {
            function FormError() {
                this.restrict = 'EA';
                this.link = function (scope, elem, attrs) {
                };
                this.scope = {
                    errorBags: '=',
                    isBorderCornered: '@'
                };
                this.template = "\n             <div ng-class=\"{ 'no-border-radius' : !isBorderCornered }\" class=\"alert alert-danger text-center\" ng-show=\"errorBags.length > 0\">\n                    <!-- <strong>Something Went Wrong!</strong> -->\n                     <ul>\n                        <li ng-repeat=\"error in errorBags track by $index\">{{ error | translate }}</li>\n                    </ul>\n             </div>\n        ";
            }
            FormError.factory = function () {
                var directive = function () { return new FormError(); };
                directive.$inject = [];
                return directive;
            };
            return FormError;
        }());
        Directives.FormError = FormError;
        angularModule.directive('formError', FormError.factory());
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var RequestControl = (function () {
            function RequestControl(AclAuth, AuthService) {
                var _this = this;
                this.AclAuth = AclAuth;
                this.AuthService = AuthService;
                this.restrict = 'A';
                this.link = function (scope, elem, attrs) {
                    elem.addClass('hidden');
                    scope['$watch']('request', function (n, o) {
                        if (n)
                            _this.evaluate(scope, elem);
                    });
                };
                this.evaluate = function (scope, elem) {
                    console.log(_this.applyPermission(scope, elem));
                    if (_this.applyPermission(scope, elem)) {
                        _this.disable(scope.controlOptions.disable, elem, scope.request.request_status);
                        elem.removeClass('hidden');
                        _this.hide(scope.controlOptions.hide, elem, scope.request.request_status);
                    }
                    else {
                        elem.addClass('hidden');
                    }
                };
                this.disable = function (option, elem, request_status) {
                    if (_this.applyElement(option, request_status)) {
                        elem.find('button').attr({ disabled: 'disable' });
                    }
                };
                this.hide = function (option, elem, request_status) {
                    if (_this.applyElement(option, request_status))
                        elem.addClass('hidden');
                };
                this.applyElement = function (option, request_status) {
                    var result = false;
                    if (_.has(option, 'only')) {
                        result = _.indexOf(option.only, request_status) > -1;
                    }
                    if (_.has(option, 'except')) {
                        result = _.indexOf(option.except, request_status) == -1;
                    }
                    return result;
                };
                this.applyPermission = function (scope, elem) {
                    var user_id = _this.AuthService.getUser().id;
                    var request = scope.request;
                    var role = _this.getRole(request, user_id);
                    return _.indexOf(scope.controlOptions.permissions, role) > -1;
                };
                this.getRole = function (request, user_id) {
                    if (_this.AclAuth.isAdmin())
                        return 'admin';
                    if (parseInt(request.owner_id) == parseInt(user_id))
                        return 'owner';
                    if (parseInt(request.client_id) == parseInt(user_id))
                        return 'client';
                };
                this.scope = {
                    controlOptions: '=',
                    request: '='
                };
            }
            RequestControl.factory = function () {
                var directive = function (AclAuth, AuthService) {
                    return new RequestControl(AclAuth, AuthService);
                };
                directive.$inject = ['AclAuth', 'AuthService'];
                return directive;
            };
            return RequestControl;
        }());
        Directives.RequestControl = RequestControl;
        angularModule.directive('requestControl', RequestControl.factory());
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
angularModule.directive('ngEnter', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    };
});
angularModule.directive('focusName', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attributes) {
            $scope.focusRegistry = $scope.focusRegistry || {};
            $scope.focusRegistry[attributes.focusName] = element[0];
        }
    };
});
angularModule.directive('nextFocus', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attributes) {
            element.bind('keydown keypress', function (event) {
                if (event.which === 9) {
                    var focusElement = $scope.focusRegistry[attributes.nextFocus];
                    if (focusElement) {
                        if (!focusElement.hidden && !focusElement.disabled) {
                            focusElement.focus();
                            event.preventDefault();
                            return;
                        }
                    }
                    console.log('Unable to focus on target: ' + attributes.nextFocus);
                }
            });
        }
    };
})
    .directive('icheck', function ($timeout, $parse) {
    return {
        require: 'ngModel',
        link: function ($scope, element, $attrs, ngModel) {
            return $timeout(function () {
                var value;
                value = $attrs['value'];
                $scope.$watch($attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                });
                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'
                }).on('ifChanged', function (event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function () {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function () {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
})
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }]);
angularModule.filter('percentage', ['$filter', function ($filter) {
        return function (input, discount, decimals) {
            var computed = parseInt(input) - (parseInt(input) * (discount / 100));
            return parseInt(computed);
            if (!decimals) {
                return parseFloat(input) - (parseFloat(input) * (discount / 100));
            }
            return $filter('number')(parseFloat(input) - (parseFloat(input) * (discount / 100)), decimals);
        };
    }]);
angularModule.filter('filterByProperty', function () {
    return function (dataArray, searchTerm, propertyName) {
        if (!dataArray)
            return;
        if (!searchTerm) {
            return dataArray;
        }
        else {
            var term = searchTerm.toLowerCase();
            return dataArray.filter(function (item) {
                return item[propertyName].toLowerCase().indexOf(term) > -1;
            });
        }
    };
});
angularModule.filter('appTimeZone', function (AppConstants, HelpersService) {
    return function (dateString) {
        return moment.tz(dateString, AppConstants.timeZone).clone().tz(HelpersService.getTz()).format(AppConstants.dateTimeFormatStore);
    };
});
angularModule.filter('capitalize', function () {
    return function (input, scope) {
        if (input != null)
            input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
});
//# sourceMappingURL=bundle.js.map
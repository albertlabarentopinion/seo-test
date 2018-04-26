/// <reference path="../../typings/tsd.d.ts" />

declare let _ : any;

module App.Config {

    export const Ng : App.Config.IAngular = {
        module : {
            name : 'bod4rent',
            dependencies : [
                'ui.router',
                // 'oc.lazyLoad',   
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
                // 'ui.blueimp.gallery',
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
                // 'ngMap',

                /**
                 * Modules
                 */
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
                'bod4rent.special_listing' // testing out git push hook
            ]
        },
        templates : {
            guest_header : `${App.Config.Variables.modulesTemplateUrl}_main/templates/guest_topnavbar.html`,
            member_header : `${App.Config.Variables.modulesTemplateUrl}_main/templates/member_topnavbar.html`
        },
        modules : {
            LOGIN : 'login',
            LOGOUT : 'logout',
            PROFILE : 'profile'
        }
    }

    export const Acl : App.Config.ACL = {
        roles : {
            guest : [ 
                Ng.modules.LOGIN, 
            ],
            member : [
                Ng.modules.PROFILE
            ]
        },
        redirects : {
            member : 'main.home',
            guest : 'main.home'
        }
    }

}
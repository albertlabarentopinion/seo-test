var webpack = require('webpack'); 

module.exports = {
    entry : [
       "./node_modules/lodash/lodash.min.js",
    //    "./node_modules/restangular/dist/restangular.min.js",
    //    "./node_modules/angular-promise-buttons/dist/angular-promise-buttons.min.js",
       "./node_modules/angular-base64/angular-base64.min.js",
       "./node_modules/angular-translate/dist/angular-translate.min.js",
       "./node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
       "./node_modules/angular-permission/dist/angular-permission.min.js",
       "./node_modules/angular-permission/dist/angular-permission-ui.min.js",
       "./node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js",
       "./node_modules/ng-file-upload/dist/ng-file-upload.min.js",
       "./node_modules/angular-google-maps-native/dist/angular-google-maps-native.min.js",
    //    "./node_modules/angular-google-places-autocomplete/dist/autocomplete.min.js",
       "./node_modules/angular-dynamic-number/release/dynamic-number.min.js",
       "./js/plugins/blueimp-gallery/ng-blueimp-gallery.js",
       "./node_modules/angular-spinner/dist/angular-spinner.min.js",
       "./node_modules/angular-rangeslider/angular.rangeSlider.js"
    ],
    output : {
        filename : './dist/lib.js'
    },
    resolve : {
        extensions : ['', '.webpack.js', '.web.js', '.ts', '.js', '.min.js']
    },
    module :{
        loaders : [
        //    { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins : [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
}


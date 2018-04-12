module App.Config {

export const Variables : App.Interfaces.Constants.AppConstants = {
        appName : 'bod4rent',

        appAlias : 'Latell',

        environment : 'development',

        protocol : 'http://',

        baseUrl : 'bod4rent-api.test',

        baseClientUrl : 'bod4rent.test',

        api : {
                development : {
                url : 'bod4rent-api.test/api',
                version : 'v1'
            },
                production : {
                    url : 'bod4rent-api.test',
                    version : 'v1'
            }
        },

        basePath : './src/',

        modulesTemplateUrl : './src/modules/',

        languagePath : './languages/'
    }
}
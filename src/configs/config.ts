module App.Config {

    export const Variables : App.Interfaces.Constants.AppConstants = {
            appName : 'bod4rent',
    
            appAlias : 'Latell',
    
            environment : 'development',
    
            protocol : 'https://',
    
            baseUrl : 'api-staging.latell.no',
    
        baseClientUrl : 'staging.latell.no',
    
            api : {
                    development : {
                    url : 'api-staging.latell.no/api',
                    version : 'v1'
                },
                    production : {
                        url : 'bod4Rent-api.dev',
                        version : 'v1'
                }
            },
    
            basePath : './src/',
    
            modulesTemplateUrl : './src/modules/',
    
        languagePath : '/Staging/ClientBod4Rent/languages/'
        }
    }
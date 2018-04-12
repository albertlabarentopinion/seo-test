
module App.Directives {

        type RequestElement = {
            only? : string[];
            except? : string[]
        };

        interface IScope {
            controlOptions? : {
                disable? : RequestElement,
                hide? : RequestElement,
                permissions? : string[],
                control_name? : string,
            },
            request? : App.Repositories.Request.RequestResponse,
            [prop : string] : any
        }
    
        export class RequestControl implements ng.IDirective {
    
    
            constructor( 
                private AclAuth : App.Services.AclAuth,
                private AuthService : App.Services.AuthService
             ) {

            }
    
            static factory() : ng.IDirectiveFactory {
                let directive : ng.IDirectiveFactory = (  
                    AclAuth : App.Services.AclAuth,
                    AuthService : App.Services.AuthService
                 ) => new RequestControl( AclAuth, AuthService) ;

                    directive.$inject = [ 'AclAuth', 'AuthService' ]; 

                    return directive;
            }
    
            restrict = 'A';
    
            link = (scope : IScope, elem : ng.IAugmentedJQuery, attrs : ng.IAttributes) => {
                elem.addClass('hidden');

                scope['$watch']('request', (n : any, o : any) => {
                    if(n) this.evaluate(scope, elem);
                });
            }

            evaluate = ( scope : IScope, elem : ng.IAugmentedJQuery ) => {
                console.log(this.applyPermission( scope, elem ));
                if( this.applyPermission( scope, elem ) ) {
                    this.disable( scope.controlOptions.disable, elem, scope.request.request_status );
                    elem.removeClass('hidden');
                    this.hide( scope.controlOptions.hide, elem, scope.request.request_status );
                } else {
                    elem.addClass('hidden');
                }
            }

            disable = ( option : RequestElement, elem : ng.IAugmentedJQuery, request_status : string ) => {
                if( this.applyElement( option, request_status ) ){
                    elem.find('button').attr({disabled : 'disable'});
                }
            }

            hide = ( option : RequestElement, elem : ng.IAugmentedJQuery, request_status : string ) => {
                if( this.applyElement( option, request_status ) )
                    elem.addClass('hidden');
            }

            applyElement = ( option : RequestElement, request_status : string ) => {
                let result = false;

                if( _.has(option, 'only') ) {
                    result = _.indexOf( option.only, request_status ) > -1;
                } 
                if( _.has(option, 'except') ) {
                    result =  _.indexOf( option.except, request_status ) == -1;
                }

                return result;
            }

            applyPermission = ( scope : IScope, elem : ng.IAugmentedJQuery ) => {
                let user_id = this.AuthService.getUser().id;
                let request = scope.request;
                let role = this.getRole( request, user_id );
                return _.indexOf( scope.controlOptions.permissions, role ) > -1;

            }

            getRole = ( request : App.Repositories.Request.RequestResponse, user_id : any ) => {
                if( this.AclAuth.isAdmin() )
                    return 'admin';
                if( parseInt(request.owner_id) ==  parseInt(user_id) )
                    return 'owner';
                if( parseInt(request.client_id) ==  parseInt(user_id) )
                    return 'client';
            }
            
            scope = {
                controlOptions : '=',
                request : '='
            }
        }
    
        angularModule.directive('requestControl', RequestControl.factory());
    
    }
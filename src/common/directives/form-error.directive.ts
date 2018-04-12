
module App.Directives {

    export class FormError implements ng.IDirective {


        constructor( ) {
        }


        static factory() : ng.IDirectiveFactory {
            let directive : ng.IDirectiveFactory = ( ) => new FormError( );
                directive.$inject = [  ]; 
                return directive;
        }

        restrict = 'EA';

        link = (scope : any, elem : ng.IAugmentedJQuery, attrs : ng.IAttributes) => {
           
        }
        
        scope = {
            errorBags : '=',
            isBorderCornered : '@'
        }

        template = `
             <div ng-class="{ 'no-border-radius' : !isBorderCornered }" class="alert alert-danger text-center" ng-show="errorBags.length > 0">
                    <!-- <strong>Something Went Wrong!</strong> -->
                     <ul>
                        <li ng-repeat="error in errorBags track by $index">{{ error | translate }}</li>
                    </ul>
             </div>
        `;
    }

    angularModule.directive('formError', FormError.factory());

}
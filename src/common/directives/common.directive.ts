angularModule.directive('ngEnter', function () {
    return {
        restrict: 'AE',
        link : function (scope : any, element : any, attrs : any) {
            element.bind("keydown keypress", function (event : any) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    }
    // return function (scope : any, element : any, attrs : any) {
    //     element.bind("keydown keypress", function (event : any) {
    //         if (event.which === 13) {
    //             scope.$apply(function () {
    //                 scope.$eval(attrs.ngEnter);
    //             });
    //             event.preventDefault();
    //         }
    //     });
    // };
});

angularModule.directive('focusName', function() {
  return {
    restrict: 'A',
    link: function($scope : any, element : any, attributes : any) {
      $scope.focusRegistry = $scope.focusRegistry || {};
      $scope.focusRegistry[attributes.focusName] = element[0];
    }
  };
});

angularModule.directive('nextFocus',  () => {
    return {
      restrict: 'A',
      link: function ($scope : any, element : any, attributes : any) {
        element.bind('keydown keypress', function (event : any) {
          if (event.which === 9) { // Tab
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

  .directive('icheck', function($timeout, $parse) {
    return {
        require: 'ngModel',
        link: function($scope : any, element : any, $attrs : any, ngModel : any) {
            return $timeout(function() {
                var value : any;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue : any){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'
                }).on('ifChanged', function(event : any) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
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
        link: function (scope : any, element : any, attributes : any) {
            element.bind("change", function (changeEvent : any) {
                var reader = new FileReader();
                reader.onload = function (loadEvent : any) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}])


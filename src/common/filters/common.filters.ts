angularModule.filter('percentage', ['$filter', function ($filter : any ) {
  return function (input : any , discount : any, decimals : any ) {
    let computed : any = parseInt(input) - (parseInt( input ) * ( discount / 100 ));
    return parseInt(computed);
    if( !decimals ){
      return parseFloat(input) - (parseFloat( input ) * ( discount / 100 ));
    }
    return $filter('number')(parseFloat(input) - (parseFloat( input ) * ( discount / 100 )), decimals);
  };
}])

angularModule.filter('filterByProperty', function () {
        /* array is first argument, each addiitonal argument is prefixed by a ":" in filter markup*/
        return function (dataArray : any, searchTerm : any, propertyName : any) {
            if (!dataArray) return;
            /* when term is cleared, return full array*/
            if (!searchTerm) {
                return dataArray
            } else {
                /* otherwise filter the array */
                var term = searchTerm.toLowerCase();
                return dataArray.filter(function (item : any) {
                    return item[propertyName].toLowerCase().indexOf(term) > -1;
                });
            }
        }
})

angularModule.filter('appTimeZone', function( AppConstants : App.Main.MainConstants, HelpersService : App.Services.Helpers.HelpersService ){
    return function(dateString : string){
        return moment.tz(dateString, AppConstants.timeZone).clone().tz(HelpersService.getTz()).format(AppConstants.dateTimeFormatStore);
    }
});

angularModule.filter('capitalize', function() {
    return function(input, scope) {
      if (input!=null)
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  })
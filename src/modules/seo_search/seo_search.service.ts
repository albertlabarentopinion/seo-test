module App.Modules.SeoSearch {
    
    export class SeoSearchService {

        static $inject : string[] = [ 'Listing' ];
        
        constructor(
            private Listing : App.Repositories.Listing.ListingRepository
        ){

        }

        getSeoSearch = ( placeName : string ) => {
            return this.Listing.getSeoSearchResults(placeName);
        }

    }

    seoSearchModule.service( 'SeoSearchService', SeoSearchService );
}
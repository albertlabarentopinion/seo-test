

module App.Modules.ResultPage {

    import IListing = App.Repositories.Listing;

    export interface CriteriaFilter {
        type : 'range' | 'number' | 'string' | 'array',
        column : string,
        values : any[]
        [prop : string] : any;
    }


    export class ResultFilter {

        private listings : Array<IListing.ListingResponse>;

        private criteria : Array<CriteriaFilter> = [];

        constructor( listings : Array<IListing.ListingResponse> ){
            this.listings = listings;
        }


        get = () => {
            return this.listings;
        }

        set = ( listings : Array<IListing.ListingResponse> ) => {
            this.listings = listings;
            return this;
        }

        filter = ( criteria : Array<CriteriaFilter> = [] ) => {
            this.criteria = criteria;
            let ranges = _.filter( this.criteria, { type : 'range' } ); 
            let strings = _.filter( this.criteria, { type : 'string' } ); 
            let arrays = _.filter( this.criteria, { type : 'array' } ); 

            this.listings = _.filter( this.listings, ( listing : IListing.ListingResponse ) => {
                return this.frange( listing, ranges ) 
                    && this.fstring( listing, strings )
                    && this.farrays( listing, arrays );
            });

            return this;
        }

        public static filterReverse( criteria : Array<CriteriaFilter> = [] ){
            let ranges = _.filter( criteria, { type : 'range' } ); 
            let strings = _.filter( criteria, { type : 'string' } ); 
            let arrays = _.filter( criteria, { type : 'array' } ); 
            let filters : any = {};

            _.each( ranges, ( o : CriteriaFilter ) => {
                filters[o.column] = {};
                filters[o.column]['min'] = o.values[0];
                filters[o.column]['max'] = o.values[1];
            });

            _.each(_.concat( strings, arrays ), (o : CriteriaFilter) => {
                filters[o.column] = {};
                _.each(o.values, (so : any) => {
                    filters[o.column][so] = true;
                });
            });

            return filters;
        }

        sort = ( column : any, order : any = 'asc' ) => {
            this.listings = _.orderBy( this.listings, column, order );
            return this;
        }

        addPointsCriteria = () => {
            let max_distance = _.maxBy(this.listings, 'distance_in_km');

            if(!_.isEmpty(max_distance))
                max_distance = max_distance.distance_in_km;

            this.listings = _.map(this.listings, ( listing : any ) => {
                listing.points = (parseFloat(listing.price_per_month) / 100 ) + parseFloat(listing.distance_in_km);
                return listing;
            });

            return this;
        }

        private frange = ( listing : IListing.ListingResponse, ranges : Array<CriteriaFilter> ) => {
            let result = true;
            _.each( ranges, ( range : CriteriaFilter ) => {
                if (  (listing[range.column] >= range.values[0]  &&  listing[range.column] <= range.values[1]) == false)
                    result = false
            });
            return result;
        }

        private fnumber = ( listing : IListing.ListingResponse, numbers : Array<CriteriaFilter> ) => {
            return true;
        }

        private farrays = ( listing : IListing.ListingResponse, arrays : Array<CriteriaFilter> ) => {
            let result = true;
            _.each( arrays, ( arr : CriteriaFilter ) => {
                if(  !_.isEqual(_.intersection( arr.values, listing[arr.column] ), arr.values) ){
                    result = false;
                }
            });
            return result;
        }

        private fstring = ( listing : IListing.ListingResponse, strings : Array<CriteriaFilter> ) => {
            let result = true;
            _.each( strings, ( str : CriteriaFilter ) => {
                if ( _.indexOf( str.values, listing[str.column] ) == -1 )
                    return result = false;
            });
            return result;
        }
    }

    export class ResultPageService {

        static $inject = [ 'Listing', '$rootScope', 'AppConstants', '$filter', 'HelpersService' ];

        selected_address : any;

        smartZoomConfig : any = {
            // noOfListings : 20, // top listings
            noOfListings : 5, // top listings
            maxZoom : 50, // in km
            minZoom : .5 // in km
        };

        constructor(
            private Listing : App.Repositories.Listing.ListingRepository,
            private $rootScope : any,
            private AppConstants : App.Main.MainConstants,
            private $filter : any,
            private Helpers : App.Services.Helpers.HelpersService
        ){

        }

        getResults = ( coordinates : Array<number>, params : any = {} ) => {
            return this.Listing.getResults( coordinates[0], coordinates[1] );
        }

        raduisToZoom = ( radius : any ) => {
            return Math.round(14-Math.log(radius)/Math.LN2);
        }

        ResultFilter = ( listings : Array<IListing.ListingResponse> ) => {
            return ( new ResultFilter( listings ) );
        }

        FilterReverse = ( criteria : Array<CriteriaFilter> = [] ) => {
            return ResultFilter.filterReverse( criteria );
        }

        transformListing = ( listings : Array<IListing.ListingResponse> ) => {
            return _.map( listings, ( listing : IListing.ListingResponse ) => {
                listing = this.Listing.transform(listing);
                let cover_image = `${this.$rootScope['resource_path']}/no_image_thumb.gif`;

                if ( listing.photos.length == 0 ) listing['cover_image'] = cover_image; 
                if ( listing.photos.length > 0 ) listing['cover_image'] = `${this.$rootScope['baseUrl']}/${listing.photos[0].path}`;

                listing.price_per_month = parseInt( listing.price_per_month );
                let address_component = this.Helpers.GoogleMap.setAddressComponents(listing.google_address);
                listing.location = address_component.getFullAddressName();
                listing.zip = !_.isEmpty( listing.zip ) ? listing.zip : address_component.getPostalCode();
                listing.city = !_.isEmpty( listing.city ) ? listing.city : address_component.getCity();

                return listing;
            });
        }

        smartZoom = ( listings : Array<IListing.ListingResponse>, mapInstance : any, default_zoom : any ) => {
            
            let listings_in_range = _.filter( listings, ( listing : IListing.ListingResponse ) => {
                return  listing.distance_in_km <= this.smartZoomConfig.maxZoom;
            }); 
            if(listings_in_range.length >= this.smartZoomConfig.noOfListings){
                listings_in_range = listings_in_range.slice(0, this.smartZoomConfig.noOfListings);
            }
            console.log(listings_in_range);
            this.applyFitBounds(listings_in_range, mapInstance);
            return listings_in_range;
        }

        applyFitBounds = ( listings :  Array<IListing.ListingResponse>, mapInstance : any ) => {
            // console.log(listings[listings.length - 1].distance_in_km);  
            let center = mapInstance.getCenter();
            let [ lat, lng ] = [ center.lat(), center.lng() ];
            
            if( !_.isEmpty(listings) ){
                listings = _.orderBy(listings, 'distance_in_km', 'asc');
                let distance = listings[listings.length - 1].distance_in_km;
                // get circle raduis
                if(listings[listings.length - 1].distance_in_km < this.smartZoomConfig.minZoom){
                    distance = this.smartZoomConfig.minZoom;
                }
                let bound = new google.maps.LatLngBounds();
                let circle = new google.maps.Circle({
                    center : { lat : lat, lng : lng },
                    radius : distance * 1000
                    // strokeColor: '#FF0000',
                    // strokeOpacity: 0.8,
                    // strokeWeight: 2,
                    // fillColor: '#FF0000',
                    // fillOpacity: 0.35,
                    // map : mapInstance
                });
                mapInstance.fitBounds(circle.getBounds());
            }
            
            return listings;
        }

        listingAnnotation = ( listing :  IListing.ListingResponse, listing_element : string  ) => {
            listing = _.clone(listing);
            if( !_.isEmpty(listing.description) ){
                if( listing.description.length > 20 ) {
                    listing.description = listing.description.substring(0,20) + '...';
                }
                if( listing.heading.length > 20 ) {
                    listing.heading = listing.heading.substring(0,20) + '...';
                }
            }

            return {
                content : `<div class="marker-view ${listing_element} cursor-pointer">
                            <div class="picture overflow-hidden">
                                <img src="${listing['cover_image']}" alt="">
                            </div>
                            <div class="price">
                                <h4>${listing.price_per_month}</h4>
                                <h5>NOK/MND</h5>
                            </div>
                            <div class="info">
                                <div class="img-container">
                                    <div class="contain">
                                        <img src="${listing.user.profile_picture}" alt="">
                                    </div>
                                </div>
                                <div class="details">
                                    <h4>${listing.heading}</h4>
                                    <h5>${listing.description}</h5>
                                </div>
                            </div>
                        </div>`,
                position : new google.maps.LatLng( listing.latitude, listing.longitude ),
                closeBoxMargin: "12px 4px 2px 2px",
                infoBoxClearance: new google.maps.Size(1, 1),
                pixelOffset: new google.maps.Size(-112, -193),
                alignBottom : true,
                closeBoxURL: '',
                zIndex : 10
            }
        }
    }

    registerModule.service( 'ResultPageService', ResultPageService );
}
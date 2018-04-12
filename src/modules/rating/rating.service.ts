module App.Modules.Rating {
    
    export class RatingService {

        static $inject : string[] = [ 'Rating' ];
        
        constructor(
            private Rating : App.Repositories.Rating.RatingRepository
        ){}

        addRating = ( rating : any, comment : string, request_id : string, rating_id : any = null ) => {
            return this.Rating.addRating( rating, comment, request_id, rating_id );
        }

        isRated = ( request_id : string ) => {
            return this.Rating.isRated( request_id );
        }

    }

    ratingModule.service( 'RatingService', RatingService );
}
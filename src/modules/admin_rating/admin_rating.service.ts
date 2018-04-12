

module App.Modules.AdminRating {
    
    export class AdminRatingService {

        static $inject : string[] = [ 'Rating' ];

        initSearchUser : string = '';
        
        constructor(
            private Rating : App.Repositories.Rating.RatingRepository
        ){}

        allRating = () => {
            return this.Rating.getAll();
        }

        deleteRating = ( rating_id : string ) => {
            return this.Rating.remove(rating_id);
        }

    }

    adminRatingModule.service( 'AdminRatingService', AdminRatingService );
}
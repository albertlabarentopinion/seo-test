module App.Repositories.Rating {
    
        import IRepository = App.Interfaces.Repository;
        import IResponse = App.Interfaces.Response;
        import BaseRepository = App.Base.BaseRepository;
    
         export interface RatingResponse extends IResponse.IApiResponseElement {
             comment? : string;
             rating? : any;
             request_id? : any;

             // extras
             request? : App.Repositories.Request.RequestResponse;
         }
    
        export class RatingRepository extends BaseRepository {
    
            static $inject : string[] = ['Restangular', '$q'];
    
            recordName = 'rating';

            controllerName = 'ratingctrl';
    
            default_id = 'id';
    
            constructor(Restangular : restangular.IService, $q : ng.IQService) {
                super(Restangular, $q, 'rating');
            }

            addRating = ( rating : any, comment : string, request_id : string, rating_id : any = null ) => {
                let params : any = {
                    rating : rating,
                    comment : comment, 
                    request_id : request_id
                };

                if( rating_id )
                    params.rating_id = rating_id;

                    return this.Restangular.all(`${this.controllerName}/add-rating`).post(params);
            }
            
            isRated = ( request_id : string ) => {
                return this.Restangular.all(`${this.controllerName}/is-rated`).customPUT( { request_id : request_id } );
            }
        }
    
        angularModule.service('Rating', RatingRepository);
    }
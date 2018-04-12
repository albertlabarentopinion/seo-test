module App.Repositories.ListingPhoto {

    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

     export interface ListingPhotoResponse extends IResponse.IApiResponseElement {
         type : string;
     }

    export class ListingPhotoRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q'];

        recordName = 'listing_photo';

        default_id = 'id';

        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'listing_photo');
        }
    }

    angularModule.service('ListingPhoto', ListingPhotoRepository);
}
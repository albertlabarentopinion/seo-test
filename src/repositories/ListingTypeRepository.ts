module App.Repositories.ListingType {

    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

     export interface ListingTypeResponse extends IResponse.IApiResponseElement {
         type : string;
     }

    export class ListingTypeRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q'];

        recordName = 'listing_types';

        default_id = 'id';

        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'listing_types');
        }
    }

    angularModule.service('ListingType', ListingTypeRepository);
}
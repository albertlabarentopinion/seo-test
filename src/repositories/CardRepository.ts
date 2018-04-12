module App.Repositories.Card {
    
    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

        export interface CardResponse extends IResponse.IApiResponseElement {
            last4? : string;
            exp_month? : string;
            exp_year? : string;
            exp_date? : string;
            user_id? : string;
        }

    export class CardRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q'];

        recordName = 'card';

        default_id = 'id';

        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'card');
        }
    }

    angularModule.service('Card', CardRepository);
}
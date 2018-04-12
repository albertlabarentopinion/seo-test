module App.Repositories.Cms {
    
    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

        export interface CmsResponse extends IResponse.IApiResponseElement {
            content? : string;
            name? : string;
        }

    export class CmsRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q'];

        recordName = 'cms';

        controllerName = 'cmsctrl';

        default_id = 'id';

        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'cms');
        }   

        getPages = () => {
            return this.Restangular.all(`${this.controllerName}/pages`).getList({ types : 'Page,FooterItem' }).then( this.toResult.bind( this ) );
        }
    }

    angularModule.service('Cms', CmsRepository);
}
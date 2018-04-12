

module App.Modules.CmsPage {
    
    export class CmsPageService {

        static $inject : string[] = [ 'Cms' ];
        
        constructor(
            private Cms : App.Repositories.Cms.CmsRepository
        ){}

        getPage = ( name : string ) => {
            return this.Cms.find(null, { name : name });
        }
    }

    cmsPageModule.service( 'CmsPageService', CmsPageService );
}
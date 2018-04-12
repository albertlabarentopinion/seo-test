module App.Modules.AdminCms {
    
    export class AdminCmsService {

        static $inject : string[] = [ 
            'Cms'
        ];
        
        constructor(
            private Cms : App.Repositories.Cms.CmsRepository
        ){}

        saveContent = ( type : string, name : string, content : string = '' ) => {
            return this.Cms.save({
                type : type,
                name : name,
                content : content
            });
        }
    }

    adminCmsModule.service( 'AdminCmsService', AdminCmsService );
}
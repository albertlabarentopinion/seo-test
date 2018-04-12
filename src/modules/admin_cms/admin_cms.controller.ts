
module App.Modules.AdminCms {
    
    import BaseController = App.Base.BaseController;

    class AdminCmsController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', '$sce', 'Cms', 'AdminCmsService', '$filter' ];

        previewHtml : string = '';
        
        editorHtml : string = '';

        onPreview : boolean = false;

        test : any = {
            name : 'searchContent'
        };

        cms : App.Repositories.Cms.CmsResponse;
        
        cmsTypes : any[] = ['Page', 'Content'];
        
        newCms : any = {
            type : 'Page'
        };

        selectedContent : any;

        contents : App.Repositories.Cms.CmsResponse[] = [];

        cmsOptions : any = {
            height: 300,
            toolbar: [
                    ['edit',['undo','redo']],
                    ['headline', ['style']],
                    ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                    ['fontface', ['fontname']],
                    ['textsize', ['fontsize']],
                    ['fontclr', ['color']],
                    ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                    ['height', ['height']],
                    ['table', ['table']],
                    ['insert', ['link','picture','video','hr']],
                    ['view', ['fullscreen', 'codeview']],
                    ['help', ['help']]
                ]
        };

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private $sce : any,
            private Cms : App.Repositories.Cms.CmsRepository,
            private AdminCmsService : AdminCmsService,
            private $filter : any
        ){
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            this.getCmsContents();
        }

        getCmsContents = () => {
            this.Cms.getAll().then( this.setContents.bind(this) ).then(() => {
                this.ready();
            });
        }

        preview = ( editorHtml : string ) => {
            this.previewHtml = this.$sce.trustAsHtml( editorHtml );
            this.onPreview = true;
        }

        save = ( content : string ) => {
            let cms = _.extend(this.cms, {
                content : content,
                name : this.selectedContent.name,
                id : this.selectedContent.id
            });

            this.loading();

            return this.Cms.save( cms ).then(( content : App.Repositories.Cms.CmsResponse ) => {
                this.ready();
            });
        }

        remove = ( content : App.Repositories.Cms.CmsResponse ) => {
            swal({
                title: this.$filter('translate')('DELETE_CONTENT') ,
                showCancelButton: true,
                confirmButtonColor: "#1D84C6",
                confirmButtonText: 'Yes',
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                showLoaderOnConfirm : true,
                closeOnCancel: true },
                (isConfirm : boolean) => {
                    if (isConfirm) {
                        this.loading();
                        return this.Cms.remove(content.id).then(() => {
                            swal.close();
                            _.remove( this.contents, ( content_rem : App.Repositories.Cms.CmsResponse ) => {
                                return content.id == content_rem.id;
                            });
                            this.setContents(this.contents);
                            this.ready();
                        });
                    }
            });
        }

        addContent = ( type : string, name : string ) => {
            this.loading();
            return this.AdminCmsService.saveContent( type, name ).then(( addded_content : App.Repositories.Cms.CmsResponse ) => {
                this.ready();
                this.newCms.name = null;
                this.contents.unshift(addded_content);
                this.setContents(this.contents);
            });
        }

        setContents = (contents : App.Repositories.Cms.CmsResponse[] ) => {
            this.contents = contents;

            if( contents.length > 0 )
                this.setContent(contents[0]);
        }

        setContent = ( content : App.Repositories.Cms.CmsResponse ) => {
            this.selectedContent = content;
        }
    }

    adminCmsModule.controller( 'AdminCmsController', AdminCmsController );

}
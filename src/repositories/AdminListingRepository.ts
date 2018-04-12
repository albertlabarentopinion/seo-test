module App.Repositories.AdminListing {

    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

    export interface AdminListingResponse extends App.Repositories.Listing.ListingResponse {
        type : string;
    }

    export class AdminListingRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q'];

        recordName = 'admin/listings';

        controllerName = 'adminctrl';

        default_id = 'id';

        constructor(Restangular : restangular.IService, $q : ng.IQService) {
            super(Restangular, $q, 'admin/listings');
        }

        activateDeactivate = ( id : string ) => {
             return this.Restangular.one( `${this.controllerName}/activate-deactivate-listing`, id ).put().then( this.toResult.bind( this ) );   
        }

        getSpecialListing = () => {
            return this.Restangular.all(`${this.controllerName}/special-listings`).getList().then( this.toResult.bind( this ) );  
        }
    }

    angularModule.service('AdminListing', AdminListingRepository);
}
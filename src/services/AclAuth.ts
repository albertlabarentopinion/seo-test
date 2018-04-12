module App.Services {
    type role = {
        name : string;
        permissions : string[];
    }

    export class AclAuth {

        static $inject : string[] = [ 'PermPermissionStore', 'AuthService' ];

        roles : {
            member : role,
            guest : role,
            admin : role
        } = {
            member : {
                name : 'member',
                permissions : []
            },
            guest : {
                name : 'guest',
                permissions : []
            },
            admin : {
                name : 'admin',
                permissions : []
            }
        }

        constructor(
            private PermPermissionStore : any,
            private AuthService : App.Services.AuthService
        )
        {

        }

        setRoles = () => {
            this.PermPermissionStore
                .definePermission( this.roles.member.name, () => {
                    return this.isMember();
                });
            this.PermPermissionStore
                .definePermission( this.roles.guest.name, () => {
                    return this.isGuest();
                });
            this.PermPermissionStore
                .definePermission( this.roles.admin.name, () => {
                    return this.isAdmin();
                });
        }

        isMember = () => {
            return this.AuthService.isAuthenticated() ;
        }

        isGuest = () => {
            return !this.AuthService.isAuthenticated();
        }

        isAdmin = () => {
            return this.AuthService.isAuthenticated() && this.AuthService.isAdmin();
        }
    }

    angularModule.service( 'AclAuth', AclAuth );

}
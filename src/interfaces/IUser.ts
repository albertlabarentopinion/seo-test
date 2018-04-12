module App.Interfaces.User {
    export interface User {
        id? : string;
        firstname? : string;
        lastname? : string;
        isSocial? : any;
        email? : string;
        contact_number? : string;
        password? : string;
        profile_picture? : string;
        email_verification_token? : string;
        provider? : string;
        mobile? : string;
        profile_image_social? : string;
        about_me? : string;
        mobile_verified? : any;
        mobile_verification_code? : string;
        created_at? : any;
        updated_at? : any;
        city? : any;
        zip? : any;
        street? : any;
        bank_account? : any;
        business_tax_id? : any;
        accept_terms? : any;
    }

    export interface IUserAuthenticated extends User {
        _token? : string;
        [param : string] : any;
    }
}
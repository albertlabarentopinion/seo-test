module App.Services {

    export class TranslationService {

        static $inject = [ '$sessionStorage', 'AppConstants', '$translate' ];

        localeKey : string = 'locale';

        constructor(
           private $sessionStorage : any,
           private AppConstants : App.Main.MainConstants,
           private $translate : any
        )
        {
        
        }

        setSavedLocale = ( locale : string = this.AppConstants.defaultLocale ) => {
            let savedLocale = this.getStoredLocale();

            if( !savedLocale ){
                this.saveLocale( locale );
            } else {
                this.$translate.use( savedLocale );
            }
        }

        saveLocale = ( locale : string ) => {
            this.$sessionStorage.put( this.localeKey, locale );
        }

        getStoredLocale = () => {
            return this.$sessionStorage.get( this.localeKey );
        }

    }

    angularModule.service( 'TranslationService', TranslationService );
    
}
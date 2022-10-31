import { enLanguage } from "../languages/enLanguage"
import { ILanguage } from "../languages/LanguageTemplate"
import { ruLanguage } from "../languages/ruLanguage"
import { TLanguage } from "../models/TLanguage"

export const setLanguage = (language: any): ILanguage => {
    let choosen
    switch(language){
        case 'ru':
            choosen = ruLanguage
            break
        case 'en':
            choosen = enLanguage
            break
        default:
            choosen = ruLanguage
    }
    return choosen
}
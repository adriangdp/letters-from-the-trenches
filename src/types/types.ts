

/**
 * Metadata related to a single entry.
 */
export type EntryMeta = {
  author:string,
  day:string,
  month:string,
  year:string,
  language:string,
  letter_key:string,
  place:string,
  source:string,
}

/**
 * Content of a single letter, identifiable by its letter_key
 */
export type EntryContent = {
 [key:string] : string
}

/**
 * Geographical metadata related to a single entry.
 */

export type PlacesData = {
    place:string,
    latitude:number,
    longitude:number,
    country:string
}

/**
 * A single letter, that contains all its related text and metadata.
 * It is consolidated from EntryMeta, EntryContent, and PlacesData into this
 * single object.
 */

export type Letter = {
    meta: EntryMeta,
    content: string,
    locationData?:{
        latitude?:number,
        longitude?:number,
        country?:string
    }    
}   

/**
 * A TranslationCollection object serves as a dictionary to write/read
 * translated texts. It's first key is letter_key first, and the second by
 * its language code. 
 * 
 * @params [key:string]: Letter_key
 * @params [key:string]: language code
 * @example
 * // Example:
 * const translations = {
 *   "hl_04": {
 *     "en": "English Translation...",
 *     "es": "Spanish Translation...",
 *     "fr": "French Translation..."
 *   },
 *   "na_uk_01": {
 *     "en": "English Translation...",
 *     "es": "Spanish Translation...",
 *     "fr": "French Translation..."
 *   }
 * };
 */

export type TranslationCollection = {
    [key:string] : {
        [key:string] :string
    }
}
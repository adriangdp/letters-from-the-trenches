import Papa from "papaparse";
import { 
    type EntryMeta, 
    type EntryContent, 
    type PlacesData, 
    type Letter} 
from "../types/types";

/**
 * This interface is used for any Papa.parse() call.
 * The type of the data array is kept generic to use it with different files.
 */

interface PaparseResult<T> {
    data:T[],
    errors:object[],
    meta:object
}
/**
 * Calls for parsers and function to join all the data into a single object. 
 * Then returns the letters as an array.
 * 
 * @returns {Promise<Letter[]>} - An array of letters with all the related data.
 */

export const FetchLetters = async():Promise<Letter[]> =>{
    const parsedMetaData = await parseCSV<EntryMeta>("/data/index.csv");
    const parsedPlacesData = await parseCSV<PlacesData>("/data/places.csv");
    const contentLetter = await fetchContentLetter();

    const metaData:EntryMeta[] = [...parsedMetaData.data];
    const placesData:PlacesData[] = [...parsedPlacesData.data];

    return consolidateLetters(contentLetter, metaData, placesData);

}

/**
 * Parses CSV file in the path indicated in the passed parameter.
 * 
 * @param {string} filePath - Path to the file.
 * @returns PaparseResult<T> object which contains the property data, an array of
 * type indicated during the call.
 */

const parseCSV = async<T>(filePath:string):Promise<PaparseResult<T>> =>{
    const response = await fetch(filePath);
    const fileText = await response.text();

    const parseOptions = {
        header: true,
        delimiter: ",",
    }

    const parsedData:PaparseResult<T> = Papa.parse(fileText, parseOptions);

    return parsedData;
}

/**
 * Returns all the contents of letters.json as a dictionary object of 
 * type EntryContent.
 */
const fetchContentLetter = async():Promise<EntryContent> =>{
    const response = await fetch("/data/letters.json");
    if(!response.ok){
        throw new Error("Error while fetching letter content")
    }
    const contents:EntryContent = await response.json();
    return contents;
}

/**
 * Merges the parsed data from the letter files into an array of objects.
 * @param contentLetter - Object with all a letters using letter_key as property name.
 * @param metaData - Array of parsed metadata. It's the mapped array.
 * @param placesData - Array of parsed geographical metadata.
 * @returns a Letter type object with the correlated information.
 */


const consolidateLetters = (
    contentLetter:EntryContent,
    metaData:EntryMeta[],
    placesData:PlacesData[] 
) =>{
    return metaData.map((entry)=>{
        const relatedContent = contentLetter[entry.letter_key];
        const relatedPlace = placesData.find(e => e.place === entry.place)

        const letter:Letter = {
            meta:entry,
            content:relatedContent,
            locationData:{
                latitude: relatedPlace?.latitude,
                longitude: relatedPlace?.longitude,
                country: relatedPlace?.country
            }
        }
        return letter;
    })
}

/** Escape hatch for consolidateLetters()*/
export const _consolidateLetters = consolidateLetters;

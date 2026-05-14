import { expect, test } from "vitest";
import { _consolidateLetters } from "./parsers";
import { type EntryMeta, type PlacesData, type EntryContent } from "../types/types";

const meta:EntryMeta[] = [
    { 
        author:"George Shipley",
        day: "1",
        month: "3",
        year: "1918",
        language: "english",
        letter_key: "mock_uk_01",
        place: "Courtrai",
        source: "https://example.co.uk"
    },
    { 
        author:"Ernest William Bratchell",
        day: "1",
        month: "3",
        year: "",
        language: "english",
        letter_key: "mock_uk_02",
        place: "Dardanelles",
        source: "https://example.co.uk"
    },
    {
        author:"Gaston Biron",
        day: "1",
        month: "3",
        year: "1916",
        language: "french",
        letter_key: "mock_fr_01",
        place: "Courtrai",
        source: "https://example.com"
    },
    {
        author:"Jeanne Fillaud",
        day: "1",
        month: "3",
        year: "1915",
        language: "french",
        letter_key: "mock_fr_02",
        place: "",
        source: "https://example.com"
    },
        
];

const places:PlacesData[]=[
    {
        place: "Courtrai",
        latitude: 50.8262,
        longitude: 3.2664,
        country: "Belgium"
    },
    {
        place: "Dardanelles",
        latitude: 40.0446,
        longitude: 26.2835,
        country: "Turkey"
    }
]

const letterText:EntryContent={
    mock_fr_01: "This text belongs to mock_fr_01",
    mock_fr_02: "This text belongs to mock_fr_01",
    mock_uk_01: "This text belongs to mock_uk_01",
    mock_uk_02: "This text belongs to mock_uk_02",    
}

const testData = _consolidateLetters(letterText, meta, places);

test("Maps each letter content to its metadata using letter_key",()=>{
    testData.forEach((subject)=>{
        expect(subject.content).toBe(letterText[subject.meta.letter_key]);
    })
    
})

test("Maps the geographic metadata based on the entry metadata", ()=>{
    testData.forEach((subject)=>{
        if(subject.meta.place === "Courtrai"){
            expect(subject.locationData!.country).toBe("Belgium");
        }
        else if (subject.meta.place === "Dardanelles"){
            expect(subject.locationData!.country).toBe("Turkey");
        }     
    })
})

test("Should be undefined if there is no meta.place match", ()=>{
    const unknownPlaceLetter = testData.find(s=> s.meta.place === "");
    expect(unknownPlaceLetter!.locationData?.country).toBeUndefined();
    expect(unknownPlaceLetter!.locationData?.latitude).toBeUndefined();
    expect(unknownPlaceLetter!.locationData?.longitude).toBeUndefined();
})
import {expect, test} from 'vitest';
import truncate from './truncateText';

const testLineShort = "Mercredi 29 septembre 1915\nMa chère Louisette,\n"
const testLineLong = "Nous avons aussi tout un attirail contre les gaz asphyxiants. Mais nous serons mal ravitaillés : un seul repas, de nuit, qui arrivera froid le plus souvent ; et cela s'explique à la fois par la longueur des boyaux et par la difficulté de parcourir une large zone découverte.\nA ce tableau un peu sombre mais véridique il convient d'ajouter deux correctifs"

test('Splits under 250 characters when escape character is found',()=>{
    const truncated = truncate(testLineShort);
    expect(truncated).toEqual("Mercredi 29 septembre 1915 [...]");
})

test('Splits when longer than 250 characters',()=>{
    const truncated = truncate(testLineLong);
    expect(truncated).toEqual("Nous avons aussi tout un attirail contre les gaz asphyxiants. Mais nous serons mal ravitaillés : un seul repas, de nuit, qui arrivera froid le plus souvent ; et cela s'explique à la fois par la longueur des boyaux et par la difficulté de parcourir un [...]");
})

test('Adds a single space and ellipsis at the end',()=>{
    const truncated = truncate(testLineShort);
    expect(truncated.slice(truncated.length - 6)).toEqual(" [...]")
})

test('Shows full text in case of under 250 and no escape character', ()=>{
    const string = "12345";
    const truncated = truncate(string);
    expect(truncated).toEqual(string)

})
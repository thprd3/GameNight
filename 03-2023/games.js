const games = [];

class Game {
    constructor(name) {
        this.name = name;
        this.image = "images/" + name + ".jpg";
        this.votes = 0
    }
}

let orbits = new Game("12 Orbits"); games.push(orbits);
let aggieio = new Game("Aggieio"); games.push(aggieio);
let among_us = new Game("Among Us"); games.push(among_us);
let carcassonne = new Game("Carcassonne"); games.push(carcassonne);
let cah = new Game("Cards Against Humanity"); games.push(cah);
let cluedo = new Game("Cluedo"); games.push(cluedo);
let codenames = new Game("Codenames"); games.push(codenames);
let dominion = new Game("Dominion"); games.push(dominion);
let fake_artist = new Game("Fake Artist"); games.push(fake_artist);
let frantic_fanfic = new Game("Frantic Fanfic"); games.push(frantic_fanfic);
let gwyf = new Game("Golf With Your Friends"); games.push(gwyf);
let jackbox = new Game("Jackbox"); games.push(jackbox);
let jigsaw = new Game("Jigsaw"); games.push(jigsaw);
let jklm = new Game("Jklm"); games.push(jklm);
let keep_talking = new Game("Keep Talking And Nobody Explodes"); games.push(keep_talking);
let love_letter = new Game("Love Letter"); games.push(love_letter);
let motorcycle = new Game("Motorcycle Mechanic Simulator 2021"); games.push(motorcycle);
let mysterium = new Game("Mysterium"); games.push(mysterium);
let netflix = new Game("Netflix"); games.push(netflix);
let pandemic = new Game("Pandemic"); games.push(pandemic);
let papa = new Game("Papa's Quiz"); games.push(papa);
let scattergories = new Game("Scattergories"); games.push(scattergories);
let secret_hitler = new Game("Secret Hitler"); games.push(secret_hitler);
let settlers = new Game("Settlers Of Catan"); games.push(settlers);
let skribblio = new Game("Skribblio"); games.push(skribblio);
let small_world = new Game("Small World"); games.push(small_world);
let splendor = new Game("Splendor"); games.push(splendor);
let talisman = new Game("Talisman"); games.push(talisman);
let ttr= new Game("Ticket To Ride"); games.push(ttr);
let transformice = new Game("Transformice"); games.push(transformice);
let uno = new Game("UNO"); games.push(uno);
let wavelength = new Game("Wavelength"); games.push(wavelength);
let wingspan = new Game("Wingspan"); games.push(wingspan);
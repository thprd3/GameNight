// Player and voting functions
let voteTotal ="";

// Game class
class Game {
    constructor (name){ ;
        this.name=name;
        this.image="images/"+name+".jpg";
    }
}

// Objects (games)
const games = [];
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
let jklm = new Game("JKLM"); games.push(jklm);
let keep_talking = new Game("Keep Talking And Nobody Explodes"); games.push(keep_talking);
let love_letter = new Game("Love Letter"); games.push(love_letter);
let motorcycle = new Game("Motorcycle Mechanic Simulator 2021"); games.push(motorcycle);
let mysterium = new Game("Mysterium"); games.push(mysterium);
let netflix = new Game("Netflix"); games.push(netflix);
let pandemic = new Game("Pandemic"); games.push(pandemic);
let papa = new Game("Papa's Quiz"); games.push(papa);
let scattergories = new Game("Scattergories"); games.push(scattergories);
let secret_hitler = new Game("Secret Hitler"); games.push(secret_hitler);
let settlers = new Game("Settlers of Catan"); games.push(settlers);
let skribblio = new Game("Skribblio"); games.push(skribblio);
let talisman = new Game("Talisman"); games.push(talisman);
let ttr= new Game("Ticket To Ride"); games.push(ttr);
let transformice = new Game("Transformice"); games.push(transformice);
let small_world = new Game("Small World"); games.push(small_world);
let splendor = new Game("Splendor"); games.push(splendor);
let uno = new Game("UNO"); games.push(uno);
let wavelength = new Game("Wavelength"); games.push(wavelength);
let wingspan = new Game("Wingspan"); games.push(wingspan);

// Creates all game elements on document load
function generate(){ // make set interval + css animate fade in
    for (let i=0; i<games.length; i++){
        setTimeout(function timer(){
            games[i].votes = 0;

            let el = document.createElement("img");
            el.src=games[i].image;
            el.classList.add("main");
            el.setAttribute("id", games[i].name);
            el.setAttribute("alt", games[i].name);

            let node = document.getElementById("content");
            node.appendChild(el);

            //This is the voting function -- should probably be separated
            document.getElementById(games[i].name).addEventListener("click", function vote(){ 
                games[i].votes++;
                let out = "";
                let players = parseInt(document.getElementById("playercount").value);
                for (let x of games){
                    if(x.votes>0){
                        out += "<p>"+x.name + ": "+x.votes+"</p>";
                        document.getElementById(x.name).classList.add("voted");
                    }
                }
                document.getElementById("votecount").innerHTML = out;
                for (let z of games){
                    if(z.votes>=((players/2)-0.9)){ //Probably crusty. Triggers (I think) when game is one vote away from winning.
                        document.getElementById(z.name).classList.add("oneaway");
                    }
                    if(z.votes>(players/2)){
                        document.getElementById("winner").innerHTML = "<p>Winner: "+z.name;
                        document.getElementById(z.name).style+="transform:scale(1.4)"; // needs work lol
                        for (let j=0; j<games.length; j++){ //This part doesn't really work
                            document.getElementById(games[j].name).removeEventListener("click", vote);
                        }
                    }
                }
                // select class .voted add child p votes: var
            });
        },i*100);
    }
}

generate();

// Other functions
document.getElementById("random").addEventListener("click", function(){
    let game = games[Math.floor(Math.random()*games.length)];
    document.getElementById("randomOutput").innerHTML="<br>Let's play <em>"+game.name;
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


document.getElementById("shuffleBtn").addEventListener("click", function(){
    document.getElementById("content").innerHTML="";
    shuffle(games);
    generate();
    console.log(games);
});

document.getElementById("sortBtn").addEventListener("click", function(){
    document.getElementById("content").innerHTML="";
    games.sort(dynamicSort("name"));
    generate();
    console.log(games);
});


// Debug and testing
function allVotes(){
    for (let x of games){
        console.log(x.name+" : "+x.votes);
    }
}
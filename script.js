let timesVoted = 0;
let players;
let votesToWin;
let oneFromWin;
let gameOver = false;
let firstTime = true;
$("#playerCount").val("10"); //set default value

function confirmPlayerNo(input) {
    if (!gameOver) {
        if (input) {
            players = input;
        } else {
            players = parseInt(document.getElementById("playerCount").value);
        }
        if (players > 1) {
            window.onscroll = function () {}; //enables scrolling
            document.getElementById("fadeWrapper").style.opacity = "1";
            document.getElementById("gsmWrapper").style.display = "none";
            document.getElementById("gsmWrapper").style.zIndex = "-1";
            document.body.style.overflow = "auto";
            votesToWin = Math.ceil(players / 2);
            oneFromWin = votesToWin - 1;
            console.log("players: " + players + " to win: " + votesToWin)
            document.getElementById("players").innerHTML = '<i class="fa-solid fa-people-group"> : </i><span id="playerNumOutput">' + players + "<br>Votes to win: " + votesToWin + "</span>";
        } else {
            let gsmErrorEl = document.getElementById("gsmError");
            gsmErrorEl.textContent = "Please revise."
        }
    }
}

let x = window.scrollX;
let y = window.scrollY;
window.onscroll = function () { // prevent scroll before player number selected
    window.scrollTo(x, y);
};

// Creates all game objects and event listeneres on document load
function generate() {
    // window.onscroll = function () {}; 
    let delayCounter = 0;
    let node = document.getElementById("content");
    for (let i = 0; i < games.length; i++) {
        let el = document.createElement("img");
        el.src = games[i].image;
        el.classList.add("object");
        el.setAttribute("id", games[i].name);
        el.setAttribute("alt", games[i].name);
        el.setAttribute("data-aos-once", "true");
        el.style.userSelect = "none"; //not working?
        el.setAttribute("data-aos-delay", i * 100)

        // makes games appear one by one
        if (delayCounter < 1 && firstTime) {
            el.setAttribute("data-aos", "fade-down")
            el.setAttribute("data-aos-anchor-placement", "bottom-center")
        } else {
            if (delayCounter < 1) { // quick fix for fourth row not triggering + new anim on refresh list
                el.setAttribute("data-aos", "flip-left")
                el.setAttribute("data-aos-delay", i * 100)
            }
        }
        delayCounter++;
        node.appendChild(el);
    }
    voteListeners();

    if (firstTime) {
        // assignPlayerNum();
        miscFunctionListeners();
        firstTime = false;
    }
    // test
    // document.getElementById("rightMenu").style.position="sticky";
}

function vote(game) {
    if (!gameOver) {

        gameID = game.currentTarget.id;
        gameObj = games.find(function (g) {
            return g.name === gameID;
        });
        gameObj.votes++;
        timesVoted++;
        // console.log("timesVoted: " + timesVoted);

        let out = "";
        for (let gg of games) {
            if (gg.votes > 0) {
                out += "<p>" + gg.name + ": " + gg.votes + "</p>";
                document.getElementById(gg.name).classList.add("voted");
            }
        }
        document.getElementById("voteCount").innerHTML = out;
        document.getElementById("voteCount").style.color = "white";

        for (let z of games) {

            if (z.votes === oneFromWin) {
                // console.log(z.name + " is one away!")
                document.getElementById(z.name).classList.add("oneFromWin");
            }
            if (z.votes >= votesToWin) {
                gameOver = true;
                console.log(gameOver)
                // console.log(z.name + " wins!")
                document.getElementById(z.name).classList.add("winner");
                document.getElementById("winnerOutput").innerHTML = "<p>Winner: " + z.name + "</p>";
                document.getElementById("winnerOutput").style.color = "white";
                for (let j = 0; j < games.length; j++) {
                    document.getElementById(games[j].name).removeEventListener("click", vote);
                }
            }
        }
    }
}

function shuffle(array) {
    if (!gameOver) {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    } else {
        return
    }
}

function dynamicSort(property) {
    if (!gameOver) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
}

function miscFunctionListeners() { //runs in generate(), assings listeners to misc buttons
    // random suggestion
    document.getElementById("randomBtn").addEventListener("click", function () {
        if (!gameOver) {
            let game = games[Math.floor(Math.random() * games.length)];
            document.getElementById("randomOutput").innerHTML = "<br>Let's play <em>" + game.name + "</em>!";
        }
    });

    // shuffle games
    document.getElementById("shuffleBtn").addEventListener("click", function () {
        document.getElementById("content").innerHTML = "";
        shuffle(games);
        generate();
    });

    // sort games alphabetically
    document.getElementById("sortBtn").addEventListener("click", function () {
        document.getElementById("content").innerHTML = "";
        games.sort(dynamicSort("name"));
        generate();
    });

    // change number of players
    document.getElementById("playerNoBtn").addEventListener("click", function () {
        playerNoModal();
    });
}

function voteListeners() {
    const gameElArr = Array.from(document.getElementsByClassName("object"));
    gameElArr.forEach(function (game) {
        game.addEventListener("click", vote);
    })
}
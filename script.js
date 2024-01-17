let timesVoted = 0;
let players;
let votesToWin;
let oneFromWin;
let gameOver = false;
let firstTime = true;
$("#playerCount").val("4");

function confirmPlayerNo() {
    if (!gameOver) {
        players = parseInt(document.getElementById("playerCount").value);
        if (players > 1) {
            window.onscroll = function () {}; //enables scrolling
            document.getElementById("gsmWrapper").style.display = "none";
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


var x = window.scrollX;
var y = window.scrollY;
window.onscroll = function () {
    window.scrollTo(x, y);
};

// Creates all game elements on document load
function generate() {
    // window.onscroll = function () {}; //enables scrolling
    let delayCounter = 0;
    for (let i = 0; i < games.length; i++) {
        let el = document.createElement("img");
        el.src = games[i].image;
        el.classList.add("object");
        el.setAttribute("id", games[i].name);
        el.setAttribute("alt", games[i].name);
        el.setAttribute("data-aos-once", "true");
        el.style.userSelect = "none";

        if (delayCounter < 16 && firstTime) {
            el.setAttribute("data-aos", "fade-down")
            el.setAttribute("data-aos-delay", i * 100)
            el.setAttribute("data-aos-anchor-placement", "bottom-center")
            delayCounter++;
        } else {
            if (delayCounter < 16) {
                el.setAttribute("data-aos", "flip-left")
                el.setAttribute("data-aos-delay", i * 100)
                delayCounter++;
            }
        }
        let node = document.getElementById("content");
        node.appendChild(el);
    }
    voteListeners();

    if (firstTime) {
        // assignPlayerNum();
        miscFunctions();
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
        console.log("timesVoted: " + timesVoted);

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
                console.log(z.name + " is one away!")
                document.getElementById(z.name).classList.add("oneFromWin");
            }
            if (z.votes >= votesToWin) {
                gameOver = true;
                console.log(gameOver)
                console.log(z.name + " wins!")
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

function miscFunctions() { //runs in generate(), assings listeners to misc buttons
    document.getElementById("randomBtn").addEventListener("click", function () {
        if (!gameOver) {
            let game = games[Math.floor(Math.random() * games.length)];
            document.getElementById("randomOutput").innerHTML = "<br>Let's play <em>" + game.name;
        }
    });

    document.getElementById("shuffleBtn").addEventListener("click", function () {
        document.getElementById("content").innerHTML = "";
        shuffle(games);
        generate();
    });

    document.getElementById("sortBtn").addEventListener("click", function () {
        document.getElementById("content").innerHTML = "";
        games.sort(dynamicSort("name"));
        generate();
    });

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
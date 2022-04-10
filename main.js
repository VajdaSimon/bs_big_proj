/* index.html */
var port = "8080"
var ip = "web.hudustry.tk"

function adatok(mod, nev, mit) {
    if (mod == "uj") {
        localStorage.setItem(nev, mit);
    }
    else if (mod == "le") {
        return localStorage.getItem(nev);
    }
    else {
        console.log("Hibás localStorage lekérdezés.")
    }
}

function ujv6() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://" + ip + ":" + port + "/api/mindustry-szavazas-uj-v6", true);
    xhttp.send();
    adatok("uj", "szavazott", "igen")
    setTimeout(szavazatokMutat, 50)
}

function ujv7() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://" + ip + ":" + port + "/api/mindustry-szavazas-uj-v7", true);
    xhttp.send();
    adatok("uj", "szavazott", "igen")
    setTimeout(szavazatokMutat, 50)
}

function szavazatokMutat() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            valasz = this.responseText;
            a = valasz.split(",");
            v6Szavazatok = a[0];
            v7Szavazatok = a[1];
            egyErteke = 100 / (v6Szavazatok + v7Szavazatok);
            v6Szazalek = v6Szavazatok * egyErteke;
            v7Szazalek = v7Szavazatok * egyErteke;
            console.log(valasz)
            //document.getElementById("szavazasParent").innerHTML = ""
            document.getElementById("szavazasParent").innerHTML = `<div class="progress my-5" style="height:40px">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning text-dark" id="prgBar1" role="progressbar" style="width:` + Math.floor(v6Szazalek * 10) + `%">V6 (` + v6Szavazatok + `)</div>
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" id="prgBar2" role="progressbar" style="width:` + Math.floor(v7Szazalek * 10) + `%">V7 (` + v7Szavazatok + `)</div>
            </div>`
        }
    };
    xhttp.open("GET", "http://" + ip + ":" + port + "/api/mindustry-szavazas", true);
    xhttp.send();
}

function szavazottCheck() {
    if(adatok("le", "szavazott") == "igen") {
        setTimeout(szavazatokMutat,50)
    }
}

document.addEventListener("DOMContentLoaded", function(){
    if (window.innerWidth > 992) {

        document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem){

            everyitem.addEventListener('mouseover', function(e){

                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add('show');
                    nextEl.classList.add('show');
                }

            });
            everyitem.addEventListener('mouseleave', function(e){
                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.remove('show');
                    nextEl.classList.remove('show');
                }


            })
        });

    }
});


/* szerver-allapot.html */

function adatokBetoltese() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            adatok = JSON.parse(this.responseText);
            cpu = adatok.cpu
            ram = adatok.ram
            players = adatok.hub.playerCount + adatok.attack.playerCount + adatok.survival.playerCount + adatok.pvp.playerCount

            document.getElementById("cpuSzam").innerHTML = cpu + "%"
            document.getElementById("cpuProgress").style.width = cpu + "%"
            document.getElementById("ramSzam").innerHTML = ram + "%"
            document.getElementById("ramProgress").style.width = ram + "%"
            document.getElementById("onlineJatekosok").innerHTML = players + " fő"

            cpuSzin = Math.floor((255 / 100) * cpu)
            document.getElementById("cpuProgress").style.backgroundColor = "rgb(" + cpuSzin + ", " + (255 - cpuSzin) + ", 0)"
            ramSzin = Math.floor((255 / 100) * ram)
            document.getElementById("ramProgress").style.backgroundColor = "rgb(" + ramSzin + ", " + (255 - ramSzin) + ", 0)"
        }
    };
    xhttp.open("GET", "http://" + ip + ":" + port + "/api/status", true);
    xhttp.send();
}

/* function adatBeTest() {
    a = Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
    a = a.split(",");
    cpu = a[0]
    ram = a[1]
    players = a[2]

    document.getElementById("cpuSzam").innerHTML = cpu + "%"
    document.getElementById("cpuProgress").style.width = cpu + "%"
    document.getElementById("ramSzam").innerHTML = ram + "%"
    document.getElementById("ramProgress").style.width = ram + "%"
    document.getElementById("onlineJatekosok").innerHTML = players + " fő"

    cpuSzin = Math.floor((255 / 100) * cpu)
    document.getElementById("cpuProgress").style.backgroundColor = "rgb(" + cpuSzin + ", " + (255 - cpuSzin) + ", 0)"
    ramSzin = Math.floor((255 / 100) * ram)
    document.getElementById("ramProgress").style.backgroundColor = "rgb(" + ramSzin + ", " + (255 - ramSzin) + ", 0)"
}
adatBeTest() */

var adatok

function adatokBetoltese() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            adatok = JSON.parse(this.responseText);

            document.getElementById("cpuSzam").innerHTML = adatok.cpu + "%"
            document.getElementById("cpuProgress").style.width = adatok.cpu + "%"
            document.getElementById("ramSzam").innerHTML = adatok.ram + "%"
            document.getElementById("ramProgress").style.width = adatok.ram + "%"
            document.getElementById("onlineJatekosok").innerHTML = adatok.hub.playerCount + adatok.attack.playerCount + adatok.survival.playerCount + adatok.pvp.playerCount + " fő"

            cpuSzin = Math.floor((255 / 100) * adatok.cpu)
            document.getElementById("cpuProgress").style.backgroundColor = "rgb(" + cpuSzin + ", " + (255 - cpuSzin) + ", 0)"
            ramSzin = Math.floor((255 / 100) * adatok.ram)
            document.getElementById("ramProgress").style.backgroundColor = "rgb(" + ramSzin + ", " + (255 - ramSzin) + ", 0)"
        
            adatokKiir()
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/status", true);
    xhttp.send();
}

function adatokKiir() {
    adatokMod = [adatok.survival, adatok.attack, adatok.pvp, adatok.hub]
    mod = ["survival", "attack", "pvp", "lobby"]

    for (var szam = 0; szam < 4; szam++) {
        document.getElementById(mod[szam] + "_map").innerHTML = renderString(adatokMod[szam].mapName)
        document.getElementById(mod[szam] + "_waves").innerHTML = adatokMod[szam].wave
        document.getElementById(mod[szam] + "_builds").innerHTML = adatokMod[szam].builds
        document.getElementById(mod[szam] + "_units").innerHTML = adatokMod[szam].units
        document.getElementById(mod[szam] + "_players").innerHTML = adatokMod[szam].playerCount
        if (adatokMod[szam].playerCount > 0) {
            document.getElementById(mod[szam] + "_players").innerHTML += "  <img src='/assets/img/dropdown.png' class='img-fluid ml-1' style='rotate(0deg)' alt='dropdown icon' onclick=\"playersOpen('" + mod[szam] + "')\" id='dropdawn-" + mod[szam] + "' width='25'>"
            for (var i = 0; i < adatokMod[szam].players.length; i++) {
                if (adatokMod[szam].players[i].admin == true) {
                    if (nameColor(adatokMod[szam].players[i].name, adatokMod[szam].players[i].stripName, adatokMod[szam].players[i].hexColor) != "hiba") {
                        document.getElementById(mod[szam] + "_players_list").innerHTML += nameColor(adatokMod[szam].players[i].name, adatokMod[szam].players[i].stripName, adatokMod[szam].players[i].hexColor) + "<img src='/assets/img/admin.png' class='img-fluid ml-1' width='20'><br>"
                    }
                    else {
                        document.getElementById(mod[szam] + "_players_list").innerHTML += renderString(adatokMod[szam].players[i].name) + "<img src='/assets/img/admin.png' class='img-fluid ml-1' width='20'><br>"
                    }
                }
                else {
                    if (nameColor(adatokMod[szam].players[i].name, adatokMod[szam].players[i].stripName, adatokMod[szam].players[i].hexColor) != "hiba") {
                        document.getElementById(mod[szam] + "_players_list").innerHTML += nameColor(adatokMod[szam].players[i].name, adatokMod[szam].players[i].stripName, adatokMod[szam].players[i].hexColor) + "<br>"
                    }
                    else {
                        document.getElementById(mod[szam] + "_players_list").innerHTML += renderString(adatokMod[szam].players[i].name) + "<br>"
                    }
                }
            }
        }
    }
} 

function playersOpen(mod) {
    if (document.getElementById("dropdawn-" + mod).style.transform != 'rotate(180deg)') {
        document.getElementById("dropdawn-" + mod).style.transform = 'rotate(180deg)';
        document.getElementById(mod + "_players_list_parent").style.display = "block"
    }
    else {
        document.getElementById("dropdawn-" + mod).style.transform = 'rotate(0deg)'
        document.getElementById(mod + "_players_list_parent").style.display = "none"
    }
}

function escapeHtml(unsafe) {
    console.log(unsafe)
    return unsafe.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// https://github.com/Anuken/Arc/blob/ca797d336b86bfe091162b5e5dc73521e04e4817/arc-core/src/arc/graphics/Color.java
// https://mindustrygame.github.io/wiki/modding/#built-in-colors
function colors(color) {
    console.log(color)
    const colors = {
        '': 'white',

        white: 'white',
        lightgray: '#bfbfbfff',
        gray: '#7f7f7fff',
        darkgray: '#3f3f3fff',
        black: 'black',
        clear: 'black',
        
        blue: '#0000ffff',
        navy: '#00007fff',
        royal: '#4169e1ff',
        slate: '#708090ff',
        sky: '#87ceebff',
        cyan: '#00ffffff',
        teal: '#007f7fff',
        
        green: '#00ff00ff',
        acid: '#7fff00ff',
        lime: '#32cd32ff',
        forest: '#228b22ff',
        olive: '#6b8e23ff',
        
        yellow: '#ffff00ff',
        gold: '#ffd700ff',
        goldenrod: '#daa520ff',
        orange: '#ffa500ff',
        
        brown: '#8b4513ff',
        tan: '#d2b48cff',
        brick: '#b22222ff',
        
        red: '#ff0000ff',
        scarlet: '#ff341cff',
        coral: '#ff7f50ff',
        salmon: '#fa8072ff',
        pink: '#ff69b4ff',
        magenta: '#7f007fff',
        
        purple: '#a020f0ff',
        violet: '#ee82eeff',
        maroon: '#b03060ff',

        // alias?
        crimson: '#ff341cff', // scarlet

        // special
        accent: '#ffcb39ff'
    };

    if (color[0] == '#') {
        return color;
    } else if (colors[color.toLowerCase()]) {
        return colors[color];
    }

    return undefined;
}

function renderColor(str) {
    console.log(str)
    return str
        .replace(/\[([a-zA-Z0-9#]*?)\](.*?)(?=(\[|\n|\]|$))/g, (_match, color, text) => {
            let resolved_color = colors(color);
            if (resolved_color === undefined) {
                if (window.location.hash == '#dev') {
                    console.error(`unknown color: ${color} in text "${_match}"`);
                }
                return _match;
            }
            return `<span style="color: ${resolved_color}">${text}</span>`;
        });
}

function renderString (data, type, row) {
    console.log(data)
    return renderColor(escapeHtml(data))
}

function nameColor(name, stripName, hexa) {
    if (name.search(/\[\w+\]/gm) == -1) {
        return "<span style='color: #" + hexa + "'>" + stripName + "</span>";
    }
    else {
        return "hiba"
    }
}
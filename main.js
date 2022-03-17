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
szavazottCheck()

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
            valasz = this.responseText;
            a = valasz.split(",");
            cpu = a[0].slice(0, -2)
            ram = a[1].slice(0, -2)
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
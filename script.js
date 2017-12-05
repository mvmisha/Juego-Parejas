var click = 1,
    click1, click2, click1id, click2id, correcto = 0,
    parejas = 6,
    rows = 0,
    columns = 0,
    fotos;

function inicio() {
    generateArray();
    generarFotos(parejas);
}

function generateArray() {
    fotos = ["img/NSX.png", "img/R34.png", "img/STI.png", "img/SUPRA.png", "img/HAKOSUKA.png", "img/GTR.png", "img/CIVIC.png", "img/S2000.png", "img/BRZ.png", "img/SILVIA.png"];
    fotos = fotos.slice(0, parejas);
    fotos = fotos.concat(fotos);
    shuffleFotos(fotos);

}

function shuffleFotos(a) {
    for (var i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function generarFotos(z) {
    for (var i = 0; i < 2; i++) {
        var newRow = document.createElement("div");
        newRow.className = "row"
        document.body.appendChild(newRow);
        for (var e = 0; e < z; e++) {
            var newColumn = document.createElement("div");
            var newImage = document.createElement("img");
            newColumn.className = "column"
            newImage.setAttribute("src", "img/trasera.png");
            newImage.style.width = "100%";
            if (i == 0) {
                newImage.id = e;
            } else if (i == 1) {
                newImage.id = z + e;
            }
            cambioCss(("css/style" + (z) + ".css"), 0);
            newImage.onclick = function onclick(event) {
                clickCarta(this.id)
            };
            newRow.appendChild(newColumn);
            newColumn.appendChild(newImage);
        }
    }
}

function cambioCss(cssFile, cssLinkIndex) {

    var oldLink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newLink = document.createElement("link");
    newLink.setAttribute("rel", "stylesheet");
    newLink.setAttribute("type", "text/css");
    newLink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newLink, oldLink);
}

function clickCarta(x) {
    document.getElementById(x).src = fotos[x];
    document.getElementById("textocambiante").innerHTML = "Nivel " + (parejas - 5)
    if (click == 1) {
        click1 = document.getElementById(x).src;
        click1id = x;
        document.getElementById(click1id).onclick = "";
        click++;
    } else if (click == 2) {
        click2 = document.getElementById(x).src;
        click2id = x;
        setTimeout(function () {
            if (click1 == click2) {
                document.getElementById(click1id).onclick = "";
                document.getElementById(click2id).onclick = "";
                correcto++;
                click1 = "";
                click2 = "";
                click1id = "";
                click2id = "";
                click = 1;
                if (correcto == parejas) {
                    if (correcto == 10) {
                        window.location.href = "ganado.html";
                    } else {
                        correcto = 0;
                        borrar();
                        parejas++;
                        generateArray();
                        generarFotos(parejas)
                        document.getElementById("textocambiante").innerHTML = "Nivel " + (parejas - 5)
                    }
                }
            } else if (click1 != click2) {
                document.getElementById(click1id).src = "img/trasera.png";
                document.getElementById(click1id).onclick = function onclick(event) {
                    clickCarta(this.id)
                };
                document.getElementById(click2id).src = "img/trasera.png";
                document.getElementById(click2id).onclick = function onclick(event) {
                    clickCarta(this.id)
                };
                click1 = "";
                click2 = "";
                click1id = "";
                click2id = "";
                click = 1;
            }
        }, 250);
    }
}

function borrar() {
    var elements = document.getElementsByClassName("row");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

inicio();

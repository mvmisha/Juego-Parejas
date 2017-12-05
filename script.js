        var dificultaddificultad = 1000;
        var click=1
        var click1, click2, click1id, click2id, correcto=0;
        var parejas=6;
        var rows=0, columns=0;
        var fotos;

        function inicio(){
            generatearray();
            generarfotos(parejas);
        }
        function generatearray(){
           fotos=["img/NSX.png", "img/R34.png", "img/STI.png", "img/SUPRA.png", "img/HAKOSUKA.png", "img/GTR.png","img/CIVIC.png","img/S2000.png","img/BRZ.png", "img/SILVIA.png"];
            fotos=fotos.slice(0,parejas);
            fotos=fotos.concat(fotos);
            shufflefotos(fotos);

        }
        function shufflefotos(a) {
            for (var i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        function generarfotos(z) {
            for (var i=0;i<2;i++){
                var newrow= document.createElement("div");
                newrow.className="row" 
                document.body.appendChild(newrow);
                for (var e=0;e<z;e++){
                    var newcolumn = document.createElement("div");
                    var newimage = document.createElement("img");
                    newcolumn.className="column"
                    newimage.setAttribute("src", "img/trasera.png");
                    newimage.style.width="100%";
                    if(i==0){
                        newimage.id=e;
                    } else if (i==1){
                        newimage.id=z+e;
                    }
                    cambiocss(("css/style"+(z)+".css"), 0);
                    newimage.onclick=function onclick(event){clickcarta(this.id)};
                    newrow.appendChild(newcolumn);
                    newcolumn.appendChild(newimage);
                }
            }        
        }
        function cambiocss(cssFile, cssLinkIndex) {

            var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

            var newlink = document.createElement("link");
            newlink.setAttribute("rel", "stylesheet");
            newlink.setAttribute("type", "text/css");
            newlink.setAttribute("href", cssFile);

            document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
        }
        function clickcarta(x){
            //console.log(x);
            document.getElementById(x).src = fotos[x];
            document.getElementById("textocambiante").innerHTML="Nivel " + (parejas-5)


            if(click==1){
                click1=document.getElementById(x).src;
                click1id=x;
                //console.log("click1: " + document.getElementById(x).src);
                document.getElementById(click1id).onclick="";
                click++;
            } else if (click==2){
                click2=document.getElementById(x).src;
                click2id=x;
                //console.log("click2: " + document.getElementById(x).src);
                setTimeout(function(){
                    if (click1==click2){
                        //console.log("Es una pareja completada.")

                        document.getElementById(click1id).onclick="";
                        document.getElementById(click2id).onclick="";
                        correcto++;
                        //console.log(correcto);
                        click1=""; click2="";click1id=""; click2id=""; click=1;
                        if(correcto==parejas){
                                if(correcto==10){
                                 /* parejas=6;
                                    correcto=0;
                                    generatearray();
                                    borrar();
                                    generarfotos(parejas); */
                                    window.location.href = "ganado.html";

                                } else {
                                    correcto=0;
                                    borrar();
                                    parejas++;
                                    generatearray();
                                    generarfotos(parejas)
                                    document.getElementById("textocambiante").innerHTML="Nivel " + (parejas-5)

                                }
                                
                                
                            }
                    } 
                    else if (click1!=click2) {
                    //console.log("No es una pareja completada.")
                    document.getElementById(click1id).src="img/trasera.png";
                    //document.getElementById(click1id).onclick="clickcarta(click1id)";
                    document.getElementById(click1id).onclick=function onclick(event){clickcarta(this.id)};
                    document.getElementById(click2id).src="img/trasera.png";
                    //document.getElementById(click2id).onclick="clickcarta(click1id)";
                    document.getElementById(click2id).onclick=function onclick(event){clickcarta(this.id)};

                    click1=""; click2="";click1id=""; click2id=""; click=1;
                    }
                }, 250);
                    
            }
        }
        function borrar(){
            var elements = document.getElementsByClassName("row");
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
        
        inicio();

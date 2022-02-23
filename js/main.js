// Variables del tablero
const $tablero = document.querySelector("#tablero");
//const $cartas;

//MENU
//const $displayJugadas = document.querySelector("#jugadas");
const $botonNuevo = document.querySelector("#nuevo");


//SONIDOS
const $clickSound = document.querySelector("#click");
const $correctSound = document.querySelector("#correcto");
const $completeSound = document.querySelector("#completo");
const $nuevoSound = document.querySelector("#new")

//Tiempo de espera
const ESPERA_VOLTEO = 1500;

//Estado del JUEGO
const ESTADO_JUEGO = {
    jugadas : 0,
    coincidencias : 0,
    jugadorActivo: '',
    jugadores : {
        p1 : {
            puntos : 0,
            nombre : ''            
        }, 
        p2 : {
            puntos : 0,
            nombre : ''            
        }
    }
}

let cartasGiradas = [];
let jugadas = 0;
let coincidencias = 0;
let puntos = {
    "p1": 0,
    "p2": 0
};

function setCartas() {
    let cartasAzar = [];
    let i = 0;
    let ID;
    while (i < 20) {
        ID = Math.floor(Math.random() * 151) + 1;
        if (!cartasAzar.find(element => element == ID)) {
            cartasAzar[i] = ID;
            i++
        }
    }

    return cartasAzar;
}

function mostrarCarta(carta) {
    $clickSound.pause();
    $clickSound.currentTime = 0;
    $clickSound.play();
    carta.style.transform = "rotateY(360deg)";
    carta.src = POKEMONS[carta.dataset.id];
    carta.dataset.girada = true;
}

function voltearCarta(carta) {
    carta.style.transform = "none";
    carta.src = "img/pokeball.jpg";
    carta.dataset.girada = false;
}


function crearTablero(){
    $tablero.innerHTML = "";
    let row = document.createElement("div");
    row.className = "row";
    let carta;
    JUEGO.cartas.forEach((id) =>{
        carta = document.createElement("img");
        carta.dataset.id = id;
        carta.style.transform = "none";
        carta.className = "reverso";
        carta.src = "img/pokeball.jpg";
        carta.dataset.girada = false;
        row.appendChild(carta);
    });
    $tablero.appendChild(row);
}

function mezclarCartas() {
    JUEGO.cartas = JUEGO.cartas.concat(JUEGO.cartas);
    JUEGO.cartas.sort(function () {
        return 0.5 - Math.random()
    });    
}

function compararCartas() {
    if (cartasGiradas[0].dataset.id == cartasGiradas[1].dataset.id) {
        cartasGiradas[0].dataset.girada = true;
        cartasGiradas[1].dataset.girada = true;
        return true;
    } else {
        return false;
    }
}

function actualizarJugadas() {
    ESTADO_JUEGO.jugadas++;    
}

function actualizarPuntaje(jugadorActivo){
    let puntos = document.querySelector("#display--points-" + jugadorActivo).textContent
    document.querySelector("#display--points-" + jugadorActivo).textContent = Number(puntos) + (20 - coincidencias)
}

function cambiarDisplayActivo(){
    document.querySelectorAll(".display").forEach ( 
        display => display.classList.contains("active") ? 
            display.classList.remove("active") : display.classList.add("active")
    )
}

function iniciarJuego() {
    JUEGO.cartas = setCartas();
    ESTADO_JUEGO.jugadorActivo = 'p1';
    mezclarCartas();
    crearTablero();
    const $cartas = document.querySelectorAll(".reverso");
    cartasGiradas = [];
    jugadas = 0;
    coincidencias = 0;
    $nuevoSound.play();
    document.querySelector("#tablero").style.opacity = 1;
    puntos = {
        "p1": 0,
        "p2": 0
    };
    //resetearDisplays();
    manejarJugada($tablero);
}

function manejarJugada($tablero) {

    $tablero.onclick = function (e) {
        console.log(e.target);
        const $carta = e.target;
        if ($carta.classList.contains('reverso')) {
            if (cartasGiradas.length < 2 && $carta.dataset.girada === "false") {
                cartasGiradas.push($carta);
                mostrarCarta($carta);
                if (cartasGiradas.length == 2) {
                    if (compararCartas()) {
                        coincidencias++;
                        if (coincidencias < 20) {
                            $correctSound.pause();
                            $correctSound.currentTime = 0;
                            $correctSound.play();
                        }
                        cartasGiradas = [];
                        actualizarPuntaje(ESTADO_JUEGO.jugadorActivo);
                        actualizarJugadas();

                    } else {
                        setTimeout(function () {
                            voltearCarta(cartasGiradas[0]);
                            voltearCarta(cartasGiradas[1]);
                            cartasGiradas = [];
                        }, ESPERA_VOLTEO);
                        actualizarJugadas();
                    }
                }
            }

            if (coincidencias == 20) {
                setTimeout(function () {
                    $completeSound.pause();
                    $completeSound.currentTime = 0;
                    $completeSound.play()
                }, 1000)
            }
        }
    };
}

$botonNuevo.onclick = iniciarJuego;

/*
const $contenedor = document.querySelector('#contenedor');
let cartas = '';
for (i=1; i <= 48; i++){
    let pokemonString = POKEMONS[i];
    let pokemonID = pokemonString.slice(pokemonString.indexOf('/')+1, pokemonString.indexOf('.'));
    cartas += `
        <div class="flip-card">
            <div class="flip-card-inner" id="${pokemonID}">
            <div class="flip-card-front">
                <img src="img/pokeball.jpeg" alt="Reverso" style="width:100px;height:100px;">
            </div>
            <div class="flip-card-back" id="prueba-back" style="background-image: url('${POKEMONS[i]}')">
                
            </div>
            </div>
        </div> `;
    
    let pokemonIMG = document.createElement('div');
    pokemonIMG.style.width = "200px";
    pokemonIMG.style.height = "200px";
    pokemonIMG.style.backgroundImage = 'url("' + POKEMONS[i] + '")';
    pokemonIMG.style.backgroundPosition = "0 63%";
    pokemonIMG.style.float = "left";
    //$contenedor.appendChild(pokemonIMG);
}


document.querySelectorAll(".reverso").forEach(function(element){
    element.onclick = function(){
        console.log (element.dataset.girada);

        if (cartasGiradas.length < 2 && element.dataset.girada === "false"){
            cartasGiradas.push(element);
            mostrarCarta(element);
            if (cartasGiradas.length == 2){
                if (compararCartas()){
                    coincidencias ++;
                    if (coincidencias < 20) {$correctSound.play();}
                    cartasGiradas = [];
                    actualizarJugadas();
                    
                }else{
                    setTimeout(function(){
                        voltearCarta(cartasGiradas[0]);
                        voltearCarta(cartasGiradas[1]);
                        cartasGiradas = [];
                    }, 1500);
                    actualizarJugadas();
                }
            }
        }

        if (coincidencias == 20){ setTimeout(function(){$completeSound.play()},1000)}

    }
});*/





//console.log (POKEMONS[1]);
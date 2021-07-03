

// Variables del tablero
const $tablero = document.querySelector("#tablero");
const $cartas = document.querySelectorAll(".reverso");

//MENU
const $displayJugadas = document.querySelector("#jugadas");
const $botonNuevo = document.querySelector("#nuevo");
const $botonIker = document.querySelector("#iker-mas");
const $botonNina = document.querySelector("#nina-mas");

//SONIDOS
const $clickSound = document.querySelector("#click");
const $correctSound = document.querySelector("#correcto");
const $completeSound = document.querySelector("#completo");
const $nuevoSound = document.querySelector("#new")

//Tiempos de espera
const ESPERA_VOLTEO = 1500;

let cartasGiradas = [];
let jugadas = 0;
let coincidencias = 0;
let puntos = {"iker": 0, "nina": 0};

function setCartas (){
    let cartasAzar = [];
    let i = 0;
    let ID;
    while (i<20){
        ID = Math.floor(Math.random()*151)+1;
        if (!cartasAzar.find(element => element == ID)){
            cartasAzar[i]=ID;
            i++
        }     
    }
    
    return cartasAzar;
}

function mostrarCarta(carta){
    $clickSound.play();
    carta.style.transform = "rotateY(360deg)";
    carta.src = POKEMONS[carta.dataset.id];    
    carta.dataset.girada = true;
}

function voltearCarta (carta){
    carta.style.transform = "none";
    carta.src = "img/pokeball.jpg";
    carta.dataset.girada = false;
}


function mezclarCartas(){
    JUEGO.cartas = JUEGO.cartas.concat(JUEGO.cartas);
    JUEGO.cartas.sort(function(){return 0.5 - Math.random()});
    for (let i = 0; i < $cartas.length; i++){
        $cartas[i].dataset.id = JUEGO.cartas[i];
        voltearCarta($cartas[i]);
        //$cartas[i].dataset.girada = false;

    }
}

function compararCartas(){
    if (cartasGiradas[0].dataset.id == cartasGiradas[1].dataset.id){
        cartasGiradas[0].dataset.girada = true;
        cartasGiradas[1].dataset.girada = true;
        return true;
    }else{
        return false;
    }
}

function actualizarJugadas(){
    jugadas ++;
    $displayJugadas.textContent = String(jugadas);
}

function iniciarJuego(){
    JUEGO.cartas = setCartas();
    mezclarCartas();
    cartasGiradas = [];
    jugadas = 0;
    coincidencias = 0;
    $nuevoSound.play();
    document.querySelector("#tablero").style.opacity = 1;
    puntos = {"iker":0, "nina": 0};
    resetearDisplays();
    manejarJugada($tablero);
}

function manejarJugada($tablero){

    $tablero.onclick = function (e){
        const $carta = e.target;
        if ($carta.classList.contains('reverso')){
            if (cartasGiradas.length < 2 && $carta.dataset.girada === "false"){
                cartasGiradas.push($carta);
                mostrarCarta($carta);
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
                        }, ESPERA_VOLTEO);
                        actualizarJugadas();
                    }
                }
            }
    
            if (coincidencias == 20){ setTimeout(function(){$completeSound.play()},1000)}
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

function sumarPunto (jugador){
    let $puntaje = document.querySelector("#puntos-"+jugador);
    puntos[jugador]++
    $puntaje.textContent = String(puntos[jugador]);
}

function resetearDisplays(){
    const $displays = document.querySelectorAll(".display");
    $displays.forEach(function(elemento){
        elemento.textContent = "-";
    })
}
$botonNina.onclick = function(){
    sumarPunto ("nina");
}

$botonIker.onclick = function(){
    sumarPunto ("iker");
}

   

//console.log (POKEMONS[1]);

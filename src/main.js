import _ from 'underscore';

import './style.css';

const miModulo = (() => {
    'use strict';

    // Variables
    let deck           = [];
    const palos        = ['C', 'D', 'H', 'S'],
          specialCards = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Reference to the HTML elements
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo'); 

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML         = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

         btnPedir.disabled = false;
         btnDetener.disabled = false;
    };

    const crearDeck = () => {
        deck = [];

        for(let i = 2; i <= 10; i++) {
            for(let palo of palos) {
            deck.push(i + palo);
            }
        }

        for(let palo of palos) {
            for(let specialCard of specialCards) {
                deck.push(specialCard + palo);
            }
        }
        return _.shuffle (deck);
    };

    const pedirCarta = () => {
        if(deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }; 

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : Number(valor);
    };

    // Turno: 0 = primer jugadory ultimo = computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    };

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if(puntosMinimos > 21) {
                alert('La computadora gana');
            } else if(puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100); 
    };

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    };

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if(puntosJugador > 21) {
            console.warn('Lo siento, has perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if(puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego(); 
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();

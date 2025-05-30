import _ from 'underscore';

//export const miNombre = 'Claudia';

/**
 * This function creates a deck of cards.
 * @param {Array<String>} palos Example: ['C', 'D', 'H', 'S']
 * @param {Array<String>} specialCards Example: ['A', 'J', 'Q', 'K']
 * @returns {Array<String>} returns a shuffled deck of cards
 */

export const crearDeck = (palos, specialCards) => {

    if(!palos || palos.length === 0) 
        throw new Error('Los palos son obligatorios');

    if(!specialCards || specialCards.length === 0) 
        throw new Error('Las cartas especiales son obligatorias');

    let deck = [];

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

export default crearDeck;
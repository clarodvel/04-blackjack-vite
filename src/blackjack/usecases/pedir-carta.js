/**
 * this function takes a deck of cards and returns a card from the deck.
 * @param {Array<String>} deck 
 * @returns {String} returns a card from the deck
 */

export const pedirCarta = (deck) => {
        if(!deck || deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    };
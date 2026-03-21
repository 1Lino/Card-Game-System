
import { getGameState } from "/scripts/engine/game_state.js";

export function drawCard(state_obj){

    let state = getGameState(state_obj);
    const currentPlayer = state.turn.player;

    const playerHasCardsInDeck = state?.[currentPlayer]?.deck?.length > 0;
    const deckAmount = state?.[currentPlayer]?.deck?.length || 0;
    const amountToDraw = state[currentPlayer].actions.drawsRemaining;
    
    if (!playerHasCardsInDeck || amountToDraw > deckAmount) return state;

    for (let i = 0; i < amountToDraw; i++){
        state[currentPlayer].hand.push(state[currentPlayer].deck.pop());
    }
    state[currentPlayer].actions.drawsRemaining = 0;

    return {...state};
}

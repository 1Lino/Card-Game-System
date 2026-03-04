
import { getGameState } from "/scripts/engine/game_state.js";

export function drawCard(state_obj){

    let stats = getGameState(state_obj);
    const currentPlayer = stats.turn.player;

    // se o deck do jogador atual existir mas estiver vazio, sai da função.
    if (!stats?.[currentPlayer]?.deck?.length) return {...stats};

    // pra evitar que o loop continue puxando cartas mesmo com o deck vazio, é necessário verificar se o deck ainda tem cartas a cada iteração.
    for (let i = 0; i < stats[currentPlayer].actions.drawsRemaining && stats[currentPlayer].deck.length > 0; i++){
        stats[currentPlayer].hand.push(stats[currentPlayer].deck.pop());
    }
    stats[currentPlayer].actions.drawsRemaining = 0;

    return {...stats};
}
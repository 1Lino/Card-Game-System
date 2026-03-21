// todas as funções relacionadas às fases do jogo, como início de turno, fase principal, fase de ataque, fim de turno, etc., serão definidas aqui. A game_engine que irá usá-las, no entanto.
import {updateHandUI} from '/scripts/UI/render_hand.js';
import {drawCard} from '/scripts/actions/draw_card.js';
import { getGameState } from "/scripts/engine/game_state.js";

export async function drawPhase(state_obj){
    let state = getGameState(state_obj);
    console.log('Received state for draw phase: ', state);

    // se for o primeiro turno do duelo, ambos os jogadores devem puxar os cards iniciais.
    if (state.flags.isFirstTurn){

        // Atualiza o estado com parâmetros do inimigo:
        state = drawCard({
            ...state, 
            turn: {
                ...state.turn,
                player: 'enemy'
            }
        });
        
        // Atualiza o estado com parâmetros do jogador:
        state = drawCard({
            ...state, 
            turn: {
                ...state.turn,
                player: 'player',
                phase: 'main'
            }
        });

        // Atualiza a UI da mão do inimigo, executando animação e renderização de cards.
        await updateHandUI({
            ...state, 
            turn: {
                ...state.turn,
                player: 'enemy'
            },
            enemy: {
                ...state.enemy,
                actions: {
                    ...state.enemy.actions,
                    drawsRemaining: state_obj.enemy.actions.drawsRemaining // já que este estado é zerado pela drawCard, é necessário explicitar qual era o número original de cards a ser puxado no início do turno, para que a UI possa mostrar isso corretamente.
                }
            }
        });

        // Atualiza a UI da mão do jogador, executando animação e renderização de cards.
        await updateHandUI({
            ...state, 
            turn: {
                ...state.turn,
                player: 'player'
            },
            player: {
                ...state.player,
                actions: {
                    ...state.player.actions,
                    drawsRemaining: state_obj.player.actions.drawsRemaining 
                }
            }
        });

        console.log('Draw phase ended!')
        console.group('Returned state for main phase:');
        console.log('Game state:', state);
        console.log(`Current player: ${state.turn.player}`);
        console.log(`Current turn: ${state.turn.count}`);
        console.log(`Current phase: ${state.turn.phase}`);
        console.log(`Can summon: ${state[state.turn.player].actions.normalSummonsRemaining} card(s)`);
        console.groupEnd();

        // e então retorna o resultado final do estado: mão do jogador e mão do inimigo atualizadas.
        // esse novo estado será usado para as próximas fases do turno.
        return {...state}; 
    }

    // caso não seja o primeiro turno, apenas o jogador da vez puxa os cards, e a UI é atualizada de acordo.
    // TODO: esta sessão deve ser testada e atualizada.
    updateHandUI({ ...state});
    state = drawCard({...state});

    return {...state};
}

export async function mainPhase(state_obj){
    let state = getGameState(state_obj);

    // TODO...
}
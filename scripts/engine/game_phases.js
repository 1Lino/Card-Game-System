// todas as funções relacionadas às fases do jogo, como início de turno, fase principal, fase de ataque, fim de turno, etc., serão definidas aqui. A game_engine que irá usá-las, no entanto.
import {updateHandUI} from '/scripts/UI/render_hand.js';
import {drawCard} from '/scripts/actions/draw_card.js';

export async function drawPhase(state_obj){
    let state = {...state_obj};
    console.log('Received state for draw phase: ', state);

    // se for o primeiro turno do duelo, ambos os jogadores devem puxar os cards iniciais.
    if (state_obj.flags.isFirstTurn){
        // após a atualização da UI, atualiza o estado para a próxima interação com a UI:

        // Atualiza o estado novamente, com os parâmetros do inimigo, e muda a fase para main.:
        state = drawCard({
            ...state, 
            turn: {
                ...state.turn,
                player: 'enemy',
                phase: 'main'
            }
        });
        // após a atualização da UI, atualiza o estado para a próxima interação com a UI:
        state = drawCard({
            ...state, 
            turn: {
                ...state.turn,
                player: 'player'
            }
        });


        // passa o novo estado já atualizado para a próxima atualização de UI, no caso, a da mão do inimigo:
        // lembre o seguinte: updateHandUI só vai ler o estado, não alterar.
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
                    drawsRemaining: 3 // já que este estado é zerado pela drawCard, é necessário explicitar 
                }
            }
        });

        await updateHandUI({
            ...state_obj, 
            turn: {
                ...state_obj.turn,
                player: 'player'
            },
            player: {
                ...state.player,
                actions: {
                    ...state.player.actions,
                    drawsRemaining: 3
                }
            }
        });

        console.log('State after draw phase', state);
        console.log(`Draw phase ended! \nCurrent phase: ${state.turn.phase}`);
        console.log(`Player: ${state.turn.player}`);

        return {...state}; // e então retorna o resultado final do estado: mão do jogador e mão do inimigo atualizadas.
    }

    // caso não seja o primeiro turno, apenas o jogador da vez puxa os cards, e a UI é atualizada de acordo.
    updateHandUI({ ...state});
    state = drawCard({...state});

    //console.log(state);
    //console.log(`Draw phase ended! \nCurrent phase: ${state.turn.phase}`);
    return {...state};
}

export async function mainPhase(state_obj){
    let state = {...state_obj};

    // TODO...
}
// todas as funções relacionadas às fases do jogo, como início de turno, fase principal, fase de ataque, fim de turno, etc., serão definidas aqui. A game_engine que irá usá-las, no entanto.
import {updateHandUI} from '/scripts/UI/draw.js';
import {drawCard} from '/scripts/actions/draw_card.js';

export async function drawPhase(state_obj){
    let state = {};

    // se for o primeiro turno do duelo, ambos os jogadores devem puxar os cards iniciais.
    if (state_obj.flags.isFirstTurn){
        // atualiza o UI de acordo com o estado atual de coisas recebido pela função drawPhase.
        // jogador pode puxar um certo número de cards, a UI precisa saber disso antes da mudança de estado.
        await updateHandUI({
            ...state_obj, 
            turn: {
                ...state_obj.turn,
                player: 'player'
            }
        });
        // após a atualização da UI, atualiza o estado para a próxima interação com a UI:
        state = drawCard({
            ...state_obj, 
            turn: {
                ...state_obj.turn,
                player: 'player'
            }
        });

        // passa o novo estado já atualizado para a próxima atualização de UI, no caso, a da mão do inimigo:
        await updateHandUI({
            ...state, 
            turn: {
                ...state.turn,
                player: 'enemy'
            }
        });
        
        // Por último, atualiza o estado novamente, com os parâmetros do inimigo, e muda a fase para main.:
        state = drawCard({
            ...state, 
            turn: {
                ...state.turn,
                player: 'enemy',
                phase: 'main'
            }
        });

        console.log(state);
        return {...state}; // e então retorna o resultado final do estado: mão do jogador e mão do inimigo atualizadas.
    }

    // caso não seja o primeiro turno, apenas o jogador da vez puxa os cards, e a UI é atualizada de acordo.
    updateHandUI({ ...state});
    state = drawCard({...state});

    console.log(state);
    return {...state};
}
// Aqui ficarão as funções relacionadas ao uso de cards. Nada complexo: basicamente verificar estado, verificar condições de uso de card, e quantos cards se pode usar nesta fase, etc. Então atualizar o estado e então a UI.

export function useCard(state_obj, card_id){
    const state = {
        ...state_obj,
            turn: {...state_obj.turn},
            player: {
                ...state_obj.player,
                hand: [...state_obj.player.hand],
                field: [...state_obj.player.field],
                grave: [...state_obj.player.grave],
                actions: {...state_obj.player.actions},
            }, 
            enemy: {
                ...state_obj.enemy,
                hand: [...state_obj.enemy.hand],
                field: [...state_obj.enemy.field],
                grave: [...state_obj.enemy.grave],
                actions: {...state_obj.enemy.actions},
            },
        };
    
    if (
        state.turn.phase !== 'main' 
        || state[state.turn.player].actions.normalSummonsRemaining === 0
        || !state[state.turn.player].hand.includes(card_id)
    ) return state; 

    const index = state[state.turn.player].hand.indexOf(card_id);
    state[state.turn.player].field.push(card_id);
    state[state.turn.player].hand.splice(index, 1);
    state[state.turn.player].actions.normalSummonsRemaining -= 1;
  
    return {...state};
}






// NOTAS.:
// por padrão, após a draw fase, o status de action do jogador (player ou inimigo) deve estar assim:
attacksRemaining: 1
drawsRemaining: 0
normalSummonsRemaining: 1

// e o turno deve ser 'main'. Dito isto, se for verificado que a fase atual é 'main' e que normalSummonsRemaining é maior do que 0, o player poderá usar um card de sua mão. Assim, ocorrerá o seguinte:
// -ao selecionar um card com um clique de mouse, deverá aparecer um prompt de summon logo acima do card.
// -se o summon for confirmado, este card deve ser removido da array de hand e adicionado à array de field do jogador.
// -quando normalSummonsRemaining chegar a zero, o jogador não poderá mais fazer esse processo. Ou seja, aquele prompt só
//  aparece se a condição acima for cumprida, e, ao clicar nele, o summon só ocorre se a condição permitir.
// -Tanto o aparecimento do prompt como a animação de summon são coisas relacionadas à UI, e deverão ser trabalhadas 
//  no  render_field. O que se refere à manipulação das arrays e do estado, isto será feito aqui neste arquivo. Seguindo
//  o exemplo de draw_card.
// Em jogos mais complexos, é possível usar cards fora da main phase por causa de efeitos ou modificadores.
// mas como esse jogo é simples, por hora só será permitido o uso de cards na main phase.
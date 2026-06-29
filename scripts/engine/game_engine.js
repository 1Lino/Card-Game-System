// É nesse arquivo onde tudo deverá ser integrado. O estado do jogo será chamado aqui,
// bem como as animações, as fases e tudo o que concerne a atualização de estados.
// -Esta engine irá controlar as funções de fases, e as funções de fase irão controlar as de UI relacionadas a elas.
// -As funções de UI receberão o estado, segundo este fluxo: estado_inicial, UI_update, estado_novo, UI_update...
// -Eventos globais também serão controlados aqui. Tudo deverá ser controlado aqui, é como o centro de comando de validações.

import { getGameState } from '/scripts/engine/game_state.js';
import { drawPhase } from '/scripts/engine/game_phases.js';
import { useCard } from '/scripts/actions/use_card.js';
import { handleMouseEvent, toggleMouseEventState } from '/scripts/actions/handle_events.js';

let state = getGameState();

document.body.addEventListener('mouseover', node => {
    state = toggleMouseEventState(state, 'hover');
    handleMouseEvent(node, 'mouseover', state)});

document.body.addEventListener('mouseout', node => {
    state = toggleMouseEventState(state, 'hover');
    handleMouseEvent(node, 'mouseout', state)});

document.body.addEventListener('click', node => {
    state = toggleMouseEventState(state, 'click');
    handleMouseEvent(node, 'click', state)});

    
// ################################################## TESTES ################################################################
// As chamadas abaixo devem ser feitas na game_phases, em suas respectivas fases. As funções de fase serão testadas aqui por conveniência, uma após outra. Isto aqui poderia inclusive ser uma arquivo separado de testes.

// drawPhase OK.
state = await drawPhase(state); // isso aqui é só pra teste, pra ver se a função drawPhase tá funcionando, depois isso vai ser controlado por eventos globais, como clique em deck, fim de fase, etc.

// useCard OK.
state = useCard(state, "id4"); // está funcionando normalmente, falta fazer a UI reagir a isto, seguindo o exemplo de draw_card com render_hand.

console.log('State after card summon:', state);
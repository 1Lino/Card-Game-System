// É nesse arquivo onde tudo deverá ser integrado. O estado do jogo será chamado aqui,
// bem como as animações, as fases e tudo o que concerne a atualização de estados.
// -Esta engine irá controlar as funções de fases, e as funções de fase irão controlar as de UI relacionadas a elas.
// -As funções de UI receberão o estado, segundo este fluxo: estado_inicial, UI_update, estado_novo, UI_update...
// -Eventos globais também serão controlados aqui. Tudo deverá ser controlado aqui, é como o centro de comando de validações.

import { getGameState } from '/scripts/engine/game_state.js';
import { drawPhase } from '/scripts/engine/game_phases.js';
import { useCard } from '/scripts/actions/use_card.js';

let state = getGameState();

// TESTES

// drawPhase OK.
state = await drawPhase(state); // isso aqui é só pra teste, pra ver se a função drawPhase tá funcionando, depois isso vai ser controlado por eventos globais, como clique em deck, fim de fase, etc.

// useCard OK.
state = useCard(state, "id4"); 

console.log('state after used card', state);
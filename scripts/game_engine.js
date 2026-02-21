// É nesse arquivo onde tudo deverá ser integrado. O estado do jogo será chamado aqui,
// bem como as animações, as fases e tudo o que concerne a atualização de estados.
// -Esta engine irá controlar as funções de fases, e as funções de fase irão controlar as de UI relacionadas a elas.
// -As funções de UI receberão o estado, segundo este fluxo: estado_inicial, UI_update, estado_novo, UI_update...
// -Eventos globais também serão controlados aqui. Tudo deverá ser controlado aqui, é como o centro de comando de validações.

import {getGameState} from '/scripts/game_state.js';

let state = getGameState();
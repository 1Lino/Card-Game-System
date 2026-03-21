// Os decks, neste estado, devem conter apenas os ids dos cards, para puxar as informações dos cards diretamente
// de um json ou outra base de dados qualquer.
const GAME_STATE = {
    gameStatus: {
        winner: null, // 'player' | 'enemy'
        isOver: false,
    },

    flags: {
        isFirstTurn: true,
        damagePrevention: false,
    },

    turn: {
        player: 'player', // player ou enemy
        count: 1,
        phase: 'draw', // draw | main | battle | end
    },

    player: {
        life: 100,
        deck: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6'],
        hand: [],
        field: [],
        grave: [],
        actions: {
            drawsRemaining: 3,
            normalSummonsRemaining: 1,
            attacksRemaining: 1,
        }
    },

    enemy: {
        life: 100,
        deck: ['id7', 'id8', 'id9', 'id10', 'id11', 'id12'],
        hand: [], 
        field: [],
        grave: [],
        actions: {
            drawsRemaining: 3,
            normalSummonsRemaining: 1,
            attacksRemaining: 1,
        }
    },

    selection: {
        hoveredCardId: null,
        selectedPlayerCardId: undefined, 
        selectedEnemyCardId: undefined,
        cardOwner: {
            player: 'player-card',
            enemy: 'enemy-card'
        },
        selectableTargets: [],
    },

    event: {
        hover: false,
        click: false
    }

}

// returna uma cópia profunda de game_state, para que os demais módulos possam manipular o estado sem correr o risco de causar mutações acidentais no estado original, o que pode levar a bugs difíceis de rastrear.:
export function getGameState(state_obj){
    const state = state_obj ? {...state_obj} : {...GAME_STATE};
    return {
        ...state,
        gameStatus: {...state.gameStatus},
        flags: {...state.flags},
        turn: {...state.turn},
        player: {
            ...state.player,
            deck: [...state.player.deck],
            hand: [...state.player.hand],
            field: [...state.player.field],
            grave: [...state.player.grave],
            actions: {...state.player.actions},
        }, 
        enemy: {
            ...state.enemy,
            deck: [...state.enemy.deck],
            hand: [...state.enemy.hand],
            field: [...state.enemy.field],
            grave: [...state.enemy.grave],
            actions: {...state.enemy.actions},
        }, 
        cardOwner: {
            player: state.selection.player,
            enemy: state.selection.enemy
        },
        selection: {
            ...state.selection,
            selectableTargets: []
        },
        event: {
            ...state.event
        }
    };
}


/*
IMPORTANTE — Sobre imutabilidade: shallow copy vs deep copy:

O operador spread ({ ...obj }) cria apenas uma cópia rasa do objeto.
Isso significa que:

- Propriedades primitivas (number, string, boolean, etc.) são copiadas por valor.
- Arrays e objetos internos são copiados por referência, ou seja, ainda que uma array seja declarada como const, este
  const aponta para uma referência, você não pode reatribuir valor para aquela referência, mas pode modificar seu conteúdo (pois array é uma referência que aponta para vários lugares na memória, e estes lugares são mutáveis).

Exemplo:
const copy = { ...state };

Se state possui arrays ou objetos internos, eles continuarão apontando
para as mesmas referências em memória.

Consequência:
Modificar arrays internos (push, pop, splice, etc.) pode mutar
o estado original, mesmo que o objeto externo tenha sido "copiado".

Isso pode causar bugs difíceis de detectar, especialmente em sistemas
reativos que dependem de comparação por referência (===) para detectar mudanças.

Para garantir imutabilidade real, é necessário:
- Criar novos arrays/objetos internos manualmente (deep copy):

{
...state, 
deck: [...state.deck],
hand: [...state.hand]
}

Isto é necessário porque operador spread (...) copia a estrutura externa, mas NÃO clona profundamente.
*/


// utilizar conceitos de imutabilidade ao lidar com variáveis de estado, ou seja, nunca modificar os atributos diretamente.
// os decks, neste estado, devem conter apenas os ids dos cards, para puxar as informações dos cards diretamente
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
    }

}

// =============================================FUNÇÕES AUXILIARES ==============================================
// Encapsulamento de estado do jogo, de modo que ele não seja acessível diretamente por outros arquivos, e sim apenas por meio de um getter. O jogo irá basicamente usar uma cópia do estado.

// returna uma cópia profunda de game_state, por precaução:
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
    };
}
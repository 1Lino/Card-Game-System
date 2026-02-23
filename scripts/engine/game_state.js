
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
        field: [{  // no campo, os cards deverão ter estado próprio, então toda vez que um card entrar em campo, seus dados devem ser usados pra criar um objeto desse tipo aqui (exemplo):
                    instanceId: 'a1f8',
                    cardId: 'id1',
                    currentATK: 20,
                    currentDEF: 20,
                    hasAttacked: false,
                }],
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

    ui: {
        selectedCardId: null,
        hoveredCardId: null,
        selectableTargets: [],
    }

}

// =============================================FUNÇÕES AUXILIARES ==============================================
// Encapsulamento de estado do jogo, de modo que ele não seja acessível diretamente por outros arquivos, e sim apenas por meio de um getter. O jogo irá basicamente usar uma cópia do estado.

// deep copy:
export function getGameState(){
    return {
        ...GAME_STATE,
        player: {
            ...GAME_STATE.player,
            deck: [...GAME_STATE.player.deck],
            hand: [...GAME_STATE.player.hand],
            field: [...GAME_STATE.player.field],
            grave: [...GAME_STATE.player.grave],
            actions: {...GAME_STATE.player.actions},
        }, 
        enemy: {
            ...GAME_STATE.enemy,
            deck: [...GAME_STATE.enemy.deck],
            hand: [...GAME_STATE.enemy.hand],
            field: [...GAME_STATE.enemy.field],
            grave: [...GAME_STATE.enemy.grave],
            actions: {...GAME_STATE.enemy.actions},
        },
        turn: {...GAME_STATE.turn},
        flags: {...GAME_STATE.flags},
        gameStatus: {...GAME_STATE.gameStatus},
        ui: {...GAME_STATE.ui},
    };
}
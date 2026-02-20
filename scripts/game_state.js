
// utilizar conceitos de imutabilidade ao lidar com variáveis de estado, ou seja, nunca modificar os atributos diretamente.
// os decks, neste estado, devem conter apenas os ids dos cards, para puxar as informações dos cards diretamente
// de um json ou outra base de dados qualquer.
let GAME_STATE = {
    gameStatus: {
        winner: null, // 'player' | 'enemy'
        isOver: false,
    },

    flags: {
        isFirstTurn: true,
        damagePrevention: false,
    },

    turn: {
        player: 'enemy', // player ou enemy
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
            drawsRemaining: 2,
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

// faz todo o GAME_STATE acessível.
export function getGameState(){
    return {...GAME_STATE};
}
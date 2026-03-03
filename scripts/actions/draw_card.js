
export function drawCard(state_obj){
    let stats = {};

    // com algum trabalho, as duas estruturas abaixo podem ser reduzidas a uma só, bastando usar o próprio turn.player
    // pra fazer a referência às propriedades, tipo ...state_obj['player'].deck, etc.
    if (state_obj.turn.player === 'player'){
        // se state_obj e sua propriedade sample_deck existirem (?) mas não (!) possuírem tamanho, ou seja, length = 0, então retorna
        // o mesmo objeto (pra evitar retornar undefined, que é o padrão de return);
        if (!state_obj?.player.deck?.length) return {...state_obj};

        stats = {
            ...state_obj,
            player: {
                ...state_obj.player, 
                deck: [...state_obj.player.deck],
                hand: [...state_obj.player.hand]
            },
        }; 

        // stats.sample_deck.length > 0 aqui é necessário para que não aconteça o caso de o deck esvaziar durante o loop e continuar o loop com deck vazio,
        // por exemplo: suponha que o deck tenha 1 carta, mas o número de puxadas permitidas é 2, se não houver verificação, seria puxada
        // a carta restante e mais uma 'undefined', de modo que a mão/array ficaria com objetos 'undefined'.
        for (let i = 0; i < stats.player.actions.drawsRemaining && stats.player.deck.length > 0; i++){
            stats.player.hand.push(stats.player.deck.pop());
        }
        
        // reseta o número de cards que pode puxar:
        stats = {
            ...stats,
            player: {
                ...stats.player,
                actions: {
                    ...stats.player.actions, 
                    drawsRemaining: 0
                }
            }
        }
    }
    if (state_obj.turn.player === 'enemy'){
        if (!state_obj?.enemy.deck?.length) return {...state_obj};

        stats = {
            ...state_obj,
            enemy: {
                ...state_obj.enemy, 
                deck: [...state_obj.enemy.deck],
                hand: [...state_obj.enemy.hand]
            },
        };  

        for (let i = 0; i < stats.enemy.actions.drawsRemaining && stats.enemy.deck.length > 0; i++){
            stats.enemy.hand.push(stats.enemy.deck.pop());
        }
        
        // reseta o número de cards que pode puxar:
        stats = {
            ...stats,
            enemy: {
                ...stats.enemy,
                actions: {
                    ...stats.enemy.actions, 
                    drawsRemaining: 0
                }
            }
        }

    }

    return {...stats};
}


/*
IMPORTANTE — Sobre imutabilidade e cópia rasa (shallow copy)

O operador spread ({ ...obj }) cria apenas uma cópia rasa do objeto.
Isso significa que:

- Propriedades primitivas (number, string, boolean, etc.) são copiadas por valor.
- Arrays e objetos internos são copiados por referência.

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

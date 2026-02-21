// conceito de imutabilidade deve ser aplicado em todo o projeto.
import {getGameState} from '/scripts/game_state.js';


//TODO: este estado aqui deverá ir para um arquivo chamado "game_engine".
let state = getGameState();

// estes seletores são apenas para testes. 
const deck = document.querySelector('.deck-stack');
const deck2 = document.querySelector('.deck-stack2');
const hand = document.querySelector('.hand1');
const hand2 = document.querySelector('.hand2');
const flyingCard = document.querySelector('.flying');
const flying_c = document.querySelector('.flying2');



//################################## EVENT HANDLERS #######################################
// evento de click e handler que controla este evento:
deck.addEventListener('click', () => {
    if (state.turn.player !== 'player') return;
    state = drawCard(state);
    updateHandUI(state);
    console.log(state);
});

// sem evento de click:
function drawPhase(state_obj){
    let state = {};

    // se for o primeiro turno do duelo, ambos os jogadores devem puxar os cards iniciais.
    if (state_obj.flags.isFirstTurn){
        // atualiza o UI de acordo com o estado atual de coisas recebido pela função drawPhase.
        // jogador pode puxar um certo número de cards, a UI precisa saber disso antes da mudança de estado.
        updateHandUI({
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
        updateHandUI({
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
state = drawPhase(state);

//##########################################################################################



//################################## FUNÇÕES LÓGICAS #######################################
function drawCard(state_obj){
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
        state.player.actions.drawsRemaining = 0;
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
        state.enemy.actions.drawsRemaining = 0;
    }

    return {...stats};
}



//################################## FUNÇÕES DE UI #######################################

function updateHandUI(state_obj){
    const stats = {...state_obj}; 
    drawAnimation(stats);
}

// TODO: esta animação foi "hard-coded" no momento. 
// o ideal é que ela crie o elemento flyingCard no container do deck certo,
// de modo que valores como coordenadas para animação possam ser passados, já que esta função
// deverá ser usada para ambos os decks. Do jeito que tá agora é preciso fazer um monte de trabalho repetido.

//TODO: esta animação e as demais de UI deverão ir para um arquivo só de animações.
//ambos os objetos hand: jogador e adversário, devem receber as mesmas classes dinamicamente, de acordo com o turno
//de cada jogador, e também as transformações da classe flying devem ser modificadas de acordo com isso, isto para 
//reduzir linhas de código e fazer a função ficar mais flexível. Deverá haver um sistema 
function drawAnimation(state_obj){

    if (state_obj.turn.player === 'player'){
        if (state_obj.player.actions.drawsRemaining === 0) return; // se este contador for zero, evita renderização de novos cards no DOM.
        for (let amount = 0; amount < state_obj.player.actions.drawsRemaining; amount++){
            flyingCard.classList.remove("hidden");

            // força reflow
            flyingCard.offsetHeight;

            // inicia animação
            flyingCard.classList.add("move");

            flyingCard.addEventListener("transitionend", () => {
                // cria carta definitiva na mão
                const card = document.createElement("div");
                card.className = "hoverable card";
                hand.appendChild(card);

                // esconde e reseta a animação.
                flyingCard.classList.remove("move");
                flyingCard.classList.add("hidden");
            }, {once: true});
        }

        // {once: true} evita que o evento fique acumulando no call stack, 
        // ou seja, ele é executado apenas uma vez e então removido do call stack.
        // isto evita bug de eventos duplicados a cada nova chamada.
    }
    else if (state_obj.turn.player === 'enemy'){ 
        if (state_obj.enemy.actions.drawsRemaining === 0) return;

        for (let amount = 0; amount < state_obj.enemy.actions.drawsRemaining; amount++){
            flying_c.classList.remove("hidden");

            // força reflow
            flying_c.offsetHeight;

            // inicia animação
            flying_c.classList.add("move2");

            flying_c.addEventListener("transitionend", () => {
                // cria carta definitiva na mão
                const card = document.createElement("div");
                card.className = "hoverable card";
                hand2.appendChild(card);

                // esconde e reseta a animação.
                flying_c.classList.remove("move2");
                flying_c.classList.add("hidden");
            }, {once: true});
        }
        
    }
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

Para garantir imutabilidade real:
- Criar novos arrays/objetos internos manualmente:

{
...state, 
deck: [...state.deck],
hand: [...state.hand]
}
  

Ou usar structuredClone() quando apropriado.

Regra prática:
Spread copia a estrutura externa, mas NÃO clona profundamente.
*/

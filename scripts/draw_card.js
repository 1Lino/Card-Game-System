const deck = document.querySelector('.deck-stack');
const hand = document.querySelector('.hand1');
const flyingCard = document.querySelector('.flying');

// Estes samples são só para testar a função drawCard dentro da lógica de separação de responsabilidades.
let state = {
    sample_deck: ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'],
    sample_hand: [],
    draw_amount: 5
};

// handler que controla evento de click deste elemento deck:
deck.addEventListener('click', () => {
    state = drawCard(state);
    updateHandUI(state);
    console.log(state);
});

// conceito de imutabilidade aplicado, ou seja, não se modifica o objeto diretamente dentro da função,
// mas retorna-se um novo objeto para que seja reatribuido ao objeto original.
function drawCard(state_obj){

    // se state_obj e sua propriedade sample_deck existirem (?) mas não (!) possuírem tamanho, ou seja, length = 0, então retorna
    // o mesmo objeto (pra evitar retornar undefined, que é o padrão de return);
    if (!state_obj?.sample_deck?.length) return state_obj;

    let stats = {
        ...state_obj,
        sample_deck: [...state_obj.sample_deck],
        sample_hand: [...state_obj.sample_hand]
    }; 

    // stats.sample_deck.length > 0 aqui é necessário para que não aconteça o caso de o deck esvaziar durante o loop e continuar o loop com deck vazio,
    // por exemplo: suponha que o deck tenha 1 carta, mas o número de puxadas permitidas é 2, se não houver verificação, seria puxada
    // a carta restante e mais uma 'undefined', de modo que a mão/array ficaria com objetos 'undefined'.
    for (let i = 0; i < stats.draw_amount && stats.sample_deck.length > 0; i++){
        stats.sample_hand.push(stats.sample_deck.pop());
    }
    return stats;
}

// update de UI com base nos status:
// TODO: deve ser adicionada uma lógica que faz com que a drawAnimation só seja chamada quando for permitida
// pois no estado atual, a animação ocorre toda vez que se clique no deck.
function updateHandUI(state_obj){
    const stats = {...state_obj}; 
    drawAnimation(stats);
    //alert(`Drawed ${stats.draw_amount}!\nDeck: ${stats.sample_deck}\nHand: ${stats.sample_hand}`);
}

// TODO: esta animação foi "hard-coded" no momento. 
// o ideal é que ela crie o elemento flyingCard no container do deck certo,
// de modo que valores como coordenadas para animação possam ser passados, já que esta função
// deverá ser usada para ambos os decks. Do jeito que tá agora é preciso fazer um monte de trabalho manual.
function drawAnimation(state_obj){
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

      // esconde e reseta sem animação
      flyingCard.classList.remove("move");
      flyingCard.classList.add("hidden");
    }, { once: true });
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

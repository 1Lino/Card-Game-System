// funções relacionadas à interface do jogo, como atualizações de UI, animações, etc., serão definidas aqui. As funções de UI serão chamadas pelas fases do jogo, e a game_engine irá controlar as fases, portanto, indiretamente, as funções de UI também.

const deck = document.querySelector('.deck-stack');
const deck2 = document.querySelector('.deck-stack2');
const hand = document.querySelector('.hand1');
const hand2 = document.querySelector('.hand2');
const flyingCard = document.querySelector('.flying');
const flying_c = document.querySelector('.flying2');

deck.addEventListener('click', () => {
    if (state.turn.player !== 'player') return;
    state = drawCard(state);
    updateHandUI(state);
    console.log(state);
});

export function updateHandUI(state_obj){
    const stats = {...state_obj}; 
    drawAnimation(stats);
}

// TODO: esta animação foi "hard-coded" no momento. 
// o ideal é que ela crie o elemento flyingCard no container do deck certo,
// de modo que valores como coordenadas para animação possam ser passados, já que esta função
// deverá ser usada para ambos os decks. Do jeito que tá agora é preciso fazer um monte de trabalho repetido.

//TODO:  Deverá haver um sistema 
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
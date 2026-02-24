// funções relacionadas à interface do jogo, como atualizações de UI, animações, etc., serão definidas aqui. As funções de UI serão chamadas pelas fases do jogo, e a game_engine irá controlar as fases, portanto, indiretamente, as funções de UI também.

// esse event listener pode ser reaproveitado futuramente.
/*deck.addEventListener('click', () => {
    if (state.turn.player !== 'player') return;
    state = drawCard(state);
    updateHandUI(state);
    console.log(state);
});*/

export function updateHandUI(state_obj){
    const stats = {...state_obj}; 
    drawAnimation(stats);
}

function drawAnimation(state_obj){
    const isPlayer = state_obj.turn.player === 'player';

    const flyingElement = `
        <div class="card deck-stack${isPlayer ? '' : 2} flying${isPlayer ? '' : 2} hidden">
            <div class="card-back"></div>
         </div>`;

    if (state_obj[state_obj.turn.player].actions.drawsRemaining === 0) return;

    const deck = document.querySelector(isPlayer ? '.deck-stack' : '.deck-stack2');
    const hand = document.querySelector(isPlayer ? '.hand1' : '.hand2');
    deck.insertAdjacentHTML('beforeend', flyingElement);
    const flyingCard = deck.lastElementChild;

    for (let amount = 0; amount < state_obj[state_obj.turn.player].actions.drawsRemaining; amount++){
        flyingCard.classList.remove("hidden");

        // força reflow
        flyingCard.offsetHeight;

        // inicia animação
        flyingCard.classList.add(`${isPlayer ? 'move' : 'move2'}`);

        flyingCard.addEventListener("transitionend", () => {
            // cria carta definitiva na mão
            const card = document.createElement("div");
            card.className = "hoverable card";
            hand.appendChild(card);

            // esconde e reseta a animação.
            flyingCard.classList.remove(`${isPlayer ? 'move' : 'move2'}`);
            flyingCard.classList.add("hidden");
        }, {once: true}); // once: true -> evita pilha de animações que gera bug de duplicatas.
    }
}
// funções relacionadas à interface do jogo, como atualizações de UI, animações, etc., serão definidas aqui. As funções de UI serão chamadas pelas fases do jogo, e a game_engine irá controlar as fases, portanto, indiretamente, as funções de UI também.

// esse event listener pode ser reaproveitado futuramente.
/*deck.addEventListener('click', () => {
    if (state.turn.player !== 'player') return;
    state = drawCard(state);
    updateHandUI(state);
    console.log(state);
});*/


// já que essa função é assíncrona, ela aguarda pelo retorno de uma promise, que é resolvida quando a animação de puxar o card termina. Assim, a UI só é atualizada quando a animação termina, e não antes, o que evita bugs visuais.
export async function updateHandUI(state_obj){
    await drawAnimation(state_obj);
    renderCardsToHand(state_obj);
}

// Promises ficam na microtask do execution context de JavaScript, ou seja, elas são executadas depois que o código síncrono termina de ser executado, mas antes de qualquer outra tarefa assíncrona, como setTimeout ou eventos.
function drawAnimation(state_obj){
    return new Promise((resolve) => { // retorna uma promise que é resolvida quando a animação termina, para que a função updateHandUI possa aguardar por isso antes de atualizar a UI.

        const isPlayer = state_obj.turn.player === 'player';

        const flyingElement = `
            <div class="card deck-stack${isPlayer ? '' : 2} flying${isPlayer ? '' : 2} hidden">
                <div class="card-back"></div>
            </div>`;

        const deck = document.querySelector(isPlayer ? '.deck-stack' : '.deck-stack2');
        deck.insertAdjacentHTML('beforeend', flyingElement);
        
        const flyingCard = deck.lastElementChild;

        flyingCard.classList.remove("hidden");

        // força reflow
        flyingCard.offsetHeight;

        // inicia animação
        flyingCard.classList.add(`${isPlayer ? 'move' : 'move2'}`);

        flyingCard.addEventListener("transitionend", handleTransitionEnd, {once: true});

        function handleTransitionEnd() {
            // esconde e reseta a animação.
            flyingCard.classList.remove(`${isPlayer ? 'move' : 'move2'}`);
            flyingCard.classList.add("hidden");
            flyingCard.remove();

            flyingCard.removeEventListener("transitionend", handleTransitionEnd);
            console.log("Draw animation ended, promise resolved!");
            resolve(); // resolve a promise para que a função updateHandUI possa continuar e atualizar a UI com os cards na mão.
        }
    });
}

function renderCardsToHand(state_obj){
    console.log('Received state for renderCardsToHand:', state_obj); 

    if (state_obj[state_obj.turn.player].actions.drawsRemaining === 0) return;
    
    const isPlayer = state_obj.turn.player === 'player';
    const hand = document.querySelector(isPlayer ? '.hand1' : '.hand2');

    for (let amount = 0; amount < state_obj[state_obj.turn.player].actions.drawsRemaining; amount++){
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.hoverable = "true";
        card.dataset.component = "card";
        card.dataset.owner = state_obj.turn.player;
        card.dataset.state = "in-hand";
        card.dataset.index = amount; // index do card na mão, para referência futura em interações com a UI.
        hand.appendChild(card);
        //console.log('Cards', state_obj);
        
    }

    console.log(`Cards rendered to ${isPlayer ? 'player' : 'enemy'} hand.`);
}
// funções relacionadas à interface do jogo, como atualizações de UI, animações, etc., serão definidas aqui. As funções de UI serão chamadas pelas fases do jogo, e a game_engine irá controlar as fases, portanto, indiretamente, as funções de UI também.

// já que essa função é assíncrona, ela aguarda pelo retorno de uma promise, que é resolvida quando a animação de puxar o card termina. Assim, a UI só é atualizada quando a animação termina, e não antes, o que evita bugs visuais.
export async function updateHandUI(state_obj){
    await drawAnimation(state_obj);
    renderCardsToHand(state_obj);
}

// Promises ficam na microtask do execution context de JavaScript, ou seja, elas são executadas depois que o código síncrono termina de ser executado, mas antes de qualquer outra tarefa assíncrona, como setTimeout ou eventos.
function drawAnimation(state_obj){
    return new Promise((resolve) => { // retorna uma promise que é resolvida quando a animação termina, para que a função updateHandUI possa aguardar por isso antes de atualizar a UI.

        const isPlayer = state_obj.turn.player === 'player';

        // '2', aqui, se refere às classes do adversário. Não é uma forma muito interessante de fazer essa referência, mas é simples o suficiente. Basicamente, se o jogador for o player, as classes são as do player, do contrário, são as do adversário, que terminam em 2.
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
    console.group(`Received state to render cards to ${state_obj.turn.player}'s hand: `);
    console.log(state_obj[state_obj.turn.player]); 

    if (state_obj[state_obj.turn.player].actions.drawsRemaining === 0) return;
    
    const isPlayer = state_obj.turn.player === 'player';
    const hand = document.querySelector(isPlayer ? '.hand1' : '.hand2');

    for (let amount = 0; amount < state_obj[state_obj.turn.player].actions.drawsRemaining; amount++){
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = "Card";
        card.dataset.hoverable = "true";
        card.dataset.component = "card";
        card.dataset.owner = state_obj.turn.player;
        card.dataset.state = "in-hand";
        card.dataset.index = state_obj[state_obj.turn.player].hand[amount]; // index do card na mão, para referência futura em interações com a UI.
        card.onclick = isPlayer ? () => showCardDetailOn(card, hand) : ""; 
        hand.appendChild(card);
        console.log(card);
    }

    console.log(`Cards rendered to ${isPlayer ? 'player' : 'enemy'} hand.`);
    console.groupEnd();
}

function showCardDetailOn(card, hand){
    const coordsAndDimensions = getCoordsAndDimensionsFrom(card);
    hand.appendChild(renderCardDetailPromptAt(coordsAndDimensions));
}

function getCoordsAndDimensionsFrom(card){
    const rect = card.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;
    const w = rect.width;
    const h = rect.height;
    const gap = 20;
    
    return {x, y, w, h, gap};
}

function renderCardDetailPromptAt(coordsAndDimensions){
    const {x, y, w, h, gap} = coordsAndDimensions;
    const customStyle = `
        width: ${w}px;
        height: ${h/2}px;
        left: ${x}px;
        top: ${y - 520 - gap}px;
    `;

    removePreviousDetailPrompts(); 
    
    const detailPromptBox = document.createElement("div");
    detailPromptBox.className = "promptBox";
    detailPromptBox.style = customStyle;
    detailPromptBox.dataset.component = 'promptBox';
    detailPromptBox.innerHTML = `
        <p>Details...</p>
        <p>Summon...</p>
    `;

    console.log('prompt rendered upon click!');

    return detailPromptBox;
}

export function removePreviousDetailPrompts(){
    document.querySelectorAll('[data-component="promptBox"]').forEach(prompt => {
        prompt.remove();
    });
}
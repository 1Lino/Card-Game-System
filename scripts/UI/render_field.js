
// mesma lógica de drawAnimation, só que deverá levar em consideração a ocupação dos slots de campo.
// talvez seja interessante adicionar aos slots de campo um data-occupied, pra poder mapear os espaços ocupados,
// de modo que a animação para ocorra para um espaço desocupado (ou seja, a carta sairá da mão para um slot de campo desocupado). data-occupied será true toda vez que um card entrar naquele container, e false toda vez que sair.
export async function updateFieldUI(state_obj){
    await summonAnimation(state_obj);
    renderCardsToField(state_obj);
}

function summonAnimation(state_obj){
    return new Promise((resolve) => {
        // |-- START
        const currentPlayer = state_obj.turn.player;
        const isPlayer = currentPlayer === 'player';

        // puxa o id do card usado neste turno, e então seleciona o componente/card na UI que possui este id.
        const summonedCardIndex = state_obj[currentPlayer].summonedCardId;
        const card = document.querySelector(`[data-index="${summonedCardIndex}"]`);
        

        // const flyingCard = card.cloneNode(true); // TODO: este "card" deve ser na verdade uma referência ao card que a função useCard invocou para o estado de campo/field. Basicamente, se useCard botou para campo o card "id6", este id deve ser usado para pegar o elemento que será usado nessa animação, no caso, o card da mão que corresponder a este id de estado.

        const flyingCard = card.cloneNode(true);


        flyingCard.classList.add('flying-card');
        card.insertAdjacentElement('beforeend', flyingCard); // flyingCard deve ser inserido ao DOM para que getBoundingClientRect funcione.

        // seleciona um slot vago do campo do jogador atual:
        const selectedSlot = document.querySelector(`[data-component="field"][data-owner="${currentPlayer}"][data-occupied="false"]`);
        selectedSlot.dataset.content = summonedCardIndex;

        console.log(`Card with the id of "${summonedCardIndex}" will be summoned at ${currentPlayer}'s field on the following slot:`)
        console.log(selectedSlot);

        const flyingCardPos = flyingCard.getBoundingClientRect();
        const selectedSlotPos = selectedSlot.getBoundingClientRect(); 
        const deltaX = selectedSlotPos.left - flyingCardPos.left;
        const deltaY = selectedSlotPos.top - flyingCardPos.top;

        card.style.visibility = "hidden"; // esconde o card da mão enquanto a animação ocorre.

        // isto é importante para que flyingCard não fique invisível junto ao parente card.
        flyingCard.style.visibility = "visible"; 
        
        console.log('Summon animation starts!');
        console.log(`Card leaves hand at X: ${flyingCardPos.left}\nCard goes to empty slot at X: ${selectedSlotPos.left}`);

        requestAnimationFrame(() => {
            flyingCard.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            flyingCard.style.opacity = 1;

            flyingCard.addEventListener('transitionend', () => {
                flyingCard.remove();
                console.log('Summon animation ends!');
                resolve();
            }, { once: true });
        });
        // END --|
    });
}


function renderCardsToField(state_obj){

    const currentPlayer = state_obj.turn.player;

    console.group(`Received state to render cards to ${currentPlayer}'s field: `);
    console.log(state_obj[currentPlayer]); 

    const summonedCardIndex = state_obj[currentPlayer].summonedCardId;
    const card = document.querySelector(`[data-index="${summonedCardIndex}"]`);
    
    const selectedSlot = document.querySelector(`[data-component="field"][data-owner="${currentPlayer}"][data-content="${summonedCardIndex}"]`);
    selectedSlot.replaceChildren(); // apaga todos os elementos filhos (deixa o slot vazio).

    selectedSlot.insertAdjacentElement('beforeend', card); // move o card da mão para o slot. TODO: há que se configurar perspectiva.
    card.style.visibility = "visible";  // faz o card ficar visível, já que estava invisível durante a animação.
    card.dataset.state = 'in-field'; // determina que o card agora está "em campo";
    selectedSlot.dataset.occupied = true; // uma vez terminada a animação, determina que o slot está agora ocupado.

    console.log(selectedSlot);
    console.groupEnd();

    //TODO... Depois da animação de summon, é necessário remover o card da mão do jogador e renderizar ele no slot selecionado.
}

// TODO: após as funções acima forem implementadas e testadas, considerar implementar também as de prompt, só que com configurações diferentes. No caso, o prompt dos cards no campo, na fase main, deve ser o mesmo prompt dos cards da mão, com a exceção de que que terá somente "details". Já na fase de combate, o prompt deve ser de combate, etc. Um simples if...else ou switch faz essa verificação de estado.
const cards = document.querySelectorAll(".hoverable"); 
const turnPhase = 'battlePhase';

let SELECTION_STATE = {
    selectedPlayerCardId: undefined, 
    selectedEnemyCardId: undefined,
    CARD_OWNER: {
        player: 'player-card',
        enemy: 'enemy-card'
    }
}

for (let card of cards){
    card.addEventListener("mouseover", () => onMouseOver(card, SELECTION_STATE));
    card.addEventListener("mouseout", () => onMouseOut(card));
    card.addEventListener("click", () => onMouseClick(card, cards, SELECTION_STATE));
}

function onMouseOver(node, state) {
    /*if (node.dataset.id !== state.selectedPlayerCardId && node.dataset.id !== state.selectedEnemyCardId){
            node.classList.add('onHover');
        }*/
    node.classList.add('onHover');
}
function onMouseOut(node) {
    node.classList.remove('onHover');
}
function onMouseClick(node, nodeList, state) {
    // se o card a ser selecionado é do campo do player:
        if (node.dataset.type === SELECTION_STATE.CARD_OWNER.player){
            // UI
            nodeList.forEach(node => {node.classList.remove('selected'),node.classList.remove('battleSelected')});
            node.classList.remove('onHover');
            node.classList.add('selected');
            // Logic
            SELECTION_STATE.selectedEnemyCardId = undefined;
            SELECTION_STATE.selectedPlayerCardId = node.dataset.id;
            console.log(SELECTION_STATE);
        } 

        // se existe id registrado para um card do campo do player e o card a ser selecionado é do campo inimigo:
        if (node.dataset.type === SELECTION_STATE.CARD_OWNER.enemy && SELECTION_STATE.selectedPlayerCardId){
            nodeList.forEach(node => node.classList.remove('battleSelected'));
            node.classList.remove('onHover');
            node.classList.add('battleSelected');

            SELECTION_STATE.selectedEnemyCardId = node.dataset.id;
            console.log(SELECTION_STATE);
        }
}
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

// eventos e handlers:
// TODO: é possível refatorar para eliminar estas repetições de chamadas, embora não seja necessário aqui.
document.body.addEventListener('mouseover', node => selectField(node, 'mouseover'));
document.body.addEventListener('mouseout', node => selectField(node, 'mouseout'));
document.body.addEventListener('click', node => selectField(node, 'click'));

// TODO: o uso de closest('.hoverable') é vulnerável, pois uma vez que o elemento não possua tal classe, a UI quebra.
// melhor é usar algum tipo de identificador para acessar o estado do campo, e então definir se o campo é hoverable ou 
// a partir de lógica de estado, não de regras de estilo. 
// Também a seleção de itens deve ocorrer por dataset.id, não por classe.
function selectField(node, event){
    if(node.target.closest('.hoverable')){
        switch (event){
            case 'mouseover':
                onMouseOver(node.target);
                break;
            case 'mouseout':
                onMouseOut(node.target);
                break;
            case 'click':
                //TODO
                break;
            default:
                break;
        }
    }
}

function onMouseOver(node) {
    node.classList.add('onHover');
}

function onMouseOut(node) {
    node.classList.remove('onHover');
}

// por hora, neste projeto, ainda não há um "type" implícito em cada card. Deverá haver somente para alguns cards
// que estejam já em campo.
function onMouseClick(node, nodeList, state) {
    // se o card a ser selecionado é do campo do player:
        if (node.dataset.type === state.CARD_OWNER.player){
            // UI
            nodeList.forEach(node => {node.classList.remove('selected'),node.classList.remove('battleSelected')});
            node.classList.remove('onHover');
            node.classList.add('selected');
            // Logic
            state.selectedEnemyCardId = undefined;
            state.selectedPlayerCardId = node.dataset.id;
            console.log(state);
        } 

        // se existe id registrado para um card do campo do player e o card a ser selecionado é do campo inimigo:
        if (node.dataset.type === state.CARD_OWNER.enemy && state.selectedPlayerCardId){
            nodeList.forEach(node => node.classList.remove('battleSelected'));
            node.classList.remove('onHover');
            node.classList.add('battleSelected');

            state.selectedEnemyCardId = node.dataset.id;
            console.log(state);
        }
}


// TODO Estes eventos aqui devem ir pra game_engine, e selectField deve ser exportada para lá.
// importante lembrar que os eventos não deverão definir UI diretamente, mas apenas definir os parâmetros de estado
// para que as funções de UI realizem o trabalho.
document.body.addEventListener('mouseover', node => selectField(node, 'mouseover'));
document.body.addEventListener('mouseout', node => selectField(node, 'mouseout'));
document.body.addEventListener('click', node => selectField(node, 'click'));

// TODO: isto aqui é provisório pra testes. game_state deve controlar isso através dos parâmetros da propriedade "selection".
let isSelected = false;

function selectField(node, event, selectionState){
   
   if(node.target.dataset.hoverable){
        switch (event){
            case 'mouseover':
                onMouseOver(node.target);
                break;
            case 'mouseout':
                onMouseOut(node.target);
                break;
            case 'click':
                isSelected = setSelectionState(isSelected);
                onMouseClick(node.target, isSelected);
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

function onMouseClick(node, isSelected) {

    if (node.dataset.owner === 'player' &&
        node.dataset.component === 'card' && 
        node.dataset.state === 'in-hand' 
        ){
        // testes
        node.innerHTML = `Card: ${node.dataset.index}`;
        console.log(`Clicked on card with id of ${node.dataset.index}.`);
        console.log(`Is selected: ${isSelected}.`);
        // testes
    }
}

function setSelectionState(selectionState){
    const newSelectionState = !selectionState;
    return newSelectionState;
}
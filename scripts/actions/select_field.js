document.body.addEventListener('mouseover', node => selectField(node, 'mouseover'));
document.body.addEventListener('mouseout', node => selectField(node, 'mouseout'));
document.body.addEventListener('click', node => selectField(node, 'click'));

// TODO: usar data-hoverable ao invés de class hoverable, pra evitar que haja mistura de responsabilidades entre o css e o js, ou seja, o css não precisa saber que existe um comportamento de hover, e o js não precisa saber que a classe é 'hoverable', basta usar data-hoverable em ambos os casos.
function selectField(node, event){
   if(node.target.dataset.hoverable){
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

function onMouseClick(node) {
    //TODO
}
import { getGameState } from "../engine/game_state.js";


export function handleMouseEvent(node, event, state_obj){
   
   if(node.target.dataset.hoverable){
        switch (event){
            case 'mouseover':
                hoverAnimation(node.target, state_obj);
                break;
            case 'mouseout':
                hoverAnimation(node.target, state_obj);
                break;
            case 'click':
                onMouseClick(node.target, state_obj);
                break;
            default:
                break;
        }
    }
}

export function toggleMouseEventState(state_obj, event){
    const state = getGameState(state_obj);
    state.event[event] = !state.event[event];
    return state;
}

function hoverAnimation(node, state_obj){
    console.log(`Hover on ${node.dataset.owner}'s ${node.dataset.component}: ${state_obj.event.hover}`);

    if (state_obj.event.hover)
        node.classList.add('onHover');
    else 
        node.classList.remove('onHover');
}

// TODO: ao clicar num card, suas informações devem ser enviadas para o estado, para que se saiba qual card atual está
// selecionado. Na fase de batalha, uma lógica a mais deve ser elaborada.
function onMouseClick(node, state_obj) {

    // teste
    document.querySelectorAll('[data-hoverable][data-component="card"]').forEach(el => {
        el.innerHTML = '';
    })

    if (node.dataset.owner === 'player' &&
        node.dataset.component === 'card' && 
        node.dataset.state === 'in-hand' 
        ){
        // testes
        node.innerHTML = `Card: ${node.dataset.index}`;
        console.log(`Clicked on card with id of ${node.dataset.index}.`);
        console.log(`Is selected: ${state_obj.event.click}.`);
        // testes
    } 
}
import { removePreviousOptionsPrompts } from "/scripts/UI/render_hand.js"; // NOTA: importação temporária, enquanto removePreviousOptionsPrompts não vem para cá.

export function showPromptOn(renderFunction) {
  const board = document.querySelector(".card-board");
  const boardDimensions = board.getBoundingClientRect();
  board.appendChild(renderFunction(boardDimensions)); // onde "renderFunction" é uma função que pode ser renderCardDetailsPrompt ou alguma outra função que renderiza prompts.
}

export function renderCardDetailsPromptOn(boardDimensions) {
  const promptWidth = boardDimensions.width / 3;
  const promptHeight = boardDimensions.height / 3;

  const customStyle = `
        width: ${promptWidth}px;
        height: ${promptHeight}px;
        left: ${(boardDimensions.width - promptWidth) / 2}px;
        top: ${boardDimensions.height / 4}px; 
        pointer-events: auto;
        background-color: gray;
    `;

  //   removePreviousOptionsPrompts();
  console.log("Clicked on details... the prompt should show up now");

  const detailPromptBox = document.createElement("div");
  detailPromptBox.className = "promptBox";
  detailPromptBox.style = customStyle;
  detailPromptBox.dataset.component = "promptBox";

  // TODO 1: Nos detalhes do card, deve ser puxado o id do card, para que então a base de dados seja acessada por aquele id, via interface, para puxar os detalhes sobre o card. Deve ser criada uma interface só para isso, para que código de UI não acesse dados diretamente, mas apenas por meio de interfaces.
  detailPromptBox.innerHTML = `
        <h1>Details of the card</h1>
        <p>This card does x when summoned. If this card is destroyed, do y.</p>
    `;

  console.log("prompt rendered upon click!");

  return detailPromptBox;
}

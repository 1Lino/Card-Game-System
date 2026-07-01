// o valor de cada "data-" deve ser definido neste objeto, para fins de manutenção.
// qualquer alteração deve ser feita aqui e não no HTML, para evitar bugs relacionados a erros de digitação ou inconsistências.
const TOKEN = {
    dataComponent: {
        hand: 'hand',
        deck: 'deck',
        stack: 'card-stack',
        field: 'field',
        graveyard: 'graveyard',
        status: 'status',
        turnIndicator: 'turn-indicator',
        phaseIndicator: 'phase-indicator',
        turnCount: 'turn-count',
        hpBar: 'hp-bar'
    },
    dataOwner: {player: 'player', enemy: 'enemy'},
    dataHoverable: true,
    dataPhase: {draw: 'draw', main: 'main', battle: 'battle', end: 'end'},
    dataOccupied: {
        true: true,
        false: false
    },
    dataContent: "" // refere-se ao id do conteúdo contido num slot de campo. Por padrão, é uma string vazia.
};

// Object.freeze é usado para garantir que o objeto TOKEN e suas propriedades não sejam modificados acidentalmente em outras partes do código, o que ajuda a manter a consistência e evitar bugs relacionados a alterações inesperadas. 
// vale lembrar que 'const' não garante imutabilidade de objetos, apenas impede a reatribuição da variável.
Object.freeze(TOKEN);
Object.freeze(TOKEN.dataComponent);
Object.freeze(TOKEN.dataOwner);
Object.freeze(TOKEN.dataPhase);
Object.freeze(TOKEN.dataOccupied);

export function GameBoard() {
    return `
        <div class="status">
            <div class="player-status" data-component="${TOKEN.dataComponent.hpBar}" data-owner="${TOKEN.dataOwner.player}">Player - HP: 100</div>
            <div class="turn" data-component="${TOKEN.dataComponent.turnCount}">Turn 1</div>
            <div class="enemy-status" data-component="${TOKEN.dataComponent.hpBar}" data-owner="${TOKEN.dataOwner.enemy}">HP: 100 - Enemy</div>
        </div>

        <div class="card-board"> 

            <div class="flat-perspective hand1" data-component="${TOKEN.dataComponent.hand}" data-owner="${TOKEN.dataOwner.player}">
                
            </div>

            <div class="flat-perspective hand2" data-component="${TOKEN.dataComponent.hand}" data-owner="${TOKEN.dataOwner.enemy}">
        
            </div>

            <div class="third-perspective"> 

                <div class="board-in-perspective">
                    <div class="grid status1" data-component="${TOKEN.dataComponent.status}" data-owner="${TOKEN.dataOwner.player}"></div>

                    <div class="grid status2" data-component="${TOKEN.dataComponent.status}" data-owner="${TOKEN.dataOwner.enemy}"></div>

                    <div class="grid deck1" data-component="${TOKEN.dataComponent.deck}" data-owner="${TOKEN.dataOwner.player}">
                        <div class="card-slot no-pointer">
                            <div class="card deck-stack" data-component="${TOKEN.dataComponent.stack}" data-hoverable="${TOKEN.dataHoverable}" data-owner="${TOKEN.dataOwner.player}">
                                <div class="card-back"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid deck2" data-component="${TOKEN.dataComponent.deck}" data-owner="${TOKEN.dataOwner.enemy}">
                        <div class="card-slot no-pointer">
                            <div class="card deck-stack2" data-component="${TOKEN.dataComponent.stack}" data-hoverable="${TOKEN.dataHoverable}" data-owner="${TOKEN.dataOwner.enemy}">
                                <div class="card-back"></div>
                            </div>
                         </div>
                    </div>

                    <div class="grid grave1">
                        <div class="card-slot" data-component="${TOKEN.dataComponent.graveyard}" data-owner="${TOKEN.dataOwner.player}" data-hoverable="${TOKEN.dataHoverable}">Graveyard1</div>
                    </div>

                    <div class="grid grave2">
                        <div class="card-slot" data-component="${TOKEN.dataComponent.graveyard}" data-owner="${TOKEN.dataOwner.enemy}" data-hoverable="${TOKEN.dataHoverable}">Graveyard2</div>
                    </div>

                    <div class="grid field1">
                        <div class="card-slot" data-component="${TOKEN.dataComponent.field}" data-owner="${TOKEN.dataOwner.player}" data-hoverable="${TOKEN.dataHoverable}" data-occupied="${TOKEN.dataOccupied.false}" data-content="${TOKEN.dataContent}">Field1</div>
                        <div class="card-slot" data-component="${TOKEN.dataComponent.field}" data-owner="${TOKEN.dataOwner.player}" data-hoverable="${TOKEN.dataHoverable}" data-occupied="${TOKEN.dataOccupied.false}" data-content="${TOKEN.dataContent}">Field1</div>
                        <div class="card-slot" data-component="${TOKEN.dataComponent.field}" data-owner="${TOKEN.dataOwner.player}" data-hoverable="${TOKEN.dataHoverable}" data-occupied="${TOKEN.dataOccupied.false}" data-content="${TOKEN.dataContent}">Field1</div>
                    </div>

                    <div class="grid field2">
                        <div class="card-slot" data-component="${TOKEN.dataComponent.field}" data-owner="${TOKEN.dataOwner.enemy}" data-hoverable="${TOKEN.dataHoverable}" data-occupied="${TOKEN.dataOccupied.false}" data-content="${TOKEN.dataContent}">Field2</div>
                        <div class="card-slot" data-component="${TOKEN.dataComponent.field}" data-owner="${TOKEN.dataOwner.enemy}" data-hoverable="${TOKEN.dataHoverable}" data-occupied="${TOKEN.dataOccupied.false}" data-content="${TOKEN.dataContent}">Field2</div>
                        <div class="card-slot" data-component="${TOKEN.dataComponent.field}" data-owner="${TOKEN.dataOwner.enemy}" data-hoverable="${TOKEN.dataHoverable}" data-occupied="${TOKEN.dataOccupied.false}" data-content="${TOKEN.dataContent}">Field2</div>
                    </div>

                    <div class="grid phases">

                        <div class="turn-indicator1" data-component="${TOKEN.dataComponent.turnIndicator}" data-owner="${TOKEN.dataOwner.player}">Player 1</div>

                        <div class="phase-indicator" data-component="${TOKEN.dataComponent.phaseIndicator}">
                            <div class="phase" data-phase="${TOKEN.dataPhase.draw}">Draw</div>
                            <div class="phase" data-phase="${TOKEN.dataPhase.main}">Main</div>
                            <div class="phase" data-phase="${TOKEN.dataPhase.battle}">Battle</div>
                            <div class="phase" data-phase="${TOKEN.dataPhase.end}">End</div>
                        </div>

                        <div class="turn-indicator2" data-component="${TOKEN.dataComponent.turnIndicator}" data-owner="${TOKEN.dataOwner.enemy}">Player 2</div>

                    </div>
                </div>
            </div>
        </div>
    </div> 
    `;
}
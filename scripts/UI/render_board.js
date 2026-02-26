export function GameBoard() {
    return `
        <div class="status">
            <div class="player-status">Player - HP: 100</div>
            <div class="turn">Turn 1</div>
            <div class="enemy-status">HP: 100 - Enemy</div>
        </div>

        <div class="card-board"> 

            <!-- 1: player; 2: enemy -->
            <div class="flat-perspective hand1">
                
            </div>

            <div class="flat-perspective hand2">
        
            </div>

            <div class="third-perspective"> 

                <div class="board-in-perspective">
                    <div class="place status1"></div>

                    <div class="place status2"></div>

                    <div class="place fields deck1" >
                        <div class="card-place" style="pointer-events: none;">
                            <div class="card deck-stack" data-hoverable="true">
                                <div class="card-back"></div>
                            </div>
                        </div>
                    </div>

                    <div class="place fields deck2">
                    <div class="card-place" style="pointer-events: none;">
                            <div class="card deck-stack2" data-hoverable="true">
                                <div class="card-back" style="pointer-events: none;"></div>
                            </div>
                    </div>
                    </div>

                    <div class="place fields grave1">
                        <div class="card-place" data-hoverable="true">Graveyard1</div>
                    </div>

                    <div class="place fields grave2">
                        <div class="card-place" data-hoverable="true">Graveyard2</div>
                    </div>

                    <div class="place fields field1">
                        <div class="card-place" data-hoverable="true">Field1</div>
                        <div class="card-place" data-hoverable="true">Field1</div>
                        <div class="card-place" data-hoverable="true">Field1</div>
                    </div>

                    <div class="place fields field2">
                        <div class="card-place" data-hoverable="true">Field2</div>
                        <div class="card-place" data-hoverable="true">Field2</div>
                        <div class="card-place" data-hoverable="true">Field2</div>
                    </div>

                    <div class="place phases">
                        <div class="turn-indicator1">Player 1</div>
                        <div class="phase-indicator">
                            <div class="phase draw-phase">Draw</div>
                            <div class="phase main-phase">Main</div>
                            <div class="phase battle-phase">Battle</div>
                            <div class="phase end-phase">End</div>
                        </div>
                        <div class="turn-indicator2">Player 2</div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    `;
}
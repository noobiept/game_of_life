var G = {
    CANVAS: null,
    STAGE: null,
    MAP: [],
    SIZE: 20,
    COUNT_TIME: 0,
    UPDATE_TIME: 300,
    INIT_PHASE: true
};

window.onload = function()
{
G.CANVAS = document.querySelector( '#MainCanvas' );
G.STAGE = new createjs.Stage( G.CANVAS );

var canvasSize = G.SIZE * Square.SIZE;

G.CANVAS.width = canvasSize;
G.CANVAS.height = canvasSize;

G.INIT_PHASE = true;

for (var column = 0 ; column < G.SIZE ; column++)
    {
    G.MAP[ column ] = [];

    for (var line = 0 ; line < G.SIZE ; line++)
        {
        G.MAP[ column ][ line ] = new Square( column, line );
        }
    }

GameMenu.init();

createjs.Ticker.on( 'tick', tick );
};


function setGridSize( size )
{
clearGame();

var column, line;

    // clear the current map
for (column = 0 ; column < G.SIZE ; column++)
    {
    for (line = 0 ; line < G.SIZE ; line++)
        {
        G.MAP[ column ][ line ].remove();
        }
    }

G.MAP.length = 0;

    // init. the map with the new size
G.SIZE = size;

for (column = 0 ; column < G.SIZE ; column++)
    {
    G.MAP[ column ] = [];

    for (line = 0 ; line < G.SIZE ; line++)
        {
        G.MAP[ column ][ line ] = new Square( column, line );
        }
    }
}



function startGame()
{
G.INIT_PHASE = false;

for (var column = 0 ; column < G.SIZE ; column++)
    {
    for (var line = 0 ; line < G.SIZE ; line++)
        {
        G.MAP[ column ][ line ].removeClickEvent();
        }
    }
}


function updateGame()
{
var change = [];

for (var column = 0 ; column < G.SIZE ; column++)
    {
    for (var line = 0 ; line < G.SIZE ; line++)
        {
        var square = G.MAP[ column ][ line ];

        var howMany = howManyAliveNeighbors( square );

        if ( square.isAlive )
            {
            if ( howMany <= 1 || howMany >= 4 )
                {
                change.push({ square: square, setAlive: false });
                }
            }

        else
            {
            if ( howMany === 3 )
                {
                change.push({ square: square, setAlive: true } );
                }
            }
        }
    }


for (var a = 0 ; a < change.length ; a++)
    {
    change[ a ].square.setAlive( change[ a ].setAlive );
    }
}


function clearGame()
{
G.INIT_PHASE = true;

for (var column = 0 ; column < G.SIZE ; column++)
    {
    for (var line = 0 ; line < G.SIZE ; line++)
        {
        var square = G.MAP[ column ][ line ];

        square.setAlive( false );
        square.addClickEvent();
        }
    }

GameMenu.reset();
}


function howManyAliveNeighbors( square )
{
var howMany = 0;


var startColumn = square.column - 1;

if ( startColumn < 0 )
    {
    startColumn = 0;
    }

var startLine = square.line - 1;

if ( startLine < 0 )
    {
    startLine = 0;
    }

var endColumn = square.column + 1;

if ( endColumn > G.SIZE - 1 )
    {
    endColumn = square.column;
    }

var endLine = square.line + 1;

if ( endLine > G.SIZE - 1 )
    {
    endLine = square.line;
    }

for (var column = startColumn ; column <= endColumn ; column++)
    {
    for (var line = startLine ; line <= endLine ; line++)
        {
        var otherSquare = G.MAP[ column ][ line ];

        if ( otherSquare !== square )
            {
            if ( G.MAP[ column ][ line ].isAlive )
                {
                howMany++;
                }
            }
        }
    }

return howMany;
}



function tick( event )
{
if ( !G.INIT_PHASE )
    {
    G.COUNT_TIME += event.delta;

    if ( G.COUNT_TIME > G.UPDATE_TIME )
        {
        G.COUNT_TIME = 0;

        GameMenu.update( event );
        updateGame();
        }
    }

G.STAGE.update();
}
var G = {
    CANVAS: null,
    STAGE: null,
    MAP: [],
    COLUMNS: 20,
    LINES: 20,
    COUNT_TIME: 0,
    UPDATE_TIME: 500,
    INIT_PHASE: true
};

window.onload = function()
{
G.CANVAS = document.querySelector( '#canvas' );
G.STAGE = new createjs.Stage( G.CANVAS );

G.CANVAS.width = 800;
G.CANVAS.height = 600;

G.INIT_PHASE = true;

for (var a = 0 ; a < G.COLUMNS ; a++)
    {
    G.MAP[ a ] = [];

    for (var b = 0 ; b < G.LINES ; b++)
        {
        G.MAP[ a ][ b ] = new Square( a, b );
        }
    }


var start = document.querySelector( '#start' );

start.onclick = function()
    {
    if ( G.INIT_PHASE )
        {
        startGame();
        }
    };


createjs.Ticker.on( 'tick', tick );
};




function startGame()
{
G.INIT_PHASE = false;

for (var column = 0 ; column < G.COLUMNS ; column++)
    {
    for (var line = 0 ; line < G.LINES ; line++)
        {
        G.MAP[ column ][ line ].removeClickEvent();
        }
    }
}


function updateGame()
{
var change = [];

for (var column = 0 ; column < G.COLUMNS ; column++)
    {
    for (var line = 0 ; line < G.LINES ; line++)
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

if ( endColumn > G.COLUMNS - 1 )
    {
    endColumn = square.column;
    }

var endLine = square.line + 1;

if ( endLine > G.LINES - 1 )
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

        updateGame();
        }
    }

G.STAGE.update();
}
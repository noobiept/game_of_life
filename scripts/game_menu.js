(function(window)
{
function GameMenu()
{

}

var START = null;
var START_TEXT = [ 'Working.', 'Working..', 'Working...' ];
var START_POSITION = 0;

GameMenu.init = function()
{
var start = document.querySelector( '#start' );

start.onclick = function()
    {
    if ( G.INIT_PHASE )
        {
        startGame();
        }
    };

var reset = document.querySelector( '#reset' );

reset.onclick = function()
    {
    clearGame();
    };


START = start;
};


GameMenu.update = function( event )
{
START.innerHTML = START_TEXT[ START_POSITION ];

START_POSITION++;

if ( START_POSITION >= START_TEXT.length )
    {
    START_POSITION = 0;
    }
};

GameMenu.reset = function()
{
START.innerHTML = 'Start';
};


window.GameMenu = GameMenu;

}(window));
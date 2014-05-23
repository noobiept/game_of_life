(function(window)
{
var SIZE = 20;

function Square( column, line )
{
var shape = new createjs.Shape();

this.shape = shape;
this.column = column;
this.line = line;

this.addClickEvent();
this.setAlive( false );
this.setPosition( column, line );

G.STAGE.addChild( shape );
}

Square.prototype.setPosition = function( column, line )
{
this.shape.x = column * SIZE;
this.shape.y = line * SIZE;
};

Square.prototype.removeClickEvent = function()
{
this.shape.off( 'click', this.click_f );
};

Square.prototype.addClickEvent = function()
{
var _this = this;

this.click_f = this.shape.on( 'click', function() { _this.setAlive( !_this.isAlive ) }, this );
};


Square.prototype.setAlive = function( yes )
{
var g = this.shape.graphics;

g.clear();

if ( yes )
    {
    g.beginFill( 'black' );

    this.isAlive = true;
    }

else
    {
    g.beginFill( 'rgb(243, 243, 243)' );

    this.isAlive = false;
    }

g.drawRoundRect( 0, 0, SIZE, SIZE, 5 );
};


window.Square = Square;

}(window));
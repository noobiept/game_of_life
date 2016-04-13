/*global createjs, G*/
'use strict';


function Square( column, line )
{
var shape = new createjs.Shape();

this.shape = shape;
this.column = column;
this.line = line;

this.setAlive( false );
this.setPosition( column, line );

G.STAGE.addChild( shape );
}

Square.SIZE = 20;


Square.prototype.setPosition = function( column, line )
{
this.shape.x = column * Square.SIZE;
this.shape.y = line * Square.SIZE;
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

g.drawRoundRect( 0, 0, Square.SIZE, Square.SIZE, 5 );
};


Square.prototype.remove = function()
{
G.STAGE.removeChild( this.shape );
};

/*global startGame, G, clearGame, setGridSize*/
'use strict'

var GameMenu
;(function (GameMenu) {
    var START = null
    var START_TEXT = ['Working.', 'Working..', 'Working...']
    var START_POSITION = 0

    GameMenu.init = function () {
        var start = document.querySelector('#Start')

        start.onclick = function () {
            if (G.INIT_PHASE) {
                startGame()
            }
        }

        var reset = document.querySelector('#Reset')

        reset.onclick = function () {
            clearGame()
        }

        var size = document.querySelector('#Size')
        var sizeValue = document.querySelector('#SizeValue')

        sizeValue.innerHTML = G.SIZE

        size.value = G.SIZE
        size.onchange = function () {
            setGridSize(size.value)

            sizeValue.innerHTML = size.value
        }

        START = start
    }

    GameMenu.update = function (event) {
        START.innerHTML = START_TEXT[START_POSITION]

        START_POSITION++

        if (START_POSITION >= START_TEXT.length) {
            START_POSITION = 0
        }
    }

    GameMenu.reset = function () {
        START.innerHTML = 'Start'
    }
})(GameMenu || (GameMenu = {}))

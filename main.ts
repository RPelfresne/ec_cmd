radio.onReceivedString(function (receivedString) {
    if (receivedString == "B") {
        etat_suivant = 1
    } else if (receivedString == "R" && etat == 9) {
        etat_suivant = 2
    } else if (receivedString == "S") {
        etat_suivant = 3
    } else if (receivedString == "A") {
        etat_suivant = 4
    }
})
let etat_suivant = 0
let etat = 0
radio.setGroup(1)
etat = 0
etat_suivant = 0
basic.showIcon(IconNames.SmallDiamond)
basic.forever(function () {
    etat = etat_suivant
    if (etat == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . #
            `)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . #
            . . . . #
            `)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . #
            . . . . #
            . . . . #
            `)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            `)
        basic.pause(500)
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            `)
        basic.pause(500)
        etat = 9
    } else if (etat == 2) {
        basic.showLeds(`
            . . . # #
            . . . # #
            . . . # #
            . . . # #
            . . . # #
            `)
        etat = 0
    } else if (etat == 3) {
        basic.showLeds(`
            . . # . #
            . . # . #
            . . # . #
            . . # . #
            . . # . #
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (etat == 4) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})

radio.onReceivedString(function (receivedString) {
    msg = receivedString
})
let msg_lu = ""
let etat_suivant = 0
let etat = 0
let msg = ""
let monteeFinie = 0
radio.setGroup(1)
let nbLeds = 133
let dureeMontee = 20000
let strip = neopixel.create(DigitalPin.P1, nbLeds, NeoPixelMode.RGB)
let pauseEntreLeds = dureeMontee / nbLeds
basic.pause(100)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
basic.pause(100)
strip.setBrightness(40)
basic.pause(100)
strip.show()
basic.pause(100)
basic.forever(function () {
    etat = etat_suivant
    msg_lu = msg
    if (etat == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(200)
        strip.show()
        basic.pause(500)
        radio.sendString("DB")
        for (let index = 0; index < nbLeds; index++) {
            strip.shift(1)
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
            basic.pause(100)
            strip.show()
            basic.pause(pauseEntreLeds)
        }
        monteeFinie = 1
    } else if (etat == 2) {
        radio.sendString("FB")
    } else if (etat == 3) {
        radio.sendString("DR")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(200)
        strip.show()
        basic.pause(2000)
    } else if (etat == 4) {
        for (let index = 0; index < 5; index++) {
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            basic.pause(100)
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
            basic.pause(100)
        }
    } else if (etat == 5) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(200)
        strip.show()
        basic.pause(2000)
    } else {
    	
    }
    if (etat == 0 && msg_lu == "B") {
        etat_suivant = 1
    } else if (etat == 1) {
        etat_suivant = 2
    } else if (etat == 2 && msg_lu == "R") {
        etat_suivant = 3
    } else if (etat == 3 && msg_lu == "S") {
        etat_suivant = 4
    } else if (etat == 4 && msg_lu == "A") {
        etat_suivant = 5
    } else {
    	
    }
})

radio.onReceivedString(function (receivedString) {
    msg = receivedString
})
let PauseAlea = 0
let etat_suivant = 0
let etat = 0
let msg_lu = ""
let msg = ""
radio.setGroup(1)
let nbLeds = 132
let dureeMontee = 11000
let delai_rouge = 60000
let debut_rouge = 0
let strip = neopixel.create(DigitalPin.P1, nbLeds, NeoPixelMode.RGB)
let pauseEntreLeds = dureeMontee / nbLeds
let _millis = control.millis()
basic.pause(100)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
basic.pause(200)
strip.setBrightness(40)
basic.pause(200)
strip.show()
basic.pause(100)
radio.sendString("I")
basic.showIcon(IconNames.SmallDiamond)
basic.forever(function () {
    msg_lu = ""
    etat = etat_suivant
    msg_lu = msg
    msg = ""
    _millis = control.millis()
    if (etat == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(10)
        strip.show()
        basic.pause(10)
        for (let index = 0; index < nbLeds; index++) {
            strip.shift(1)
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
            basic.pause(50)
            strip.show()
            basic.pause(pauseEntreLeds)
        }
    } else if (etat == 2) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        strip.show()
    } else if (etat == 3) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(10)
        strip.show()
    } else if (etat == 4) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(10)
        strip.show()
    } else if (etat == 5) {
        for (let index = 0; index < 10; index++) {
            PauseAlea = randint(20, 200)
            strip.setBrightness(PauseAlea)
            PauseAlea = randint(50, 100)
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            basic.pause(PauseAlea)
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
            PauseAlea = randint(100, 500)
            basic.pause(PauseAlea)
        }
    } else if (etat == 6) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(10)
        strip.show()
        basic.pause(2000)
    }
    if (etat == 0) {
        if (msg_lu == "B") {
            etat_suivant = 1
            radio.sendString("DB")
        }
    } else if (etat == 1) {
        etat_suivant = 2
        radio.sendString("FB")
    } else if (etat == 2) {
        if (msg_lu == "LR") {
            etat_suivant = 3
            radio.sendString("DR")
            debut_rouge = _millis
        }
    } else if (etat == 3) {
        if (_millis - debut_rouge >= delai_rouge) {
            etat_suivant = 4
            radio.sendString("FLR")
        }
    } else if (etat == 4) {
        if (msg_lu == "SR") {
            etat_suivant = 5
            radio.sendString("ST")
        }
    } else if (etat == 5) {
        if (msg_lu == "A") {
            etat_suivant = 6
        }
    } else if (etat == 6) {
    	
    }
})

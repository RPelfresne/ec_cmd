radio.onReceivedString(function (receivedString) {
    msg = receivedString
})
let PauseAlea = 0
let SW_ST = 0
let msg_lu = ""
let etat_suivant = 0
let etat = 0
let msg = ""
radio.setGroup(1)
let nbLeds = 133
let dureeMontee = 10000
let delai_rouge = 5000
let debut_rouge = 0
let strip = neopixel.create(DigitalPin.P1, nbLeds, NeoPixelMode.RGB)
let pauseEntreLeds = dureeMontee / nbLeds
let _millis = control.millis()
basic.pause(100)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
basic.pause(100)
strip.setBrightness(40)
basic.pause(100)
strip.show()
basic.pause(100)
radio.sendString("I")
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {
    etat = etat_suivant
    msg_lu = msg
    _millis = control.millis()
    if (etat == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(10)
        strip.show()
        basic.pause(10)
        radio.sendString("DB")
        for (let index = 0; index < nbLeds; index++) {
            strip.shift(1)
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
            basic.pause(50)
            strip.show()
            basic.pause(pauseEntreLeds)
        }
    } else if (etat == 2) {
        radio.sendString("FB")
    } else if (etat == 3) {
        radio.sendString("DR")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(20)
        strip.show()
    } else if (etat == 4) {
        radio.sendString("FLR")
    } else if (etat == 5) {
        if (SW_ST == 0) {
            radio.sendString("ST")
            SW_ST = 1
        }
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
        basic.pause(200)
        strip.show()
        basic.pause(2000)
    } else {
    	
    }
    if (etat == 0) {
        if (msg_lu == "B") {
            basic.showNumber(etat)
            etat_suivant = 1
        }
    } else if (etat == 1) {
        basic.showNumber(etat)
        etat_suivant = 2
    } else if (etat == 2) {
        basic.showNumber(etat)
        etat_suivant = 3
        debut_rouge = _millis
    } else if (etat == 3) {
        basic.showNumber(etat)
        if (_millis - debut_rouge >= delai_rouge) {
            etat_suivant = 4
            basic.showString("FLR")
        }
    } else if (etat == 4) {
        basic.showNumber(etat)
        if (msg_lu == "SR") {
            etat_suivant = 5
        }
    } else if (etat == 5) {
        if (msg_lu == "A") {
            etat_suivant = 6
        }
    } else if (etat == 6) {
        basic.showNumber(etat)
    }
})

def on_received_string(receivedString):
    global msg
    msg = receivedString
radio.on_received_string(on_received_string)

msg_lu = ""
msg = ""
radio.set_group(1)
etat_suivant = 0
etat = 0
nbLeds = 133
dureeMontee = 20000
strip = neopixel.create(DigitalPin.P1, nbLeds, NeoPixelMode.RGB)
pauseEntreLeds = dureeMontee / nbLeds
basic.pause(100)
strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
basic.pause(100)
strip.set_brightness(40)
basic.pause(100)
strip.show()
basic.pause(100)

def on_forever():
    global etat, msg_lu, etat_suivant
    etat = etat_suivant
    msg_lu = msg
    if etat == 1:
        strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
        basic.pause(200)
        strip.show()
        basic.pause(2000)
        for index in range(pauseEntreLeds):
            strip.shift(1)
            strip.set_pixel_color(0, neopixel.colors(NeoPixelColors.BLUE))
            basic.pause(100)
            strip.show()
            basic.pause(100)
    elif etat == 2:
        pass
    elif etat == 3:
        strip.show_color(neopixel.colors(NeoPixelColors.RED))
        basic.pause(200)
        strip.show()
        basic.pause(2000)
    elif etat == 4:
        for index2 in range(5):
            strip.show_color(neopixel.colors(NeoPixelColors.WHITE))
            basic.pause(100)
            strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
            basic.pause(100)
    elif etat == 5:
        strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
        basic.pause(200)
        strip.show()
        basic.pause(2000)
    else:
        pass
    if etat == 0 and msg_lu == "B":
        etat_suivant = 1
    elif etat == 1:
        etat_suivant = 2
    elif etat == 2 and msg_lu == "R":
        etat_suivant = 3
    elif etat == 3 and msg_lu == "S":
        etat_suivant = 4
    elif etat == 4 and msg_lu == "A":
        etat_suivant = 5
    else:
        pass
basic.forever(on_forever)

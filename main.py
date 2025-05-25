nbLeds = 133
strip = neopixel.create(DigitalPin.P1, nbLeds, NeoPixelMode.RGB)
strip.set_brightness(50)
basic.show_icon(IconNames.YES)

def on_forever():
    strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
    basic.pause(100)
    strip.show()
    basic.pause(5000)
    strip.show_color(neopixel.colors(NeoPixelColors.BLUE))
    basic.pause(100)
    strip.show()
    basic.pause(5000)
    strip.show_color(neopixel.colors(NeoPixelColors.RED))
    basic.pause(100)
    strip.show()
    basic.pause(5000)
basic.forever(on_forever)

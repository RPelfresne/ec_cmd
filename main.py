def on_received_string(receivedString):
    basic.show_string(receivedString)
radio.on_received_string(on_received_string)

radio.set_group(1)
basic.show_icon(IconNames.SMALL_DIAMOND)

def on_forever():
    pass
basic.forever(on_forever)

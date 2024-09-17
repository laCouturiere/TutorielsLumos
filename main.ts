radio.onReceivedNumber(function (receivedNumber) {
    if ((0 as any) == (1 as any)) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    }
    if (receivedNumber == 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.showLeds(`
            . # # # .
            # # # . #
            # # . . .
            # # # . #
            . # # # .
            `)
    }
})
input.onButtonPressed(Button.A, function () {
    if (IDlanterne < 5) {
        IDlanterne += 1
    }
})
input.onGesture(Gesture.TiltRight, function () {
    radio.sendNumber(0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.showLeds(`
        . # # # .
        # # # . #
        # # . . .
        # # # . #
        . # # # .
        `)
    basic.pause(500)
    basic.clearScreen()
})
input.onGesture(Gesture.TiltLeft, function () {
    radio.sendNumber(1)
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.showLeds(`
        # . # . #
        . # # # .
        # # # # #
        . # # # .
        # . # . #
        `)
    basic.pause(500)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    if (IDlanterne > 1) {
        IDlanterne += -1
    }
})
input.onGesture(Gesture.Shake, function () {
    if (IsShaked == true) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
        IDlanterne = 1
        for (let index = 0; index < 4; index++) {
            pins.digitalWritePin(DigitalPin.P1, 1)
            IDlanterne += 1
            radio.sendNumber(1)
            pins.digitalWritePin(DigitalPin.P1, 0)
        }
        IsShaked = false
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `)
        basic.clearScreen()
    } else if (IsShaked == false) {
        basic.showLeds(`
            . # # # .
            # # # . #
            # # . . .
            # # # . #
            . # # # .
            `)
        IDlanterne = 5
        for (let index = 0; index < 4; index++) {
            pins.digitalWritePin(DigitalPin.P1, 1)
            IDlanterne += -1
            radio.sendNumber(0)
            pins.digitalWritePin(DigitalPin.P1, 0)
        }
        IsShaked = true
        basic.showLeds(`
            . . . . .
            . # # . .
            # # . . .
            . # # . .
            . . . . .
            `)
        basic.clearScreen()
    }
})
let IDlanterne = 0
let IsShaked = false
IsShaked = false
IDlanterne = 1
radio.setGroup(IDlanterne)
basic.showNumber(IDlanterne)
basic.forever(function () {
    basic.showString("" + (IsShaked))
})

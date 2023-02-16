radio.setTransmitPower(7);
//radio.setFrequencyBand(1);
radio.setTransmitSerialNumber(true);
radio.setGroup(29);

let LL = 180
let start = false
let time = 0
let reactionTime = 0
let speedD = false
let timeD = false
let reactionTimeD = false
let speed = 0
let data = false
let run = false
let tajm = 0
let kod = 0
let measuring = false

radio.onReceivedNumber(function (receivedNumber: number) {
    kod = receivedNumber
    //console.log(receivedNumber)
})

/*
1 = kalibrace
2 = stopky - průběh
3 = stopky - planovanej start
4 = vyžádání dat

*/

function kalibrace(): number {
    basic.pause(500)
    const kalibraceLL: number[] = []
    for (let i = 0; i < 20; i++) {
        basic.clearScreen()
        kalibraceLL.push(input.lightLevel())
        basic.pause(100)
    }
    let soucet = 0
    for (const value of kalibraceLL) {
        soucet += value
    }
    return (soucet / 20)
}

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(1)
    LL = kalibrace()
    basic.showString("K")
    basic.clearScreen()
})

basic.forever(function () {
/*     if(kod == 5 ){
        run = false 
} */
    if (measuring && input.lightLevel() <= LL / 2) {
        radio.sendNumber(2)
        run = true
        basic.clearScreen()
    }
/* control.inBackground(function() {
    while (run) {
        whaleysans.showNumber(tajm)
        basic.pause(1000)
        tajm = tajm + 1
        
    }
}) */
})

    
input.onButtonPressed(Button.A, function () {
    measuring = true
    for (let i = 3; i > 0; i--) {
        basic.showNumber(i)
        music.playTone(Note.C, music.beat(BeatFraction.Whole))
        basic.pause(250)
    }
    radio.sendNumber(3)
    basic.showLeds(`
    . . # . .
    . # # # .
    # . # . #
    . . # . .
    . . # . .
    `, 100)
    basic.clearScreen()
})

input.onButtonPressed(Button.B, function () {
    radio.sendNumber(4)
    while (!timeD || !speedD || !reactionTimeD) { // pravděpodobneý zásek
        basic.pause(50)
    }
    basic.showString("T:")
    basic.showNumber(time)
    basic.showString("R:")
    if (reactionTime < 0) {
        basic.showString("Early start")
    } else {
        basic.showNumber(reactionTime)
    }
    basic.showString("S:")
    basic.showNumber(speed)

})

radio.onReceivedValue(function (name: string, value: number) {
    control.inBackground(function () {
        if (name == "T") {
            time = value
            timeD = true
        } else if (name == "R") {
            reactionTime = value
            reactionTimeD = true
        } else if (name == "S") {
            speed = value
            speedD = true
        }
    })

})


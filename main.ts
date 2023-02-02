let LL = 0

function kalibrace(): number {
    basic.pause(500)
    const kalibraceLL: number[] = []    
for (let i = 0; i < 10; i++) { 
    kalibraceLL.push(input.lightLevel())  
    basic.pause(100) } 
    let soucet = 0    
for (const value of kalibraceLL) { 
    soucet += value } 
    return (soucet / 10) 
}

basic.forever(function (){

    if(LL <= LL / 2){

    radio.sendNumber(2)
    }
})


radio.setTransmitPower(7);
radio.setFrequencyBand(1);
radio.setTransmitSerialNumber(true);
radio.setGroup(1)


input.onLogoEvent(TouchButtonEvent.Pressed, function() {
    radio.sendNumber(1)
    basic.clearScreen()
    basic.pause(50)
    LL = kalibrace()
    console.log(LL)
})

input.onButtonPressed(Button.A, function() {  
    basic.showNumber(3)
    music.playTone(Note.C, music.beat(BeatFraction.Whole))
    basic.pause(1000)
    basic.showNumber(2)
    music.playTone(Note.C, music.beat(BeatFraction.Whole))
    basic.pause(1000)
    basic.showNumber(1)
    music.playTone(Note.C, music.beat(BeatFraction.Whole))
    basic.pause(1000)
    basic.showString("Go")
    music.playTone(Note.C, music.beat(BeatFraction.Whole))

})


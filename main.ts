let Data5 = 0
let Data4 = 0
let Data3 = 0
let Data2 = 0
let Data1 = 0
let strip: neopixel.Strip = null
OLED.init(64, 128)
strip = neopixel.create(DigitalPin.P12, 4, NeoPixelMode.RGB)
strip.setBrightness(30)
basic.forever(function () {
    mbitbot.PMS3003_SET(mbitbot.Apin.Ap6, mbitbot.CH.CH2)
    basic.pause(10000)
    Data1 = mbitbot.IC_PMS3003(mbitbot.Apin.Ap6, mbitbot.PMS.pms1)
    Data2 = mbitbot.IC_PMS3003(mbitbot.Apin.Ap6, mbitbot.PMS.pms2)
    Data3 = mbitbot.IC_PMS3003(mbitbot.Apin.Ap6, mbitbot.PMS.pms3)
    Data4 = mbitbot.DHT11(mbitbot.THpin.THI5, mbitbot.TH.TH1)
    Data5 = mbitbot.DHT11(mbitbot.THpin.THI5, mbitbot.TH.TH2)
    mbitbot.PMS3003_SET(mbitbot.Apin.Ap6, mbitbot.CH.CH1)
    mbitbot.ESP8266_Sleep(mbitbot.ESPpin.Ep2, mbitbot.CH.CH2)
    basic.pause(1000)
    mbitbot.IC_ESP8266(mbitbot.ESPpin.Ep2, "MakerLab_2.4G", "53574722")
    basic.pause(4000)
    mbitbot.IC_ThingSpeak(
    "IV16MCF4ETNH1QXB",
    Data1,
    Data2,
    Data3,
    Data4,
    Data5,
    0,
    0,
    0
    )
    mbitbot.ESP8266_Sleep(mbitbot.ESPpin.Ep2, mbitbot.CH.CH1)
})
control.inBackground(function () {
    while (true) {
        if (mbitbot.Vibration(mbitbot.Vibpin.VibI3) == 1) {
            OLED.clear()
            OLED.writeStringNewLine("AirBoX")
            OLED.newLine()
            OLED.writeString("PM1.0:")
            OLED.writeNum(Data1)
            OLED.writeString("PM2.5:")
            OLED.writeNum(Data2)
            OLED.writeString("PM10 :")
            OLED.writeNum(Data3)
            OLED.writeString("Temp :")
            OLED.writeNum(Data4)
            OLED.writeString("Humid:")
            OLED.writeNum(Data5)
            if (Data2 < 20) {
                basic.showIcon(IconNames.Happy)
                strip.showColor(neopixel.colors(NeoPixelColors.Green))
            } else {
                if (Data2 < 35) {
                    basic.showIcon(IconNames.Asleep)
                    strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
                } else {
                    if (Data2 < 45) {
                        basic.showIcon(IconNames.Sad)
                        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
                    } else {
                        basic.showIcon(IconNames.Skull)
                        strip.showColor(neopixel.colors(NeoPixelColors.Red))
                    }
                }
            }
            basic.pause(2000)
            OLED.clear()
            basic.clearScreen()
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
        }
    }
})

# Megaпыцкер

Ultimate NFC cards testing robot

## Technologies

* Arduino for moving cards and device
* Node.js server for
  * configuration
  * controlling Arduino
  * and Famoco


## TODO
### Flow
1. Make screenshots
1. Calibrate cards (config?)
1. Save touch / card selects sequences
1. Plan and execute

### Config step structure
1. Name
1. Action type
  * Touch
    * Screenshot
    * X, Y
  1. Card
    * Angle
  1. Swipe
    * X1, Y1
    * X2, Y2
  1. Link to other action/sequence


### ADB commands
* back
  `adb shell input keyevent 4`
* touch
  `adb shell input tap 25 280`
* save screnshot
  `adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > screen.png`
* screen size `320 x 480`

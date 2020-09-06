# Megaпыцкер

Ultimate NFC cards testing robot. The idea was to create hardware/software setup for testing NFC termianl apps with real chips.

Hardware part contains from a box with terminal ontop and a wheel with few cards rotated by servo motor. ([Playlist with short demos](https://www.youtube.com/playlist?list=PLOaxZ77iqbTC03IpIPj3qVahukUgppZUp))

Software part: node.js server with vue frontend with abiliaty to create automation scripts.

## Technologies

* Arduino for moving cards and device
* Android Device Bridge for controlling device
* Node.js server for
  * configuration
  * controlling Arduino
  * and Famoco
* Web part: Vue2, Vuex, socket.io, webpack

## Available commands

1. Select card
1. Touch screen
1. Swipe
1. Input text
1. Wait
1. Run other sequence

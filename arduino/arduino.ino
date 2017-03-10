#include <Servo.h>

Servo myServo;
int angle = 0;
int newAngle = 0;
int step = 1;
String message;

void setup() {
  message = "";
  myServo.attach(9);
  myServo.write(0);
  Serial.begin(9600);
}

void loop() {
  while(Serial.available()){
    char incomingChar = Serial.read();
    if (isDigit(incomingChar)) {
      message += incomingChar;
    } else if (incomingChar == 'T') {
      newAngle = constrain(message.toInt(), 0, 180);
      step = (newAngle > angle) ? 1 : -1;
      while(newAngle != angle){
        angle += step;
        myServo.write(angle);
        delay(8);
      }
      message = "";
    }
  }
}

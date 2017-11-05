int pin0 = A0;
int pin1 = A1;
int pin2 = A2;

int data0, data1, data2;

void setup()
{ 
  Serial.begin(9600);
}

void loop()
{
  data0 = analogRead(pin0);
  data1 = analogRead(pin1);
  data2 = analogRead(pin2);

  Serial.println(1);
  Serial.println(data0);
  Serial.println(2);
  Serial.println(data1);
  Serial.println(3);
  Serial.println(data2);
}



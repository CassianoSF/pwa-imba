#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <FreeRTOS.h>

#define SERVICE_UUID        "ab0828b1-198e-4351-b779-901fa0e0371e" 
#define CHARACTERISTIC_UUID "4ac8a682-9736-4e5d-932b-e9b31405049c"
#define LED_RED 25
#define LED_GREEN 26
#define LED_BLUE 27
#define BUTTON 15
#define DEBOUNCE 400

BLEServer *server;
BLEService *service;
BLECharacteristic *characteristic;
bool toggle;
uint32_t lastPress;

class ServerCallbacks : public BLEServerCallbacks {

    void onConnect(BLEServer* pServer) {
        Serial.println("connected!");
    };

    void onDisconnect(BLEServer* pServer) {
        Serial.println("disconnected!");
    }
};

class CharacteristicCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *characteristic) {
        std::string value = characteristic->getValue();
        characteristic->notify();

        if (value.length() > 0){
            Serial.print("write: ");
            Serial.println(value.c_str());

            if (value == "green") digitalWrite(LED_GREEN,!digitalRead(LED_GREEN));
            if (value == "red")   digitalWrite(LED_RED,  !digitalRead(LED_RED));
            if (value == "blue")  digitalWrite(LED_BLUE, !digitalRead(LED_BLUE));
        }
    }
};

void IRAM_ATTR onChangeButton(){
    if (millis() - lastPress < DEBOUNCE) return;
    lastPress = millis();
    toggle = !toggle;
    if (toggle){
        Serial.println("ON");
        characteristic->setValue("ON");
    }
    else{
        Serial.println("OFF");
        characteristic->setValue("OFF");
    }
    characteristic->notify();
}

void setup() {
    Serial.begin(115200);

    pinMode(LED_GREEN, OUTPUT);
    pinMode(LED_BLUE, OUTPUT);
    pinMode(LED_RED, OUTPUT);
    pinMode(BUTTON, INPUT_PULLUP);

    BLEDevice::init("ESP32-BLE");
    server = BLEDevice::createServer(); 
    service = server->createService(SERVICE_UUID);
    characteristic = service->createCharacteristic(
        CHARACTERISTIC_UUID, 
        BLECharacteristic::PROPERTY_READ   |
        BLECharacteristic::PROPERTY_WRITE  |
        BLECharacteristic::PROPERTY_NOTIFY |
        BLECharacteristic::PROPERTY_INDICATE
    );
    characteristic->addDescriptor(new BLEDescriptor((uint16_t)0x2902));
    characteristic->setCallbacks(new CharacteristicCallbacks());
    server->setCallbacks(new ServerCallbacks());
    server->getAdvertising()->start();
    service->start();
    Serial.println("Bluetooth ready...");
    toggle = false;
    lastPress = millis(); 
    attachInterrupt(BUTTON, onChangeButton, FALLING);

}


void loop(){}
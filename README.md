# Objective 
Control Onkyo Hardware with RI Jack with NodeRed & Rasperry Pi
# TLDR
U need to **bulild a cable** youslelf with a **3.5mm mono jack**, that has a **10kOhms resistor** in parallell, and connect the other end to a Rasperry Pi's GPIOS

# Getting started
**node-red-contrib-onkyo-ri** wrapps [dajuly0x23/onkyo-rpi](https://github.com/dajuly20/Onkyo-RI-Rasperrypi) (written in C++ using Wiring Pi) for Node-Red on a Rasperry Pi


The node calls the script and passes msg.payload to it. So (according to the table below) msg.payload could be 0x20 to switch a connected Onkyo Ri device to CD Input.


# Before you start

Codes don'T seem to be super-similar between different models. There **are** codes documented, but if you don't have a model, that's in the list, you need to to execute the **scan** script, and determine the (missing) commands to your hardware yourself which could need some patience.

# Installation
The dependency comes pre compiled and should just run fine. 
Test by executing. ./

Then execute setup with (install git if it isn't)

```
git clone https://github.com/ahaack/onkyo-rpi
cd onkyo-rpi
sudo python3 setup.py build
sudo python3 setup.py install
sudo pigpiod
```

To test if all works execute
```
cd onkyo-rpi
python3 main.py 0x20      # AND / OR
pathon3 scan.py 
``` 

If the cabe is connected, and you got a right code, you should see / hear some reacrion from your Hardware ;) 

## Connection
To connect to the RI port is used 3.5mm mono jack. Tip is for data signal and sleeve is ground (GND). In case of stereo jack, connect tip to DATA, sleeve **and** ring to GND. That means for a Rasperry Pi 3 to put the tip to Pin 22 (GPIO_GEN6) GPIO25 (tx) and the shield to Pin 20 or another ground (Gnd). Please note, the pins cant be connected to UART ( Pin 8 / 9 ). (I didn't try it, so correct me if im worng). If you need to use another GPIO, you can specify that later in node red (again didn't try that :D) The connection schema shown below is for a Rasperry Pi 3 - I guess rpi 4 is the same - again - correct me if I'm wrong ;) 



![Pi3 Pinout](docs/img/pi3pinout.svg)

![Onkyo Ri Cable](docs/img/cable.jpg)
This is the cable I made. The part close to the pi contains my 10k resistor, which my past-me seemed to have soldered in correctly - yet it seemed to work. (In the picture it is connected to UART Pins - which is wrong as I guess. 8 =>  22 ( GPIO25 ) and ground could make its shorter path 6 => 20.


## RI codes
At mentioned sites are also listed codes for Onkyo devices. Unfortunnately none of the codes is not valid for my receiver TX-8020. To determine the valid codes I wrote a simple loop for Arduino (more below) that goes through the whole 12bit code range (0x0-0xFFF). Results are listed below commands.

### TX-SR605 (my findings)
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input CD</td><td>0x20</td><td>Switch input to CD channel</td></tr>
  <tr><td>Turn On + CD</td><td>0x2F</td><td>Turn ON receiver and select CD as input channel</td></tr>
  <tr><td>Input TAPE</td><td>0x70</td><td>Switch input to TAPE channel</td></tr>
  <tr><td>Turn On + TAPE</td><td>0x7F</td><td>Turn ON receiver and select TAPE as input channel</td></tr>
  <tr><td>Input DVD</td><td>0x120</td><td>Switch input to DVD channel</td></tr>
  <tr><td>Turn On + DVD</td><td>0x12F</td><td>Turn ON receiver and select DVD as input channel</td></tr>
  <tr><td>Input DOCK</td><td>0x170</td><td>Switch input to DOCK channel</td></tr>
  <tr><td>Turn On + DOCK</td><td>0x17F</td><td>Turn ON receiver and select DOCK as input channel</td></tr>  
  
  <tr><td>Input GAME/TV</td><td>0x1A0</td><td>Switch input to GAME/TV channel</td></tr>
  <tr><td>Turn On + GAME/TV</td><td>0x1AF</td><td>Turn ON receiver and select GAME/TV as input channel</td></tr>  
  
  <tr><td>Dimmer Hi</td><td>0x2B0</td><td>Set dimmer brightness to highest level</td></tr>
  <tr><td>Dimmer Mid</td><td>0x2B1</td><td>Set dimmer brightness to mid level</td></tr>  
  <tr><td>Dimmer Lo</td><td>0x2B2</td><td>Set dimmer brightness to lowest level</td></tr>  
  <tr><td>Dimmer Hi</td><td>0x2B8</td><td>Set dimmer brightness to highest level</td></tr>
  <tr><td>Dimmer Lo</td><td>0x2BF</td><td>Set dimmer brightness to lowest level</td></tr>    
  <tr><td>Turn Off</td><td>0x1AE</td><td>Turn OFF(set into standby) receiver</td></tr>  
  <tr><td>Test mode</td><td>0x421 - 0x424</td><td>Some kind of test modes. Leave test mode is possible by code 0x420 (Turn Off). Test modes provides clear of receiver setting.</td></tr>
    <tr><td>Test Mode Off</td><td>0x420</td><td>Leave test mode.</td></tr>
  <tr><td>Switch to Radio</td><td>0x423</td><td>Switch to FB</td></tr>  
  <tr><td>Radio search next</td><td>0x430</td><td>Tune next radio station when radio is selected.</td></tr>  
  <tr><td>Radio search previous</td><td>0x431</td><td>Tune previous radio station when radio is selected.</td></tr>  
  <tr><td>Radio Stereo/Mono</td><td>0x432</td><td>Switch between Stereo and Mono when FM radio is selected.</td></tr>  
  <tr><td>Radio station next</td><td>0x433</td><td>Jump to next stored radio station when radio is selected.</td></tr>  
  <tr><td>Radio station previous</td><td>0x434</td><td>Jump to previous stored radio station when radio is selected.</td></tr>
  
  <tr><td>Vol Up</td><td>0x1A2</td><td>Volume Up (only when input is set to Video 3)</td></tr>
  <tr><td>Vol Down</td><td>0x1A3</td><td>Volume Down (only when input is set to Video 3)</td></tr>
  <tr><td>Mute</td><td>0x1A4</td><td>Mute (only when input is set to Video 3)</td></tr>
</table>


### TX-8020 receiver 
Codes are valid for TX-8020 receiver. With a high probability it will work with other Onkyo receivers.
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input CD</td><td>0x20</td><td>Switch input to CD channel</td></tr>
  <tr><td>Turn On + CD</td><td>0x2F</td><td>Turn ON receiver and select CD as input channel</td></tr>
  <tr><td>Input TAPE</td><td>0x70</td><td>Switch input to TAPE channel</td></tr>
  <tr><td>Turn On + TAPE</td><td>0x7F</td><td>Turn ON receiver and select TAPE as input channel</td></tr>
  <tr><td>Input BD/DVD</td><td>0x120</td><td>Switch input to BD/DVD channel</td></tr>
  <tr><td>Turn On + BD/DVD</td><td>0x12F</td><td>Turn ON receiver and select BD/DVD as input channel</td></tr>
  <tr><td>Input DOCK</td><td>0x170</td><td>Switch input to DOCK channel</td></tr>
  <tr><td>Turn On + DOCK</td><td>0x17F</td><td>Turn ON receiver and select DOCK as input channel</td></tr>  
  <tr><td>Dimmer Hi</td><td>0x2B0</td><td>Set dimmer brightness to highest level</td></tr>
  <tr><td>Dimmer Mid</td><td>0x2B1</td><td>Set dimmer brightness to mid level</td></tr>  
  <tr><td>Dimmer Lo</td><td>0x2B2</td><td>Set dimmer brightness to lowest level</td></tr>  
  <tr><td>Dimmer Hi</td><td>0x2B8</td><td>Set dimmer brightness to highest level</td></tr>
  <tr><td>Dimmer Lo</td><td>0x2BF</td><td>Set dimmer brightness to lowest level</td></tr>    
  <tr><td>Turn Off</td><td>0x420</td><td>Turn OFF(set into standby) receiver</td></tr>  
  <tr><td>Test mode</td><td>0x421 - 0x424</td><td>Some kind of test modes. Leave test mode is possible by code 0x420 (Turn Off). Test modes provides clear of receiver setting.</td></tr>
  <tr><td>Radio search next</td><td>0x430</td><td>Tune next radio station when radio is selected.</td></tr>  
  <tr><td>Radio search previous</td><td>0x431</td><td>Tune previous radio station when radio is selected.</td></tr>  
  <tr><td>Radio Stereo/Mono</td><td>0x432</td><td>Switch between Stereo and Mono when FM radio is selected.</td></tr>  
  <tr><td>Radio station next</td><td>0x433</td><td>Jump to next stored radio station when radio is selected.</td></tr>  
  <tr><td>Radio station previous</td><td>0x434</td><td>Jump to previous stored radio station when radio is selected.</td></tr>
</table>

### TX-SR304 receiver 
Thanks to lonejeeper 
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input CD</td><td>0x20</td><td>Switch input to CD channel</td></tr>
  <tr><td>Input TAPE</td><td>0x70</td><td>Switch input to TAPE channel</td></tr>
  <tr><td>Input BD/DVD</td><td>0x120</td><td>Switch input to BD/DVD channel</td></tr>
  <tr><td>Input HDD</td><td>0x170</td><td>Switch input to HDD channel</td></tr>
  <tr><td>Input Video2</td><td>0x1A0</td><td>Switch input to Video2 channel</td></tr>  
  <tr><td>Vol Up</td><td>0x1A2</td><td>Volume Up</td></tr>
  <tr><td>Vol Down</td><td>0x1A3</td><td>Volume Down</td></tr>
  <tr><td>Mute</td><td>0x1A4</td><td>Mute</td></tr>
  <tr><td>Power OFF</td><td>0x1AE</td><td>Power OFF</td></tr>
  <tr><td>Power ON</td><td>0x1AF</td><td>Power ON</td></tr>
  <tr><td>Dim</td><td>0x2B0</td><td>Set dimmer brightness to highest level</td></tr>
  <tr><td>Dimer</td><td>0x2B1</td><td>Set dimmer brightness to mid level</td></tr>  
  <tr><td>Dimmest</td><td>0x2B2</td><td>Set dimmer brightness to lowest level</td></tr>  
  <tr><td>Dimmer Daytime</td><td>0x2B8</td><td>Set daytime brightness</td></tr>
  <tr><td>Dimmer Nighttime</td><td>0x2BF</td><td>Set nighttime brightness</td></tr>    
  <tr><td>Test mode</td><td>0x421 - 0x423, 0x430</td><td>RDS TEST</td></tr>  
</table>

### TX-SR313 receiver 
Thanks to wongcz
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input Aux</td><td>0x20</td><td>Switch input to AUX channel</td></tr>
  <tr><td>Turn ON + AUX</td><td>0x2F</td><td>Turn ON receiver and select AUX as input channel</td></tr>
  <tr><td>Input TV(/CD)</td><td>0x70</td><td>Switch input to TV(/CD) channel</td></tr>
  <tr><td>Turn ON + input TV(/CD)</td><td>0x7F</td><td>Turn ON receiver and select TV(/CD) as input channel</td></tr>
  <tr><td>Input BD/DVD</td><td>0x120</td><td>Switch input to BD/DVD channel</td></tr>
  <tr><td>Turn ON + input BD/DVD</td><td>0x12F</td><td>Turn ON receiver and select BD/DVD as input channel</td></tr>
  <tr><td>Turn ON + input DOCK</td><td>0x17F</td><td>Turn ON receiver and select DOCK as input channel</td></tr>
  <tr><td>Dim</td><td>0x2B0</td><td>Set dimmer brightness to highest level</td></tr>
  <tr><td>Dimer</td><td>0x2B1</td><td>Set dimmer brightness to mid level</td></tr>  
  <tr><td>Dimmest</td><td>0x2B2</td><td>Set dimmer brightness to lowest level</td></tr>  
  <tr><td>Dimmer Daytime</td><td>0x2B8</td><td>Set daytime brightness</td></tr>
  <tr><td>Dimmer Nighttime</td><td>0x2BF</td><td>Set nighttime brightness</td></tr>    
  <tr><td>Test mode</td><td>0x421 - 0x423, 0x430</td><td>RDS TEST</td></tr>  
</table>

### TX-SR333 receiver 
Thanks to ogrady
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input TV/CD</td><td>0x20</td><td>Switch input to TV/CD channel</td></tr>
  <tr><td>Input BD/DVD</td><td>0x120</td><td>Switch input to BD/DVD channel</td></tr>  
  <tr><td>Dim</td><td>0x2B0</td><td>Set dimmer brightness to highest level</td></tr>
  <tr><td>Dimer</td><td>0x2B1</td><td>Set dimmer brightness to mid level</td></tr>  
  <tr><td>Dimmest</td><td>0x2B2</td><td>Set dimmer brightness to lowest level</td></tr>  
  <tr><td>Test mode set</td><td>0x421 - 0x424</td><td>Test 1-00,2-00,3-00,4-00</td></tr>  
  <tr><td>Test</td><td>0x425</td><td>Test x-01</td></tr>
  <tr><td>Test</td><td>0x426</td><td>Test x-02</td></tr>
  <tr><td>Test</td><td>0x427</td><td>WiFi test</td></tr>
  <tr><td>Test</td><td>0x428</td><td>Route test</td></tr>
  <tr><td>Test</td><td>0x42a</td><td>Key Test Mode</td></tr>
  <tr><td>Test</td><td>0x42b</td><td>Test x-07</td></tr>
  <tr><td>Test</td><td>0x42c</td><td>Test x-08</td></tr>
  <tr><td>Test</td><td>0x42d</td><td>Test x-09</td></tr>
  <tr><td>Test</td><td>0x42e</td><td>Test x-00</td></tr>
  <tr><td>Test mode set</td><td>0x43e</td><td>Test 5-00</td></tr>
  <tr><td>Test</td><td>0x43f</td><td>CEC test</td></tr>
</table>

### TX-SR600 receiver 
Thanks to kelvinlaw 
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input CD</td><td>0x20</td><td>Switch input to CD channel</td></tr>
  <tr><td>Turn On + CD</td><td>0x2F</td><td>Turn ON receiver and select CD as input channel</td></tr>
  <tr><td>Input TAPE</td><td>0x70</td><td>Switch input to TAPE channel</td></tr>
  <tr><td>Turn On + TAPE</td><td>0x7F</td><td>Turn ON receiver and select TAPE as input channel</td></tr>  
  <tr><td>Input BD/DVD</td><td>0x120</td><td>Switch input to BD/DVD channel</td></tr>
  <tr><td>Turn On + BD/DVD</td><td>0x12F</td><td>Turn ON receiver and select BD/DVD as input channel</td></tr>
  <tr><td>Input Video3</td><td>0x1A0</td><td>Switch input to Video3 channel</td></tr>
  <tr><td>Turn On + Input Video3</td><td>0x1AF</td><td>Turn ON receiver and select Video3 as input channel</td></tr>
  <tr><td>Power Off</td><td>0x1AE</td><td>Power OFF (only works if you are currently in Video 3!!)</td></tr>
</table>

### TX-SR603 receiver 
Thanks to jimtng 
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input Video3</td><td>0x1A0</td><td>Switch input to Video3 channel</td></tr>
  <tr><td>Vol Up</td><td>0x1A2</td><td>Volume Up (only when input is set to Video 3)</td></tr>
  <tr><td>Vol Down</td><td>0x1A3</td><td>Volume Down (only when input is set to Video 3)</td></tr>
  <tr><td>Mute</td><td>0x1A4</td><td>Mute (only when input is set to Video 3)</td></tr>
  <tr><td>Unmute</td><td>0x1A5</td><td>Unmute (only when input is set to Video 3)</td></tr>
  <tr><td>Power Off</td><td>0x1AE</td><td>Power OFF (only works if you are currently in Video 3!!)</td></tr>
  <tr><td>Turn On + Input Video3</td><td>0x1AF</td><td>Turn ON receiver and select Video3 as input channel</td></tr>
</table>

### TX-SR606 receiver 
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Input CD</td><td>0x20</td><td>Switch input to CD channel</td></tr>
  <tr><td>Turn On + CD</td><td>0x2F</td><td>Turn ON receiver and select CD as input channel</td></tr>
  <tr><td>Input TAPE</td><td>0x70</td><td>Switch input to TAPE channel</td></tr>
  <tr><td>Turn On + TAPE</td><td>0x7F</td><td>Turn ON receiver and select TAPE as input channel</td></tr>  
  <tr><td>Input DVD</td><td>0x120</td><td>Switch input to DVD channel</td></tr>
  <tr><td>Turn On + DVD</td><td>0x12F</td><td>Turn ON receiver and select DVD as input channel</td></tr>
  <tr><td>Input GAME/TV</td><td>0x1A0</td><td>Switch input to GAME/TV channel</td></tr>
  <tr><td>Vol Up</td><td>0x1A2</td><td>Volume Up (only when input is set to GAME/TV)</td></tr>
  <tr><td>Vol Down</td><td>0x1A3</td><td>Volume Down (only when input is set to GAME/TV)</td></tr>
  <tr><td>Mute</td><td>0x1A4</td><td>Mute (only when input is set to GAME/TV)</td></tr>
  <tr><td>Unmute</td><td>0x1A5</td><td>Unmute (only when input is set to GAME/TV)</td></tr>
  <tr><td>Power Off</td><td>0x1AE</td><td>Power OFF (only when input is set to GAME/TV)</td></tr>
  <tr><td>Turn On + GAME/TV</td><td>0x1AF</td><td>Turn ON receiver and select GAME/TV as input channel</td></tr>
  <tr><td>Setup</td><td>0x420-0x424</td><td>Displayed: SETUP. Playing loud noisy sounds</td></tr>
  <tr><td>CEC test</td><td>0x43E</td><td>Displayed: CEC TEST OK</td></tr>
  <tr><td>TEST 5-00</td><td>0x43F</td><td>Displayed: TEST 5-00</td></tr>
</table>
  
### A-803 receiver
<table>
  <tr><td><b>Action</b></td><td><b>Command</b></td><td><b>Notes</b></td></tr>
  <tr><td>Volume +</td><td>0x2</td><td>See notes on volume</td></tr>
  <tr><td>Volume -</td><td>0x3</td><td>See notes on volume</td></tr>
  <tr><td>Power On/Power Off</td><td>0x4</td><td>The receiver actually enters/exits standby since the only way to properly shut it down is through the power switch located on the front of the receiver itself.</td></tr>
  <tr><td>Mute</td><td>0x5</td><td></td></tr>
  <tr><td>Input Aux/Video</td><td>0x6</td><td></td></tr>
  <tr><td>Input Tape-2 Monitor</td><td>0x7</td><td></td></tr>
  <tr><td>Input Tape-1/DAT</td><td>0x8</td><td>Alternative code: 0x70.</td></tr>
  <tr><td>Input CD</td><td>0x9</td><td>Alternative code: 0x20.</td></tr>
  <tr><td>Input Phono</td><td>0xA</td><td>Alternative code: 0x30.</td></tr>
  <tr><td>Input Tuner</td><td>0xB</td><td>Alternative code: 0xE0.</td></tr>
  <tr><td>Source direct</td><td>0x13</td><td></td></tr>
  <tr><td>OFF</td><td>0xEA</td><td>This code will switch the receiver into stanby mode, but it will not switch it back on.</td></tr>
</table>



## Further reading 

## Protocol
Protocol description could be found at:
*    http://lirc.sourceforge.net/remotes/onkyo/Remote_Interactive

or with grafical representation at:
*    http://fredboboss.free.fr/articles/onkyo_ri.php .

Protocol is pretty simple for implementation. In one message is transfered 12 bit code. This code represents action for target device. Most significant bit is send first.

## Library
There are two functions in the Onkyo-RI libary:
* blocking - send() method blocks other program execution until whole command is sent. It takes up to 61 ms.
* non-blocking - send() method only start command sending. The execution is handled by processing() function. This function must be called periodically with maximum 1 ms period. Function return bool value about sending status (true - data is being sent, false - nothing to sent/sending is done). Before the command is completely sent other functions can be executed. Library use internaly Arduino micros() function, so no other timer is not blocked.


#### Notes on volume (as per [ahaack/onkyo-rpi](https://github.com/ahaack/onkyo-rpi))
Volume control codes shown in the table are sent by the receiver out of its RI ports when adjusting the volume using a remote control (they can be found using an oscilloscope).
However, the receiver will not react to these codes when they are sent from an external device, effectively making impossible to control its volume through RI signals.

**Comment to that by Julian Wiche**:

 That doesn't seem to be true on every device. I **could** contol the volume on my TX SR 606! The test program "test.py" can be used to obtain the codes - it only requires a "bit" of parience :D I think that receivers, that have a motor to turn the know, could go into this problem. 

## Test program
If none of the abouve codes works for you. You can walk through any possible code with the test program. It is located in the folder that we're cloning aboce. It serves for check all codes (0x0 - 0xFFF) on target device in 500ms interval. You can run it on a cli (e.g. bash) by ```python3 scan.py --help``` which will tell you how to use it. If you run it without any parameters it just goes through any command.. You just have to make sure it uses the wright GPIO. 

NOTE: As per my personal experience: For me testing went thought a testing mode, that made a lond sinus tone.. also it could increase the volume before.. so be careful not to wake anyone when you try it at nights :D 

```python3 scan.py```

Terminal commands:
* p - pause/run command sending
* r - reset loop (program start from 0)
* hexadecimal number - number in hexadecimal format represents code that user want to test on target device. From this code automatical procedure will continue.

## Feel free to Contribute 
If it's just Ri Codes for your Hardware (by wrting me) or if you fork the whole thing and make it your own project. Open Source means not to be selfish - share your findings! Before you fork though, you can send me a a message - I 've seen it often enough to have the same project in 100 different forks / versions on npm / Node Red. Think of DAUs. They won't know which version to install.  




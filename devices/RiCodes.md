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

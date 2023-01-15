export class DeviceUtils {
  generateMacAddress() {
    const hexDigits = '0123456789ABCDEF';
    let macAddress = '';
    for (let index = 0; index < 6; index++) {
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      if (index != 5) macAddress += ':';
    }
    return macAddress;
  }

  generateIp() {
    let ip = '';
    for (let index = 0; index < 4; index++) {
      ip = ip + Math.round(Math.random() * 255);
      if (index < 3) ip += '.';
    }
    return ip;
  }

  generateSignal() {
    let signal = '';
    signal = '-' + (30 + Math.round(Math.random() * 30)) + ' dbm';
    return signal;
  }

  generateVirtualId() {
    const hexDigits = '0123456789ABCDEF';
    let virtualId = '';
    for (let index = 0; index < 15; index++) {
      virtualId += hexDigits.charAt(Math.round(Math.random() * 15));
    }
    return virtualId;
  }
}

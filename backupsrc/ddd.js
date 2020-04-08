var encryptor = require('file-encryptor');

var key = 'My Super Secret Key';
var now = '1578750860166'
encryptor.encryptFile('public/' + now + '/compress/' + now + '.zip', 'public/' + now + '/compress/' + now + '.dat', key, function(err) {
  // Encryption complete.
});
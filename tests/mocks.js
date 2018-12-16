exports.contactA = {
  name: 'Patrick',
  phoneNumber: '0774644187',
  passCode: '12345'
}
exports.contactB = {
  name: 'Luwum A',
  phoneNumber: '0774644189',
  passCode: '12345'
}
exports.contactC = {
  name: 'Luwum C',
  phoneNumber: '0774644179',
  passCode: '12345'
}

exports.sms = {
  receiver: this.contactA.phoneNumber,
  sender: this.contactB.phoneNumber,
  message: 'You up? <3'
}

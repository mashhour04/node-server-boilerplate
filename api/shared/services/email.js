const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // TODO: need to be reviseted
  host: 'localhost',
  port: 1025,
  auth: false /* {
    user: 'project.1',
    pass: 'secret.1'
} */
});

module.exports = () => async (
  to = [],
  subject = '',
  message = '',
  html = '',
  attachments = [],
  list = {}
) => {
  // eslint-disable-next-line no-param-reassign
  to = to.join(', ') || '';
  const mailOptions = {
    from: '"Node App" <node_app@gmail.com>',
    to,
    subject,
    text: message,
    html,
    attachments,
    list
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      // console.log('sendmail' + error);
      // return error.message;
    } else {
      // console.log('Email sent: ' + info.response);
      transporter.close();
    }
  });
};

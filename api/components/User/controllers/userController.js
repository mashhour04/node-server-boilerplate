const {
  googleAuth,
  facebookAuth,
  googleLoginSetter,
  loginService,
  faceBookData,
  googleLoginGetter
} = require('../use-cases');

const { GetBaseDomain } = require('../../../shared/constants');

exports.facebookAuthController = facebookAuth.authenticate('facebook');

exports.facebookUserData = async (req, res) => {
  const facebookId = req.params.facebookId;
  const user = await faceBookData(facebookId);
  return res.status(200).json(user);
};

exports.googleUserData = async (req, res) => {
  const googleId = req.params.googleId;
  const user = await googleLoginGetter(googleId);
  return res.status(200).json(user);
};

exports.facebookAuthBackController = [
  facebookAuth.authenticate('facebook', {
    failureRedirect: '/login',
    scope: ['email']
  }),
  async (req, res) => {
    const domain = GetBaseDomain();
    const maxAge = 365 * 24 * 60 * 60 * 1000;
    const user = req.user;
    const token = await loginService(user);
    if (!token) {
      return res.redirect(`/registration?faceId=${user.id}`);
    }

    res.cookie('reconToken', token, {
      domain,
      maxAge
    });

    res.cookie('reconAppToken', token, {
      domain,
      maxAge
    });

    // need to set cookie then redirect to home
    return res.redirect(`/?token=${token}`);
  }
];

exports.googleAuthCallback = [
  googleAuth.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    const domain = GetBaseDomain();
    const maxAge = 365 * 24 * 60 * 60 * 1000;
    const user = req.user;

    const token = await googleLoginSetter(user);
    if (!token) {
      return res.redirect(`/registration?googleId=${user.id}`);
    }

    res.cookie('reconToken', token, {
      domain,
      maxAge
    });

    res.cookie('reconAppToken', token, {
      domain,
      maxAge
    });

    // need to set cookie then redirect to home
    return res.redirect(`/?token=${token}`);
  }
];

// Login with gmail section

exports.googleAuthController = googleAuth.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
});

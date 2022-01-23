const express = require('express');

const {
  userRegisterValidation,
  userLoginValidation,
  changePasswordValidation
} = require('../validations');

const router = express.Router();

const authenticateMiddleware = require('../../../middlewares/authenticateMiddleware');
const authorizeMiddleware = require('../../../middlewares/authorizeMiddleware');
const {
  PERMISSIONS_KEYS: PERMISSIONS
} = require('../../../shared/constants/defaults');

const validateMiddleware = require('../../../middlewares/validateMiddleware');
const controllers = require('../controllers');

// @route
// @ GET api/users/register
// !access  anonymous
router.post(
  '/create-user',
  [
    validateMiddleware(userRegisterValidation),
    authenticateMiddleware,
    authorizeMiddleware({
      permissions: [PERMISSIONS.ADMIN, PERMISSIONS.BRANCH_HEAD]
    })
  ],
  controllers.registerUser
);

// @route
// @ GET api/users/hasAdminAuthority
// !access  ADMIN
router.get(
  '/hasAdminAuthority',
  [
    authenticateMiddleware,
    authorizeMiddleware({
      permissions: [PERMISSIONS.ADMIN]
    })
  ],
  (req, res) => res.status(200).json({ ok: true })
);

// @route
// @ POST api/users/login
// !access  anonymous
router.post(
  '/login',
  [validateMiddleware(userLoginValidation)],
  controllers.loginUser
);

// @route
// @ POST api/users/logout
// !access  anonymous
router.get('/logout', controllers.logOutUser);

router.post(
  '/password/change',
  [validateMiddleware(changePasswordValidation), authenticateMiddleware],
  controllers.changePassword
);

// @route
// @ GET api/users/profile/view
// !access  anonymous
router.get('/profile', [authenticateMiddleware], controllers.getUserProfile);

// @route
// @ GET api/users/
// !access  ADMIN
router.get(
  '/',
  [
    authenticateMiddleware,
    authorizeMiddleware({
      permissions: [PERMISSIONS.ADMIN, PERMISSIONS.BRANCH_HEAD]
    })
  ],
  controllers.getUsers
);

module.exports = router;

const express = require('express');
const { Authorization } = require('../authentication/authenticate');
const { Home, Signup, Signin, Signout } = require('../controller/auth');
const { contactMessage } = require('../controller/contact');
const { getDocuments, addDocument, deleteDocument, downloadFile,  } = require('../controller/document');
const upload = require('../middleware/multer');
const { validateSignUpRequest, isRequestValidate, validateSignInRequest, messageValidator } = require('../validator/validate');
const router = express.Router();

router.get('/',Home);
router.post('/signup', validateSignUpRequest, isRequestValidate, Signup);
router.post('/signin', validateSignInRequest, isRequestValidate, Signin);
router.get('/getdocuments', Authorization, getDocuments);
router.post('/adddocument', Authorization, addDocument);
router.post('/deletedocument', Authorization, deleteDocument);
router.post('/download', Authorization, downloadFile);
router.get('/signout',Signout);
router.post('/contactus', messageValidator, isRequestValidate, contactMessage);
module.exports = router;
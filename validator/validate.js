const { check, validationResult } = require("express-validator");

exports.validateSignUpRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .notEmpty()
    .withMessage('email is required'),
    check('email')
    .isEmail()
    .withMessage('Email should be Valid EmailId'),
    check('password')
    .notEmpty()
    .withMessage('password is required'),
    check('rpassword')
    .notEmpty()
    .withMessage('confirm password is required'),
    check('password')
    .isLength({min:8})
    .withMessage('password should have min length of 8' )
];

exports.validateSignInRequest = [
    check('email')
    .notEmpty()
    .withMessage('email is required'),
    check('password')
    .notEmpty()
    .withMessage('password is required'),
];

exports.isRequestValidate = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({
            errors:errors.array()[0].msg
        });
    }
    next();
}

exports.messageValidator = [
    check('name')
    .notEmpty()
    .withMessage('Name is required'),
    check('email')
    .notEmpty()
    .withMessage('Email is required'),
    check('email')
    .isEmail()
    .withMessage('Email should be Valid EmailId'),
    // check('phone')
    // .notEmpty()
    // .withMessage('phone is required'),
    // check('phone')
    // .isLength({min:10})
    // .withMessage('Email should be Valid EmailId'),
    check('message')
    .notEmpty()
    .withMessage("message is required"),
    check('message')
    .isLength({min:5})
    .withMessage("min sentence required")
]
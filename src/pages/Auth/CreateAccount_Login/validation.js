var Joi = require('react-native-joi-validation');

const emailSchema = Joi.object().keys({
    email : Joi.string().email()
})

const passwordSchema = Joi.object().keys({
    password : Joi.string().min(5).max(20)
})

function validateEmail (input) {

    console.log('validate')
    let validation;

    Joi.validate({email : input} , emailSchema , function(err , val) {
        if(err)
        {
            console.log('err = ' + err)
            validation = false
        }
        else
        {
            //email is valid
            validation = true
        }
    })

    return validation
}

function validatePassword(input){
    let validation;

    Joi.validate({password : input}, passwordSchema , function(err , val) {

        if(err)
        {
            validation = false
        }
        else
        {
            validation = true
        }
    })
    return validation;
}

module.exports.validateEmail = validateEmail;
module.exports.validatePassword = validatePassword;
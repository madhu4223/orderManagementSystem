var userModel = require('./../models/userModel');
var bcrypt = require('bcrypt-nodejs');
var ResponseUtils = require('./../utils/responseUtils');
file_name = "userService";

module.exports = {
    createUser: function () {
        let userObject = {
            email: 'navtech@gmail.com',
            password: 'navtech@1234'
        };
        usersModel = userModel(userObject);
        usersModel.password = usersModel.generateHash(userObject.password);
        usersModel.save(function(err,saved){
            if(err){
                console.log(err);
            }else{
                console.log('user created');
            }
        });
        

    },
    login: function (api_req, api_res) {
        // console.log('am here at service ', api_req.body);
        let Response = new ResponseUtils.response(api_res);
        let Print = new ResponseUtils.print(file_name, "login");
        try{

            if (api_req && api_req.body && api_req.body.email && api_req.body.password) {
                password = api_req.body.password;
                
                let givenUserName = api_req.body.email;
                let givenPassword = api_req.body.password;
                userModel.find({email:givenUserName},function(err,userDetails){
                    if(err){
                        return Response.error('Error while validating user','DBERR',400);
                    }else if(!err && userDetails.length > 0){
                        if(userDetails[0].validatePassword(givenPassword)){
                            return Response.success('valid user',{},'SUCCESS');
                        }else{
                            return Response.error('Invalid Credentials','INVALIDUSER',400);
                        }
                    }else{

                    }
                });

            } else {
                return Response.error('Bad Params','BADPARAMS',400)
            }
        }
        catch(exception){
        console.log(exception);
        Print.exception(exception);
        return Response.error("Sorry.. Error with our systems", "INSERR", 400);
    }
}
};

// module.exports.createUser();
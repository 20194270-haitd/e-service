const Users = require ('../model/Users');
const Admins = require ('../model/Admins');
const mongoose = require ('mongoose');
const { validTokens } = require('../service/authenticate.js');

const { generateAccessTokenUser, generateAccessTokenAdmin } = require('../service/authenticate.js')

async function loginUser(req, res, next) {
    try{
        const { email, publicKey } = req.body;
        if(!(email && publicKey)) {
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    success: false,
                    mes: 'Invalid input',
                }
            ));
            res.end();
        }
        else {
            const user = await Users.findOne({ email: email});
            if(user && (user.publicKey === publicKey)){
                const token = generateAccessTokenUser( {email, publicKey} );
                validTokens.push(token);
                res.write(JSON.stringify(
                    {
                        success: true,
                        token: token,
                    }
                ));
                res.end();
            }
            else {
                res.statusCode = 400;
                res.write(JSON.stringify(
                    {
                        success: false,
                        mes: 'User doesnt exit',
                    }
                ));
                res.end();
            }
        }
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();

    }
}


async function loginAdmin(req, res, next) {
    try{
        const { email, publicKey } = req.body;
        if(!(email && publicKey)) {
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    success: false,
                    mes: 'Invalid input',
                }
            ));
            res.end();
        }
        else {
            const user = await Admins.findOne({ email: email});
            if(user && (user.publicKey === publicKey)){
                const token = generateAccessTokenAdmin( {email, publicKey} )
                validTokens.push(token);
                res.write(JSON.stringify(
                    {
                        success: true,
                        token: token,
                    }
                ));
                res.end();
            }
            else {
                res.statusCode = 400;
                res.write(JSON.stringify(
                    {
                        success: false,
                        mes: 'Admin doesnt exit',
                    }
                ));
                res.end();
            }
        }
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();

    }
}

async function logout(req, res, next) {
    try{
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        const index = validTokens.indexOf(token);
        if(index !== -1){
            validTokens.splice(index, 1);
            res.write(JSON.stringify(
                {
                    success: true,
                    mes: 'Log out success',
                }
            ));
            res.end();
        }
        else {
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    success: false,
                    mes: 'User doesnt exit',
                }
            ));
            res.end();
        }
        
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();

    }
}


module.exports = {
    loginUser,
    loginAdmin,
    logout

}

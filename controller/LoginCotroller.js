const Users = require ('../model/Users');
const Admins = require ('../model/Admins');
const mongoose = require ('mongoose');

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
                res.write(JSON.stringify(
                    {
                        success: true,
                        token: generateAccessTokenUser( {email, publicKey} ),
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
                res.write(JSON.stringify(
                    {
                        success: true,
                        token: generateAccessTokenAdmin( {email, publicKey} ),
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

module.exports = {
    loginUser,
    loginAdmin

}

const Users = require ('../model/Users');
const mongoose = require ('mongoose');

async function login(req, res, next) {
    try{
        const { email, publicKey } = req.body;
        if(!(email && publicKey)) {
            res.write(JSON.stringify(
                {
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
                        token: publicKey
                    }
                ));
                res.end();
            }
            else {
                res.write(JSON.stringify(
                    {
                        success: false,
                    }
                ));
                res.end();
            }
        }
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.end(JSON.stringify(err));
    }
}

module.exports = {
    login,

}

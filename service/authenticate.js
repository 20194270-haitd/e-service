const jwt = require('jsonwebtoken');

const validTokens = [];  

verifyUser = (req, res, next) => {
    const { authorization } = req.headers;
    if( authorization ) {
        const token = authorization.split(' ')[1];
        if(validTokens.indexOf(token) === -1){
            res.status = 403;
            res.write(JSON.stringify
                (
                    {
                        mes: 'Token Inavlid'
                    }
                )
            )
            res.end();

        } 
        else {
           
            const key = process.env.SECRET_USER_KEY_TOKEN;
            jwt.verify(token, key, (err, user) => {
                if(err) {
                    
                    res.status = 403;
                    res.write(JSON.stringify(
                            {
                                mes: 'Token Inavlid'
                            }
                        )
                    )
                    res.end();
                }
                else {
                    req.tokenUser = user; 
                    next(req, res, next);
                }
            })
        }
    }
    else {
        res.status = 403;
        res.write(JSON.stringify(
            {
                mes: 'you are not authenticate'
            }
        ))
        res.end();
    }
    
}

verifyAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if( authorization ) {
        
        const token = authorization.split(' ')[1];
        if(validTokens.indexOf(token) === -1){
            res.status = 403;
            res.write(JSON.stringify
                (
                    {
                        mes: 'Token Inavlid'
                    }
                )
            )
            res.end();

        }
        else {
            const key = process.env.SECRET_ADMIN_KEY_TOKEN;
            jwt.verify(token, key, (err, admin) => {
                if(err) {
                    res.status = 403;
                    res.write(JSON.stringify(
                            {
                                mes: 'Token Inavlid'
                            }
                        )
                    )
                    res.end();
                }
                
                else {
                    req.tokenAdmin = admin; 
                    next(req, res, next);
                }
            })
        }
    }
    else {
        res.status = 403;
        res.write(JSON.stringify(
            {
                mes: 'you are not authenticate'
            }
        ))
        res.end();
    }
    
}

verify = (req, res, next) => {
    const { authorization } = req.headers;
    if( authorization ) {
        
        const token = authorization.split(' ')[1];
        if(validTokens.indexOf(token) === -1){
            res.status = 403;
            res.write(JSON.stringify
                (
                    {
                        mes: 'Token Inavlid'
                    }
                )
            )
            res.end();

        }
        else {
            jwt.verify(token, process.env.SECRET_ADMIN_KEY_TOKEN, (err, admin) => {
                if(err) {
                    jwt.verify(token, process.env.SECRET_USER_KEY_TOKEN, (err, user) => {
                        if(err){
                            res.status = 403;
                            res.write(JSON.stringify
                                (
                                    {
                                        mes: 'Token expired'
                                    }
                                )
                            )
                            res.end();
                        }
                        else {
                            req.tokenUser = user; 
                            next(req, res, next);
                        }
                    })
                }
                else {
                    req.tokenAdmin = admin;
                    next(req, res, next);
                }
            })
        }
    }
    else {
        res.status = 403;
        res.write(JSON.stringify(
            {
                mes: 'you are not authenticate'
            }
        ))
        res.end();
    }
    
}

function generateAccessTokenUser(user) {
    try {
        return jwt.sign({ publicKey: user.publicKey, email: user.email }, process.env.SECRET_USER_KEY_TOKEN, { expiresIn: "1d" });
    }
    catch (err) {
        console.log(err);
    }
}

function generateAccessTokenAdmin(admin) {
    try {
        return jwt.sign({ publicKey: admin.publicKey, email: admin.email }, process.env.SECRET_ADMIN_KEY_TOKEN, { expiresIn: "1d" });
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    verify,
    verifyAdmin,
    verifyUser,
    generateAccessTokenAdmin,
    generateAccessTokenUser,
    validTokens

};
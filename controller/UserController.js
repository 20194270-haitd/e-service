const Users = require ('../model/Users');
const mongoose = require('mongoose');
const delay = t => new Promise(resolve => setTimeout(resolve, t));

async function getUsers(req, res, next) {
    try{
        const { userId, email, publicKey, page } = req.url.query;
        if(userId){
            const users = await Users.findById(new mongoose.Types.ObjectId(userId)).populate(
                {
                    path: 'cart',
                }
            );
            res.write(JSON.stringify(users));
            res.end();
            return;
        }
        else if(email && publicKey) {
            const users = await Users.find({ email: email, publicKey: publicKey}).populate(
                {
                    path: 'cart',
                }
            );
            res.write(JSON.stringify(users));
            res.end();
            return;
        }
        else{
            const users = await Users.find().populate(
                {
                    path: 'cart',
                }
            );
            res.write(JSON.stringify(users));
            res.end();
        }
    }
    catch(err) {
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}

async function addUser(req, res, next) {
    try{
        const newUser = req.body;
        const user  = await Users.create(newUser);
        res.write(JSON.stringify(user));
        res.end();
    }
    catch(err) {
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}

async function updateUser(req, res, next) {
    try{
        const { body } = req;
        
        if(!await Users.findById(new mongoose.Types.ObjectId(body._id))){
            res.write(JSON.stringify(
                {
                    err: 'not exit',
                    code: 300,
                }
            ));
            res.end();
            return;
        }
        await Users.findByIdAndUpdate(new mongoose.Types.ObjectId(body._id), body);
        res.write(JSON.stringify(body));
        res.end();
    }
    catch(err) {
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}

async function deleteUser(req, res, next) {
    try{
        const { body } = req;
        if(!await Users.findById(new mongoose.Types.ObjectId(body._id))){
            res.write(JSON.stringify(
                {
                    err: 'not exit',
                    code: 300,
                }
            ));
            res.end();
            return;
        }

        await Users.findByIdAndDelete( new mongoose.Types.ObjectId(body._id));
        res.write(JSON.stringify(
            {
                mes: 'success',
            }
        ));   
        res.end();
    }
    catch(err) {
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}




module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}

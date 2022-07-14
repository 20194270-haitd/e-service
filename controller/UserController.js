const Users = require ('../model/Users');
const mongoose = require('mongoose');
const delay = t => new Promise(resolve => setTimeout(resolve, t));

async function getUsers(req, res, next) {
    try{
        const { userId, email, page, perPage } = req.url.query;
        if(userId){
            const users = await Users.findById(new mongoose.Types.ObjectId(userId), { publicKey: 0 }).populate(
                {
                    path: 'cart',
                }
            );
            res.write(JSON.stringify(users));
            res.end();
            return;
        }
        else if(email) {
            const users = await Users.find({ email: email}, { publicKey: 0 }).populate(
                {
                    path: 'cart',
                }
            );
            res.write(JSON.stringify(users));
            res.end();
            return;
        }
        else if( page && perPage) {
            const skip = (page - 1) * perPage;
            if(skip >= 0){
                const books = await Users.find({}, { publicKey: 0 }).limit(perPage).skip().populate(
                    {
                        path: 'cart',
                    });
                res.write(JSON.stringify(books));
                res.end();
                return;
            }
            else throw({
                err: 'page too small'
            })
        }
        else{
            const users = await Users.find({}, { publicKey: 0 }).populate(
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

async function getUsersByEmail(req, res, next) {
    try{
        const { email } = req.url.query;
        if(email){
            const user = await Users.findOne({email: email}, { publicKey: 0 }).populate(
                {
                    path: 'cart',
                }
            );
            res.write(JSON.stringify(user));
            res.end();
        }
        else {
            res.write(JSON.stringify(
                {
                    err: 'bad request',
                    code: 400,
                }
            ));
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
        const { userId } = req.url.query;
        if(!userId) {
            res.write(JSON.stringify(
                {
                    err: 'bad request',
                    code: 400,
                }
            ));
            res.end();
            return;
        }
        if(body._id !== userId){
            res.write(JSON.stringify(
                {
                    err: 'Query id doesnt match body id',
                    code: 400,
                }
            ));
            res.end();
            return;
        }
        if(!await Users.findById(new mongoose.Types.ObjectId(userId))){
            res.write(JSON.stringify(
                {
                    err: 'not exit',
                    code: 300,
                }
            ));
            res.end();
            return;
        }
        await Users.findByIdAndUpdate(new mongoose.Types.ObjectId(userId), body);
        res.write(JSON.stringify(body));
        res.end();
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}

async function deleteUser(req, res, next) {
    try{
        const { body } = req;
        const { userId } = req.url.query;
        if(!userId) {
            res.write(JSON.stringify(
                {
                    err: 'bad request',
                    code: 400,
                }
            ));
            res.end();
            return;
        }

        if(!await Users.findById(new mongoose.Types.ObjectId(userId))){
            res.write(JSON.stringify(
                {
                    err: 'not exit',
                    code: 300,
                }
            ));
            res.end();
            return;
        }

        await Users.findByIdAndDelete( new mongoose.Types.ObjectId(userId));
        res.write(JSON.stringify(
            {
                mes: 'success',
            }
        ));   
        res.end();
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}




module.exports = {
    getUsers,
    getUsersByEmail,
    addUser,
    updateUser,
    deleteUser
}

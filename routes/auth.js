const express = require('express');
const router = express.Router();
const admin = require('../configs/firebase')
const user = require('../models/user')

router.get('/login', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ message: "Invalid token" });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            const userExists = await user.findOne({ "user_id": decodeValue.user_id })
            if (!userExists) {
                createNewUser(decodeValue, req, res)
            } else {
                updateNewUserData(decodeValue, req, res)
            }
        } else {
            return res.status(500).json({
                success: false,
                message: "Un authrized"
            })
        }
    } catch (error) {
        return res.status(505).json({
            success: false,
            message: error
        });
    }
})

const createNewUser = async (decodeValue, req, res) => {
    const newUser = user({
        name: decodeValue.name,
        email: decodeValue.email,
        imgURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time,
    })
    newUser.save().then(result => {
        res.status(200).send({
            success: true,
            message: "Đăng nhập thành công"
        })
    })
        .catch(error => {
            console.log(error);
            res.status(500).send({
                success: true,
                message: "Đăng nhập không thành công"
            })
        })
}

const updateNewUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id }

    const options = {
        upsert: true,
        new: true,
    }

    await user.findOneAndUpdate(filter, { auth_time: decodeValue.auth_time }, options)
        .then((result) => {
            res.status(200).json({
                success: true,
                data: result,
            })
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: error,
            })
        })
}

router.get('/', async function (req, res) {
    await user.find().then((users) => {
        return res.status(200).json({
            success: true,
            data: users
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    })
})

router.put('/updateRole/:userId', async function (req, res) {
    const id = req.params.userId;
    const role = req.body.role;
    user.findByIdAndUpdate(id, { role: role })
        .then((result) => {
            return res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        })
})

router.delete("/:userId", async (req, res) => {
    const filter = { _id: req.params.userId };

    const result = await user.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
    }
});

module.exports = router
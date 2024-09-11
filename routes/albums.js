const express = require('express');
const album = require('../models/album');
const router = express.Router();

router.get('/', async function (req, res, next) {
    await album
        .find()
        .then((albums) => {
            return res.status(200).json({
                message: "album",
                data: albums
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Data not found",
                error: err
            })
        })
})

router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    await album
        .findById(id)
        .then((album) => {
            return res.status(200).json({
                message: "album",
                data: album
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Data not found",
                error: err
            })
        })
})

router.post('/', async function (req, res, next) {
    const newAlbum = album({
        name: req.body.name,
        imageURL: req.body.imageURL,
    })
    await newAlbum.save()
        .then((album) => {
            return res.status(200).json({
                message: "Create new album successfully",
                data: album
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Create new album failed",
                error: err
            })
        })
})

router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    await album
        .findByIdAndDelete(id)
        .then((album) => {
            return res.status(200).json({
                message: "Deleted album",
                data: album
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Failed",
                error: err
            })
        })
})

router.put('/:id', async function (req, res, next) {
    const id = req.params.id

    const options = {
        upsert: true,
        new: true,
    }

    await album
        .findByIdAndUpdate(id, {
            name: req.body.name,
            imageURL: req.body.imageURL,
        },
            options
        )
        .then((album) => {
            return res.status(200).json({
                message: "album",
                data: album
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Failed",
                error: err
            })
        })
})

module.exports = router
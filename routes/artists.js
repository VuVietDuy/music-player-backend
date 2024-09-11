const express = require('express');
const router = express.Router();
const artist = require('../models/artist');

router.post('/', async function (req, res, next) {

    const newArtist = artist({
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    })

    await newArtist
        .save()
        .then((artist) => {
            return res.status(200).json({
                message: "Create new artist successfully",
                data: artist
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Create new artist failed",
                error: err
            })
        })
})

router.get('/', async function (req, res, next) {
    const options = {
        sort: {
            createdAt: 1,
        },
    };
    await artist
        .find()
        .then((artists) => {
            return res.status(200).json({
                message: "Artist",
                data: artists
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
    await artist
        .findById(id)
        .then((artist) => {
            return res.status(200).json({
                message: "Artist",
                data: artist
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

    await artist
        .findByIdAndUpdate(id, {
            name: req.body.name,
            imageURL: req.body.imageURL,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
        },
            options
        )
        .then((artist) => {
            return res.status(200).json({
                message: "Artist",
                data: artist
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Failed",
                error: err
            })
        })
})

router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    await artist
        .findByIdAndDelete(id)
        .then((artist) => {
            return res.status(200).json({
                message: "Deleted artist",
                data: artist
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
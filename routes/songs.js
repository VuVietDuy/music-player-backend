const express = require('express');
const song = require('../models/song');
const router = express.Router();

router.post('/', async function (req, res, next) {

    const newSong = song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        language: req.body.language,
        artist: req.body.artist,
        category: req.body.category,
    })

    await newSong
        .save()
        .then((song) => {
            return res.status(200).json({
                message: "Create new song successfully",
                data: song
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Create new song failed",
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
    await song
        .find()
        .then((songs) => {
            return res.status(200).json({
                message: "song",
                data: songs
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
    await song
        .findById(id)
        .then((song) => {
            return res.status(200).json({
                message: "song",
                data: song
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

    await song
        .findByIdAndUpdate(id, {
            name: req.body.name,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            album: req.body.album,
            language: req.body.language,
            artist: req.body.artist,
            category: req.body.category,
        },
            options
        )
        .then((song) => {
            return res.status(200).json({
                message: "song",
                data: song
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
    await song
        .findByIdAndDelete(id)
        .then((song) => {
            return res.status(200).json({
                success: true,
                message: "Deleted song",
                data: song
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
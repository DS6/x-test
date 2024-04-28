/*
I clarify that this is not necessary to do, this path can be directly in the main file (app.js).
Simply for greater convenience I have put it in a separate folder.
*/

const express = require('express');
   path = require('path'),
   fs = require('fs'),
   router = express.Router(),
   favicon = require('serve-favicon'),
   Func = new (require('../functions/index'));

router.use(favicon(process.cwd() + '/public/favicon.ico')) // Add an icon to my page.

router.get('/', async (req, res) => { // Main route.
    res.render(process.cwd() + '/public/index', {
        data: {
            title: 'Homepage',
            message: 'Home page, SOMETHING SHOULD BE SHOWN HERE I THINK.'
        }
    })
})

router.get('/minify', async (req, res) => {
    let { code, type } = req.query
    if (code && type) {
        const json = await Func.minify(code, type);
        if (!json.status) return res.json(json);
        return res.json(json);
    }
    res.redirect('/minify?code=INPUT&type=js');
});

module.exports = router
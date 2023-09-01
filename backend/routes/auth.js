const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');

//Create user: POST -> /api/auth
router.post('/', [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 chars').isLength({min:5})
], (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error: "This email ID already exists", message : err.message})});
});

module.exports = router;
// console.log(req.body);
// const newuser = User(req.body);
// newuser.save();
// res.send(req.body);
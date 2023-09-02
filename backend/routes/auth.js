const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');

//Create user: POST -> "/api/auth/createuser". No login req.
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 chars').isLength({min:5})
], async (req, res) => {
    //Validate data format
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    //Check if email already exists
    try{
    let exists = await User.findOne({email : req.body.email});
    if(exists){
        return res.status(400).json({error: "A user with this email already exists."});
    }
    //Create new user
    let user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
     })
     res.json(user);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("An error occured :(");
    }
});

module.exports = router;
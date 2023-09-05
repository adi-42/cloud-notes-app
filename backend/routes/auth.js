const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "reactwebappwithjwtbcrypt" //to be hidden in env variables

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
    const salt = await bcrypt.genSalt(10);
    const securepass = await bcrypt.hash(req.body.password, salt);
    //Create new user
    let user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : securepass
     })
    const data = {
        user : {id : user.id}
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log(authtoken);
    res.json({authtoken});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("An error occured :(");
    }
});

//Authenticate user: POST -> "/api/auth/login". No Login token req.
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    //Validate data format
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    //Match password from request with hashedpassword from db
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "Incorrect login credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error : "Incorrect login credentials"});
        }
        const data = {
            user : {id : user.id}
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Logged in user details: POST -> "/api/auth/getuser". Login token req.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
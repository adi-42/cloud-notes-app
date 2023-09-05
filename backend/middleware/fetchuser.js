var jwt = require('jsonwebtoken');
const JWT_SECRET = "reactwebappwithjwtbcrypt"

const fetchuser = async (req, res, next)=>{
    //gets user from JWT & add ID to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Invalid session token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Invalid session token"});
    }

}

module.exports = fetchuser;
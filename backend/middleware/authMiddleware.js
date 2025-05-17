import jwt from 'jsonwebtoken'
import User from '../models/User.js';


export const authUser = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.user._id).select('-password');
            next();

        } catch (error) {
            console.log('Error in authUser middleware',error);
            return res.status(401).json({message:'Not authorized, token failed'});            
        }
    }
    else{
        return res.status(401).json({message:'Not authorized, no token provided'});  
    }
}

export const checkAdmin = (req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        return res.status(403).json({message:'You are not authorized to access this route'})
    }
}
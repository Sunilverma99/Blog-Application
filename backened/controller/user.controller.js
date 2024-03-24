import User from '../models/user.model.js';
import bycrypt from 'bcrypt';
import errHandler from "../utlies/error.js"
const user=(req,res)=>{
    res.send("hello sunil");
} 
const userUpdate=async(req,res,next)=>{
    console.log(req.user);
    console.log(req.params.id);
    if (req.user.id !== req.params.id) {
        return next(errHandler(403, 'You are not allowed to update this user'));
      }
      if (req.body.password) {
        if (req.body.password.length < 6) {
          return next(errHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bycrypt.hashSync(req.body.password, 10);
      }
      if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
          return next(
            errHandler(400, 'Username must be between 7 and 20 characters')
          );
        }
        if (req.body.username.includes(' ')) {
          return next(errHandler(400, 'Username cannot contain spaces'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(
            errHandler(400, 'Username can only contain letters and numbers')
          );
        }
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              userName: req.body.userName,
              email: req.body.email,
              photoUrl: req.body.photoUrl,
              password: req.body.password,
            },
          },
          { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
      } catch (error) {
        next(error);
      }
    };
    
export {user,userUpdate};
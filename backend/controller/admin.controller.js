import User from "../models/User.js";

export const getUsers = async (req,res) => {
    
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

export const addUser = async (req,res) => {
      const {name,email,password,role} = req.body;
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:'User already exists'})
        }
        user = new User({
            name,email,password,role:role||'customer'
        })
        await user.save()
        res.status(201).json({message:"User created successfully",user})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

//@route put update /api/admin/users/:id 
//@desc update user info admin only - name ,email, role
//@access Private/Admin

export const updateUser = async (req,res) => {
    const {name,email,role} = req.body;
    const {id} = req.params;
    try {
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
     
        user.name = name || user.name
        user.email = email || user.email
        user.role = role || user.role

        const updatedUser = await user.save();
        res.json({message:'User updated successfully',updatedUser})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
}

//@route  delete /api/admin/users/:id 
//@desc delete user
//@access Private/Admin


export const deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id)
        if(user){
            await user.deleteOne();
            res.json({message:'User deleted successfully'})
        }
        else{
            return res.status(404).json({message:'User not found'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}
import Subscriber from "../models/Subscriber.js";

export const handleSubscribe = async (req,res) => {
    
       const {email} = req.body;
       
    try {
        if(!email){
            return res.status(400).json({message: 'Email is required'});
        }
        let subscriber = await Subscriber.findOne({email})
        if(subscriber){
            return res.status(400).json({message: 'Subscriber already exists'});
        }
        subscriber = new Subscriber({
            email
        })
        await subscriber.save()
        res.json({message: 'Subscriber created successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'server error'})
    }
}

import Product from "../models/Product.js";


export const getAllProducts = async (req,res) => {
    
    try {
        const products = await Product.find({});
        res.json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}

//delete a product
export const deleteAdminProduct = async (req,res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
            }
            await Product.deleteOne();
       return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
         console.error(error);
        res.status(500).json({ message:'server error' });
    }
}

//update a product
export const updateAdminProduct = async (req,res) => {
    const {id} = req.params;
    
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            
        });
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
       
        // await product.save();
        return res.status(200).json({ message: 'Product updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//get a single product
export const getSingleProduct = async (req,res) =>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
        }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}
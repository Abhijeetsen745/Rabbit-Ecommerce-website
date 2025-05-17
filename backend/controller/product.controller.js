import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weigtht,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weigtht,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (product) {
      await product.deleteOne();
      return res
        .status(200)
        .json({ message: "Product deleted successfully", deleteProduct });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//get all products + filters
export const getProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      gender,
      color,
      category,
      material,
      brand,
      minPrice,
      maxPrice,
      sortBy,
      search,
      limit,
    } = req.query;

    let query = {};
    if (collection && collection.toLowerCase() != "all") {
      query.collections = collection;
    }
    if (category && category.toLowerCase() != "all") {
      query.category = category;
    }
    if (gender) {
      query.gender = gender;
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (minPrice || maxPrice) {
       query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    if(search){
      query.$or=[
        {name:{$regex:search,$options:'i'}},
        {description:{$regex:search,$options:'i'}}
      ]
    }
    let sort={}
    if(sortBy){
      switch (sortBy) {
        case 'priceAsc':
          sort={price:1}
          break;
          case 'priceDesc':
          sort={price:-1}
          break;
          case 'popularity':
          sort={rating:-1}
          break;
      
        default:
          break;
      }

    }
    const product = await Product.find(query).sort(sort).limit(Number(limit)||0)
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getBestSellerProducts = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({rating:-1});
    if(bestSeller){
      res.json(bestSeller);
    }else{
      res.json({message:"No best seller product found"})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSimilarProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getNewArrivals = async (req, res) => {
  try {
    const newArrival = await Product.find().sort({createdAt:-1}).limit(8)
    res.json(newArrival);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });    
  }
}
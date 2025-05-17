import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId: guestId });
  }
  return null;
};

//add a product to the cart for a guest or logged in user
export const addCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    //determine if user is logged in or guest
    let cart = await getCart(userId, guestId);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId.toString() &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId: productId,
          name: product.name,
          image: product.images[0].url,
          size: size,
          color: color,
          price: product.price,
          quantity: quantity,
        });
      }

      //recalculate total price
      cart.totalPrice = cart.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      await cart.save();
      res.status(201).json({ message: "Product updated to cart", cart });
    } else {
      //create a new cart
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId: productId,
            name: product.name,
            image: product.images[0].url,
            size: size,
            color: color,
            price: product.price,
            quantity: quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      res.status(201).json({ message: "Product added to cart", cart: newCart });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//update product quantity in the cart for a guest or logged in user
export const updateProductQuantity = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId.toString() &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); //remove product
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res
        .status(200)
        .json({ message: "Product quantity updated", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//delete a cart product
export const deleteCart = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId.toString() &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res
        .status(200)
        .json({ message: "Product deleted from cart", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCartItems = async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Yeh function login ke time guest cart ko user cart mein merge karta hai.
//merge guest cart into user cart on login
export const mergeGuestCart = async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId: guestId });
    const userCart = await Cart.findOne({ user: req.user.id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        //merge both cart
        guestCart.products.forEach((product) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === product.productId.toString() &&
              p.size === product.size &&
              p.color === product.color
          );
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += product.quantity;
          } else {
            userCart.products.push(product);
          }         
        });
        userCart.totalPrice = userCart.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        await userCart.save();
        //remove guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId: guestId });
          
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Failed to remove guest cart" });
          
        }
        return res.status(200).json({ message: "Guest cart merged with user cart", userCart });
      }else{
        //if user cart is empty, assign guest cart to user
        guestCart.user = req.user._id;
        guestCart.guestId=undefined;
        await guestCart.save();
        return res.status(200).json({ message: "Guest cart merged with user cart", userCart });
      } 
    }else{
      if(userCart){
        return res.status(404).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });

    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

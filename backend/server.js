import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import SubscriberRoutes from './routes/SubscriberRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import productAdminRotues from './routes/productAdminRotues.js'
import adminOrderRoutes from './routes/adminOrderRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://rabbit-ecommerce-website-fhju.vercel.app',
  credentials: true
}));
app.use('/static', express.static(path.join(__dirname, 'public')));

//connect to db
connectDb();

// Log Cloudinary config
// console.log('Cloudinary configured with:');
// console.log(`Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
// console.log(`API Key: ${process.env.CLOUDINARY_API_KEY}`);

app.get("/", (req, res) => {
  res.send("Welcome to Rabbit API.");
});

//routes
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/checkout',checkoutRoutes)
app.use('/api/order',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/subscribe',SubscriberRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/admin/products',productAdminRotues);
app.use('/api/admin/orders',adminOrderRoutes);


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

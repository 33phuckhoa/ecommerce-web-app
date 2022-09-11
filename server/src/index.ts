import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRoute from './routes/auth';
import productRoute from './routes/product';
import shopRoute from './routes/shop';

const app = express();
app.use(express.json({limit: "30mb"}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//Route
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/shop", shopRoute);

const port: string | undefined = process.env.PORT;

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log("Mongoose Db connected successfully");

        app.listen(port, () => console.log(`Server listen app from http://locahost:${port}`));
    } catch (error) {
        console.log("Mongoose Db connected failure");
        console.log(error);
        
    }
}

connect();
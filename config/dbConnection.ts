import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || '', {
        });
        console.log("Database connected:", 
        connect.connection.host,
        connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDb;

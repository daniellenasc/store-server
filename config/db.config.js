import mongoose from "mongoose";

async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to the database: ${dbConnection.connection.name}`);
  } catch (error) {
    console.error(error);
  }
}

export default connect;

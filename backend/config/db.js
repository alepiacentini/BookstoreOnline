import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connessione a MongoDB riuscita');
  } catch (err) {
    console.error('❌ Errore connessione MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;

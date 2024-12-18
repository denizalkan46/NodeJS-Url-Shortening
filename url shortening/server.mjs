import express from 'express';
import connectDB from './config/db.mjs';
import authRoutes from './routes/authRoutes.mjs';
import urlRoutes from './routes/urlRoutes.mjs';
import { redirectUrl } from './controllers/urlController.mjs'; // Doğrudan kontrolcüden import
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Ana rota (kısaltılmış URL yönlendirme)
app.use('/:shortUrl', redirectUrl);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Sunucu ${process.env.PORT || 5000} portunda çalışıyor`);
});

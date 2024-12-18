import express from 'express';
import { shortenUrl, getUrls, redirectUrl } from '../controllers/urlController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/shorten', authMiddleware, shortenUrl);
router.get('/', authMiddleware, getUrls);

router.get('/:shortUrl', redirectUrl); // Kısaltılmış URL'yi yönlendirme

export default router;

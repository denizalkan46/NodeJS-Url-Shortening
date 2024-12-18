import { nanoid } from 'nanoid';
import URLModel from '../models/urlModel.mjs';

// URL kısaltma
export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = nanoid(7);
  try {
    const url = new URLModel({
      originalUrl,
      shortUrl,
      user: req.user.id,
    });

    await url.save();
    res.status(201).json({ message: 'URL başarıyla kısaltıldı', shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'URL kısaltılırken bir hata oluştu' });
  }
};

// URL'leri listeleme
export const getUrls = async (req, res) => {
  try {
    const urls = await URLModel.find({ user: req.user.id });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'URL\'ler alınırken bir hata oluştu' });
  }
};

// Kısaltılmış URL'yi yönlendirme
export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await URLModel.findOne({ shortUrl });
    if (url) {
      return res.redirect(url.originalUrl);
    }
    res.status(404).json({ error: 'URL bulunamadı' });
  } catch (error) {
    res.status(500).json({ error: 'Yönlendirme sırasında bir hata oluştu' });
  }
};

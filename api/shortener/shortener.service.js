const ShortenerModel = require("./helpers/shortener.model");

class ShortenerService {
  async create(originalUrl, shortUrl, id) {
    if (!originalUrl || !shortUrl) {
      throw new Error("La URL original y el shortUrl son requeridos");
    }

    const existingUrl = await ShortenerModel.findOne({ shortUrl });
    if (existingUrl) {
      throw new Error("El shortUrl ya está en uso");
    }

    const url = new ShortenerModel({ originalUrl, shortUrl, _id: id });
    return await url.save();
  }

  async findAll() {
    return await ShortenerModel.find().sort({ _id: -1 });
  }

  async findOne(id) {
    return await ShortenerModel.findById(id);
  }

  async findOneShortUrl(shortUrl) {
    const url = await ShortenerModel.findOne({ shortUrl });
    if (!url) {
      throw new Error("URL no encontrada");
    }
    return { shortUrl, visitCount: url.visitCount };
  }

  async incrementVisitCount(shortUrl) {
    const url = await ShortenerModel.findOne({ shortUrl });
    if (!url) {
      throw new Error("URL no encontrada");
    }

    url.visitCount += 1;
    await url.save();
    return url;
  }
}

module.exports = new ShortenerService();

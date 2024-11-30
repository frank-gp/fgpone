const ShortenerModel = require("./helpers/shortener.model");
const shortenerService = require("./shortener.service");

class ShortenerController {
  async create(req, res) {
    try {
      const { originalUrl, shortUrl } = req.body;
      const id =
        req.body._id ||
        new Date()
          .toISOString()
          .replace(/[^0-9]/g, "")
          .slice(2, 14);
      const result = await shortenerService.create(originalUrl, shortUrl, id);
      res.status(201).json({
        originalUrl,
        shortUrl: `http://localhost:3000/${shortUrl}`,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const urls = await shortenerService.findAll();
      res.json(urls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req, res) {
    try {
      const result = await shortenerService.findOne(req.params.id);
      if (!result) {
        return res.status(404).json({ error: "Elemento no encontrado" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchQuery(req, res) {
    try {
      const { query } = req.params; // Obtener el parámetro "query" de la URL

      // Buscar notas cuyo ID comience con el texto proporcionado y ordenarlas en orden descendente
      const matchingNotes = await ShortenerModel.find({
        _id: { $regex: `^${query}`, $options: "i" }, // Buscando por _id
      }).sort({ _id: -1 }); // Ordenar en orden descendente por _id

      if (!matchingNotes || matchingNotes.length === 0) {
        return res.status(404).json({ error: "Elemento no encontrada" });
      }

      res.status(200).json(matchingNotes);
    } catch (error) {
      res.status(500).json({ error: "Error al buscar la Elemento por ID" });
    }
  }

  async update(req, res) {
    try {
      const updatedNote = await ShortenerModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, runValidators: true });
      if (!updatedNote) {
        return res.status(404).json({ error: "Elemento no encontrada" });
      }
      res.json(updatedNote);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar la nota" });
    }
  }

  async remove(req, res) {
    console.log("delete");
    try {
      const deletedNote = await ShortenerModel.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        return res.status(404).json({ error: "Elemento no encontrada" });
      }
      res.json({ message: "Elemento eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la nota" });
    }
  }

  async deleteMany(req, res) {
    try {
      const result = await ShortenerModel.deleteMany({});
      res.json({ message: "Todas las notas han sido eliminadas", deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar todas las notas" });
    }
  }

  async reset_visit_count(req, res) {
    try {
      // Update all documents to set visitCount to 0
      await ShortenerModel.updateMany({}, { visitCount: 0 });
      res.status(200).json({ message: "Visit counts have been reset for all URLs" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error resetting visit counts" });
    }
  }

  async findOneShortUrl(req, res) {
    try {
      const stats = await shortenerService.findOneShortUrl(req.params.shortUrl);
      res.json(stats);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async redirect(req, res, next) {
    const { shortUrl } = req.params;
    const queryParams = req.query; // Captura cualquier parámetro adicional en la URL corta
    try {
      // Buscar la URL original en la base de datos
      const url = await ShortenerModel.findOne({ shortUrl });

      // Si no se encuentra la URL, continuar con la lógica personalizada
      if (!url) {
        console.log(`URL corta no encontrada para: ${shortUrl}`);
        // Aquí puedes añadir cualquier lógica adicional o personalización
        // Por ejemplo, puedes decidir mostrar una página estática o procesar alguna acción
        return next(); // Pasar al siguiente middleware o ruta
      }

      // Incrementar el contador de visitas si la URL existe
      url.visitCount += 1;
      await url.save();

      // Si la URL original contiene parámetros adicionales, agregar los nuevos parámetros
      const redirectUrl = new URL(url.originalUrl);
      Object.keys(queryParams).forEach((key) => {
        redirectUrl.searchParams.append(key, queryParams[key]);
      });

      // Redirigir a la URL original con los parámetros adicionales
      return res.redirect(301, redirectUrl.toString());
    } catch (error) {
      console.error("Error al redirigir:", error);
      return res.status(500).json({ error: "Error al procesar la redirección" });
    }
  }
}

module.exports = new ShortenerController();

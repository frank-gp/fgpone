const AuthModel = require("./helpers/db.model");
const Service = require("./service");

class Controller {
  async create(req, res) {
    try {
      const result = await Service.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const result = await Service.login(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const urls = await Service.findAll();
      res.json(urls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req, res) {
    try {
      const result = await Service.findOne(req.params.id);
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
      const { query } = req.query; // Obtener el parámetro "query" de la URL

      // Buscar notas cuyo ID comience con el texto proporcionado y ordenarlas en orden descendente
      const matchingNotes = await AuthModel.find({
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
      const updatedNote = await AuthModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, runValidators: true });
      if (!updatedNote) {
        return res.status(404).json({ error: "Elemento no encontrada" });
      }
      res.json(updatedNote);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar la nota" });
    }
  }

  async remove(req, res) {
    try {
      const deletedNote = await AuthModel.findByIdAndDelete(req.params.id);
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
      const result = await AuthModel.deleteMany({});
      res.json({ message: "Todas las notas han sido eliminadas", deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar todas las notas" });
    }
  }

  async findOneEmail(req, res) {
    try {
      const stats = await Service.findOneEmail(req.params.param);
      res.json(stats);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new Controller();

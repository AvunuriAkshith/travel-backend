const Place = require("../models/Place");

// GET filtered places
exports.getPlaces = async (req, res) => {
  try {
    const { state, category, rating, budget } = req.query;

    let filter = {};

    if (state) filter.state = state;
    if (category) filter.category = category;
    if (rating) filter.rating = { $gte: Number(rating) };
    if (budget) filter.budget = { $lte: Number(budget) };

    const places = await Place.find(filter);

    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET single place details
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.json(place);
  } catch (error) {
    res.status(404).json({ message: "Place not found" });
  }
};
// ADD a new place (Admin)
exports.addPlace = async (req, res) => {
  try {
    const imagePaths = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    const newPlace = new Place({
      name: req.body.name,
      state: req.body.state,
      category: req.body.category,
      rating: Number(req.body.rating),
      budget: Number(req.body.budget),   // 🔥 VERY IMPORTANT
      bestTime: req.body.bestTime,
      description: req.body.description,
      images: imagePaths
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);

  } catch (error) {
    console.log(error);   // 👈 add this to see backend error
    res.status(400).json({ message: error.message });
  }
};


// UPDATE PLACE
exports.updatePlace = async (req, res) => {
  try {
    const imagePaths = req.files && req.files.length > 0
      ? req.files.map(file => `/uploads/${file.filename}`)
      : undefined;

    const updatedData = {
      ...req.body,
      rating: Number(req.body.rating)
    };

    if (imagePaths) {
      updatedData.images = imagePaths;
    }

    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedPlace);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE PLACE
exports.deletePlace = async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Place deleted successfully" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


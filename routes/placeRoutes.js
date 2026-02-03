const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getPlaces,
  getPlaceById,
  addPlace,
  updatePlace,
  deletePlace
} = require("../controllers/placeController");


router.get("/", getPlaces);
router.get("/:id", getPlaceById);
router.post("/", upload.array("images", 5), addPlace);
router.put("/:id", upload.array("images", 5), updatePlace);
router.delete("/:id", deletePlace);



module.exports = router;

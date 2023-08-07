const express = require("express");
const {
  getPenelitian,
  getPenelitianById,
  createPenelitian,
  updatePenelitian,
  deletePenelitian,
} = require("../controllers/PenelitianController");
const {
  getPengabdian,
  getPengabdianById,
  createPengabdian,
  updatePengabdian,
  deletePengabdian,
} = require("../controllers/PengabdianController");
const { verifyUser, adminOnly } = require("../middleware/authUser.js");

const router = express.Router();

router.post("/penelitian", verifyUser, createPenelitian);
router.get("/penelitian", getPenelitian);
router.get("/penelitian/:id", verifyUser, getPenelitianById);
router.patch("/penelitian/:id", verifyUser, updatePenelitian);
router.delete("/penelitian/:id", verifyUser, deletePenelitian);

router.post("/pengabdian", verifyUser, createPengabdian);
router.get("/pengabdian", getPengabdian);
router.get("/pengabdian/:id", verifyUser, getPengabdianById);
router.patch("/pengabdian/:id", verifyUser, updatePengabdian);
router.delete("/pengabdian/:id", verifyUser, deletePengabdian);

module.exports = router;

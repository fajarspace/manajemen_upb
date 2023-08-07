const PenelitianModel = require("../models/PenelitianModel.js");
const UserModel = require("../models/UserModel.js");
const { Op } = require("sequelize");

exports.getPenelitian = async (req, res) => {
  try {
    const response = await PenelitianModel.findAll({
      attributes: ["uuid", "ketua", "anggota", "judul"],
      include: [
        {
          model: UserModel,
          attributes: ["nama", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getPenelitianById = async (req, res) => {
  try {
    const penelitian = await PenelitianModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!penelitian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await PenelitianModel.findOne({
      attributes: ["uuid", "ketua", "anggota", "judul"],
      where: {
        id: penelitian.id,
      },
      include: [
        {
          model: UserModel,
          attributes: ["nama", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createPenelitian = async (req, res) => {
  const { ketua, anggota, judul } = req.body;
  try {
    await PenelitianModel.create({
      ketua: ketua,
      anggota: anggota,
      judul: judul,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Penelitian berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updatePenelitian = async (req, res) => {
  try {
    const penelitian = await PenelitianModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!penelitian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { ketua, anggota, judul } = req.body;
    await PenelitianModel.update(
      {
        ketua,
        anggota,
        judul,
      },
      {
        where: {
          id: penelitian.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Penelitian berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deletePenelitian = async (req, res) => {
  try {
    const penelitian = await PenelitianModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!penelitian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { ketua, anggota, judul } = req.body;
    if (req.role === "admin") {
      await PenelitianModel.destroy({
        where: {
          id: penelitian.id,
        },
      });
    } else {
      if (req.userId !== penelitian.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await PenelitianModel.destroy({
        where: {
          [Op.and]: [{ id: penelitian.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus penelitian berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

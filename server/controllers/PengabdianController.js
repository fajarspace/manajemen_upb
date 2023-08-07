const PengabdianModel = require("../models/PengabdianModel.js");
const UserModel = require("../models/UserModel.js");
const { Op } = require("sequelize");

exports.getPengabdian = async (req, res) => {
  try {
    const response = await PengabdianModel.findAll({
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

exports.getPengabdianById = async (req, res) => {
  try {
    const pengabdian = await PengabdianModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pengabdian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await PengabdianModel.findOne({
      attributes: ["uuid", "ketua", "anggota", "judul"],
      where: {
        id: pengabdian.id,
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

exports.createPengabdian = async (req, res) => {
  const { ketua, anggota, judul } = req.body;
  try {
    await PengabdianModel.create({
      ketua: ketua,
      anggota: anggota,
      judul: judul,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Pengabdian berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updatePengabdian = async (req, res) => {
  try {
    const pengabdian = await PengabdianModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pengabdian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { ketua, anggota, judul } = req.body;
    await PengabdianModel.update(
      {
        ketua,
        anggota,
        judul,
      },
      {
        where: {
          id: pengabdian.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Pengabdian berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deletePengabdian = async (req, res) => {
  try {
    const pengabdian = await PengabdianModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pengabdian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { ketua, anggota, judul } = req.body;
    if (req.role === "admin") {
      await PengabdianModel.destroy({
        where: {
          id: pengabdian.id,
        },
      });
    } else {
      if (req.userId !== pengabdian.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await PengabdianModel.destroy({
        where: {
          [Op.and]: [{ id: pengabdian.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus pengabdian berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

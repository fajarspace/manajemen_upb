const PenelitianModel = require("../models/PenelitianModel.js");
const UserModel = require("../models/UserModel.js");
const { Op } = require("sequelize");
const path = require("path");
const multer = require("multer");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/berkas_penelitian/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

exports.getPenelitian = async (req, res) => {
  try {
    const response = await PenelitianModel.findAll({
      attributes: [
        "uuid",
        "ketua",
        "ketuaNidn",
        "ketuaJafung",
        "anggota1",
        "anggota1Nidn",
        "anggota1Jafung",
        "anggota2",
        "anggota2Nidn",
        "anggota2Jafung",
        "anggota3",
        "anggota3Nidn",
        "anggota3Jafung",
        "anggota4",
        "anggota4Nidn",
        "anggota4Jafung",
        "judul",
        "url",
        "status",
        "acc",
      ],
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
      attributes: [
        "uuid",
        "ketua",
        "ketuaNidn",
        "ketuaJafung",
        "anggota1",
        "anggota1Nidn",
        "anggota1Jafung",
        "anggota2",
        "anggota2Nidn",
        "anggota2Jafung",
        "anggota3",
        "anggota3Nidn",
        "anggota3Jafung",
        "anggota4",
        "anggota4Nidn",
        "anggota4Jafung",
        "judul",
        "url",
        "status",
        "acc",
      ],
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
  try {
    upload.single("penelitianAkhir")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading file:", err);
      }

      const {
        ketua,
        ketuaNidn,
        ketuaJafung,
        anggota1,
        anggota1Nidn,
        anggota1Jafung,
        anggota2,
        anggota2Nidn,
        anggota2Jafung,
        anggota3,
        anggota3Nidn,
        anggota3Jafung,
        anggota4,
        anggota4Nidn,
        anggota4Jafung,
        judul,
        status,
        acc,
      } = req.body;

      let fileUrl = null;
      let penelitianAkhirFilename = null;

      if (req.file) {
        const penelitianAkhirFile = req.file;
        penelitianAkhirFilename = penelitianAkhirFile.filename;
        fileUrl = `${req.protocol}://${req.get(
          "host"
        )}/public/berkas_penelitian/${penelitianAkhirFilename}`;
      }

      const newPenelitian = await PenelitianModel.create({
        ketua: ketua,
        ketuaNidn: ketuaNidn,
        ketuaJafung: ketuaJafung,
        anggota1: anggota1,
        anggota1Nidn: anggota1Nidn,
        anggota1Jafung: anggota1Jafung,
        anggota2: anggota2,
        anggota2Nidn: anggota2Nidn,
        anggota2Jafung: anggota2Jafung,
        anggota3: anggota3,
        anggota3Nidn: anggota3Nidn,
        anggota3Jafung: anggota3Jafung,
        anggota4: anggota4,
        anggota4Nidn: anggota4Nidn,
        anggota4Jafung: anggota4Jafung,
        judul: judul,
        status: status,
        penelitianAkhir: penelitianAkhirFilename,
        url: fileUrl,
        acc: acc,
        userId: req.userId,
      });

      res.status(201).json({
        msg: "Penelitian berhasil dibuat!",
        penelitian: newPenelitian,
      });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updatePenelitian = async (req, res) => {
  try {
    upload.single("penelitianAkhir")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "File upload error" });
      }

      const penelitianAkhirFile = req.file;
      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/berkas_penelitian/${penelitianAkhirFile.filename}`;
      const newPenelitian = await PenelitianModel.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!newPenelitian) {
        return res.status(404).json({ error: "Penelitian not found" });
      }
      const {
        ketua,
        ketuaNidn,
        ketuaJafung,
        anggota1,
        anggota1Nidn,
        anggota1Jafung,
        anggota2,
        anggota2Nidn,
        anggota2Jafung,
        anggota3,
        anggota3Nidn,
        anggota3Jafung,
        anggota4,
        anggota4Nidn,
        anggota4Jafung,
        judul,
        status,
        acc,
      } = req.body;
      // Update informasi penelitian
      newPenelitian.ketua = ketua;
      newPenelitian.ketuaNidn = ketuaNidn;
      newPenelitian.ketuaJafung = ketuaJafung;
      newPenelitian.anggota1 = anggota1;
      newPenelitian.anggota1Nidn = anggota1Nidn;
      newPenelitian.anggota1Jafung = anggota1Jafung;
      newPenelitian.anggota2 = anggota2;
      newPenelitian.anggota2Nidn = anggota2Nidn;
      newPenelitian.anggota2Jafung = anggota2Jafung;
      newPenelitian.anggota3 = anggota3;
      newPenelitian.anggota3Nidn = anggota3Nidn;
      newPenelitian.anggota3Jafung = anggota3Jafung;
      newPenelitian.anggota4 = anggota4;
      newPenelitian.anggota4Nidn = anggota4Nidn;
      newPenelitian.anggota4Jafung = anggota4Jafung;
      newPenelitian.judul = judul;
      newPenelitian.url = fileUrl;
      if (penelitianAkhirFile) {
        newPenelitian.penelitianAkhir = penelitianAkhirFile.filename;
      }
      newPenelitian.status = status;
      newPenelitian.acc = acc;
      await newPenelitian.save();

      res.status(200).json({
        msg: "Penelitian berhasil diperbarui",
        penelitian: newPenelitian,
      });
    });
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
    const filePath = `public/berkas_penelitian/${penelitian.penelitianAkhir}`;
    const fs = require("fs");
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Hapus data penelitian dari database
    await penelitian.destroy();

    if (!penelitian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      ketua,
      ketuaNidn,
      ketuaJafung,
      anggota1,
      anggota1Nidn,
      anggota1Jafung,
      anggota2,
      anggota2Nidn,
      anggota2Jafung,
      anggota3,
      anggota3Nidn,
      anggota3Jafung,
      anggota4,
      anggota4Nidn,
      anggota4Jafung,
      judul,
      status,
      acc,
    } = req.body;
    if (req.role === "dosen") {
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

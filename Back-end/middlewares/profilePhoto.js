const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: 'votre-cloud-name',
  api_key: 'votre-api-key',
  api_secret: 'votre-api-secret',
});

// Configuration de Mongoose
mongoose.connect('mongodb://localhost:27017/profile_upload', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    default: 'uploads/default-profile.png',
  },
});

const User = mongoose.model('User', UserSchema);

// Stockage avec Multer et Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile-pictures',
    format: async (req, file) => 'jpeg', // Format des images
    public_id: (req, file) => Date.now() + '-' + path.basename(file.originalname, path.extname(file.originalname)),
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers JPEG et PNG sont autorisés'), false);
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 Mo
});

// Middleware pour gérer les erreurs Multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

// Route pour mettre à jour la photo de profil
app.post('/upload-profile-picture/:userId', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!req.file) {
      return res.status(400).json({ message: 'Aucune image téléchargée.' });
    }

    // URL de l'image dans Cloudinary
    const imageUrl = req.file.path;

    // Met à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.status(200).json({
      message: 'Photo de profil mise à jour avec succès.',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Middleware pour gérer les erreurs générales
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur.' });
});

// Point d'entrée principal
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

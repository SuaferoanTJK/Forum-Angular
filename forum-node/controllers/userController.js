const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: "variables.env" });

exports.register = async (req, res) => {
  // Error messages of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  // Verify if user is already in DB
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "The user is already registered" });
  }

  // Create new user
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.role = "ROLE_USER";
  user.image = null;

  user.save((error, userStored) => {
    if (error) {
      res.status(400).json({ msg: "User creation failed" });
    } else {
      res.json({ userStored });
    }
  });
};

exports.authenticate = async (req, res) => {
  // Error messages of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  // Search if the user is registered
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "The user doesn't exists in our DB" });
  }

  // Verify password and authenticate
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
      },
      process.env.SECRET,
      { expiresIn: "8h" }
    );
    res.json({ token });
  } else {
    return res.status(401).json({ msg: "The password is incorrect" });
  }
};

exports.login = (req, res) => {
  res.json({ user: req.user });
};

exports.update = async (req, res) => {
  // Error messages of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const params = req.body;
  if (Object.keys(params).length > 0) {
    User.findByIdAndUpdate(req.user.id, params, (error) => {
      if (error) {
        return res.status(400).json({
          msg: "An user already has that email attached, use another one",
        });
      } else {
        return res.json({ userDataUpdated: params });
      }
    });
  } else {
    return res.status(400).json({ msg: "At least a field is required" });
  }
};

exports.uploadAvatar = (req, res) => {
  const multerSettings = {
    limits: { fileSize: 1024 * 1024 * 10 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads/usersAvatar");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };
  const upload = multer(multerSettings).single("file");

  upload(req, res, async (error) => {
    if (!error) {
      const userID = req.user.id;
      const params = { image: req.file.filename };
      User.findByIdAndUpdate(userID, params, () => {
        return res.json({ userDataUpdated: params });
      });
    } else {
      return res.status(401).json({ msg: "The file exceeds the size limit" });
    }
  });
};

exports.getAvatar = (req, res) => {
  const fileName = req.params.filename;
  const filePath = `./uploads/usersAvatar/${fileName}`;
  fs.exists(filePath, (exists) => {
    if (exists) {
      return res.sendFile(path.resolve(filePath));
    } else {
      return res.status(404).json({ msg: "No image found" });
    }
  });
};

exports.getUsers = (req, res) => {
  User.find().exec((error, users) => {
    if (error || !users) {
      res.status(404).json({ msg: "There are no users to show" });
    } else {
      res.json({ users });
    }
  });
};

exports.getUser = (req, res) => {
  const userID = req.params.id;
  User.findById(userID).exec((error, user) => {
    if (error || !user) {
      res.status(404).json({ msg: "User doesn't exists" });
    } else {
      res.json({ user });
    }
  });
};

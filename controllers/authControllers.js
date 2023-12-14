const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo electrónico",
      });
    }

    user = new User(req.body);

    //Encriptar contraseña del usuario
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Un error ha sucedido. Por favor comuníquese con el administrador.",
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "Login",
    email,
    password,
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Renew",
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};

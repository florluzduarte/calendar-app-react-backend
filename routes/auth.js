//Rutas de usuario / Auth
// Localhost + /api/auth

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  createUser,
  renewToken,
  loginUser,
} = require("../controllers/authControllers.js");
const { fieldValidator } = require("../middlewares/fieldValidator.js");

router.post(
  "/new",
  [
    //Middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name", "El nombre debe tener al menos 2 caracteres").isLength({
      min: 2,
    }),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;

// Rutas de eventos
// Localhost + /api/events

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsControllers");
const { tokenRenewer } = require("../middlewares/tokenRenewer");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { isDate } = require("../helpers/isDate");

//Router
const router = Router();

//Todas las rutas deben pasar por la validación de JWT
router.use(tokenRenewer);

//Rutas
router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "El título del evento es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;

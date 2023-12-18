const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (res = response) => {
  const events = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventSaved = await event.save();
    res.status(201).json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const userUid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró un evento con ese ID",
      });
    }

    if (event.user.toString() !== userUid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: userUid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const userUid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró un evento con ese ID",
      });
    }

    if (event.user.toString() !== userUid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para eliminar este evento",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      msg: "El evento ha sido eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }

  res.json({
    ok: true,
    msg: "deleteEvent",
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

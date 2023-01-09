"use strict";

/** Routes for schools. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Competition = require("../models/competition");

const registerNewSchema = require("../schemas/registerNew.json");
// const registerUpdateSchema = require("");

const router = new express.Router();

/** POST / { register } =>  { competition }
 *
 * school should be { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
 *
 * Returns { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
 *
 * Authorization required: currentUser or admin
 */

 router.post("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, registerNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const competition = await Competition.register(req.body);
    return res.status(201).json({ competition });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { school }
 * 
 * Patches school data.
 * 
 * fields can be: { school_name, logo_url, facebook_url, instagram_url }
 * 
 * Returns { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
 * 
 * Authorization required: admin
 */

router.patch("/:school_handle", ensureAdmin, async function(req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, schoolUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const school = await School.update(req.params.school_handle, req.body);
    return res.json({ school });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[school_handle] => { deleted: school_handle }
 * 
 * Authorization required: admin
 */

router.delete("/:school_handle", ensureAdmin, async function(req, res, next) {
  try {
    await School.remove(req.params.school_handle);
    return res.json({ deleted: req.params.school_handle });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

"use strict";

/** Routes for competitions. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Competition = require("../models/competition");

// const competitionNewSchema = require("");
// const competitionUpdateSchema = require("");

const router = new express.Router();

/** POST / { competition } => { competition } 
 * 
 * Authorization required: admin
*/
router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, competitionNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const competition = await Competition.create(req.body);
    return res.status(201).json({ competition });
  } catch (err) {
    return next(err);
  }
});

/** GET / => 
 *    { competitions: [ { competition, description, gender }, ...] }
 * 
 * Authorization required: none
 */
router.get("/", async function (req, res, next) {
  try {
    const competitions = await Competition.findAll();

    return res.json({ competitions });
  } catch(err) {
    return next(err);
  }
})

/** GET /[competition_handle] => { competition }
 * 
 * Competition is { 
 *  competition_handle, competition_name, description, gender, logo_url 
 * }
 * 
 * Authorization required: none
 */
router.get("/:competition_handle", async function (req, res, next) {
  try {
    const competition = await Competition.get(req.params.competition_handle);
    return res.json({ competition });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
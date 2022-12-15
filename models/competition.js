"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const School = require("./school");
const User = require("./user");

/** Related functions for competitions. */

class Competition {
  /** Find all competitions.
   * 
   * Returns [{ competition, description, gender, school_handle, username }]
   */
  static async findAll() {
    let query = `SELECT competition_handle AS "competitionHandle",
                        competition_name AS "competitionName", 
                        description,
                        gender,
                        logo_url AS "logoUrl"
                 FROM competitions`;
    
    const competitionRes = await db.query(query);

    return competitionRes.rows;
  }

  /** Given a competition, return data about a competition.
   * 
   * Returns { competition, description, gender, school_handle, username }
   */
  static async get(competition_handle) {
    const competitionRes = await db.query(
      `SELECT competition_handle AS "competitionHandle",
              competition_name AS "competitionName", 
              description,
              gender,
              logo_url AS "logoUrl"
       FROM competitions
       WHERE competition_handle = $1`, [competition_handle]);
    
    const competition = competitionRes.rows[0];

    if (!competition) throw new NotFoundError(`No competition: ${competition}`);

    return competition;
  }

}

module.exports = Competition;
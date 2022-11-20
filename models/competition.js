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
    let query = `SELECT competition, 
                        description,
                        school_handle,
                        username
                 FROM competitions`;
    
    const competitionRes = await db.query(query);

    return competitionRes.rows;
  }

  /** Given a competition, return data about a competition.
   * 
   * Returns { competition, description, gender, school_handle, username }
   */
  static async get(competition) {
    const competitionRes = await db.query(
      `SELECT competition,
              description,
              school_handle,
              username
       FROM competitions
       WHERE competition = $1`, [competition]);
    
    const competition = competitionRes.rows[0];

    if (!competition) throw new NotFoundError(`No competition: ${competition}`);

    return competitionRes;
  }

}
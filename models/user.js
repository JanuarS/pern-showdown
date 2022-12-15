"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

/** Related functions for users. */

class User {
  /** Authenticate user with username, password.
   * 
   * Returns { username, first_name, last_name, email, is_admin }
   * 
   * Throws UnauthorizedError if user not found or wrong password.
   */
  static async authenticate(username, password) {
    // try to find the user first
    const res = await db.query(`
        SELECT username,
               password,
               first_name AS "firstName",
               last_name AS "lastName",
               email, 
               is_admin AS "isAdmin"
        FROM users
        WHERE username=$1`,
        [username],
    );

    const user = res.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Sign up user with data.
   * 
   * Returns { username, first_name, last_name, email, gender, school, isAdmin }
   * 
   * Throws BadRequestError on duplicates
   */
  static async signup({ username, password, firstName, lastName, gender, email, school, isAdmin, paid, competition }) {
    const duplicateCheck = await db.query(
        `SELECT username
         FROM users
         WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const res = await db.query(
        `INSERT INTO users
         (username, 
          password, 
          first_name, 
          last_name, 
          gender,
          email, 
          school_handle,
          is_Admin, 
          paid,
          competition_handle)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING username, first_name AS "firstName", last_name AS "lastName", gender, email, school_handle AS "school", competition_handle AS "competition"`,
        [
          username,
          hashedPassword,
          firstName,
          lastName, 
          gender,
          email,
          school,
          isAdmin,
          paid,
          competition
        ],
    );

    const user = res.rows[0];

    return user;
  }

  /** Find all users.
   * 
   * Returns [{ username, first_name, last_name, gender, email, is_admin, paid }]
   */
  static async findAll() {
    let query = `SELECT username,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email,
                        gender, 
                        school_handle AS "school",
                        is_admin AS "isAdmin",
                        paid,
                        competition_handle AS "competition"
                 FROM users`;

    const usersRes = await db.query(query);
    return usersRes.rows;
  }

  /** Given a username, return data about user.
   * 
   * Returns { username, first_name, last_name, gender, email, is_admin, paid }
   */
  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              gender,
              school_handle AS "school",
              is_admin AS "isAdmin",
              paid,
              competition_handle AS "competition"
       FROM users
       WHERE username = $1`, [username]);

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Update user data with `data`.
   * 
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided data.
   * 
   * Returns { username, firstName, lastName, email, isAdmin, paid }
   * 
   * Throws NotFoundError if not found
   * 
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this 
   * or a serious security risks are opened.
   */
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        firstName: "first_name",
        lastName: "last_name",
        isAdmin: "is_admin",
      });
    const usernameVarIdx = "$" + (values.length + 1);

    const query = `UPDATE users
                   SET ${setCols}
                   WHERE username = ${usernameVarIdx}
                   RETURNING username,
                             first_name AS "firstName",`
  }

  /** Delete given user from database; returns user.
   * 
   * Throws NotFoundError if user not found.
   */
   static async remove(username) {
    const userRes = await db.query(
            `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    // return user;
  }
}


module.exports = User;

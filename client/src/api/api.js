import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";

/** API Class.
 * 
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elseware in the frontend.
 * 
 */

class ShowdownApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ShowdownApi.token}` };
    const params = (method === "get")
        ? data
        : {};
    
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  
  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user data. */
  static async update(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/signup`, data, "post");
    return res.token;
  }

  /** Get schools (filtered by handle if not undefined) */
  static async getSchools(handle) {
    let res = await this.request("schools", { handle });
    return res.schools;
  }

  /** Get details of a school by school_handle */
  static async getSchool(handle) {
    let res = await this.request(`schools/${handle}`);
    return res.school;
  }

  /** Add new school to schools database */
  static async newSchool(data) {
    let res = await this.request(`schools`, data, "post");
    return res.school;
  }

  /** COMPETITION ROUTES */

  /** Get competitions (filtered by handle if not undefined) */
  static async getCompetitions(handle) {
    let res = await this.request("competitions", { handle });
    return res.competitions;
  }

  /** Get details of a competition by competition_handle */
  static async getCompetition(handle) {
    let res = await this.request(`competitions/${handle}`);
    return res.competition;
  }

}


export default ShowdownApi;
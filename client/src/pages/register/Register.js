import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import ShowdownApi from "../../api/api";
import "./Register.css";

/** Register to Showdown competitions.
 * 
 * Shows registration page
 * 
 * Routed at /register
 * 
 * Routes => Register
 */

function Register({ registerComp }) {
  const initialState = {
    competition_handle: "",
    competition_name: "",
  }
  const { currentUser } = useContext(UserContext);
  const [competitions, setCompetitions] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  console.debug("Register", "currentUser:", currentUser);

  useEffect(function getCompetitionsOnMount() {
    console.debug("Competitions useEffect getCompetitionsOnMount");
    search();
  }, []);

  async function search(competition_handle) {
    let competitions = await ShowdownApi.getCompetitions(competition_handle);
    setCompetitions(competitions);
  }

  /** Handle form submit:
   * 
   * Calls login func prop and if successful, redirects to /home.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await registerComp(formData);
    if (res.success) {
      console.log(formData);
    } else {
      setFormErrors(res.errors);
      alert(`You don't have permission to register`);
    }
    setFormData(initialState);
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  function registerCompForm() {
    return (
      <div>
        <form onSubmit={handleSubmit}>

        { competitions 
          ? (
            <div>
              <div className="Competitions-list row">
                { competitions.map(c => (
                  <div>
                    { c.gender===currentUser.gender || c.gender===null ? 
                      <div className="form-check">
                        <input
                          id="competition_handle"
                          type="checkbox"
                          className="competition_handle"
                          value={formData.competition_id}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="competition_name">{c.competitionName}</label>
                      </div>
                      : 
                      <div className="form-check">
                        <input
                          id="competition_handle"
                          type="checkbox"
                          className="competition_handle"
                          value={formData.competition_id}
                          onChange={handleChange}
                          disabled
                        />
                        <label className="form-check-label" htmlFor="competition_name" disabled>{c.competitionName}</label>
                      </div>
                    }                  
                  </div>
                  )) }
              </div>
            </div>
          ) : "" }

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary"
              data-bs-dismiss="modal">
                Close
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={handleSubmit}>
                Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Register Here</h1>
        { currentUser ? registerCompForm() : "" }
      </div>
    </div>

  );
}

export default Register;
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../auth/UserContext";
import ShowdownApi from "../../api/api";
import SchoolCard from "./SchoolCard";

import "./Schools.css";

/** Show page with list of schools.
 * 
 * On mount, loads schools from API.
 * Re-loads filtered schools on submit from search form.
 * 
 * Routed at /schools
 * 
 * Routes => { SchoolCard, SearchForm }
 */

function Schools({ newSchool }) {
  const initialState = {
    school_handle: "",
    school_name: "",
    city: "",
    state: "",
    logoUrl: "",
    facebook_url: "",
    instagram_url: "",
  }
  const { currentUser } = useContext(UserContext);
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  
  console.debug(
    "Schools", 
    "formErrors:", formErrors
  );

  useEffect(function getCompaniesOnMount() {
    console.debug("Schools useEffect getSchoolsOnMount");
    search();
  }, []);

  async function search(school_handle) {
    let schools = await ShowdownApi.getSchools(school_handle);
    setSchools(schools);
  }

  /** Handle form submit:
   * 
   * Calls login func prop and if successful, redirects to /home.
   */
   async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await newSchool(formData);
    if (res.success) {
      console.log(formData);
    } else {
      setFormErrors(res.errors);
      alert(`You don't have permission to add a new school`);
    }
    setFormData(initialState);
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  function newSchoolForm() {
    return (
      <div>
        <button 
          type="button" 
          className="btn btn-primary" 
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
            Add New School
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add New School
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button> 
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="school_handle">School Handle</label>
                      <input
                        id="school_handle"
                        type="text"
                        name="school_handle"
                        placeholder="uta"
                        value={formData.school_handle}
                        onChange={handleChange}
                      />
                    </div>
        
                    <div className="mb-3">
                      <label htmlFor="school_name">School Name</label>
                      <input
                        id="school_name"
                        type="text"
                        name="school_name"
                        placeholder="University of Texas at Arlington"
                        value={formData.school_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="city">City</label>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="Arlington"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="state">State</label>
                      {/* <select className="form-select" aria-label="Default select example">
                        <option selected>State</option>
                        <option value="TX">TX - Texas</option>
                      </select> */}
                      <input
                        id="state"
                        type="text"
                        name="state"
                        placeholder="TX"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="logoUrl">Logo URL</label>
                      <input
                        id="logoUrl"
                        type="text"
                        name="logoUrl"
                        placeholder="logoUrl"
                        value={formData.logoUrl}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="facebook_url">Facebook URL</label>
                      <input
                        id="facebook_url"
                        type="text"
                        name="facebook_url"
                        placeholder="facebookUrl"
                        value={formData.facebook_url}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="instagram_url">Instagram URL</label>
                      <input
                        id="instagram_url"
                        type="text"
                        name="instagram_url"
                        placeholder="instagramUrl"
                        value={formData.instagram_url}
                        onChange={handleChange}
                      />
                    </div>

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
                          Save New School
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Schools col-md-8 offset-md-2">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Schools</h1>

        { schools.length
          ? (
            <div>
              { currentUser && currentUser.isAdmin ? newSchoolForm() : "" }
              <div className="Schools-list row">
                {schools.map(s => (
                  <SchoolCard 
                      key={s.school_handle}
                      school_handle={s.school_handle}
                      school_name={s.school_name}
                      city={s.city}
                      state={s.state}
                      logoUrl={s.logoUrl}
                      facebookUrl={s.facebookUrl}
                      instagramUrl={s.instagramUrl}
                  />
                ))}
              </div>
            </div>
          ) : "" }
      </div>

    </div>

  );
}

export default Schools;
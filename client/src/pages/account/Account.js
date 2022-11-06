import React, { useContext, useState } from "react";
import UserContext from "../../auth/UserContext";
// import ShowdownApi from "../../api/api";

import "./Account.css";

/** Account/Profile page.
 * 
 * Displays currentUser information.
 * 
 * Routed as /account
 * 
 * Routes => Account
 */

function Account({ addUser }) {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    school: ""
  }
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "Account", 
    "currentUser:", currentUser
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await addUser(formData);
    if (res.success) {
      console.log(formData);
    } else {
      setFormErrors(res.errors);
      alert(`Unable to add user, ${formData.username}`);
    }
    setFormData(initialState);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  function newUserForm() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender">Gender</label>
            <input
              id="gender"
              type="text"
              name="gender"
              placeholder="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="school">School</label>
            <input
              id="school"
              type="text"
              name="school"
              placeholder="school"
              value={formData.school}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            onSubmit={handleSubmit} 
          >
            Create Account
          </button>

        </form>
      </div>
    )
  }

  return (
    <div className="Account col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Account</h1>
        {currentUser ? (
          <div>
            <p>First name: {currentUser.firstName}</p>
            <p>Last name: {currentUser.lastName}</p>
            <p>Gender: {currentUser.gender}</p>
            <p>School: {currentUser.school}</p>
          </div>
          ) : (
            newUserForm()
          )}
      </div>

    </div>

  );
}

export default Account;
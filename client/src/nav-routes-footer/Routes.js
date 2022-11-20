import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import ShowdownApi from "../api/api";
import Homepage from "../pages/homepage/Homepage";
import About from "../pages/about/About";
import Schools from "../pages/schools/Schools";
import SchoolDetails from "../pages/schools/SchoolDetails";
import Competitions from "../pages/competitions/Competitions";
import Account from "../pages/account/Account";

function Routes({ login, signup }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
  )

  async function newSchool(formData) {
    try {
      let res = await ShowdownApi.newSchool(formData);
      return { success: true };
    } catch (err) {
      console.error("new school failed", err);
      return { success: false, err }
    }
  }

  return (
    <div className="Routes pt-5">
      <Switch>

        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/schools" element={<Schools newSchool={newSchool} />} />
        <Route exact path="/schools/:school_handle" element={<SchoolDetails />} />
        <Route exact path="/competitions" element={<Competitions />} />
        <Route exact path="/account" element={<Account signup={signup} />} />
        {/* <Route exact path="/:username" element={<User />} /> */}

        {/* server */}
        <Route exact path="/404" element={<Homepage />} /> 
        {/* client */}
        <Route exact path="*" element={<Homepage />} />

      </Switch>
    </div>
  );
}

export default Routes;
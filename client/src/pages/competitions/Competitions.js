import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../auth/UserContext";
import ShowdownApi from "../../api/api";
import CompetitionCard from "./CompetitionCard";

import "./Competitions.css";

/** Show page with list of competitions.
 * 
 * On mount, loads competitions from API.
 * Re-loads filtered competitions on submit from search form.
 * 
 * Routed at /competitions
 * 
 * Routes => { CompetitionCard, SearchForm }
 */

function Competitions() {
  const { currentUser } = useContext(UserContext);
  const [competitions, setCompetitions] = useState([]);

  console.debug(
    "Competitions", 
    "currentUser:", currentUser
  );

  useEffect(function getCompetitionsOnMount() {
    console.debug("Competitions useEffect getCompetitionsOnMount");
    search();
  }, []);

  async function search(competition_handle) {
    let competitions = await ShowdownApi.getCompetitions(competition_handle);
    setCompetitions(competitions);
  }

  return (
    <div className="Competitions col-md-8 offset-md-2">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Competitions</h1>

        { competitions.length 
          ? (
            <div>
              <div className="Competitions-list row">
                {competitions.map(c => (
                  <CompetitionCard 
                    key={c.competitionHandle}
                    competitionHandle={c.competitionHandle}
                    competitionName={c.competitionName}
                    description={c.description}
                    gender={c.gender}
                    logoUrl={c.logoUrl}
                  />
                ))}
              </div>
            </div>
          )
          : "" }

      </div>

    </div>

  );
}

export default Competitions;
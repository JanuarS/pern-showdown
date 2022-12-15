import React from "react";
import { Link } from "react-router-dom";

import "./CompetitionCard.css"

/** Show limited information about a competition
 * 
 * Is rendered by Competitions to show a "card" for each competition.
 * 
 * Competitions -> CompetitionCard
 */

function CompetitionCard({ competitionHandle, competitionName, gender, logoUrl }) {
  console.debug("CompetitionCard", competitionHandle);

  return (
    <div className="col-sm-4 pb-3">
      <Link className="card" to={`/competitions/${competitionHandle}`}>
        <div>
          <img src={logoUrl} className="card-img-top" alt={competitionHandle} />
          <div className="card-body">
            <h6 className="card-title">{competitionName}</h6>
            <p className="card-text"><small>{gender}</small></p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CompetitionCard;
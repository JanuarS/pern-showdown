import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShowdownApi from "../../api/api";

/** Competition Detail page. 
 * Renders information about competition, along with participating schools
 * 
 * Routed at /competitions/:competitonHandle
 * 
 * Routes -> Competitions -> CompetionCard -> CompetitionDetails
*/

function CompetitionDetails() {
  const { competitionHandle } = useParams();
  const [competition, setCompetition] = useState(null);

  console.debug("CompetitionDetails", "competitionHandle:", competitionHandle);

  useEffect(function getCompetitionForUser() {
    async function getCompetition() {
      setCompetition(await ShowdownApi.getCompetition(competitionHandle));
    }

    getCompetition();
  }, [competitionHandle]);

  return (
    <div className="CompetitionDetail col-md-8 offset-md-2">
      {competition
        ? (
          <div>
            <h3>{competition.competitionName}</h3>
            <p>{competition.description}</p>
          </div>
        ) : ""}
    </div>
  );
}

export default CompetitionDetails;
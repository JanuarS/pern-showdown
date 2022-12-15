import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShowdownApi from "../../api/api";

/** School Detail page.
 * 
 * Renders information about school, along with competitions.
 * 
 * Routed at /schools/:school_handle
 * 
 * Routes -> Schools -> SchoolCard -> SchoolDetails
 */

function SchoolDetails() {
  const { school_handle } = useParams();
  const [school, setSchool] = useState(null);

  console.debug("SchoolDetails", "school_handle:", school_handle);

  useEffect(function getSchoolForUser() {
    async function getSchool() {
      setSchool(await ShowdownApi.getSchool(school_handle));
    }

    getSchool();
  }, [school_handle]);

  return (
    <div className="SchoolDetail col-md-8 offset-md-2">
      {school
        ? (
          <div>
            <h3>{school.schoolName}</h3>
            <p>{school.city}</p>
            {school.users.map(u => (
              <div>
                <ul>
                  <li>{u.firstName} {u.lastName}</li>
                </ul>
              </div>
            ))}
            {/* {school.competition.map(c => (
              <div>
                <ul>
                  <li>{c.competition}</li>
                </ul>
                {c.players.map(p => (
                  <ol>
                    <li>{p.username}</li>
                  </ol>
                ))}
              </div>
            ))} */}
            <p>{console.log(school)}</p>
          </div>
        ) : ""}
    </div>
  );
}

export default SchoolDetails;
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const TeamCard = ({ teams, getTeamsList, isCurrent }) => {
  const [updatedUcl, setUpdatedUcl] = useState(0);
  const deleteClub = async (id) => {
    try {
      const clubDoc = doc(db, "teams", id);
      await deleteDoc(clubDoc);
      getTeamsList();
    } catch (error) {
      console.error(error);
    }
  };
  const updateUcl = async (id) => {
    try {
      const clubDoc = doc(db, "teams", id);
      await updateDoc(clubDoc, { ucl: updatedUcl });
      getTeamsList();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <ul>
      {teams?.map((t) => {
        const {
          id,
          name,
          players,
          ucl,
          leagueName,
          leagueTitles,
          isEuropean,
          userId,
        } = t;
        return (
          <li
            key={id}
            className="shadow-xl border border-zinc-200 rounded-xl my-2 bg-white p-6 w-[300px]"
          >
            <h4 className="text-xl text-green-600">{name}</h4>
            {isEuropean ? <h4 className="text-zinc-400">European Club</h4> : ""}
            <ul>
              <h4 className="text-lg font-semibold">Players</h4>
              {players.map((player) => (
                <li key={player}>- {player}</li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold">UCL Titles : {ucl}</h4>
            <h4 className="text-lg font-semibold">
              {leagueName} Titles : {leagueTitles}
            </h4>
            {isCurrent(userId) && (
              <button
                className="bg-red-600 text-white rounded-lg px-3 py-1 font-semibold my-1"
                onClick={() => deleteClub(id)}
              >
                Delete Club
              </button>
            )}
            {/* {isCurrent(userId) && ( */}
            <>
              <input
                type="number"
                placeholder="Updated ucl"
                className="focus:outline-none border rounded-md border-zinc-400 px-3 py-1"
                name="leagueName"
                onChange={(e) => setUpdatedUcl(e.target.value)}
              />
              <button
                className="bg-yellow-600 text-white rounded-lg px-3 py-1 font-semibold my-1"
                onClick={() => updateUcl(id)}
              >
                Update UCL(s)
              </button>
            </>
            {/* )} */}
          </li>
        );
      })}
    </ul>
  );
};

export default TeamCard;

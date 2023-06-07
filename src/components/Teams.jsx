import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import TeamCard from "./TeamCard";

const Teams = ({ isCurrent }) => {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [leagueTitle, setLeagueTitle] = useState("");
  const [ucl, setUcl] = useState("");
  const [players, setPlayers] = useState("");
  const [isEuro, setIsEuro] = useState("");

  const teamCollectionRef = collection(db, "teams");

  const addClub = async () => {
    try {
      await addDoc(teamCollectionRef, {
        name,
        players: players?.split(","),
        ucl,
        leagueName,
        leagueTitles: leagueTitle,
        isEuropean: isEuro,
        userId: auth?.currentUser?.uid,
      });
      getTeamsList();
      setName("");
      setLeagueName("");
      setLeagueTitle("");
      setUcl("");
      setPlayers("");
      setIsEuro("");
    } catch (error) {
      console.error(error);
    }
  };
  const getTeamsList = async () => {
    try {
      const data = await getDocs(teamCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTeams(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeamsList();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-bold">Teams</h2>
      <div className="flex flex-col gap-1 my-2">
        <input
          type="text"
          placeholder="Club Name"
          className="focus:outline-none border rounded-md border-zinc-400 px-3 py-1"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Club League Name"
          className="focus:outline-none border rounded-md border-zinc-400 px-3 py-1"
          name="leagueName"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Club League Titles"
          className="focus:outline-none border rounded-md border-zinc-400 px-3 py-1"
          name="leagueTitles"
          value={leagueTitle}
          onChange={(e) => setLeagueTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Club UCLs"
          className="focus:outline-none border rounded-md border-zinc-400 px-3 py-1"
          name="ucl"
          value={ucl}
          onChange={(e) => setUcl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Club players (Comma seperated values)"
          className="focus:outline-none border rounded-md border-zinc-400 px-3 py-1"
          name="players"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            className="focus:outline-none text-xl border rounded-md border-zinc-400 mx-3 py-1"
            name="isEuropean"
            value={isEuro}
            onChange={(e) => setIsEuro(e.target.checked)}
          />
          <label htmlFor="isEuropean">European Club</label>
        </div>
        <button
          className="bg-green-600 text-white rounded-lg px-3 py-1 font-semibold my-1"
          onClick={addClub}
        >
          Add Club
        </button>
      </div>
      <TeamCard
        teams={teams}
        getTeamsList={getTeamsList}
        isCurrent={isCurrent}
      />
    </div>
  );
};

export default Teams;

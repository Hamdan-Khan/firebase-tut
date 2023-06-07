import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import { auth } from "./config/firebase";
import Teams from "./components/Teams";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        storeSession(user);
      } else {
        setSession(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const isCurrent = (uid) => {
    return session === uid;
  };

  const storeSession = (user) => {
    const ses = user.uid;
    setSession(ses);
  };

  // console.log(session);

  return (
    <div className="p-6 flex flex-row">
      <div className="flex flex-col items-center w-[50%]">
        <h1 className="text-4xl font-bold my-3">FIREBASE TUTORIAL</h1>
        <Signup session={session} />
        <div className="border-2 p-4 my-3 border-black rounded-2xl w-full">
          <p className="text-lg font-semibold">
            Please login using following credentials:
          </p>
          <p>Email: 1234@gmail.com</p>
          <p>Password: 1123123</p>
          <p className="text-red-500">
            Note: You cannot create any new club or delete any existing club,
            only ucls can be updated.
          </p>
        </div>
      </div>
      {session && (
        <div className="flex flex-col items-center w-[50%]">
          <div>
            <h1 className="text-xl underline my-3">LOGGED IN {session}</h1>
            {/* <img src={auth.currentUser.photoURL} alt="current user photo" /> */}
          </div>
          <Teams isCurrent={isCurrent} />
        </div>
      )}
    </div>
  );
}

export default App;

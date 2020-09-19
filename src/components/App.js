import React, { useEffect, useState } from "react";
import MainRouter from "components/Router";
import { authService } from "firebaseConfig";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <MainRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Loading..."
      )}
      <footer>&copy; 2020 Kwitter</footer>
    </>
  );
}

export default App;

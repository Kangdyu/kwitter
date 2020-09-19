import React, { useState } from "react";
import MainRouter from "components/Router";
import { authService } from "firebaseConfig";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <MainRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; 2020 Kwitter</footer>
    </>
  );
}

export default App;

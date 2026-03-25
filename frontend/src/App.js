import React, { useState } from "react";
import Interview from "./pages/Interview";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  return isLoggedIn ? (
    <Interview setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;
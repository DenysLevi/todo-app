import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage/SignUpPage";
import TodoPage from "./pages/TodoPage/TodoPage";
import PublicRoute from "./router/PublicRoute";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("loggedIn", "true");
        user.email && localStorage.setItem("userEmail", user.email);
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("loggedIn");
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/todo-list" element={<TodoPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

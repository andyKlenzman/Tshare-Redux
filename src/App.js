import "./App.css";
import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import LogPage from "./pages/LogPage";
import ViewPage from "./pages/ViewPage";
import SettingsPage from "./pages/SettingsPage";
import ShopPage from "./pages/ShopPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch } from "react-redux";
import { authChange } from "./features/authentification/data/asyncThunks/authChange";
import { clearLocalUser } from "./features/authentification/data/userSlice";

//may need these for heading conditional render
// import { selectCurrentUser } from "./features/authentification/data/userSlice";
// import { useSelector } from "react-redux";
// import AlertHandler from "./components/alerts/AlertHandler";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
// import { fetchSettings } from "./features/mode/settings/data/asyncThunks";
import AnimationBase from "./features/animation/AnimationBase";


function App() {
  const dispatch = useDispatch();
  const authListener = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(authChange(user.uid));
    } else {
      dispatch(clearLocalUser());
    }
  });

  return (
    <div
      className="App"
    >
      <AnimationBase />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route exact path="/view/:pid" element={<ViewPage />}></Route>
        <Route path="/log/:pid" element={<LogPage />}></Route>
        <Route path="/home/:pid" element={<SettingsPage />}></Route>
        {/* IDEA: home with no PID could be community page... */}
        <Route path="/shop" element={<ShopPage />}></Route>
      </Routes>
      {/* <AlertHandler /> */}
    </div>
  );
}

export default App;

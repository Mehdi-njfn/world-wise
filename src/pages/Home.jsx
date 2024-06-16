import { NavLink } from "react-router-dom";
import NavPage from "../components/NavPage";

function Home() {
  return (
    <div>
      <NavPage />
      <h2>worldwise</h2>
      <NavLink to="/app">go to app</NavLink>
    </div>
  );
}

export default Home;

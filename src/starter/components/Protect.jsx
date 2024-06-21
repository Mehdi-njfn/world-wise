import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCities } from "../../context/CitiesCtx";

function Protect({ children }) {
  const { u } = useCities();
  const navigate = useNavigate();

  useEffect(function(){
    if (!u) navigate("/login");
  },[navigate, u])

  return u ? children : null;
}

export default Protect;

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "currentCity/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== action.payload),
        isLoading: false,
      };
    default:
      throw new Error("unknown action in dispatch");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [u, setU] = useState(false);
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "rejected", payload: err });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "currentCity/loaded", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "rejected", payload: "error in fetching city" });
    }
  }, []);
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "rejected", payload: "error in creating city" });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      console.log(res);
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.log(error);
      dispatch({ type: "rejected", payload: "error in delete city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
        u,
        setU,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was be used outside of CitiesProvider!");
  return context;
}

export { useCities, CitiesProvider };

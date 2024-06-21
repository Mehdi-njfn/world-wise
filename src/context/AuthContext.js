// import { createContext, useContext, useReducer } from "react";

// const AuthCtx = createContext();
// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "login":
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//       };
//     case "logout":
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//       };
//     default:
//       throw new Error("action is unknown type ");
//   }
// }

// function AuthProvider({ children }) {
//   const [{ user, isAuthenticated }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );
//   function login(email, password) {
//     if (email === FAKE_USER.email && password === FAKE_USER.password)
//       dispatch({ type: "login", payload: FAKE_USER });
//   }

//   function logout() {
//     dispatch({ type: "logout" });
//   }

//   return (
//     <AuthCtx.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthCtx.Provider>
//   );
// }
// function useAuth() {
//   const context = useContext(AuthCtx);

//   if (context === undefined)
//     throw new Error("CitiesContext was be used outside of CitiesProvider!");
//   return context;
// }

// export { useAuth,AuthProvider, AuthCtx };

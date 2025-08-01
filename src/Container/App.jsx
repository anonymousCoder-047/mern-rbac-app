
import "../assets/styles/App.css";
import Routes from "../Routes/routes";
import useAuthInitializer from "../hooks/useAuthInitializer";

function App() {
  useAuthInitializer(); // refresh token for app.

  return (
    <>
      <Routes />
    </>
  )
}

export default App

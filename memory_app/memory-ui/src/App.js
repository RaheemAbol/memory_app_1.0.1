import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddMemory from "./pages/AddMemory";
import EditMemory from "./pages/EditMemory";
import ViewMemory from "./pages/ViewMemory";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./components/useAuth";

function App() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/addMemory"
            element={<ProtectedRoute component={AddMemory} />}
          />
          {/* <Route exact path="/addMemory" element={<AddMemory />} /> */}

          <Route
            exact
            path="/editMemory/:id"
            element={<ProtectedRoute component={EditMemory} />}
          />
          <Route
            exact
            path="/viewMemory/:id"
            element={<ProtectedRoute component={ViewMemory} />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

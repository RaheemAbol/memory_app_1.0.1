import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../components/useAuth";
import CloudsBackground from "../components/CloudsBackground"; // Import the CloudsBackground component

export default function Home() {
  const [memory, setMemory] = useState([]);
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/register");
    } else {
      loadMemory();
    }
  }, [isAuthenticated, navigate]);

  const loadMemory = async () => {
    const result = await axios.get(`http://localhost:8085/memoriesList`);
    setMemory(result.data);
  };

  const deleteMemory = async (id) => {
    await axios.delete(`http://localhost:8085/memories/${id}`);
    loadMemory();
  };

  return (
    <>
      <CloudsBackground /> {/* Include the CloudsBackground component */}
      <div className="container">
        <div className="py-4">
          <table className="table border shadow bg-dark text-white rounded-lg">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {memory.map((mem) => (
                <tr key={mem.id}>
                  <th scope="row">{mem.id}</th>
                  <td>{mem.date}</td>
                  <td>{mem.description}</td>
                  <td>
                    <img
                      src={`data:image/jpeg;base64,${mem.image}`}
                      alt="Memory"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/viewMemory/${mem.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/editMemory/${mem.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteMemory(mem.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

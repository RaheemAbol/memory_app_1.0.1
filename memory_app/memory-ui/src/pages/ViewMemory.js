import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewMemory() {
  const [memory, setMemory] = useState({
    date: "",
    description: "",
    image: null,
  });

  const { id } = useParams();

  const loadMemory = async () => {
    const result = await axios.get(`http://localhost:8085/memories/${id}`);
    setMemory(result.data);
  };

  useEffect(() => {
    loadMemory();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow bg-dark text-white">
          <h2 className="text-center m-4">Memory Details</h2>

          <div className="card">
            <div className="card-header bg-dark text-white">
              Details of Memory : {memory.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Date:</b>
                  {memory.date}
                </li>
                <li className="list-group-item">
                  <b>Make:</b>
                  {memory.description}
                </li>

                <li className="list-group-item">
                  <b>Image:</b>
                  {memory.image && (
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`data:image/jpeg;base64,${memory.image}`}
                        alt="Memory"
                        width="200"
                        height="200"
                      />
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditMemory() {
  // let navigate = useNavigate();

  // const { id } = useParams();

  // const [memory, setMemory] = useState({
  //   date: "",
  //   description: "",
  //   image: "",
  // });

  // const { date, description, image } = memory;

  // const onInputChange = (e) => {
  //   setMemory({ ...memory, [e.target.name]: e.target.value });
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios.put(`http://localhost:8085/memories/${id}`, memory);
  //   navigate("/");
  // };

  // const loadMemory = async () => {
  //   const result = await axios.get(`http://localhost:8085/memories/${id}`);
  //   setVehicle(result.data);
  // };

  // useEffect(() => {
  //   loadMemory();
  // }, []);

  let navigate = useNavigate();

  const { id } = useParams();

  const [memory, setMemory] = useState({
    date: "",
    description: "",
    image: null,
  });

  const { date, description } = memory;

  const onInputChange = (e) => {
    if (e.target.name === "image") {
      setMemory({ ...memory, [e.target.name]: e.target.files[0] });
    } else {
      setMemory({ ...memory, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("description", description);
    if (memory.image) {
      formData.append("image", memory.image);
    }

    await axios.put(`http://localhost:8085/memories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    navigate("/");
  };

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
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Memory</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter the memory date"
                name="date"
                value={date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                description:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the memory description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                image:
              </label>
              <input
                type={"file"}
                className="form-control"
                placeholder="Upload an image for your memory"
                name="image"
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

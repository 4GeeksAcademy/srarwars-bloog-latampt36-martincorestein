import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { BASE_URL, mapTypeToAPI } from "../store/config";

export const Single = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiType = mapTypeToAPI(type);
        const response = await fetch(`${BASE_URL}${apiType}/${id}/`);
        
        if (!response.ok) {
          throw new Error(`Error fetching data for ${apiType}/${id}`);
        }
        
        const data = await response.json();
        
        if (data && data.result) {
          setItem(data.result.properties);
        } else {
          throw new Error("No data found in response");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();
  }, [type, id, navigate]);

  if (error) {
    return <div className="container text-center my-5">Error: {error}</div>;
  }

  if (!item) {
    return <div className="container text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`}
            alt={item.name || "Star Wars"}
            className="img-fluid mb-3"
            style={{ maxHeight: "400px", objectFit: "cover" }}
            onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")}
          />
        </div>

        <div className="card col-md-8 bg-dark text-center mb-3">
          <div className="card-body align-items-center">
            <h1 className="card-title text-warning fw-bold mb-3">{item.name || "Details"}</h1>
            <p className="card-text text-light">
              {item.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."}
            </p>
          </div>
        </div>

        <div className="row bg-dark border-top border-danger p-3 ms-0 rounded">
            {Object.entries(item).map(([key, value], index) => (
              <div className="list-group-item col-md-6 d-flex justify-content-between align-items-center bg-dark text-danger" key={index}>
                <span className="fw-bold" style={{ width: '100px', textAlign: 'right' }}>
                  {key.replace("_", " ").toUpperCase()}:
                </span>
                <span>{Array.isArray(value) ? value.join(", ") : value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

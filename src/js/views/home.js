import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
	

	const handleImageError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
    };

    const renderCards = (data, type) => {
        return data.map((item) => (
            <div className="col-md-4 mb-4 me-3" key={item.uid}>
                <div className="card bg-dark">
				<img
					src={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`}
					className="card-img-top p-3 border-bottom border-danger"
					alt="Star Wars Image"
					onError={handleImageError}
				/>
                    <div className="card-body">
                        <h5 className="card-title text-light fw-bold fs-3 mb-5">{item.name}</h5>
                        <p className="card-text">
                        {Object.entries(item)
                            .map(([key, value], index) => (
                                <span key={index}>
                                {item.properties}
                                <strong>{key.replace("_", " ").toUpperCase()}:</strong> {value}
                                <br />
                            </span>
                            ))}
                        </p>
                        <div className="d-flex justify-content-between">
                            <Link to={`/details/${type}/${item.uid}`} className="btn btn-danger fw-bold">
                                Learn more!
                            </Link>
                            <button
                                className="btn btn-outline-warning"
                                onClick={() => actions.toggleFavorite({ uid: item.uid, name: item.name, type})}
                            >
                                <i className="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container">
            <h2 className="my-4 text-danger fw-bold">Characters</h2>
            <div className="d-flex overflow-auto">{renderCards(store.characters, "characters")}</div>

            <h2 className="my-4 text-danger fw-bold">Planets</h2>
            <div className="d-flex overflow-auto">{renderCards(store.planets, "planets")}</div>

            <h2 className="my-4 text-danger fw-bold">Vehicles</h2>
            <div className="d-flex overflow-auto">{renderCards(store.vehicles, "vehicles")}</div>
        </div>
    );
};

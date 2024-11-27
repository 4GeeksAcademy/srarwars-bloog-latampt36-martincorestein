import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { mapTypeToAPI} from "../store/config";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-3 bg-dark">
            <Link to="/">
			<img 
                src="https://naveendb92.github.io/star-wars/assets/img/logo.png" 
                alt="Star Wars Logo" 
                className="navbar-brand mb-0 h1" 
                style={{ height: "50px" }}
            />
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button
                        className="btn btn-warning dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Favorites ({store.favorites.length})
                    </button>
                    <div className="dropdown-menu dropdown-menu-end bg-dark" aria-labelledby="dropdownMenuButton">
					{store.favorites.length > 0 ? (
						store.favorites.map(fav => {
							console.log(fav);
							console.log(fav.type);
							
							return (
								<div className="dropdown-item d-flex justify-content-between align-items-center" key={`${fav.uid}-${fav.type}`}>
									<Link
										to={`/details/${fav.type}/${fav.uid}`}
										className="text-decoration-none text-warning"
									>
										{fav.name}
									</Link>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => actions.toggleFavorite(fav)}
									>
										<i className="fas fa-trash"></i>
									</button>
								</div>
							);
						})
					) : (
						<span className="dropdown-item text-secondary">No favorites yet!</span>
					)}

                </div>
            </div>
			</div>
        </nav>
    );
};

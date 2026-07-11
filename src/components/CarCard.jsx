import { Link } from "react-router-dom";

export function CarCard({ car, isFavorite, onToggleFavorite }) {
  return (
    <div className="car-card">
      <button
        type="button"
        className={`favorite-btn ${isFavorite ? "favorite-btn--active" : ""}`}
        onClick={() => onToggleFavorite(car.id)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "★" : "☆"}
      </button>

      <Link to={`/cars/${car.id}`} className="car-card__link">
        <h3 className="car-card__name">{car.name}</h3>
        <p className="car-card__meta">
          {car.type} · {car.transmission} · {car.seats} person (capacity/size)
        </p>
        <p className="car-card__price">${car.pricePerDay}/day</p>
        <span className={`badge ${car.available ? "badge--available" : "badge--unavailable"}`}>
          {car.available ? "Available" : "Does not exist"}
        </span>
      </Link>
    </div>
  );
}

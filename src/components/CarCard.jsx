import { Link } from "react-router-dom";

export function CarCard({ car, isFavorite, onToggleFavorite }) {
  return (
    <div className="car-card">
      <button
        type="button"
        className={`favorite-btn ${isFavorite ? "favorite-btn--active" : ""}`}
        onClick={() => onToggleFavorite(car.id)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "Favoritlərdən çıxar" : "Favoritlərə əlavə et"}
        title={isFavorite ? "Favoritlərdən çıxar" : "Favoritlərə əlavə et"}
      >
        {isFavorite ? "★" : "☆"}
      </button>

      <Link to={`/cars/${car.id}`} className="car-card__link">
        <h3 className="car-card__name">{car.name}</h3>
        <p className="car-card__meta">
          {car.type} · {car.transmission} · {car.seats} nəfərlik
        </p>
        <p className="car-card__price">${car.pricePerDay}/gün</p>
        <span className={`badge ${car.available ? "badge--available" : "badge--unavailable"}`}>
          {car.available ? "Mövcuddur" : "Mövcud deyil"}
        </span>
      </Link>
    </div>
  );
}

import { CarCard } from "./CarCard";

export function CarList({ cars, isFavorite, onToggleFavorite }) {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isFavorite={isFavorite(car.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

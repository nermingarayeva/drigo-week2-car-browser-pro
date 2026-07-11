import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCars } from "../hooks/useCars";
import { useFavorites } from "../hooks/useFavorites";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";

export function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cars, loading, error, retry } = useCars();
  const { isFavorite, toggleFavorite } = useFavorites();

  const car = useMemo(() => {
    if (!cars) return undefined;
    return cars.find((c) => c.id === Number(id));
  }, [cars, id]);


  function handleBack() {
    navigate(-1);
  }

  if (loading) {
    return (
      <div className="page page--detail">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page--detail">
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="page page--detail">
        <div className="state-panel state-panel--empty">
          <p className="state-panel__title">Maşın tapılmadı</p>
          <p>#{id} nömrəli maşın mövcud deyil.</p>
          <Link className="btn btn--ghost" to="/">
            Siyahıya qayıt
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(car.id);

  return (
    <div className="page page--detail">
      <button type="button" className="btn btn--ghost" onClick={handleBack}>
        ← Geri
      </button>

      <article className="car-detail">
        <div className="car-detail__header">
          <h1>{car.name}</h1>
          <button
            type="button"
            className={`favorite-btn ${favorite ? "favorite-btn--active" : ""}`}
            onClick={() => toggleFavorite(car.id)}
            aria-pressed={favorite}
          >
            {favorite ? "★ Favoritdir" : "☆ Favoritə əlavə et"}
          </button>
        </div>

        <dl className="car-detail__specs">
          <div>
            <dt>Növ</dt>
            <dd>{car.type}</dd>
          </div>
          <div>
            <dt>Sürətlər qutusu</dt>
            <dd>{car.transmission}</dd>
          </div>
          <div>
            <dt>Oturacaq sayı</dt>
            <dd>{car.seats}</dd>
          </div>
          <div>
            <dt>Qiymət</dt>
            <dd>${car.pricePerDay}/gün</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className={`badge ${car.available ? "badge--available" : "badge--unavailable"}`}>
                {car.available ? "Mövcuddur" : "Mövcud deyil"}
              </span>
            </dd>
          </div>
        </dl>
      </article>
    </div>
  );
}

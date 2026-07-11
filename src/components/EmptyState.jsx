export function EmptyState({ onClearFilters }) {
    return (
      <div className="state-panel state-panel--empty">
        <p className="state-panel__title">Uyğun maşın tapılmadı</p>
        <p>Seçdiyin filtrlərə uyğun heç bir maşın yoxdur. Filtrləri dəyiş və ya sıfırla.</p>
        <button type="button" className="btn btn--ghost" onClick={onClearFilters}>
          Filtrləri sıfırla
        </button>
      </div>
    );
  }
  
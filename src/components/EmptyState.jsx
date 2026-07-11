export function EmptyState({ onClearFilters }) {
    return (
      <div className="state-panel state-panel--empty">
        <p className="state-panel__title">No suitable car was found.</p>
        <p>There are no cars matching your selected filters. Change or reset the filters.</p>
        <button type="button" className="btn btn--ghost" onClick={onClearFilters}>
        Reset filters
        </button>
      </div>
    );
  }
  
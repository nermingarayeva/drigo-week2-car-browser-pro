export function LoadingState() {
    return (
      <div className="state-panel state-panel--loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Maşınlar yüklənir...</p>
      </div>
    );
  }
  
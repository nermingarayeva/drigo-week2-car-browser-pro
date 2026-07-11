export function ErrorState({ message, onRetry }) {
    return (
      <div className="state-panel state-panel--error" role="alert">
        <p className="state-panel__title">Bir xəta baş verdi</p>
        <p>{message}</p>
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Yenidən cəhd et
        </button>
      </div>
    );
  }
  
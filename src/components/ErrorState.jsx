export function ErrorState({ message, onRetry }) {
    return (
      <div className="state-panel state-panel--error" role="alert">
        <p className="state-panel__title">An error occurred.</p>
        <p>{message}</p>
        <button type="button" className="btn btn--primary" onClick={onRetry}>
        Try again
        </button>
      </div>
    );
  }
  
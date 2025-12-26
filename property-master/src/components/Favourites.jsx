import "./Favourites.css";

function Favourites({ favourites = [] }) {
  return (
    <div className="favourites-card">
      <div className="favourites-header">
        <span className="heart-icon">♡</span>
        <h3>Favourite Properties</h3>
      </div>

      {favourites.length === 0 && (
        <div className="favourites-empty">
          <div className="heart-large">♡</div>
          <p className="empty-title">No favourite properties yet</p>
          <p className="empty-subtitle">
            Click the heart icon on any property to save it here
          </p>
        </div>
      )}
    </div>
  );
}

export default Favourites;

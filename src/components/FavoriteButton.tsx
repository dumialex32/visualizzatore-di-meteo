const FavoriteButton: React.FC<{
  isFavorite: boolean;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
}> = ({ isFavorite, onAddFavorite, onRemoveFavorite }) => {
  return isFavorite ? (
    <button className="btn" onClick={onRemoveFavorite}>
      Rimuovi dai preferiti
    </button>
  ) : (
    <button className="btn" onClick={onAddFavorite}>
      Aggiungi ai preferiti
    </button>
  );
};

export default FavoriteButton;

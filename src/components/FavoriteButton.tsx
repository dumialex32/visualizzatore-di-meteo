const FavoriteButton: React.FC<{
  isFavorite: boolean;
  onAdd: () => void;
  onRemove: () => void;
}> = ({ isFavorite, onAdd, onRemove }) => {
  return isFavorite ? (
    <button className="btn" onClick={onRemove}>
      Rimuovi dai preferiti
    </button>
  ) : (
    <button className="btn" onClick={onAdd}>
      Aggiungi ai preferiti
    </button>
  );
};

export default FavoriteButton;

export const ImageCard = ({ imgUrl, imgDescription }) => {
  return (
    <div>
      <img src={imgUrl} alt={imgDescription} />
    </div>
  );
};

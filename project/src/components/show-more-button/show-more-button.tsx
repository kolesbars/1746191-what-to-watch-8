type ShowMoreButtonProps = {
  filmCount: number;
  inc: number;
  setFilmsCount: (count: number) => void;
}

function ShowMoreButton(props: ShowMoreButtonProps):JSX.Element {

  const {filmCount, inc, setFilmsCount} = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => {
          setFilmsCount(filmCount + inc);
        }}
      >Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;

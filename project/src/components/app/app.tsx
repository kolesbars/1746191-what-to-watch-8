import Main from '../main/main';

type Promo = {
  tytle: string,
  genre: string,
  date: string,
}

function App({tytle, genre, date}: Promo): JSX.Element {
  return (
    <Main
      tytle = {tytle}
      genre = {genre}
      date = {date}
    />
  );
}

export default App;

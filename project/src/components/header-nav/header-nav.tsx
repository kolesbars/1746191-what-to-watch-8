import {Link} from 'react-router-dom';

type HeaderNavProps = {
  id: number,
  name: string
}

function HeaderNav({id, name}: HeaderNavProps):JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={`/films/${id}/review`}>Add review</Link>
        </li>
      </ul>
    </nav>);
}

export default HeaderNav;

import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="ring">Loading
      <span className="ring-span"></span>
    </div>
  );
}

export default Spinner;

import { useRecoilState } from 'recoil';
import { selectedWines } from 'store/wineList';
import Link from 'next/link';

export default function SelectedWines(props) {
  const [taggedWines, setSelectedWines] = useRecoilState(selectedWines);

  return (
    <div className="field is-grouped is-grouped-multiline">
      {taggedWines.map(x => (
        <div className="control" key={x.id}>
          <div className="tags has-addons">
            <a className="tag">{x.name}</a>
            <a
              className="tag is-delete"
              onClick={() => setSelectedWines(taggedWines.filter(y => y.id !== x.id))}></a>
          </div>
        </div>
      ))}
      <Link className="button is-link is-light" href="/sales/comparison">
        Compare
      </Link>
    </div>
  );
}

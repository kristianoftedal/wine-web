import { useRecoilState } from 'recoil';
import { categoryFilter } from 'store/wineFilter';

export default function CategoryFilterButtons() {
  const [filter, setFilter] = useRecoilState(categoryFilter);

  const updateFilter = value => {
    setFilter(value);
  };

  return (
    <div className="container block">
      <div className="buttons is-centered has-addons">
        <button
          onClick={() => updateFilter('red')}
          className={`button is-danger ${filter === 'red' ? '' : 'is-outlined'}`}>
          Red
        </button>
        <button
          onClick={() => updateFilter('white')}
          className={`button is-warning ${filter === 'white' ? '' : 'is-outlined'}`}>
          White
        </button>
        <button
          onClick={() => updateFilter('rose')}
          className={`button is-link ${filter === 'rose' ? '' : 'is-outlined'}`}>
          Rosé
        </button>
        <button
          onClick={() => updateFilter('sparkling')}
          className={`button is-info ${filter === 'sparkling' ? '' : 'is-outlined'}`}>
          Sparkling
        </button>
        <button
          onClick={() => updateFilter('none')}
          className={`button is-dark ${filter === 'none' ? '' : 'is-outlined'}`}>
          All
        </button>
      </div>
    </div>
  );
}

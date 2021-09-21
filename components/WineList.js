import { useRecoilValue, useRecoilState } from 'recoil';
import Link from 'next/link';
import { transformedWineList, sortByProp, selectedWineProps, selectedWines } from 'store/wineList';
import Th from './TableHeader';
import Checkbox from './Checkbox';

export default function WineList() {
  const wineList = useRecoilValue(transformedWineList);
  const wineProps = useRecoilValue(selectedWineProps);
  const [taggedWines, setSelectedWines] = useRecoilState(selectedWines);

  const [prop, setSortByProp] = useRecoilState(sortByProp);

  const onSortProp = newProp => {
    setSortByProp(newProp === prop ? `${prop}-reverse` : newProp);
  };

  const prettyPlz = value => {
    if (isNumeric(value)) {
      const decimalCount = value % 1 ? value.toString().split('.')[1].length : 0;

      if (decimalCount < 3) return value.toLocaleString('nb-NO').replace(',', '.');

      const financial = Math.round(value * 100) / 100;
      const local = financial.toLocaleString('nb-NO');
      const replaced = local.replace(',', '.');
      return replaced;
    }
    return value;
  };

  function isNumeric(str) {
    if (typeof str === 'number') return true;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  return (
    <>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead className="is-clickable">
          <tr>
            {wineProps.map(x => (
              <Th key={x} name={x} onClick={onSortProp} />
            ))}
            <Th name="Select" />
          </tr>
        </thead>
        <tbody>
          {wineList.map(x => (
            <tr key={x.id}>
              {Object.keys(x).map((y, index) => {
                const content =
                  y === 'name' ? (
                    <Link href={`/sales/${x.id}`}>{prettyPlz(x[y])}</Link>
                  ) : (
                    <span>{prettyPlz(x[y])}</span>
                  );
                return <td key={`${x.id}${y}${index}`}>{content}</td>;
              })}
              <td>
                <input
                  type="checkbox"
                  checked={taggedWines.some(y => y.id === x.id)}
                  onChange={event => {
                    if (event.target.value === 'on') {
                      setSelectedWines(list => [
                        ...list,
                        {
                          id: x.id,
                          name: x.name
                        }
                      ]);
                      return;
                    }
                    setSelectedWines(taggedWines.filter(y => y.id !== x.id));
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

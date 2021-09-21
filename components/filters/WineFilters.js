import Typeahead from 'components/Typeahead';
import CategoryFilterButtons from 'components/filters/CategoryFilterButtons';
import ColumnSelector from 'components/filters/ColumnSelector';
import RangeFilters from './RangeFilters';
import { getCountries, getDistricts, getProductNames } from 'data/data';
import { useRecoilState } from 'recoil';
import { countryFilter, districtFilter } from 'store/wineFilter';

export default function WineFilters() {
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useRecoilState(countryFilter);
  // eslint-disable-next-line no-unused-vars
  const [district, setDistrict] = useRecoilState(districtFilter);
  return (
    <>
      <div className="columns">
        <div className="column">
          <CategoryFilterButtons />
        </div>
        <div className="column">
          <div style={{ marginBottom: '1em' }}>
            <Typeahead
              data={getProductNames()}
              placeholder="Type a name"
              onSelected={setDistrict}
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <Typeahead data={getCountries()} onSelected={setCountry} placeholder="Type a country" />
          </div>
          <Typeahead data={getDistricts()} placeholder="Type a district" onSelected={setDistrict} />
        </div>
        <div className="column">
          <RangeFilters />
        </div>
        <div className="column">
          <ColumnSelector />
        </div>
      </div>
    </>
  );
}

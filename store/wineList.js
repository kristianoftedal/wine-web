import { atom, selector, selectorFamily } from 'recoil';
import { getProducts } from 'data/data';
import { winePropList } from 'data/wineProps';
import {
  acidRange,
  alcoholRange,
  freshnessRange,
  fullnessRange,
  priceRange,
  salesMarginRange,
  salesMarginValueRange,
  salesRange,
  salesValueRange,
  sugarRange,
  categoryFilter,
  countryFilter,
  districtFilter,
  nameFilter
} from './wineFilter';

export const salesMargin = atom({
  key: 'salesMargin',
  default: 30
});

export const pageSize = atom({
  key: 'pageSize',
  default: 1000
});

export const sortByProp = atom({
  key: 'orderBy',
  default: 'none'
});

export const sortedWineList = selectorFamily({
  key: 'sortedWineList',
  get:
    list =>
      ({ get }) => {
        let prop = get(sortByProp);

        if (prop === 'none') return list;

        if (!prop.includes('reverse'))
          return [...list].sort((a, b) => {
            if (a[prop] > b[prop]) {
              return 1;
            }
            if (a[prop] < b[prop]) {
              return -1;
            }
            return 0;
          });

        return [...list].sort((a, b) => {
          const cleanProp = prop.replace('-reverse', '');
          if (a[cleanProp] > b[cleanProp]) {
            return -1;
          }
          if (a[cleanProp] < b[cleanProp]) {
            return 1;
          }
          return 0;
        });
      }
});

export const calcMarginList = selectorFamily({
  key: 'calcMarginList',
  get:
    wines =>
      ({ get }) => {
        const margin = get(salesMargin);
        return wines.map(x => ({
          ...x,
          unitMargin: (margin * x.price) / 100,
          totalSalesValue: x.price * x.totalSalesQuantity,
          totalSalesMargin: margin * x.price * x.totalSalesQuantity
        }));
      }
});

export const reducedByPropList = selectorFamily({
  key: 'reducedByPropList',
  get:
    wines =>
      ({ get }) => {
        const wineProps = get(selectedWineProps);
        return wines.map(x => wineProps.reduce((a, b) => ((a[b] = x[b]), a), {}));
      }
});

export const wineProps = atom({
  key: 'wineProps',
  default: winePropList
});

export const selectedWineProps = selector({
  key: 'selectedWineProps',
  get: ({ get }) => {
    const winePropsList = get(wineProps);
    return winePropsList.filter(x => x.isSelected).map(x => x.name);
  }
});

export const transformedWineList = selector({
  key: 'transformedWineList',
  get: ({ get }) => {
    const wines = getProducts();

    const acidValues = get(acidRange);
    const alcoholValues = get(alcoholRange);
    const category = get(categoryFilter);
    const freshnessValues = get(freshnessRange);
    const fullnessValues = get(fullnessRange);
    const marginValues = get(salesMarginRange);
    const sugarValues = get(sugarRange);
    const priceValues = get(priceRange);
    const salesValues = get(salesRange);
    const salesMarginValues = get(salesMarginValueRange);
    const salesValueValues = get(salesValueRange);
    const wineProps = get(selectedWineProps);
    const margin = get(salesMargin);
    const country = get(countryFilter);
    const district = get(districtFilter);
    const name = get(nameFilter);

    const transformed = transform(wines, arr =>
      arr
        .filter(x => filterOnCategory(x, category))
        .filter(x => {
          if (country === 'none') return true;

          if (!x.country) return false;
          return x.country.toLowerCase().includes(country);
        })
        .filter(x => {
          if (name === 'none') return true;
          if (!x.name) return false;
          return x.name.toLowerCase().includes(name);
        })
        .filter(x => {
          if (district === 'none') return true;

          if (!x.district) return false;
          return x.district.toLowerCase().includes(district);
        })
        .filter(x => rangeFilter(x, 'acid', acidValues))
        .filter(x => rangeFilter(x, 'alcohol', alcoholValues))
        .filter(x => rangeFilter(x, 'freshness', freshnessValues))
        .filter(x => rangeFilter(x, 'fullness', fullnessValues))
        .filter(x => rangeFilter(x, 'price', priceValues))
        .filter(x => rangeFilter(x, 'sugar', sugarValues))
        .map(x => calcMargins(x, margin))
        .filter(x => rangeFilter(x, 'unitMargin', marginValues))
        .filter(x => rangeFilter(x, 'totalSalesValue', salesValueValues))
        .filter(x => rangeFilter(x, 'totalSalesQuantity', salesValues))
        .filter(x => rangeFilter(x, 'totalSalesMarginValue', salesMarginValues))
        .map(x => wineProps.reduce((a, b) => ((a[b] = x[b]), a), {}))
    );
    const sorted = get(sortedWineList(transformed));
    return sorted;
  }
});

const calcMargins = (x, margin) => {
  const unitMargin = (margin * x.price) / 100;
  const totalSalesValue = x.price * x.totalSalesQuantity;
  const totalSalesMarginValue = (((margin * x.price) / 100) * x.totalSalesQuantity) / 100;

  return {
    ...x,
    unitMargin,
    totalSalesValue,
    totalSalesMarginValue
  };
};

const rangeFilter = (x, prop, values) => x[prop] >= values[0] && x[prop] <= values[1];

const transform = (arr, transformer) =>
  arr.reduce((newArr, member) => {
    const t = transformer([member]);
    if (t.length) {
      newArr.push(t[0]);
    }
    return newArr;
  }, []);

const filterOnCategory = (x, value) => {
  switch (value) {
    case 'red':
      return x.category === 'Rødvin';
    case 'white':
      return x.category === 'Hvitvin';
    case 'rose':
      return x.category === 'Rosévin';
    case 'sparkling':
      return x.category === 'Musserende vin';
    default:
      return true;
  }
};

export const selectedWines = atom({
  key: 'selectedWines',
  default: []
});

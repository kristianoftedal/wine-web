import { atom } from 'recoil';

export const priceRange = atom({
  key: 'priceRange',
  default: [0, 200]
});

export const freshnessRange = atom({
  key: 'freshnessRange',
  default: [5, 8]
});

export const fullnessRange = atom({
  key: 'fullnessRange',
  default: [0, 12]
});

export const alcoholRange = atom({
  key: 'alcoholRange',
  default: [10.5, 15.1]
});

export const acidRange = atom({
  key: 'acidRange',
  default: [0, 10]
});

export const sugarRange = atom({
  key: 'sugarRange',
  default: [0, 30]
});

export const salesRange = atom({
  key: 'salesRange',
  default: [0, 100000000]
});

export const salesMarginRange = atom({
  key: 'salesMarginRange',
  default: [0, 1000000000]
});

export const salesValueRange = atom({
  key: 'salesValueRange',
  default: [0, 100000000]
});

export const salesMarginValueRange = atom({
  key: 'salesMarginValueRange',
  default: [0, 1000000000]
});

export const categoryFilter = atom({
  key: 'categoryFilter',
  default: 'red'
});

export const countryFilter = atom({
  key: 'countryFilter',
  default: 'none'
});

export const districtFilter = atom({
  key: 'districtFilter',
  default: 'none'
});

export const nameFilter = atom({
  key: 'nameFilter',
  default: 'none'
});

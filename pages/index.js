import dynamic from 'next/dynamic';
import WineFilters from 'components/filters/WineFilters';
import Loader from 'components/Loader';
import SelectedWines from 'components/SelectedWines';

const DynamicWineList = dynamic(() => import('../components/WineList'), {
  loading: () => <Loader />
});

export default function Index() {
  return (
    <>
      <h1 className="title is-centered-text">List of wines</h1>
      <WineFilters />
      <SelectedWines />
      <DynamicWineList />
    </>
  );
}

import { useRouter } from 'next/router';
import LineChartComparison from 'components/LineChartComparison';
import HeatmapComparison from 'components/HeatmapComparison';

export default function Comparison() {
  const router = useRouter();
  return (
    <>
      <button className="button is-link is-outlined" onClick={() => router.back()}>
        {'<'}
      </button>
      <LineChartComparison />
      <HeatmapComparison />
    </>
  );
}

import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedWines } from 'store/wineList';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getSalesByProductId } from 'data/data';

const colors = [
  '#EA2027',
  '#EE5A24',
  '#F79F1F',
  '#FFC312',
  '#C4E538',
  '#A3CB38',
  '#009432',
  '#006266',
  '#1B1464',
  '#0652DD',
  '#1289A7',
  '#12CBC4',
  '#FDA7DF',
  '#ED4C67',
  '#9980FA',
  '#5758BB',
  '#ED4C67',
  '#B53471',
  '#833471',
  '#6F1E51'
];

const LineChartComparison = () => {
  const taggedWines = useRecoilValue(selectedWines);
  // eslint-disable-next-line no-undef
  const data = [];
  const productNames = [];
  for (let i = 0; i < taggedWines.length; i += 1) {
    const sales = getSalesByProductId(taggedWines[i].id)[0];
    productNames.push(sales.name);
    if (!sales) continue;
    for (let j = 0; j < sales.monthlySales.length; j += 1) {
      let item = data.find(x => x.date === sales.monthlySales[j].date);
      if (!item) {
        item = {
          date: sales.monthlySales[j].date
        };
        data.push(item);
      }
      item[sales.name] = sales.monthlySales[j].totalSalesQuantity;
    }
  }

  if (data.length === 0) return <div>Not found</div>;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title has-text-centered">Comparison</h1>
        <div className="box" style={{ margin: '1em', width: '1450px', height: '930px' }}>
          <LineChart width={1400} height={850} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {productNames.map((x, i) => (
              <Line key={x} type="monotone" dataKey={x} stroke={colors.reverse()[i]} />
            ))}
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default LineChartComparison;

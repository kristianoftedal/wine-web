import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedWines } from 'store/wineList';
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { getNumericModelById } from 'data/data';

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

const SpecifiedDomainRadarComparison = () => {
  const taggedWines = useRecoilValue(selectedWines);
  // eslint-disable-next-line no-undef

  const productNames = [];
  const models = [];
  for (let i = 0; i < taggedWines.length; i += 1) {
    const model = getNumericModelById(taggedWines[i].id)[0];
    if (!model) continue;
    productNames.push(model.name);
    models.push(model);
  }

  const propList = Object.keys(models[0]).filter(x => x !== 'productId' && x !== 'name');
  const data = [];
  for (let i = 0; i < models.length; i += 1) {
    for (let j = 0; j < propList.length; j += 1) {
      const item = {
        name: models[i].name,
        prop: propList[j],
        value: models[i][propList[j]]
      };
      data.push(item);
    }
  }

  if (data.length === 0) return <div>Not found</div>;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title has-text-centered">Radar Comparison</h1>
        <div className="box" style={{ margin: '1em', width: '1450px', height: '930px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="prop" />
              <PolarRadiusAxis angle={18} domain={[0, 150]} />

              {productNames.map((x, i) => (
                <Radar
                  key={x}
                  name={x}
                  dataKey={x}
                  stroke={colors.reverse()[i]}
                  fill={colors.reverse()[i]}
                  fillOpacity={0.6}
                />
              ))}
              <Radar
                key="Ruffino Chianti 2019"
                name="test"
                dataKey="Ruffino Chianti 2019"
                stroke={colors.reverse()[5]}
                fill={colors.reverse()[5]}
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SpecifiedDomainRadarComparison;

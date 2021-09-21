import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getSalesByProductId } from 'data/data';

const Sales = () => {
  const router = useRouter();
  const { productId } = router.query;
  if (!productId) return <div />;
  const productSales = getSalesByProductId(productId);
  if (productSales.length === 0) return <div>Not found</div>;
  const data = productSales[0].monthlySales;
  return (
    <div className="section">
      <div className="container">
        <h2 className="title">{productSales[0].name}</h2>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">2018</p>
              <p className="subtitle">{productSales[0].totalSalesQuantity2018}</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">2019</p>
              <p className="subtitle">{productSales[0].totalSalesQuantity2019}</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">2020</p>
              <p className="subtitle">{productSales[0].totalSalesQuantity2020}</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">2021</p>
              <p className="subtitle">{productSales[0].totalSalesQuantity2021}</p>
            </article>
          </div>
        </div>
        <div className="box" style={{ margin: '1em', width: '1450px' }}>
          <LineChart width={1400} height={800} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalSalesQuantity"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Sales;

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';

import { observer } from 'mobx-react';

import {
  Heading,
} from '@chakra-ui/react';

const Home = observer(() => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  const isServer = typeof window === 'undefined';

  useEffect(() => {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Ventas del mes',
          data: [70000, 30000, 90000, 100000, 85000, 125000],
          fill: true,
          backgroundColor: 'rgba(233, 217, 252, 0.6)',
          borderColor: '#b694f4',
        },
      ],
    };
    const options = {
      plugins: {
        filler: { propagate: false },
        title: { display: false },
        legend: { display: false }
      },
      interaction: { intersect: true },
      pointBackgroundColor: '#fff',
      radius: 6,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    setChartOptions(options);
    setChartData(data);
  }, []);

  return (
    <div className={styles.container}>
      <Heading
        as="h3"
        size="lg"
      >{`Bienvenido!`}</Heading>
      {isServer ? 'Cargando...' : (
        <div className={styles['chart-container']}>
          <Heading
            className={styles['chart-container__header']}
            as="h5"
            size="md">Estas son tus ventas del mes</Heading>
          <div className={styles['chart-container__chart']}>
            <Line
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
});

Home.getInitialProps = async ({ mobxStore }) => {
  return {
    store: mobxStore,
  }
}

export default Home;
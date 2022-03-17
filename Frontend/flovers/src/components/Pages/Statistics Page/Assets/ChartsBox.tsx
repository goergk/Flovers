import React from 'react';
import classes from '../Stats.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  showChart: boolean,
  state: {
    labels: string[] | undefined;
    datasets: {
      label: string;
      fill: boolean;
      lineTension: number;
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      data: number[] | undefined;
    }[];
  }
}

const ChartBox: React.FC<Props> = ({
  showChart,
  state
}) => {
  return (
    <div className={classes.Chart_Container}>
      {
        showChart
        &&
        <Line
          data={state}
        />
      }
    </div>
  )
}

export default ChartBox;
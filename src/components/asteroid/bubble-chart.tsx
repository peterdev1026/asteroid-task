import type { FC } from 'react';
import { Bubble } from 'react-chartjs-2';
import type { DataEvent } from '../../types/data';

const donutChartLabels = (data) => {
  return data.reduce((acc, val) => {
    acc[val.id] = { x: val.speed, y: val.distance, r: val.maxDiameter / 10 };
    return acc;
  }, {})
}

interface DataEventFormProps {
  events?: DataEvent[];
}

export const BubbleChart: FC<DataEventFormProps> = (props) => {
  const dataSet = donutChartLabels(props.events)
  const data = {
    labels: Object.keys(dataSet),
    datasets: [
      {
        label: 'Asteroid',
        // fill: false,
        // lineTension: 0.1,
        // backgroundColor: 'rgba(198, 178, 21, 0.4)',
        // borderColor: 'white',
        // borderCapStyle: 'butt',
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: 'miter',
        // pointBorderColor: 'rgba(75,192,192,1)',
        // pointBackgroundColor: '#fff',
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        // pointHoverBorderColor: 'rgba(220,220,220,1)',
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        data: Object.values(dataSet)
      }
    ]
  };

  return (
    <div className='chart'>
      <Bubble data={data}
        height={100}
        options={{
          maintainAspectRatio: true
        }} />
    </div>
  );
};

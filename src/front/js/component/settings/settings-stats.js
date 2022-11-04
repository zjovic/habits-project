import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SettingsStats = () => {
  const { store, actions } = useContext(Context);

  const [dataset, setDataset] = useState(null);
  const [options, setOptions] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        actions.setLoading(true);
        await actions.fetchStats();

        const groupedStats = Object.entries(
          store.stats.reduce((acc, { created_at, type, reps }) => {
            if (!acc[created_at]) {
              acc[created_at] = [];
            }

            acc[created_at].push({ type, reps });

            return acc;
          }, {})
        ).map(([date, values]) => {
          return {
            date,
            value: values.reduce(
              (acc, { type, reps }) => (type === 0 ? acc - reps : acc + reps),
              0
            ),
          };
        });

        setDataset(groupedStats);

        actions.setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getStats();
  }, []);

  useEffect(() => {
    if (dataset) {
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Habits stats",
          },
        },
      };

      const labels = dataset.map(({ date }) => date);

      const data = {
        labels,
        datasets: [
          {
            label: "Points",
            data: dataset.map(({ value }) => value),
            backgroundColor: "rgba(0, 0, 0, 1)",
          },
        ],
      };

      setOptions(options);
      setData(data);
    }
  }, [dataset]);

  if (options === null || dataset === null || data === null) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <ul className="Stats">
        {dataset.map((data, index) => {
          return (
            <div key={index}>
              <p>date: {data.date}</p>
              <p>points: {data.value}</p>
            </div>
          );
        })}
      </ul>
      <Bar options={options} data={data} />
    </div>
  );
};

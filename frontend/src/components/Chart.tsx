import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface Game {
  id: number;
  isWon: boolean;
  top3Predications: string;
  createdAt: string;
}

interface ChartProps {
  games: Game[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  // maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Games",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      stepSize: 1,
      precision: 0,
    },
  },
};

const GamesBarChart: React.FC<ChartProps> = ({ games }) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthData = Array.from({ length: 12 }, () => ({ wins: 0, losses: 0 }));

  games.forEach((game) => {
    const monthIndex = new Date(game.createdAt).getMonth();
    if (game.isWon) {
      monthData[monthIndex].wins += 1;
    } else {
      monthData[monthIndex].losses += 1;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Wins",
        data: monthData.map((month) => month.wins),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Losses",
        data: monthData.map((month) => month.losses),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default GamesBarChart;

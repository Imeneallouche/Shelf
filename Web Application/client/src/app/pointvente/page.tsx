// app/page.tsx
"use client";

import { FiBox, FiSearch, FiDollarSign } from "react-icons/fi";
import StatCard from "../../components/StatCard";
import React from "react";
import "../../styles/globals.css";
// import Algeria from "@react-map/algeria";

const images = ["/rayon1.png", "/rayon2.png", "/rayon3.png"];

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const productData = [
  {
    name: "UP Fraise 20 CL",
    number: 23,
    percentage: "2%",
    type: "UP Fraise 20 CL",
  },
  {
    name: "UP Banane 125ML",
    number: 25,
    percentage: "1%",
    type: "Ramy UP 125 ML",
  },
  {
    name: "Pack Frutty Or/Abri 1L",
    number: 2,
    percentage: "0.1%",
    type: "Pack Frutty 1L",
  },
  {
    name: "Pack Ramy Cocktail 1L",
    number: 10,
    percentage: "5%",
    type: "Pack Ramy 1L",
  },
  {
    name: "Kids Peche 125 ML",
    number: 17,
    percentage: "3%",
    type: "Ramy Kids 125 ML",
  },
];

const brandData = [
  { name: "RAMY", value: 52.1, color: "#000" },
  { name: "RUIBA", value: 22.8, color: "#6495ED" },
  { name: "NGAOUES", value: 13.9, color: "#98FB98" },
  { name: "AUTRES", value: 11.2, color: "#D3D3D3" },
];

const salesData = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 5 },
  { month: "Mar", value: 8 },
  { month: "Apr", value: 12 },
  { month: "May", value: 9 },
  { month: "Jun", value: 14 },
];

// Données des produits RAMY
const ramyData = [
  { name: "Pack Frutty", value: 8 },
  { name: "Pack Ramy", value: 12 },
  { name: "Ramy Gaz", value: 10 },
  { name: "Water Fruits", value: 15 },
  { name: "PET Boisson", value: 23 }, // Valeur mise en avant
  { name: "PET Extra", value: 7 },
];

// Données des produits concurrents
const competitorsData = [
  { name: "RAMY", value: 15 },
  { name: "Ngaous", value: 10 },
  { name: "Hamoud", value: 12 },
  { name: "Ifri", value: 8 },
  { name: "Royal", value: 18 },
  { name: "Autre", value: 10 },
];
export default function Dashboard() {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col h-full justify-between bg-white p-6 rounded-xl shadow-sm">
        <div className="cursor-pointer flex p-4 hover:bg-gray-50 rounded-lg">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="cursor-pointer flex p-4 hover:bg-gray-50 rounded-lg">
          <FiBox className="text-blue-600 text-3xl mx-auto mb-2" />
          <span className="text-gray-700">Représentation Visuelle</span>
        </div>
        <div className="cursor-pointer flex p-4 hover:bg-gray-50 rounded-lg">
          <FiBox className="text-blue-600 text-3xl mx-auto mb-2" />
          <span className="text-gray-700">Merchandisers</span>
        </div>
        <div className="cursor-pointer flex p-4 hover:bg-gray-50 rounded-lg">
          <FiSearch className="text-green-600 text-3xl mx-auto mb-2" />
          <span className="text-gray-700">Recherche</span>
        </div>
        <div className="cursor-pointer flex p-4 hover:bg-gray-50 rounded-lg">
          <FiDollarSign className="text-purple-600 text-3xl mx-auto mb-2" />
          <span className="text-gray-700">Profit</span>
        </div>
        <button className="bg-normalblue text-white py-6 rounded-xl">
          Nouveau produit
        </button>
        <button className="bg-darkblue text-white py-6 rounded-xl">
          Log out
        </button>
      </div>

      <div className="h-screen w-full bg-gray-50 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Tableau de Bord Statistiques Algérie
          </h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Log-out
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Visibilité" value="3.48%" change="<3.48%" />
          <StatCard title="Placements optimaux" value="3.50%" change="+3.50%" />
          <StatCard
            title="Visibilité concurrents"
            value="2.82%"
            change=">2.82%"
          />
          <StatCard
            title="Points de vente traités"
            value="8.12%"
            change="+8.12%"
          />
        </div>
        <div className="w-full h-full">
          <div className="p-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">
                  Détail des Produits RAMY
                </h2>
                <table className="w-full mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2">Produit</th>
                      <th className="p-2">Nombre</th>
                      <th className="p-2">Pourcentage</th>
                      <th className="p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((product, index) => (
                      <tr key={index} className="bg-blue-100">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.number}</td>
                        <td className="p-2">{product.percentage}</td>
                        <td className="p-2 text-xs rounded-full bg-gray-200 px-2">
                          {product.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">% Produit Par Marque</h2>
                <PieChart width={180} height={180}>
                  <Pie
                    data={brandData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                  >
                    {brandData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="col-span-2 bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Ramy</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={salesData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">
                  Liste Des Photos Prises
                </h2>
                <div className="relative w-60 h-60 flex justify-center items-center">
                  {images.map((src, index) => (
                    <div
                      key={index}
                      className={`absolute transition-transform duration-300 rounded-2xl overflow-hidden shadow-lg ${
                        index === 0
                          ? "rotate-0 z-30"
                          : index === 1
                          ? "rotate-6 z-20"
                          : "rotate-12 z-10"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Image ${index + 1}`}
                        className="h-56 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
              {/* Graphique des produits RAMY */}
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="font-bold text-lg">Nombre Produit RAMY</h2>
                <div className="flex justify-end">
                  <button className="px-4 py-1 text-sm bg-gray-100 rounded-md">
                    Famille ▼
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={ramyData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      radius={[10, 10, 0, 0]}
                      fill="#E5E7EB"
                      barSize={30}
                      activeBar={{ fill: "url(#highlightGradient)" }}
                    />
                    <defs>
                      <linearGradient
                        id="highlightGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1E3A8A" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Graphique des concurrents */}
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="font-bold text-lg">Produit Concurrents</h2>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={competitorsData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      radius={[10, 10, 0, 0]}
                      fill="#E5E7EB"
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// app/page.tsx
import { FiBox, FiSearch, FiDollarSign } from "react-icons/fi";
import StatCard from "../components/StatCard";
import AlgeriaMap from "../components/AlgeriaMap";
import React from "react";
import "../styles/globals.css";
// import Algeria from "@react-map/algeria";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Carte de l'Algérie</h2>
            <div className="h-full">
              <AlgeriaMap />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <h2 className="text-lg font-semibold mb-4">
              Produits les plus répondus
            </h2>
            <div className="space-y-4">
              {[80, 60, 30, 20, 10].map((value, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={`/product${index}.png`}
                    className="h-24"
                    alt="product"
                  />{" "}
                  <div
                    className="bg-blue-100 h-8 rounded-lg mr-4 transition-all duration-500"
                    style={{ width: `${value}%` }}
                  />
                  <span className="text-gray-700">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

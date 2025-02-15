// app/page.tsx
"use client";
import { FiBox, FiSearch, FiDollarSign } from "react-icons/fi";
import StatCard from "../../components/StatCard";
import React from "react";
import "../../styles/globals.css";
import { useParams, useRouter } from "next/navigation";

const wilayaData = {
  birkhadem: [
    {
      date: "Jan 6, 2025",
      pointDeVente: "Mégistique Superette",
      merchandiser: { name: "Olivia Rhye", email: "olivia@untitledui.com" },
      subamy: "24%",
      secourants: "76%",
      localization: "Bir Khadem, Alger",
    },
    {
      date: "Jan 6, 2025",
      pointDeVente: "Majestique Superette",
      merchandiser: { name: "Phoenix Baker", email: "phoenix@untitledui.com" },
      subamy: "24%",
      secourants: "76%",
      localization: "Bir Khadem, Alger",
    },
    {
      date: "Jan 6, 2025",
      pointDeVente: "Majestique Superette",
      merchandiser: { name: "Lana Steiner", email: "lana@untitledui.com" },
      subamy: "24%",
      secourants: "76%",
      localization: "Bir Khadem, Alger",
    },
    {
      date: "Jan 6, 2025",
      pointDeVente: "Majestique Superette",
      merchandiser: { name: "Lana Steiner", email: "lana@untitledui.com" },
      subamy: "24%",
      secourants: "76%",
      localization: "Bir Khadem, Alger",
    },
    {
      date: "Jan 6, 2025",
      pointDeVente: "Majestique Superette",
      merchandiser: { name: "Lana Steiner", email: "lana@untitledui.com" },
      subamy: "24%",
      secourants: "76%",
      localization: "Bir Khadem, Alger",
    },
    {
      date: "Jan 6, 2025",
      pointDeVente: "Majestique Superette",
      merchandiser: { name: "Lana Steiner", email: "lana@untitledui.com" },
      subamy: "24%",
      secourants: "76%",
      localization: "Bir Khadem, Alger",
    },
    {
      date: "Jan 6, 2025",
      pointDeVente: "Majestique Superette",
      merchandiser: { name: "Lana Steiner", email: "lana@untitledui.com" },
      subamy: "24%",
      secourants: "76%",
      localization: "Bir Khadem, Alger",
    },
  ],
};

export default function WilayaPage() {
  const params = useParams();
  const router = useRouter();
  //const wilayaName = params.wilaya?.toLowerCase() || "Alger"; // Default Wilaya
  const wilayaName = "Alger"; // Default Wilaya
  const tableData = wilayaData[wilayaName] || wilayaData.birkhadem; // Use default if not found

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

        <div className="w-full gap-8">
          <h1 className="text-2xl font-bold mb-4 capitalize">
            Wilaya: {wilayaName.replace("-", " ")}
          </h1>
          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Point de vente</th>
                  <th className="py-2 px-4 text-left">Merchandiser</th>
                  <th className="py-2 px-4 text-left">%RAMY</th>
                  <th className="py-2 px-4 text-left">%Concurrents</th>
                  <th className="py-2 px-4 text-left">Localisation</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((entry, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/pointvente?name=${encodeURIComponent(
                          entry.pointDeVente
                        )}`
                      )
                    }
                  >
                    <td className="py-2 px-4">
                      <input type="checkbox" className="mr-4" />
                      {entry.date}
                    </td>
                    <td className="py-2 px-4">{entry.pointDeVente}</td>
                    <td className="py-2 px-4">
                      <div>
                        <span className="font-semibold">
                          {entry.merchandiser.name}
                        </span>
                        <br />
                        <span className="text-sm text-gray-500">
                          {entry.merchandiser.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-4">{entry.subamy}</td>
                    <td className="py-2 px-4">{entry.secourants}</td>
                    <td className="py-2 px-4">{entry.localization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

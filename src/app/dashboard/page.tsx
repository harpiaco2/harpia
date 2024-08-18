"use client";

import DataTable from "./components/DataTable";
import SecondHeader from "./components/SecondHeader";

export default function Dashboard() {
  return (
    <div className="bg-gray-200 flex flex-col">
      <SecondHeader />
      <DataTable />
    </div>
  );
}

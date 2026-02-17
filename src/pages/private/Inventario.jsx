import { useState } from "react";
import { Layout } from "../../layout/Layout";
import { ModalControl } from "../../components/modal/ModalControl";
import { AddProductModal } from "../../components/modal/content/AddProductModal";
import { getProducts } from "../../services/productService";
import { Card } from "../../components/card_product/Card";
import { useQuery } from "@tanstack/react-query";

export const Inventario = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchType: "active",
  });
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const tabs = [
    { id: "all", label: "All Products" },
    { id: "expiring", label: "Expiring Soon" },
    { id: "orders", label: "Stock Orders" },
  ];

  return (
    <Layout>
      {/* Top Navigation Bar */}
      {/* Main Content Area */}
      <main className="max-w-360 mx-auto p-6 lg:p-10">
        {/* Dashboard Header */}
        <div className="flex justify-end">
          <ModalControl action="Add Product">
            {({ closeModal }) => <AddProductModal closeModal={closeModal} />}
          </ModalControl>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Inventory Grid View
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Real-time stock monitoring and replenishment control.
            </p>
          </div>

          {/* Quick Filters / Tabs */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-slate-700 shadow-sm font-bold text-primary"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 min-h-full  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => {
            return <Card key={product.id} products={product} />;
          })}
        </div>

        {/* Pagination & Grid Info */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing{" "}
            <span className="text-slate-900 dark:text-white font-bold">
              1 - 7
            </span>{" "}
            of{" "}
            <span className="text-slate-900 dark:text-white font-bold">
              248
            </span>{" "}
            medicines
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-1">
              <button className="h-10 w-10 bg-primary text-white font-bold rounded-lg shadow-sm">
                1
              </button>
              <button className="h-10 w-10 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                2
              </button>
              <button className="h-10 w-10 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                3
              </button>
              <span className="h-10 w-10 flex items-center justify-center text-slate-400">
                ...
              </span>
              <button className="h-10 w-10 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                35
              </button>
            </div>
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action for Mobile */}
      <button className="fixed bottom-6 right-6 lg:hidden h-14 w-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </Layout>
  );
};

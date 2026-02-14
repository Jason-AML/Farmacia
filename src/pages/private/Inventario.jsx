import { useMemo, useState } from "react";
import { Layout } from "../../layout/Layout";
import { ModalControl } from "../../components/modal/ModalControl";
import { AddProductModal } from "../../components/modal/content/AddProductModal";

export const Inventario = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const products = [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      price: "$12.50",
      sku: "AMX-05",
      stock: 15,
      maxStock: 100,
      percentage: 15,
      status: "critical",
      statusLabel: "Critical",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCTHL5rs5SzW9pOUYb6VU8ils5U57KxoKae09-mVge-pUgaCZwNHqIowuDOgFKqMnr7Wq9ZlO8LLnjONeLtoluspLDGg44JjTI10zdPr05wVyNe-Mmowyd05d-sAdICzgOrL-zJemBjss9ZL_6odU6dJESpV8eWhmiMsWzo8OCFBIdwZ6EkMuipPIWalRnX7JzwwhSScV32aAa7ZYqA9S22f2C0ClCV_IPbq7sL8-Wun9ZidF7E_nhH8kqUCc7QuPwg_1Zk5WKBYlc",
    },
    {
      id: 2,
      name: "Lisinopril 10mg",
      category: "Hypertension",
      price: "$8.20",
      sku: "LIS-10",
      stock: 42,
      maxStock: 150,
      percentage: 28,
      status: "low",
      statusLabel: "Low Stock",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Pi_wYov79_WoYiFlu2AUGqbWcwYzs8O7V10u4AFGqniTJvRx0AIXuJVVUJCyY41Dp2UZiIFuAV1k8o-cf9Cs89ymnJiWxIKX7sLo6h2uqNOKwN1VbIx38mGZzPPLk9Az-x7M1WIt7PunCmgknmJMUsjW_1ASJF3kcjX_QytB0BrCxUsVyNyN8f4bGJaOTZvFbd9l53QA8b_zEtf0TdC_Ps90MAZlf0uyH60bwlEDzwnZX7e3HMlcGDbzajF-UbmGnFD8ZfggmLg",
    },
    {
      id: 3,
      name: "Atorvastatin 20mg",
      category: "Cholesterol",
      price: "$15.00",
      sku: "ATR-20",
      stock: 180,
      maxStock: 200,
      percentage: 90,
      status: "healthy",
      statusLabel: "Healthy",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDydQqXQZgDMcyWTnhMLvCYj3M7DYXOtT2hrmgmDMX7GWbti-FZFg9Cn6Wy8-CjivKOWVWdXUuzq4Q44kV6cqBImTSC2YXrPlv-f7nTwuIv6EkgWI4znnnu9tZoLiotDN7sX6Mf72wakwmLgfjbqGbb_RlPR_4nQnq1HkYyu4oy2-PtAbI7jEzwJbbLn9szo4DiMnOQKVZrYI1_UlcZzo59lqvHTaglo18mrY0xsI2h9LWURzvqxBeIi-_XCFnWr-lRw9llKYVdE0w",
    },
    {
      id: 4,
      name: "Metformin 850mg",
      category: "Diabetes Control",
      price: "$6.45",
      sku: "MET-85",
      stock: 8,
      maxStock: 120,
      percentage: 7,
      status: "critical",
      statusLabel: "Critical",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB5m9xqX_XtCjrBN3AcLJ6UzRDPfBCQKBb94JqpmLigP7TfrKE7eZiR8kNQnoNQL4OAn9Lx8vpi1aYW-N-H4KFzsGcPuafvHLavopVGuoFO4iiwCpRceGdgYZ1g8XpRPP_2uuhJdijXELDW_XMCs7o5jSjSnFOBJMNxgFALV8GKkAhfBRi2k2-FGMqNZvA4cOY0vdUVCCFwmmeV26KZWLMYpb9zNUtgLt9--zdb7hbsftPamghuqJMltZt8Ln1BWdo4KMdJ8lfIpIM",
    },
    {
      id: 5,
      name: "Ventolin HFA",
      category: "Respiratory",
      price: "$32.00",
      sku: "VEN-01",
      stock: 45,
      maxStock: 50,
      percentage: 90,
      status: "healthy",
      statusLabel: "Healthy",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAr_3dL5uISeJoAmMQD3AgYGWX_R-Ibt1N2IZyv6qaZrhJWbqUCKgCw7JHXjOoUUh8aGM12RcN_E2XrZkHfgRK_8tsYYjwGTsaXcvJwLm0obowpGi4HjYy9iFWAIHE18i_GZe6DDfoUflI20sDFAVkJw8IVqNR1mgsjNFPtGK-tV9BWciC35kA0c4cwL0lY5nVEFGv6nVb61FxJQ2UCoMzUjVhRv0xWE8dHlFkXKIxv07AcTbWWvLIEjQVjfhhO9hLaaotFIPP-d0Q",
    },
    {
      id: 6,
      name: "Ibuprofen Liquid",
      category: "Pain Relief",
      price: "$9.95",
      sku: "IBU-LQ",
      stock: 24,
      maxStock: 80,
      percentage: 30,
      status: "low",
      statusLabel: "Low Stock",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJbOvbXmvnxmr27MQ3dg962NxJpAd2cPZWKam9ZEXPwkvVFdNCNsfaDvdUvseCYhgRxyWAEvsb9MVXPPnFIYgNYTzgixtmaYowxgIiZGHKRi0mHxHlw-K0AEmBPjTtEOQ5SgrEgLq29XVXcGOvT13FphsfRasGb_agGX3hVtacmSma-3T1u8SHqH23iSn5fp1HmYZflzeDZA8wGQGN6d-cDRjw-8F5ql7WJU3fho5vHqlGmuk_DBhW8KPBMmGxZIyrVvZPTh4__w0",
    },
    {
      id: 7,
      name: "Omeprazole 20mg",
      category: "Gastrointestinal",
      price: "$14.20",
      sku: "OMP-20",
      stock: 110,
      maxStock: 150,
      percentage: 73,
      status: "healthy",
      statusLabel: "Healthy",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCY2ZA6Q5c3VkzRvGfZsa2iCOZV-vuaFT_vO_uez2HyZ_0gmaj19l1GK1wNuG4zhO_ZyF0Ggwt9g3hvCgxlz6grZmiMeaZrsXjViHr6cx1njJCpxo7CorfWx4rr8LI_YFrBikdvWnh4sdgBrVC39E96RwitTJFh11ZpxAgWjJ9VfY7zkot3f9LndiN_NwQEqmPYgxfrphjENC-9vlettJqCmJPhpBoNz-975QOd-uW7O5q8_EgyPC2CFOeU0yfEnuHcR_P3A-WiTcM",
    },
  ];
  const visible = useMemo(() => {
    switch (activeTab) {
      case "all":
        return products;

      case "orders":
        return [...products]
          .filter((p) => p.stock > 0)
          .sort((a, b) => a.stock - b.stock);

      case "expiring":
        return products.filter(
          (p) => p.status === "critical" || p.status === "low",
        );

      default:
        return products;
    }
  }, [activeTab]);

  const tabs = [
    { id: "all", label: "All Products" },
    { id: "expiring", label: "Expiring Soon" },
    { id: "orders", label: "Stock Orders" },
  ];

  const getStatusClasses = (status) => {
    const classes = {
      critical: {
        badge: "bg-red-100 text-red-600",
        text: "text-red-500",
        bar: "bg-red-500",
        border: "hover:border-red-200",
      },
      low: {
        badge: "bg-amber-100 text-amber-600",
        text: "text-amber-500",
        bar: "bg-amber-500",
        border: "hover:border-amber-200",
      },
      healthy: {
        badge: "bg-emerald-100 text-emerald-600",
        text: "text-emerald-500",
        bar: "bg-emerald-500",
        border: "",
      },
    };
    return classes[status];
  };

  return (
    <Layout>
      {/* Top Navigation Bar */}
      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto p-6 lg:p-10">
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
          {visible.map((product) => {
            const statusClasses = getStatusClasses(product.status);

            return (
              <div
                key={product.id}
                className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl ${statusClasses.border} transition-all`}
              >
                <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-800 overflow-hidden">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={product.image}
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`${statusClasses.badge} text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm`}
                    >
                      {product.statusLabel}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold">
                      {product.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      {product.price}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      SKU: {product.sku}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className={statusClasses.text}>
                        {product.stock} units left
                      </span>
                      <span className="text-slate-400">
                        {product.maxStock} max
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${statusClasses.bar}`}
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {product.status === "critical" || product.status === "low" ? (
                    <button className="w-full py-2.5 bg-primary text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined text-base">
                        {product.status === "critical"
                          ? "shopping_cart_checkout"
                          : "shopping_cart"}
                      </span>
                      {product.status === "critical"
                        ? "Restock Now"
                        : "Restock"}
                    </button>
                  ) : (
                    <button className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-base">
                        visibility
                      </span>
                      View Details
                    </button>
                  )}
                </div>
              </div>
            );
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

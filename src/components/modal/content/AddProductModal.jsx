import { useEffect, useState } from "react";
import { createProduct, getStorage } from "../../../services/productService";
import { useQueryClient } from "@tanstack/react-query";

export const AddProductModal = ({ closeModal }) => {
  const [almacenes, setAlmacenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand_name: "",
    generic_name: "",
    cantidad: "",
    precio_compra: "",
    precio_venta: "",
    impuesto: "5",
    fecha_expiracion: "",
    lugar_almacenamiento: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen no puede superar los 2MB");
      return;
    }

    setFormData((prev) => ({ ...prev, productImage: file }));
    setImagePreview(URL.createObjectURL(file)); // para mostrar preview
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct(formData);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    } catch (error) {
      console.log("Error handleSubmit formulario modal", error);
    } finally {
      setLoading(false);
    }

    console.log("Form submitted:", formData);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen no puede superar los 2MB");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const calculateMargin = () => {
    if (formData.precio_compra && formData.precio_venta) {
      const margin =
        ((formData.precio_venta - formData.precio_compra) /
          formData.precio_venta) *
        100;
      return margin.toFixed(1);
    }
    return "--";
  };
  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const result = await getStorage();
        setAlmacenes(result);
      } catch (error) {
        console.log("Error al hacer fetchStorage:", error);
      }
    };
    fetchStorage();
  }, []);

  return (
    <div className=" fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                add_box
              </span>
              Add New Product
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Enter complete details to add a new item to the pharmacy
              inventory.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Form Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Information Section */}
              <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-l-secondary">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">
                    info
                  </span>
                  General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                      placeholder="e.g. Amoxicillin 500mg"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brand_name"
                      value={formData.brand_name}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                      placeholder="e.g. Moxatag"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Generic Name
                    </label>
                    <input
                      type="text"
                      name="generic_name"
                      value={formData.generic_name}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                      placeholder="e.g. Amoxicillin"
                    />
                  </div>
                </div>
              </section>

              {/* Stock & Pricing Section */}
              <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-l-primary">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    payments
                  </span>
                  Stock &amp; Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Initial Quantity
                    </label>
                    <input
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Unit Price ($)
                    </label>
                    <input
                      type="text"
                      name="precio_compra"
                      value={formData.precio_compra}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Selling Price ($)
                    </label>
                    <input
                      type="text"
                      name="precio_venta"
                      value={formData.precio_venta}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Tax (%)
                    </label>
                    <input
                      type="number"
                      name="impuesto"
                      value={formData.impuesto}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                      placeholder="5"
                    />
                  </div>
                </div>
              </section>

              {/* Expiration & Storage Section */}
              <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-l-orange-400">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-400">
                    calendar_today
                  </span>
                  Expiration &amp; Storage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="fecha_expiracion"
                      value={formData.fecha_expiracion}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all sm:text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Storage Location
                    </label>
                    <select
                      name="lugar_almacenamiento"
                      value={formData.lugar_almacenamiento}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un almacén</option>
                      {almacenes.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Image Upload & Summary */}
            <div className="space-y-6">
              {/* Image Upload */}
              <section className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center group hover:border-secondary/50 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                <div className="size-20 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-4xl">
                    add_a_photo
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Product Image
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-[180px]">
                  Upload packaging photo. Supports JPG, PNG up to 2MB.
                </p>
                <input
                  type="file"
                  id="product-img"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="product-img"
                  className="mt-4 px-4 py-2 border border-secondary text-secondary text-xs font-bold rounded-lg hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                >
                  Choose File
                </label>
                {formData.productImage && (
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                    ✓ {formData.productImage.name}
                  </p>
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-3 w-24 h-24 object-cover rounded-lg border border-slate-200"
                  />
                )}
              </section>

              {/* Summary */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Product Summary
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Status
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold">
                      DRAFT
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Margin
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {calculateMargin()} %
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-xl flex gap-3">
                <span className="material-symbols-outlined text-orange-400 shrink-0">
                  priority_high
                </span>
                <p className="text-xs text-orange-800 dark:text-orange-300 leading-relaxed">
                  Please ensure the <strong>Expiry Date</strong> is checked
                  against the physical packaging to prevent inventory errors.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={closeModal}
              className="cursor-pointer px-6 py-2.5 rounded-lg text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-teal-700 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              {loading ? "Save Product" : "Enviando"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

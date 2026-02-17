import { supabase } from "../supabase/Client";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("productos")
    .select("*, almacenes(nombre)");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const getStorage = async () => {
  const { data, error } = await supabase.from("almacenes").select();
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const createProduct = async (formData) => {
  let imageUrl = null;
  if (formData.productImage) {
    imageUrl = await uploadProductImage(formData.productImage); // ✅ ahora sí sube la imagen
  }

  const { data: insertProduct, error } = await supabase
    .from("productos")
    .insert({
      name: formData.name,
      brand_name: formData.brand_name,
      generic_name: formData.generic_name,
      cantidad_minima: formData.cantidad_minima,
      cantidad: formData.cantidad,
      precio_compra: parseFloat(formData.precio_compra),
      precio_venta: parseFloat(formData.precio_venta),
      impuesto: parseFloat(formData.impuesto),
      fecha_expiracion: formData.fecha_expiracion,
      lugar_almacenamiento: formData.lugar_almacenamiento,
      imagen_url: imageUrl, // ✅ guarda la URL pública, no el File
    })
    .select();

  if (error) {
    console.log("Error al crear producto", error);
    throw error;
  }
  return insertProduct[0];
};
export const uploadProductImage = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("img_product")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("img_product").getPublicUrl(filePath);

  return data.publicUrl;
};

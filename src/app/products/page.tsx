import Product from "@/models/product";
import dbConnect from "@/lib/dbConnect";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  await dbConnect();

  const products = await Product.find({ isDeleted: false }).lean();

  if (!products.length) {
    return <p className="p-6">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

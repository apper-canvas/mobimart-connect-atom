import ProductCard from "@/components/molecules/ProductCard";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return <Empty message="No products found" />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.Id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useCategories } from "@/shared/hooks/apis/queries/useCategory";
import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import type { ProductCategory } from "@/shared/types/product";
import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const navigate = useNavigate();

  const handleCardCategoryClick = (title: string) => {
    navigate("/products", {
      state: {
        categoryTitle: title,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading categories..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error fetching categories</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4">Shop by Category</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our diverse range of product categories. From fashion to
          electronics, find exactly what you're looking for in our curated
          collections.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
        {categories?.map((category: ProductCategory) => (
          <Card
            key={category.id}
            onClick={() => handleCardCategoryClick(category.title)}
            className="group hover:shadow-lg transition-shadow cursor-pointer group-hover:border-primary/50 "
          >
            <CardContent className="px-3 flex flex-col items-center">
              <div className="w-full h-full flex items-center justify-center">
                <ImageWithFallback
                  src={category?.images?.id}
                  alt={category?.title}
                  className={`object-cover bg-white group-hover:scale-105 transition-transform duration-300 w-full h-64`}
                />
              </div>
              <h3 className="capitalize group-hover:text-primary transition-colors mt-3">
                {category.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Section */}
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl mb-4">Can't Find What You're Looking For?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Browse all our products or use our search feature to find exactly what
          you need. Our comprehensive collection has something for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/products">Browse All Products</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

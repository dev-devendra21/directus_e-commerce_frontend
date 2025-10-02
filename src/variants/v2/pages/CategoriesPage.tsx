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
      <>
        <section className="bg-[#FFE8F3] w-full h-1/4 p-30">
          <h1 className="text-center text-4xl text-[#0b0b0b] font-[manrope-semibold]">
            About Us
          </h1>
        </section>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-600">Error fetching categories</p>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="bg-[#FFE8F3] w-full h-1/4 p-30">
        <h1 className="text-center text-4xl text-[#0b0b0b] font-[manrope-semibold]">
          Categories
        </h1>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
          {categories?.map((category: ProductCategory) => (
            <Card
              key={category.id}
              onClick={() => handleCardCategoryClick(category.title)}
              className="group hover:shadow-lg transition-shadow overflow-hidden cursor-pointer py-0 border"
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden h-56">
                  <ImageWithFallback
                    src={category?.images?.id}
                    alt={category?.title}
                    className={`object-contain bg-white group-hover:scale-105 transition-transform duration-300 w-full h-full rounded-lg`}
                  />
                </div>
                <h3 className="text-center pt-2 text-sm font-[manrope-semibold]">
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
            Browse all our products or use our search feature to find exactly
            what you need. Our comprehensive collection has something for
            everyone.
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
    </>
  );
}

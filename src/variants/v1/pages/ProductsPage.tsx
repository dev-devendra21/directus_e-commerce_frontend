import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
// import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useProducts } from "@/shared/hooks/apis/queries/useProducts";
import { useCategories } from "@/shared/hooks/apis/queries/useCategory";

import type { Product, ProductCategory } from "@/shared/types/product";

export default function ProductsPage() {
  const location = useLocation();
  const { categoryTitle } = location.state || {};
  const { data: categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState(categoryTitle || "");

  const {
    data: products,
    isError,
    error,
    isLoading,
    refetch,
  } = useProducts(
    selectedCategory,
    searchQuery,
    sortBy,
    order as "asc" | "desc"
  );

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    products as Product[]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
  };

  // const handleSortBy = () => {};

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSortBy("");
    setOrder("");
    refetch();
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (selectedCategory === "All Categories") {
      setSelectedCategory("");

      return;
    }

    refetch();
  }, [selectedCategory, refetch]);

  useEffect(() => {
    if (searchQuery === "") {
      refetch();
    }
  }, [searchQuery, refetch]);

  useEffect(() => {
    refetch();
  }, [sortBy, order, refetch]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="mb-4">Categories</h3>
        <div className="space-y-2">
          <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {categories?.map((category: ProductCategory) => (
                <SelectItem key={category.id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price Range */}
      <div>
        {/* <h3 className="mb-4">Price Range</h3> */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">
              {/* ₹{filters.minPrice} - ₹{filters.maxPrice} */}
            </label>
            {/* <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => handleSliderChange([min, max])}
              max={1000}
              min={0}
              step={10}
              className="mt-2"
            /> */}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="mb-4">Sort By</h3>
        <div className="space-y-2">
          <Select
            value={sortBy}
            onValueChange={(value: string) => setSortBy(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Sort Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={order}
            onValueChange={(value: string) => setOrder(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button variant="outline" onClick={handleResetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading profile page..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>An error occurred: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-center py-12 md:py-16">
          <h1 className="md:text-9xl text-4xl font-semibold mb-4">
            Explore Our Shop
          </h1>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter products by category, price, and more.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 p-3">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <p className="text-muted-foreground mt-4">
          Showing {filteredProducts?.length} products
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-64 shrink-0">
          <FilterSidebar />
        </aside>

        {/* Products Grid/List */}
        <div className="flex-1">
          {filteredProducts?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card
                    className={`group hover:shadow-lg transition-shadow overflow-hidden`}
                  >
                    <CardContent className={`p-3  `}>
                      <div className={`relative overflow-hidden h-60`}>
                        <ImageWithFallback
                          src={product.thumbnail}
                          alt={product.title}
                          className={`object-contain bg-white group-hover:scale-105 transition-transform duration-300 w-full h-full`}
                        />
                        <Badge className="absolute top-2 left-2 bg-primary">
                          {product.variants.reduce(
                            (val, v) => val + v.quantity,
                            0
                          ) === 0
                            ? "Out of Stock"
                            : "In Stock"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-3">
                    <h2
                      className={`line-clamp-2 mb-2 group-hover:text-primary transition-colors text-2xl font-semibold`}
                    >
                      {product.title}
                    </h2>
                    <p className="text-xl">&#8377; {product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

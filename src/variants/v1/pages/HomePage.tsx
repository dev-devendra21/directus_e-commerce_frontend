import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
// import { toast } from "sonner";
import { useProducts } from "@/shared/hooks/apis/queries/useProducts";
import { useCategories } from "@/shared/hooks/apis/queries/useCategory";
// import useStore from "@/store/useStore";
import Autoplay from "embla-carousel-autoplay";
import type {
  Product,
  Product_Variants,
  ProductCategory,
} from "@/shared/types/product";
// import { useCreateCart } from "@/hooks/apis/mutations/useCart";
// import { useGetCart } from "@/hooks/apis/queries/useCart";
import { CarouselSlider } from "@/shared/components/CarouselSlider";
import { useGetSlider } from "@/shared/hooks/apis/queries/useSlider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { BadgeCheckIcon, Earth, Recycle, Star, Truck } from "lucide-react";
import { useGetTestimonials } from "@/shared/hooks/apis/queries/useTestimonials";

export default function HomePage() {
  // const { isAuthenticated } = useStore();
  const { data: featuredProducts, isLoading } = useProducts();
  const { data: categories } = useCategories();

  // const { createCartMutation } = useCreateCart();

  // const { refetch } = useGetCart();

  const { data: sliders } = useGetSlider();
  const { data: testimonials } = useGetTestimonials();

  const navigate = useNavigate();

  const plugin = useRef(Autoplay({ delay: 2000 }));

  const handleCardCategoryClick = (title: string) => {
    navigate("/products", {
      state: {
        categoryTitle: title,
      },
    });
  };

  // const handleAddToCart = async (
  //   e: React.MouseEvent,
  //   product: Product,
  //   itemQuantity: number
  // ) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (!isAuthenticated) {
  //     toast.error("Please login to add to cart");
  //     return;
  //   }

  //   if (itemQuantity <= 0) {
  //     toast.error("product out of stock");
  //     return;
  //   }
  //   const cartItem = {
  //     product: product.id,
  //     quantity: 1,
  //     product_variant: product.variants[0].id,
  //     price: product.price || product.variants[0].price,
  //   };
  //   await createCartMutation(cartItem, {
  //     onSuccess: () => {
  //       toast.success(`${product.title} added to cart!`);
  //       refetch();
  //     },

  //     onError: (error) => {
  //       toast.error("Failed to add to cart", { description: error.message });
  //     },
  //   });
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading ShopHub..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section>
        <CarouselSlider sliders={sliders} />
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2  md:grid-cols-4 gap-6">
            <div>
              <Recycle className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Sustainable</h3>
              <p className="text-[14px]">
                We believe great style shouldn’t come at the planet’s expense.
              </p>
            </div>
            <div>
              <BadgeCheckIcon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Warranty Included</h3>
              <p className="text-[14px]">
                Every pair comes with a hassle-free 6-month warranty.
              </p>
            </div>
            <div>
              <Truck className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                Delivery & Shipping
              </h3>
              <p className="text-[14px]">
                Your shoes will be dispatched within 1–2 business days.
              </p>
            </div>
            <div>
              <Earth className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                Eco-Friendly Fabrics
              </h3>
              <p className="text-[14px]">
                Crafted with sustainability in mind, our shoes feature
                eco-friendly fabrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div>
              <h2 className="md:text-5xl text-center text-3xl mb-4 font-bold">
                Best Sellers
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts
              ?.filter((product: Product) => product.isFeatured === true)
              ?.map((product: Product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card
                    className={`group hover:shadow-lg transition-shadow overflow-hidden cursor-pointer`}
                  >
                    <CardContent className={`p-3`}>
                      <div className={`relative overflow-hidden h-60`}>
                        <ImageWithFallback
                          src={product.thumbnail}
                          alt={product.title}
                          className={`object-contain bg-white group-hover:scale-105 transition-transform duration-300 w-full h-full`}
                        />
                        <Badge className="absolute top-2 left-2 bg-primary">
                          {product.variants.reduce(
                            (acc: number, variant: Product_Variants) =>
                              acc + variant.quantity,
                            0
                          ) === 0
                            ? "Out of Stock"
                            : "In Stock"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-3">
                    <h3
                      className={`line-clamp-2 mb-2 group-hover:text-primary transition-colors text-2xl font-semibold`}
                    >
                      {product.title}
                    </h3>
                    <p className="text-xl">&#8377; {product?.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="md:text-5xl text-3xl mb-4 font-bold">
              Our Categories
            </h2>
          </div>

          <div>
            <Carousel plugins={[plugin.current]} className="w-full mb-8">
              <CarouselPrevious className="absolute left-[80%] md:left-[90%] top-[-20%] -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselPrevious>
              <CarouselNext className="absolute right-0 top-[-20%] -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselNext>
              <CarouselContent className="-ml-1">
                {categories?.map((category: ProductCategory) => (
                  <CarouselItem
                    onClick={() => handleCardCategoryClick(category.title)}
                    key={category.id}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/5 cursor-pointer ml-5"
                  >
                    <div>
                      <Card
                        key={category.id}
                        onClick={() => handleCardCategoryClick(category.title)}
                        className="group transition-shadow cursor-pointer group-hover:border-primary/50 "
                      >
                        <CardContent className="p-3 flex flex-col items-center">
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageWithFallback
                              src={category?.images?.id}
                              alt={category?.title}
                              className={`object-cover bg-white group-hover:scale-105 transition-transform duration-300 w-full h-64`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      <h3 className="capitalize group-hover:text-primary text-xl transition-colors mt-4 font-semibold">
                        {category.title}
                      </h3>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* New Arrivals Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div>
              <h2 className="md:text-5xl text-center text-3xl mb-4 font-bold">
                New Arrivals
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts
              ?.filter((product: Product) => product.isFeatured === true)
              ?.map((product: Product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card
                    className={`group hover:shadow-lg transition-shadow overflow-hidden cursor-pointer`}
                  >
                    <CardContent className={`p-3`}>
                      <div className={`relative overflow-hidden h-60`}>
                        <ImageWithFallback
                          src={product.thumbnail}
                          alt={product.title}
                          className={`object-contain bg-white group-hover:scale-105 transition-transform duration-300 w-full h-full`}
                        />
                        <Badge className="absolute top-2 left-2 bg-primary">
                          {product.variants.reduce(
                            (acc: number, variant: Product_Variants) =>
                              acc + variant.quantity,
                            0
                          ) === 0
                            ? "Out of Stock"
                            : "In Stock"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-3">
                    <h3
                      className={`line-clamp-2 mb-2 group-hover:text-primary transition-colors text-2xl font-semibold`}
                    >
                      {product.title}
                    </h3>
                    <p className="text-xl">&#8377; {product?.price}</p>

                    {/* <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={(e) =>
                                handleAddToCart(
                                  e,
                                  product,
                                  product.variants.reduce(
                                    (val, v) => val + v.quantity,
                                    0
                                  )
                                )
                              }
                              className="shrink-0 cursor-pointer"
                              disabled={
                                product.variants.reduce(
                                  (acc: number, variant: Product_Variants) =>
                                    acc + variant.quantity,
                                  0
                                ) <= 0
                              }
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div> */}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="md:text-5xl text-3xl mb-4 font-bold">
              What People Says
            </h2>
          </div>

          <div>
            <Carousel plugins={[plugin.current]} className="w-full mb-8">
              <CarouselPrevious className="absolute left-[80%] md:left-[90%] top-[-20%] -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselPrevious>
              <CarouselNext className="absolute right-0 top-[-20%] -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselNext>
              <CarouselContent className="-ml-1">
                {testimonials?.map((testimonial: any) => (
                  <CarouselItem
                    key={testimonial?.id}
                    className="basis-full md:basis-1/2 cursor-pointer ml-5"
                  >
                    <div className="flex flex-col md:flex-row md:gap-5 items-center">
                      <section className="w-64 h-64  md:h-96 flex-shrink-0 mb-4 md:mb-0">
                        <ImageWithFallback
                          src={testimonial?.product?.thumbnail}
                          alt={testimonial?.product?.title}
                          className={`object-cover bg-white group-hover:scale-105 transition-transform duration-300 w-full h-full rounded-4xl`}
                        />
                      </section>
                      <Card className=" border w-64 h-64 md:w-96 md:h-80 flex-shrink-0">
                        <CardContent className="px-3 h-full">
                          <div className="w-full h-full flex flex-col justify-center gap-5">
                            <p className="text-lg italic text-center">
                              "{testimonial?.reviews}"
                            </p>
                            <div className="flex items-center gap-2 pl-5">
                              <ImageWithFallback
                                src={testimonial?.users?.avatar}
                                alt={testimonial?.users?.first_name}
                                className="w-10 h-10 rounded-full inline-block mr-2"
                              />
                              <div>
                                <p>
                                  <span className="font-semibold">
                                    {testimonial?.users?.first_name}
                                  </span>
                                  <span className="font-semibold ml-2">
                                    {testimonial?.users?.last_name}
                                  </span>
                                </p>
                                <p className="text-sm">
                                  {Array.from(
                                    { length: testimonial?.no_of_stars || 0 },
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="inline-block mr-1 mb-1 w-4 h-4 fill-amber-500 text-amber-500"
                                      />
                                    )
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}

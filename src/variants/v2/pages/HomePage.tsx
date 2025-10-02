import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
// import { toast } from "sonner";
import { useProducts } from "@/shared/hooks/apis/queries/useProducts";
import { useCategories } from "@/shared/hooks/apis/queries/useCategory";
// import useStore from "@/shared/store/useStore";
import { Marquee } from "@/shared/components/ui/marquee";
import Autoplay from "embla-carousel-autoplay";
import type {
  Product,
  Product_Variants,
  // ProductCategory,
} from "@/shared/types/product";
// import { useCreateCart } from "@/shared/hooks/apis/mutations/useCart";
// import { useGetCart } from "@/shared/hooks/apis/queries/useCart";
import { CarouselSlider } from "@/shared/components/CarouselSlider";
import { useGetSlider } from "@/shared/hooks/apis/queries/useSlider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import type { TestimonialProps } from "@/shared/types/testimonial";
import { useGetTestimonials } from "@/shared/hooks/apis/queries/useTestimonials";

import starImg from "@/assets/star.avif";

import banner from "@/assets/variant_two_img_1.avif";
import CollectionCard from "../components/CollectionCard";

export default function HomePage() {
  // const { isAuthenticated } = useStore();
  const { data: featuredProducts, isLoading } = useProducts();
  const { data: testimonials } = useGetTestimonials();
  const { data: categories } = useCategories();

  // const { createCartMutation } = useCreateCart();

  // const { refetch } = useGetCart();

  const { data: sliders } = useGetSlider();

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
      <section className="bg-[#0B0B0B] w-full p-5">
        <Marquee className="text-[#ffffff]">
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-3xl">Men</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-3xl">Women</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-3xl">New Collection</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-3xl">Kids</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-3xl">Footware</h5>
          </div>
          <div className="flex items-center gap-3">
            <img src={starImg} alt="star" width={20} height={20} />
            <h5 className="text-3xl">Big sale</h5>
          </div>
        </Marquee>
      </section>

      {/* Our Products */}
      <section className="py-16 md:px-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-5xl mb-4 font-[manrope-semibold]">
                Our Products
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:px-10">
            {featuredProducts?.map((product: Product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card
                  className={`group hover:shadow-lg transition-shadow overflow-hidden cursor-pointer py-0 border`}
                >
                  <CardContent className={`p-4`}>
                    <div className={`relative overflow-hidden h-56`}>
                      <ImageWithFallback
                        src={product.thumbnail}
                        alt={product.title}
                        className={`object-contain bg-white group-hover:scale-105 transition-transform duration-300 w-full h-full rounded-lg`}
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

                    <div className="p-4 flex justify-between">
                      <h3 className="">{product.title}</h3>

                      <p className="font-semibold">&#8377; {product?.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="block md:flex">
            <div
              className="w-full h-[30rem]  md:h-[53rem] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner})` }}
            ></div>
            <div className="bg-[#FFE8F3] w-full h-[30rem]  md:h-[53rem]">
              <div className="flex flex-col justify-center  h-full space-y-4 p-5 md:p-15 lg:p-25">
                <h1 className="text-left text-5xl font-[manrope-semibold]">
                  Effortless style for everyday wear
                </h1>
                <p className="font-[manrope-regular]">
                  Fashion is not something that exists in dresses only. Fashion
                  is in the sky, in the street, fashion has to do with ideas,
                  the way we live, what is happening.
                </p>
                <Button className="p-7 w-fit">Shop Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="md:text-5xl text-3xl mb-4 font-bold font-[manrope-semibold] text-center">
              Check Our Collection
            </h2>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 relative">
            {Array.from({ length: categories.length / 3 }, (_, index) =>
              categories.slice(index * 3, index * 3 + 3)
            ).map((chunk, index) => (
              <CollectionCard
                key={index}
                categories={chunk}
                handleCardCategoryClick={handleCardCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="md:text-5xl text-3xl mb-4 font-bold font-[manrope-semibold] text-center">
              What our client say
            </h2>
          </div>

          <div>
            <Carousel plugins={[plugin.current]} className="w-full mb-8">
              <CarouselPrevious className="absolute left-[80%] md:left-[90%] top-[-20%] -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselPrevious>
              <CarouselNext className="absolute right-0 top-[-20%] -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselNext>
              <CarouselContent className="-ml-1">
                {testimonials?.map((testimonial: TestimonialProps) => (
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

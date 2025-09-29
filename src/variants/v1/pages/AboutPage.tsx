import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import { motion } from "framer-motion";
import { useGetAbout } from "@/shared/hooks/apis/queries/useAbout";
import { Recycle, BadgeCheckIcon, Truck, Earth, Star } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { useGetTestimonials } from "@/shared/hooks/apis/queries/useTestimonials";
import type { TestimonialProps } from "@/shared/types/testimonial";

export default function CategoriesPage() {
  const { data: about, isLoading, isError } = useGetAbout();
  const { data: testimonials } = useGetTestimonials();

  const plugin = useRef(Autoplay({ delay: 2000 }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading about us..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error fetching about us</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center py-12 md:py-16"
      >
        <h1 className="md:text-9xl text-5xl font-bold mb-4">About us</h1>
      </motion.section>

      {/* Our Approach */}

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center py-12 md:py-20"
      >
        <h2 className="md:text-5xl text-4xl font-bold mb-4">Our Approach</h2>
        <p className="text-3xl mb-4 font-semibold max-w-2xl mx-auto">
          {about.our_approach}
        </p>
      </motion.section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="md:text-5xl text-center text-4xl font-bold mb-4">
            Why Choose Us?
          </h2>
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

      <section className="py-12 md:py-20 flex flex-col md:flex-row items-center justify-center md:gap-10">
        <motion.aside
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
          className="w-full md:h-[400px] md:w-1/2"
        >
          <ImageWithFallback
            src={about.our_mission_image}
            alt="our_mission"
            className="w-full h-full object-cover rounded-3xl"
          />
        </motion.aside>
        <motion.article
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
          className="w-full md:w-1/2 p-5"
        >
          <h3 className="md:text-5xl text-4xl font-bold mb-4">Our Mission</h3>
          <p className="text-xl mb-4 ">{about.our_mission}</p>
        </motion.article>
      </section>

      <section className="py-12 md:py-20 flex flex-col md:flex-row items-center justify-center md:gap-10">
        <motion.article
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
          className="w-full md:w-1/2 p-5"
        >
          <h3 className="md:text-5xl text-4xl font-bold mb-4">Our Vision</h3>
          <p className="text-xl mb-4 ">{about.our_vision}</p>
        </motion.article>
        <motion.aside
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
          className="w-full md:h-[400px] md:w-1/2"
        >
          <ImageWithFallback
            src={about.our_vision_image}
            alt="our_vision"
            className="w-full h-full object-cover rounded-3xl"
          />
        </motion.aside>
      </section>

      <section className="py-16">
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

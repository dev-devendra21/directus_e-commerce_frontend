import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

import clientConfig from "@/config/indexConfig";
import type { Slider } from "@/types/slider";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function CarouselSlider({ sliders }: { sliders: Slider[] }) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  const navigate = useNavigate();

  const handleGetStarted = (value: string) => {
    navigate(`/product/${value}`);
  };

  return (
    <Carousel plugins={[plugin.current]} className="w-full mx-auto">
      <CarouselContent>
        {sliders?.map((slider: Slider) => (
          <CarouselItem key={slider.id}>
            <div
              className="relative h-[500px] flex items-center justify-center text-center text-white bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${clientConfig.base_url}/assets/${slider.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative z-10 max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slider.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-6">
                  {slider.description}
                </p>

                <Button
                  onClick={() => handleGetStarted(slider.products || "")}
                  className="mr-4 w-50 p-5 font-semibold bg-transparent border border-white text-white hover:bg-white hover:text-primary transition-colors duration-300 cursor-pointer"
                >
                  {slider.button_text || "Get Started"}
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

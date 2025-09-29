import { lazy } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/components/ui/carousel";
import React from "react";

import type { Slider } from "@/shared/types/slider";

import { useNavigate } from "react-router-dom";

import { UIConfig } from "@/shared/config/uiConfig";

const { type: variantType } = UIConfig;
const VariantSlider = lazy(
  () => import(`@/variants/${variantType}/components/VariantSlider.tsx`)
);

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
            <VariantSlider
              handleGetStarted={handleGetStarted}
              slider={slider}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

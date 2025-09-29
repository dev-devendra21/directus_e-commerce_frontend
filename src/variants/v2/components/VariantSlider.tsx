import { Button } from "@/shared/components/ui/button";
import clientConfig from "@/shared/config/indexConfig";
import type { Slider } from "@/shared/types/slider";

const VariantSlider = ({
  slider,
  handleGetStarted,
}: {
  slider: Slider;
  handleGetStarted: (value: string) => void;
}) => {
  return (
    <div
      className="relative h-[400px]  md:h-[650px] flex items-center justify-center text-center text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${clientConfig.base_url}/assets/${slider.image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{slider.title}</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          {slider.description}
        </p>

        <Button
          onClick={() => handleGetStarted(slider.products.id || "")}
          className="mr-4 w-50 p-5 font-semibold bg-transparent border border-white text-white hover:bg-white hover:text-primary transition-colors duration-300 cursor-pointer"
        >
          {slider.button_text || "Get Started"}
        </Button>
      </div>
    </div>
  );
};

export default VariantSlider;

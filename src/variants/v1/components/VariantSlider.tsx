import { Button } from "@/shared/components/ui/button";
import clientConfig from "@/shared/config/indexConfig";
import type { Slider } from "@/shared/types/slider";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const VariantSlider = ({
  slider,
  handleGetStarted,
}: {
  slider: Slider;
  handleGetStarted: (value: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative h-[400px]  md:h-[650px] flex items-center justify-between px-5 md:px-20 text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${clientConfig.base_url}/assets/${slider.image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 max-w-2xl px-4"
      >
        <h1 className="text-2xl md:text-8xl font-bold mb-4 text-left">
          {slider.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          {slider.description}
        </p>

        <Button
          onClick={() => handleGetStarted(slider.products.id || "")}
          className="mr-4 w-50 p-5 font-semibold bg-transparent border border-white text-white hover:bg-white hover:text-primary transition-colors duration-300 cursor-pointer"
        >
          {slider.button_text || "Get Started"}
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="md:block hidden"
      >
        <div className="bg-white p-5 rounded absolute top-30 right-35">
          <img
            src={`${clientConfig.base_url}/assets/${slider.products.thumbnail}`}
            className="hidden md:block h-60 w-60 object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
          />
          <h5
            className="text-lg font-semibold text-center text-black mt-3 cursor-pointer"
            onClick={() => handleGetStarted(slider.products.id || "")}
          >
            Explore the Product <ArrowRight className="inline-block ml-2" />
          </h5>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VariantSlider;

import { Button } from "@/shared/components/ui/button";
import clientConfig from "@/shared/config/indexConfig";
import type { Slider } from "@/shared/types/slider";
import { motion } from "framer-motion";

const VariantSlider = ({
  slider,
  handleGetStarted,
}: {
  slider: Slider;
  handleGetStarted: (value: string) => void;
}) => {
  return (
    <div
      className="relative h-[400px]  md:h-dvh flex items-center text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${clientConfig.base_url}/assets/${slider.image})`,
      }}
    >
      {/* <div className="absolute inset-0 bg-black/40"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-4xl md:text-8xl font-bold mb-4 text-[#0b0b0b] font-[manrope-thin]"
        >
          {slider.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        >
          <Button
            className="font-[manrope-thin] p-7 rounded-2xl mt-5"
            onClick={() => handleGetStarted(slider.products.id || "")}
          >
            {slider.button_text || "Shop Now"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VariantSlider;

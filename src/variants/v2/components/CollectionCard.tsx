import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import type { ProductCategory } from "@/shared/types/product";

const CollectionCard = ({
  categories,
  handleCardCategoryClick,
}: {
  categories: ProductCategory[];
  handleCardCategoryClick: (title: string) => void;
}) => {
  return (
    <section className="relative w-full h-80 md:h-96 rounded-md mb-5 flex items-center justify-center overflow-hidden">
      <div className="w-64 h-80 md:h-96 z-10 transition-transform duration-300 hover:-translate-x-10">
        <ImageWithFallback
          src={categories[0]?.images?.id}
          alt={categories[0]?.title}
          className="w-full h-full object-cover rounded-md"
          onClick={() => handleCardCategoryClick(categories[0].title)}
        />
      </div>
      <div className="w-64 h-80 md:h-96 z-20 -ml-16 transition-transform duration-300 hover:-translate-x-10">
        <ImageWithFallback
          src={categories[1]?.images?.id}
          alt={categories[1]?.title}
          className="w-full h-full object-cover rounded-md"
          onClick={() => handleCardCategoryClick(categories[1].title)}
        />
      </div>
      <div className="w-64 h-80 md:h-96 z-30 -ml-16">
        <ImageWithFallback
          src={categories[2]?.images?.id}
          alt={categories[2]?.title}
          className="w-full h-full object-cover rounded-md"
          onClick={() => handleCardCategoryClick(categories[2].title)}
        />
      </div>
    </section>
  );
};

export default CollectionCard;

// UI configuration for different variants

import variants from "../../../variants";

// variants options: variantOne (early stage), variantTwo, variantThree (not implemented yet)

const { variantOne: variant } = variants;

export const UIConfig = {
  type: variant.name,
  // Brand
  brand: variant.brand,

  // Navbar
  navbar: variant.navBarConfig,

  // Footer
  footer: variant.footerConfig,

  // Routes
  routes: variant.routes,

  // index css
  indexCss: variant.css,

  // components
  components: {
    cardCss: variant.sharedComponents.Card,
  },
};

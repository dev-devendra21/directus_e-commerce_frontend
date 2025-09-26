import logo from "@/assets/logo.png";

//  ----------------------------------  Navbar configuration ----------------------------------
const navBarConfig = {
  sticky: true,
  height: "64px",

  menuItems: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
  ],
  mobileMenuItems: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
  ],

  authMenu: {
    authenticated: [
      { label: "Profile", href: "/profile" },
      { label: "Logout", action: "logout" },
    ],
    guest: [
      { label: "Login", href: "/login" },
      { label: "Sign Up", href: "/signup", button: true },
    ],
  },

  showCart: true,
  showWishlist: false,
};

//  ----------------------------------  Footer configuration ----------------------------------
const footerConfig = {
  company: {
    name: "Shop",
    description:
      "Your one-stop destination for quality products at great prices. We're committed to providing the best shopping experience.",
    logo: {
      src: logo,
      width: 50,
      height: 50,
    },
  },

  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
  ],

  customerService: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],

  contactInfo: {
    address: "123 Shopping St, Commerce City, CA 90210",
    phone: "+1 (555) 123-4567",
    email: "support@shop.com",
  },

  socialLinks: [
    { type: "facebook", url: "https://facebook.com/client" },
    { type: "twitter", url: "https://twitter.com/client" },
    { type: "instagram", url: "https://instagram.com/client" },
  ],

  bottomLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],

  copyright: "© 2025 Shop. All rights reserved.",
};

//  ----------------------------------  Home Page configuration ----------------------------------
const homePage = {
  hero: {
    title: "Welcome to Shop",
    description:
      "Your one-stop destination for quality products at great prices. We're committed to providing the best shopping experience.",
    image: {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c6d6fb2?auto=format&fit=crop&w=2070&q=80",
      alt: "Hero Image",
    },
    cta: {
      label: "Shop Now",
      href: "/products",
    },
  },

  sliders: [
    {
      id: 1,
      title: "Biggest Sale of the Season",
      image: {
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2070&q=80",
        alt: "Sale Banner",
      },
      cta: {
        href: "/deals",
      },
    },
    {
      id: 2,
      title: "New Arrivals",
      image: {
        src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=2070&q=80",
        alt: "New Arrivals",
      },
      cta: {
        href: "/new-arrivals",
      },
    },
    {
      id: 3,
      title: "Exclusive Electronics",
      image: {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2070&q=80",
        alt: "Electronics",
      },
      cta: {
        href: "/electronics",
      },
    },
  ],
};

export const UIConfig = {
  //   ----------------------------------  General ----------------------------------
  theme: "themeTwo", // Options: themeOne, themeTwo

  //   ----------------------------------  Brand ----------------------------------
  brand: {
    name: "Shop",
    logo: {
      src: logo,
      width: 50,
      height: 50,
    },
    favicon: logo,
  },

  //   ----------------------------------  Header ----------------------------------

  navbar: navBarConfig,

  //   ----------------------------------  Footer ----------------------------------

  footer: footerConfig,

  // ------------------------  Home Page  -----------------------------------
  homePage: homePage,

  // ----------------------------------- Routes  ---------------------------
  routes: [
    { path: "/", component: "HomePage", protected: false },
    { path: "/products", component: "ProductsPage", protected: false },
    { path: "/product/:id", component: "ProductDetailsPage", protected: false },
    { path: "/categories", component: "CategoriesPage", protected: false },
    { path: "/cart", component: "CartPage", protected: false },
    { path: "/order/:id", component: "OrderDetailsPage", protected: true },
    { path: "/checkout", component: "CheckoutPage", protected: true },
    { path: "/profile", component: "ProfilePage", protected: true },
    { path: "/login", component: "LoginPage", authRedirect: true },
    { path: "/signup", component: "SignupPage", authRedirect: true },
  ],
};

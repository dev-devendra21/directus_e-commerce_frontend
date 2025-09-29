import variant_one_logo from "@/assets/variant_one.svg";
import variant_two_logo from "@/assets/logo.png";

// ---------- Variant 1 ----------------------
const variantOne = {
  name: "v1",
  css: {
    "font-size": "14px",
    "font-family": '"Inter", sans-serif',
    background: "#ffffff",
    foreground: "oklch(0.145 0 0)",
    card: "#F2F2F2",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    primary: "#030213",
    "primary-foreground": "oklch(1 0 0)",
    secondary: "oklch(0.95 0.0058 264.53)",
    "secondary-foreground": "#030213",
    muted: "#ececf0",
    "muted-foreground": "#717182",
    accent: "#e9ebef",
    "accent-foreground": "#030213",
    destructive: "#d4183d",
    "destructive-foreground": "#ffffff",
    border: "rgba(0, 0, 0, 0.1)",
    input: "transparent",
    "input-background": "#f3f3f5",
    "switch-background": "#cbced4",
    "font-weight-medium": "500",
    "font-weight-normal": "400",
    ring: "oklch(0.708 0 0)",
    "chart-1": "oklch(0.646 0.222 41.116)",
    "chart-2": "oklch(0.6 0.118 184.704)",
    "chart-3": "oklch(0.398 0.07 227.392)",
    "chart-4": "oklch(0.828 0.189 84.429)",
    "chart-5": "oklch(0.769 0.188 70.08)",
    radius: "0.625rem",
    sidebar: "oklch(0.985 0 0)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "#030213",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.97 0 0)",
    "sidebar-accent-foreground": "oklch(0.205 0 0)",
    "sidebar-border": "oklch(0.922 0 0)",
    "sidebar-ring": "oklch(0.708 0 0)",
  },
  sharedComponents: {
    Card: "",
  },

  brand: {
    name: "Snikei",
    logo: {
      src: variant_one_logo,
      width: 85,
      height: 34,
    },
    favicon: variant_one_logo,
  },
  navBarConfig: {
    sticky: true,
    height: "64px",
    menuItems: [
      { label: "Categories", href: "/categories" },
      { label: "Products", href: "/products" },
      { label: "About", href: "/about" },
    ],
    mobileMenuItems: [
      { label: "Categories", href: "/categories" },
      { label: "Products", href: "/products" },
      { label: "About", href: "/about" },
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
  },

  footerConfig: {
    company: {
      name: "Snikei",
      description:
        "Your one-stop destination for quality products at great prices. We're committed to providing the best shopping experience.",
      logo: {
        src: variant_one_logo,
        width: 85,
        height: 34,
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
  },

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

// ---------- Variant 2 ----------------------
const variantTwo = {
  name: "v2",
  css: {
    fontSize: "14px",
    fontFamily: '"Inter", sans-serif',
    background: "#ffffff",
    foreground: "oklch(0.145 0 0)",
    card: "#ffffff",
    cardForeground: "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.145 0 0)",
    primary: "#030213",
    primaryForeground: "oklch(1 0 0)",
    secondary: "oklch(0.95 0.0058 264.53)",
    secondaryForeground: "#030213",
    muted: "#ececf0",
    mutedForeground: "#717182",
    accent: "#e9ebef",
    accentForeground: "#030213",
    destructive: "#d4183d",
    destructiveForeground: "#ffffff",
    border: "rgba(0, 0, 0, 0.1)",
    input: "transparent",
    inputBackground: "#f3f3f5",
    switchBackground: "#cbced4",
    fontWeightMedium: "500",
    fontWeightNormal: "400",
    ring: "oklch(0.708 0 0)",
    chart1: "oklch(0.646 0.222 41.116)",
    chart2: "oklch(0.6 0.118 184.704)",
    chart3: "oklch(0.398 0.07 227.392)",
    chart4: "oklch(0.828 0.189 84.429)",
    chart5: "oklch(0.769 0.188 70.08)",
    radius: "0.625rem",
    sidebar: "oklch(0.985 0 0)",
    sidebarForeground: "oklch(0.145 0 0)",
    sidebarPrimary: "#030213",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.97 0 0)",
    sidebarAccentForeground: "oklch(0.205 0 0)",
    sidebarBorder: "oklch(0.922 0 0)",
    sidebarRing: "oklch(0.708 0 0)",
  },
  sharedComponents: {
    Card: "shadow-md",
  },

  brand: {
    name: "Shop",
    logo: {
      src: variant_two_logo,
      width: 50,
      height: 50,
    },
    favicon: variant_two_logo,
  },

  navBarConfig: {
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
  },

  footerConfig: {
    company: {
      name: "Shop",
      description:
        "Your one-stop destination for quality products at great prices. We're committed to providing the best shopping experience.",
      logo: {
        src: variant_two_logo,
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
  },

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

// ---------- Variant 3 (not implemented yet) ----------------------
const variantThree = {
  name: "v3",
  css: {
    "font-size": "14px",
    "font-family": "cursive",
    background: "oklch(0.99 0.02 100)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(0.98 0.01 100)",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(0.98 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    primary: "oklch(0.55 0.15 340)",
    "primary-foreground": "oklch(0.98 0 0)",
    secondary: "oklch(0.45 0.12 220)",
    "secondary-foreground": "oklch(0.98 0 0)",
    muted: "oklch(0.95 0.01 100)",
    "muted-foreground": "oklch(0.2 0 0)",
    accent: "oklch(0.97 0.01 100)",
    "accent-foreground": "oklch(0.145 0 0)",
    destructive: "oklch(0.5 0.22 20)",
    "destructive-foreground": "oklch(0.98 0 0)",
    border: "oklch(0.88 0 0)",
    input: "transparent",
    "input-background": "oklch(0.98 0.01 100)",
    "switch-background": "oklch(0.95 0.01 100)",
    "font-weight-medium": "500",
    "font-weight-normal": "400",
    ring: "oklch(0.55 0.15 340)",
    "chart-1": "oklch(0.55 0.15 340)",
    "chart-2": "oklch(0.45 0.12 220)",
    "chart-3": "oklch(0.5 0.1 250)",
    "chart-4": "oklch(0.6 0.2 270)",
    "chart-5": "oklch(0.65 0.18 290)",
    radius: "0.75rem",
    sidebar: "oklch(0.98 0.01 100)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "oklch(0.55 0.15 340)",
    "sidebar-primary-foreground": "oklch(0.98 0 0)",
    "sidebar-accent": "oklch(0.97 0.01 100)",
    "sidebar-accent-foreground": "oklch(0.145 0 0)",
    "sidebar-border": "oklch(0.92 0 0)",
    "sidebar-ring": "oklch(0.55 0.15 340)",
  },
  sharedComponents: {
    Card: "shadow-md",
  },
};

export default { variantOne, variantTwo, variantThree };

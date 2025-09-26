const defaultTheme = {
  "font-size": "14px",
  "font-family": '"Inter", sans-serif',
  background: "#ffffff",
  foreground: "oklch(0.145 0 0)",
  card: "#ffffff",
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
};

const pastelNeutralTheme = {
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
};

export const themeConfig = {
  // Themes for different UI configurations

  /* Theme One Configuration */

  themeOne: {
    desktop: {
      css: pastelNeutralTheme,
      header: {
        logo: {
          position: "md:order-1",
          text: "block",
        },
        menuLinks: {
          position: "md:order-2",
        },

        authLinks: {
          position: "md:order-3",
        },
      },
      footer: {
        logo: {
          text: "block",
        },
      },
    },
  },

  /* Theme Two Configuration */

  themeTwo: {
    desktop: {
      css: defaultTheme,
      header: {
        logo: {
          position: "md:order-2",
          text: "hidden",
        },
        menuLinks: {
          position: "md:order-1",
        },

        authLinks: {
          position: "md:order-3",
        },
      },
      footer: {
        logo: {
          text: "hidden",
        },
      },
    },
  },
};

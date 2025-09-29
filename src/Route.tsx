import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy } from "react";
import { Toaster } from "sonner";
import Layout from "./shared/components/layout/Layout";
import ErrorBoundary from "./shared/components/ErrorBoundary";
import useStore from "./shared/store/useStore";
import { UIConfig } from "./shared/config/uiConfig";

// Page imports
const { type: variantType } = UIConfig;

// Dynamically require the correct variant folder

const HomePage = lazy(() => import(`./variants/${variantType}/pages/HomePage`));
const ProductsPage = lazy(
  () => import(`./variants/${variantType}/pages/ProductsPage`)
);
const ProductDetailsPage = lazy(
  () => import(`./variants/${variantType}/pages/ProductDetailsPage`)
);
const CartPage = lazy(() => import(`./variants/${variantType}/pages/CartPage`));
const CheckoutPage = lazy(
  () => import(`./variants/${variantType}/pages/CheckoutPage`)
);
const CategoriesPage = lazy(
  () => import(`./variants/${variantType}/pages/CategoriesPage`)
);
const LoginPage = lazy(
  () => import(`./variants/${variantType}/pages/auth/LoginPage`)
);
const SignupPage = lazy(
  () => import(`./variants/${variantType}/pages/auth/SignupPage`)
);
const NotFoundPage = lazy(
  () => import(`./variants/${variantType}/pages/NotFoundPage`)
);
const ProfilePage = lazy(
  () => import(`./variants/${variantType}/pages/ProfilePage`)
);
const OrderDetailsPage = lazy(
  () => import(`./variants/${variantType}/pages/OrderDetailsPage`)
);

const AboutPage = lazy(
  () => import(`./variants/${variantType}/pages/AboutPage`)
);

// Map string → component
const pageComponents: Record<string, React.ElementType> = {
  HomePage,
  ProductsPage,
  ProductDetailsPage,
  CartPage,
  CheckoutPage,
  CategoriesPage,
  LoginPage,
  SignupPage,
  NotFoundPage,
  ProfilePage,
  OrderDetailsPage,
  AboutPage,
};

export default function MainRoute() {
  const { isAuthenticated } = useStore();

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            {UIConfig.routes.map(
              ({ path, component, protected: isProtected, authRedirect }) => {
                const Component = pageComponents[component];

                if (!Component) return null; // safety check

                // 🔒 Protected routes (requires login)
                if (isProtected) {
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={
                        isAuthenticated ? (
                          <Component />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                  );
                }

                // 🔑 Auth-only redirect (login/signup)
                if (authRedirect) {
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={
                        isAuthenticated ? <Navigate to="/" /> : <Component />
                      }
                    />
                  );
                }

                // Normal public route
                return <Route key={path} path={path} element={<Component />} />;
              }
            )}

            {/* Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
        <Toaster richColors position="bottom-right" />
      </Router>
    </ErrorBoundary>
  );
}

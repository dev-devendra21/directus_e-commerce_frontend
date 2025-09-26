import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import useStore from "./store/useStore";
import { UIConfig } from "./config/uiConfig";

// Page imports
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

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

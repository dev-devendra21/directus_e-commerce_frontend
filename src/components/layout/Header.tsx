import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStore from "@/store/useStore";
import { toast } from "sonner";
import { useGetCart } from "@/hooks/apis/queries/useCart";
import { UIConfig } from "@/config/uiConfig"; // 🔑 central config
// import { themeConfig } from "@/config/themeConfig";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { brand, navbar } = UIConfig;

  // const { logo, authLinks, menuLinks } =
  //   themeConfig[theme as keyof typeof themeConfig].desktop.header;

  const { isAuthenticated, user, logout } = useStore();

  const {
    data: cart,
    isSuccess,
    refetch,
    isLoading: cartLoading,
  } = useGetCart();

  // Count cart items
  let cartItemsCount = 0;
  if (isAuthenticated && isSuccess && cart) {
    cartItemsCount = Array.isArray(cart)
      ? cart[0]?.cart_item?.length || 0
      : cart?.cart_item?.length || 0;
  }

  useEffect(() => {
    if (isAuthenticated) refetch();
  }, [isAuthenticated, refetch]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth-storage" || e.key === "cart-updated") {
        if (isAuthenticated) refetch();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isAuthenticated, refetch]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    refetch();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`${
        navbar.sticky ? "fixed top-0" : ""
      } z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80`}
      style={{ height: navbar.height }}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center space-x-2`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src={brand.logo.src}
              alt={brand.name}
              width={brand.logo.width}
              height={brand.logo.height}
              className="h-auto"
            />
            <span className={`text-xl font-semibold `}>{brand.name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center space-x-6 `}>
            {navbar.menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className={`flex items-center space-x-4 `}>
            {/* Cart */}
            {navbar.showCart && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {isAuthenticated && cartItemsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {cartItemsCount > 99 ? "99+" : cartItemsCount}
                    </Badge>
                  )}
                  {isAuthenticated && cartLoading && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  )}
                </Link>
              </Button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">
                      {user?.first_name || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navbar.authMenu.authenticated.map((item) =>
                    item.action === "logout" ? (
                      <DropdownMenuItem key="logout" onClick={handleLogout}>
                        {item.label}
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild key={item.href}>
                        <Link to={item.href || "/"}>{item.label}</Link>
                      </DropdownMenuItem>
                    )
                  )}
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                {navbar.authMenu.guest.map((item) =>
                  item.button ? (
                    <Button size="sm" asChild key={item.href}>
                      <Link to={item.href}>{item.label}</Link>
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" asChild key={item.href}>
                      <Link to={item.href}>{item.label}</Link>
                    </Button>
                  )
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            {/* Mobile Navigation */}
            <nav className="space-y-2 px-4">
              {(navbar.mobileMenuItems || navbar.menuItems).map((item) => {
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block py-2 transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {isAuthenticated ? (
                <>
                  {navbar.authMenu.authenticated.map((item) =>
                    item.action === "logout" ? (
                      <button
                        key="logout"
                        onClick={handleLogout}
                        className="block w-full text-left py-2 transition-colors hover:text-primary"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.href}
                        to={item.href || "/"}
                        className="block py-2 transition-colors hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </>
              ) : (
                <>
                  {navbar.authMenu.guest.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block py-2 transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

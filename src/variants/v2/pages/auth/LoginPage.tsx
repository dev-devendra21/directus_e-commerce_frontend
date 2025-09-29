import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import useStore from "@/shared/store/useStore";
import { toast } from "sonner";
import { useLoginCustomer } from "@/shared/hooks/apis/mutations/useCustomers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/shared/dto/loginForm";
import type { Login } from "@/shared/types/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { loginCustomerMutation } = useLoginCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setToken } = useStore();

  const handleLoginForm = (data: Login) => {
    loginCustomerMutation(data, {
      onSuccess: (res) => {
        const token = res.access_token;
        const refresh_token = res.refresh_token;
        const expiresAt = res?.expires || null;
        const isAuthenticated = true;
        setToken(token, refresh_token, expiresAt, isAuthenticated);
        toast.success("Login successfully");
        navigate("/profile");
      },
      onError: (error) => {
        toast.error("Login failed", { description: error.message });
      },
    });
  };

  const errorText = ({
    isValid,
    message,
  }: {
    isValid: boolean;
    message: string;
  }) => {
    return isValid ? (
      <>
        <p className="text-red-500 text-sm mt-2 flex gap-2 items-center">
          <Check className="h-4 w-4 text-green-500" />
          <span>{message}</span>
        </p>
      </>
    ) : (
      <>
        <p className="text-red-500 text-sm mt-2 flex gap-2 items-center">
          <X className="h-4 w-4 text-red-500" />
          <span>{message}</span>
        </p>
      </>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to continue shopping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(handleLoginForm)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                  />
                  {errors.email &&
                    errorText({
                      isValid: false,
                      message: errors.email.message || "Email is required",
                    })}
                </div>

                <div>
                  <Label htmlFor="password" className="mb-2">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password &&
                    errorText({
                      isValid: false,
                      message:
                        errors.password.message || "Password is required",
                    })}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

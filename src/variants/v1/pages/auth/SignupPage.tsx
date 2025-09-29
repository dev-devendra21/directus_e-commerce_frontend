import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

import { Label } from "@/shared/components/ui/label";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpSchema from "@/shared/dto/signupForm";
import { useCreateCustomer } from "@/shared/hooks/apis/mutations/useCustomers";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { createCustomerMutation } = useCreateCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const handleSignupForm = (data: any) => {
    createCustomerMutation(data, {
      onSuccess: (res) => {
        console.log(res);
        toast.success("Account created successfully");
        navigate("/login");
      },
      onError: (error) => {
        toast.error("Signup failed", { description: error.message });
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
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center mb-14">
            <h1 className="text-4xl font-semibold">Sign Up</h1>
          </div>

          <section>
            <div>
              <form
                onSubmit={handleSubmit(handleSignupForm)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="mb-2 text-xl">
                      First Name
                    </Label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      className="w-full border-b p-3 outline-0 focus:border-primary"
                      {...register("firstName")}
                    />
                    {errors.firstName &&
                      errorText({
                        isValid: false,
                        message:
                          errors.firstName.message || "first name is required",
                      })}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-2 text-xl">
                      Last Name
                    </Label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      className="w-full border-b p-3 outline-0 focus:border-primary"
                      {...register("lastName")}
                    />
                    {errors.lastName &&
                      errorText({
                        isValid: false,
                        message:
                          errors.lastName.message || "last name is required",
                      })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2 text-xl">
                    Email
                  </Label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className="w-full border-b p-3 outline-0 focus:border-primary"
                  />
                  {errors.email &&
                    errorText({
                      isValid: false,
                      message: errors.email.message || "email is required",
                    })}
                </div>

                <div>
                  <Label htmlFor="password" className="mb-2 text-xl">
                    Password
                  </Label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full border-b p-3 outline-0 focus:border-primary"
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
                        errors.password.message || "password is required",
                    })}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="mb-2 text-xl">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full border-b p-3 outline-0 focus:border-primary"
                      {...register("confirmPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword &&
                    errorText({
                      isValid: false,
                      message:
                        errors.confirmPassword.message ||
                        "password is required",
                    })}
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-2 text-xl">
                    Phone Number
                  </Label>
                  <input
                    {...register("phone")}
                    type="string"
                    id="phone"
                    placeholder="Phone Number"
                    className="w-full border-b p-3 outline-0 focus:border-primary"
                  />
                  {errors.phone &&
                    errorText({
                      isValid: false,
                      message: errors.phone.message || "phone is required",
                    })}
                </div>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full mt-5 p-6"
                >
                  {isSubmitting ? "Please wait..." : "Sign Up Now"}
                  <ArrowRight className="ml-2 text-xl" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>

              <div className="mt-4 text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

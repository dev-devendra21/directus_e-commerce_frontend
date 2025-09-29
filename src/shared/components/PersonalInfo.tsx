import { Separator } from "@/shared/components/ui/separator";
import { Phone, Mail, User, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import AddressCard from "./AddressCard";
import { Button } from "./ui/button";
import {
  useSendOtpForEmailVerification,
  useVerifyCustomerEmail,
} from "@/shared/hooks/apis/mutations/useCustomers";
import type { PersonalInfoProps } from "@/shared/types/profile";
import { useState } from "react";
import { InputOTPWithSeparator } from "@/shared/components/figma/InputOTPWithSeparator";

function PersonalInfo({
  name,
  email,
  phone,
  addresses,
  memberSince,
  isVerified,
  handleActiveSection,
  onEmailVerified,
}: PersonalInfoProps) {
  const handleManageAddress = (id: string) => {
    handleActiveSection(id, "Address");
  };

  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const { verifyCustomerMutation } = useVerifyCustomerEmail();
  const { sendOtpMutation } = useSendOtpForEmailVerification();

  const handleOtpComplete = async () => {
    await sendOtpMutation(
      { otp },
      {
        onSuccess: () => {
          console.log("OTP sent successfully");
          setOpen(false);
          setOtp("");
          onEmailVerified();
        },
        onError: (error: Error) => {
          console.log("error while sending otp", error.message);
        },
      }
    );
  };

  const handleVerifyEmail = () => {
    verifyCustomerMutation(
      { email },
      {
        onSuccess: () => {
          setOpen(true);
        },
        onError: (error: Error) => {
          console.log("error while creating address", error.message);
        },
      }
    );
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <User className="w-6 h-6" />
          Personal Information
        </h1>
      </div>
      <div className="p-6">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Calendar className="w-3.5 h-3.5" />
              Member since {memberSince}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Contact Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Email Address
              </p>
              <p className="text-sm font-medium text-gray-900">{email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Phone Number
              </p>
              <p className="text-sm font-medium text-gray-900">{phone}</p>
            </div>
          </div>

          {/* Multiple Addresses */}
          {addresses && addresses.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Saved Addresses
              </p>
              <div className="flex gap-3 flex-wrap">
                {addresses.map((address) => (
                  <AddressCard
                    address={address}
                    key={address.id}
                    onEdit={handleManageAddress}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account Status */}
        {!isVerified && (
          <div className="text-end mt-3">
            <Button onClick={handleVerifyEmail}>Verify Email</Button>
          </div>
        )}
        <div
          className={`mt-6 p-4 ${
            isVerified
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }  border  rounded-lg`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 ${
                isVerified ? "bg-green-600" : "bg-red-600"
              } rounded-full`}
            ></div>
            <p
              className={`text-sm font-medium ${
                isVerified ? "text-green-800" : "text-red-800"
              }`}
            >
              Account Verified
            </p>
          </div>
          <p
            className={`text-xs ${
              isVerified ? "text-green-800" : "text-red-800"
            } mt-1`}
          >
            Your account is{" "}
            {isVerified
              ? "verified ✅ and you can start shopping now."
              : "not verified ❌. Please verify your account to place orders."}
          </p>
        </div>
      </div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          setOtp("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Verification</DialogTitle>

            <div className="flex justify-center">
              <InputOTPWithSeparator
                otpValue={otp}
                onChange={setOtp}
                onComplete={handleOtpComplete}
              />
            </div>

            <DialogDescription>
              Please enter the 6-digit One-Time Password (OTP) sent to your
              email. This code will expire in 10 minutes.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PersonalInfo;

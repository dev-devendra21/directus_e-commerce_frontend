import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addressSchema } from "@/dto/addressForm";
import {
  useCreateCustomerAddress,
  useUpdateCustomerAddress,
} from "@/hooks/apis/mutations/useCustomers";

import type { AddressData } from "@/types/address";
import { useGetCustomerAddress } from "@/hooks/apis/queries/useProfile";
import { useSearchParams } from "react-router-dom";
import { MapPin } from "lucide-react";

const Address = ({
  handleActiveSection,
}: {
  handleActiveSection: (id: string, section: string) => void;
}) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "",
    },
  });

  const { createCustomerAddressMutation } = useCreateCustomerAddress();
  const { updateCustomerAddressMutation } = useUpdateCustomerAddress();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const { data: address } = useGetCustomerAddress(id);

  const createAddress = (data: AddressData) => {
    createCustomerAddressMutation(data, {
      onSuccess: () => {
        toast.success("Address created successfully");
        handleActiveSection("", "Personal Details");
      },
      onError: (error) => {
        toast.error("Address creation failed", { description: error.message });
      },
    });
  };

  const updateAddress = (data: AddressData) => {
    updateCustomerAddressMutation(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Address updated successfully");
          handleActiveSection("", "Personal Details");
        },
        onError: (error) => {
          toast.error("Address update failed", { description: error.message });
        },
      }
    );
  };

  const handleAddressForm = (data: AddressData) => {
    if (id) {
      updateAddress(data);
    } else {
      createAddress(data);
    }
  };
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          My Address
        </h1>
      </div>

      <form onSubmit={handleSubmit(handleAddressForm)} className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              className="accent-primary p-2"
              type="checkbox"
              defaultChecked={address?.is_active || false}
              {...register("is_active")}
            />
            Active Address
          </label>
          {errors.is_active && (
            <p className="text-red-500 text-sm">{errors.is_active.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-2">Address Type</Label>

          <div className="flex gap-4">
            <Label className="flex items-center gap-2">
              <input
                className="accent-primary "
                type="radio"
                value="shipping"
                defaultChecked={address?.address_type === "shipping" || false}
                {...register("address_type")}
              />
              Shipping
            </Label>
            <Label className="flex items-center gap-2">
              <input
                className="accent-primary"
                type="radio"
                value="billing"
                defaultChecked={address?.address_type === "billing"}
                {...register("address_type")}
              />
              Billing
            </Label>
          </div>
          {errors.address_type && (
            <p className="text-red-500 text-sm">
              {errors.address_type.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="type" className="mb-2">
            Address
          </Label>
          <Input
            type="text"
            id="type"
            placeholder="Home, Office, etc."
            defaultValue={address?.type || ""}
            {...register("type")}
          />

          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="address_line_1" className="mb-2">
            Address Line 1
          </Label>
          <Input
            type="text"
            id="address_line_1"
            placeholder="Street, House No."
            defaultValue={address?.address_line_1 || ""}
            {...register("address_line_1")}
          />
          {errors.address_line_1 && (
            <p className="text-red-500 text-sm">
              {errors.address_line_1.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="address_line_2" className="mb-2">
            Address Line 2
          </Label>
          <Input
            type="text"
            id="address_line_2"
            placeholder="Apartment, Landmark"
            defaultValue={address?.address_line_2 || ""}
            {...register("address_line_2")}
          />
          {errors.address_line_2 && (
            <p className="text-red-500 text-sm">
              {errors.address_line_2.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="mb-2">
              City
            </Label>
            <Input
              type="text"
              id="city"
              {...register("city")}
              defaultValue={address?.city}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="state" className="mb-2">
              State
            </Label>
            <Input
              type="text"
              id="state"
              {...register("state")}
              defaultValue={address?.state}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="postal_code" className="mb-2">
              Postal Code
            </Label>
            <Input
              type="text"
              id="postal_code"
              {...register("postal_code")}
              defaultValue={address?.postal_code}
            />
            {errors.postal_code && (
              <p className="text-red-500 text-sm">
                {errors.postal_code.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="country_code" className="mb-2">
            Country Code
          </Label>
          <Input
            type="text"
            id="country_code"
            placeholder="IN"
            defaultValue={address?.country_code}
            {...register("country_code")}
          />
          {errors.country_code && (
            <p className="text-red-500 text-sm">
              {errors.country_code.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full max-w-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Save Address"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Address;

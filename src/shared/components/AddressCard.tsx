import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import type { AddressData } from "@/shared/types/address";
import { useLocation } from "react-router-dom";

import { MapPin, Home, Building2, Edit } from "lucide-react";

const AddressCard = ({
  address,
  onEdit,
  selectAddress,
  setSelectAddress,
}: {
  address: AddressData;
  onEdit?: (id: string) => void;
  selectAddress?: AddressData | null;
  setSelectAddress?: (address: AddressData | null) => void;
}) => {
  const { pathname } = useLocation();

  const icon =
    address?.type?.toLocaleLowerCase() === "home" ? (
      <Home className="h-5 w-5 text-primary" />
    ) : address?.type?.toLocaleLowerCase() === "office" ? (
      <Building2 className="h-5 w-5 text-primary" />
    ) : (
      <MapPin className="h-5 w-5 text-primary" />
    );
  return (
    <Card
      className={`shadow-md hover:shadow-lg transition rounded-2xl w-[250px] ${
        pathname === "/checkout" && "cursor-pointer"
      } ${
        selectAddress?.id === address.id
          ? "border-primary"
          : "border-transparent"
      }`}
      onClick={() => setSelectAddress?.(address)}
    >
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="capitalize text-[14px]">
            {address.type}
          </CardTitle>
        </div>
        <div>
          {onEdit && (
            <Edit
              onClick={() => onEdit?.(address.id as string)}
              className="h-5 w-5 cursor-pointer"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p>{address.address_line_1}</p>
        {address.address_line_2 && <p>{address.address_line_2}</p>}
        <p>
          {address.city}, {address.state} {address.postal_code}
        </p>
        <p>{address.country_code}</p>
        {address.is_active && (
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
            Active
          </span>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;

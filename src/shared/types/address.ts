type AddressData = {
  id?: string;
  isDefault?: boolean;
  is_active?: boolean;
  type: string;
  address_type: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
};

export type { AddressData };

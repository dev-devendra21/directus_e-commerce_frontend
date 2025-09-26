import type { AddressData } from "./address";

export type PersonalInfoProps = {
  name: string;
  email: string;
  phone: string;
  addresses?: AddressData[];
  memberSince?: string;
  isVerified?: boolean;
  onEdit?: (id: string) => string;
  handleActiveSection: (id: string, section: string) => void;
  onEmailVerified: () => void;
};

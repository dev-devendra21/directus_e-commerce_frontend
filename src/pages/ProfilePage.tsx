import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Separator } from "@/components/ui/separator";
import { useGetProfile } from "@/hooks/apis/queries/useProfile";
import LoadingSpinner from "@/components/LoadingSpinner";
import Address from "@/components/Address";
import PersonalInfo from "@/components/PersonalInfo";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import useStore from "@/store/useStore";
import type { AddressData } from "@/types/address";
import OrderHistory from "@/components/OrderHistory";

const profileSection = ["Account Info", "Address", "My Orders"];

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState(profileSection[0]);
  const { data: profile, isError, isLoading, error, refetch } = useGetProfile();

  const [, setSearchParams] = useSearchParams();
  const { setUser } = useStore();

  useEffect(() => {
    refetch();
  }, [activeSection, refetch]);

  useEffect(() => {
    if (profile) {
      const user = profile[0]?.user;
      const userId = profile[0]?.id;
      let address;
      if (profile[0]?.addresses.length === 0) {
        address = {
          id: null,
        };
      }
      if (profile[0]?.addresses.length === 1) {
        address = profile[0]?.addresses[0];
      } else {
        address = profile[0]?.addresses.find(
          (address: AddressData) => address.address_type === "billing"
        );
      }
      setUser(user, userId, address?.id);
    }
  }, [profile, setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>An error occurred: {error?.message}</p>
      </div>
    );
  }

  const handleActiveSection = (id: string, section: string) => {
    setActiveSection(section);
    setSearchParams({ id });
  };

  const user = profile[0]?.user;

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Account Info":
        return (
          <PersonalInfo
            name={`${user?.first_name} ${user?.last_name}`}
            email={user?.email ?? ""}
            phone={user?.phone ?? "Not provided"}
            memberSince={
              format(profile[0]?.date_created, "dd MMM yyyy, hh:mm a") ?? "N/A"
            }
            isVerified={profile[0]?.is_Email_Verified ?? false}
            addresses={profile[0]?.addresses}
            handleActiveSection={handleActiveSection}
            onEmailVerified={() => refetch()}
          />
        );
      case "Address":
        return <Address handleActiveSection={handleActiveSection} />;
      case "My Orders":
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-4">Profile</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <section className="profile-section">
          <Card>
            <CardContent>
              <div className="flex justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                  fallbackSrc="https://via.placeholder.com/150"
                  width={150}
                  height={150}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mt-2"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <Separator className="mt-4" />
              <ul className="mt-4 space-y-2">
                {profileSection.map((section) => (
                  <li
                    key={section}
                    onClick={() => {
                      handleActiveSection("", section);
                    }}
                  >
                    <p
                      className={`cursor-pointer ${
                        activeSection === section
                          ? "bg-primary text-white"
                          : "hover:bg-accent"
                      } py-2 px-4 rounded-md`}
                    >
                      {section}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Content */}
        <section className="w-full">
          <Card>
            <CardContent>{renderActiveSection()}</CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
};

export default ProfilePage;

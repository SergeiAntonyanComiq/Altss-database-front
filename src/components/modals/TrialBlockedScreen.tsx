import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const messages = {
  expired: {
    title: "Trial Access Expired",
    description: (
      <>
        <p>Thanks for exploring Altss.</p>
        <p className="mt-2">
          Your 24-hour trial has ended. To continue accessing verified LP
          insights and real-time investment signals, please contact your account
          executive.
        </p>
      </>
    ),
  },
  office_or_contact: {
    title: "Profile View Limit Reached",
    description: (
      <>
        <p>You’ve reached your profile view limit.</p>
        <p className="mt-2">
          This trial allows access to 50 profiles. To unlock full platform
          access, please reach out to your account manager.
        </p>
      </>
    ),
  },
};

type Props = {
  type: "office_or_contact" | "expired";
};

const TrialBlockedScreen = ({ type }: Props) => {
  const navigate = useNavigate();
  const content = messages[type];
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({ logoutParams: { returnTo: window.location.origin } });
    navigate("/familyoffices", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F6F7] px-4 text-center">
      <div className="max-w-md bg-white p-8 rounded-xl shadow-md">
        <img
          src="/images/logo.png"
          alt="Altss Logo"
          className="h-10 mx-auto mb-6 object-contain"
        />
        <h1 className="text-2xl font-semibold text-[#111928]">
          {content.title}
        </h1>
        <div className="mt-4 text-sm text-[#6B7280]">{content.description}</div>
        <Button className="mt-8 w-full" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default TrialBlockedScreen;

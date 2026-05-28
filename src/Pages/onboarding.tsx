import { useUser } from "@clerk/clerk-react";

const onboarding = () => {
  const { user } = useUser();
  
  return <div>Onboarding</div>;
};

export default onboarding;

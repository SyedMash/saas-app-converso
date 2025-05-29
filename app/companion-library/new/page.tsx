import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="bg-gray-50 min-h-[calc(100dvh-80px)] w-dvw">
      <div className="custom-width overflow-hidden">
        <div className="w-full h-full ">
          <CompanionForm />
        </div>
      </div>
    </div>
  );
};

export default page;

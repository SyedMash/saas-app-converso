import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <main className="flex-center h-[calc(100dvh-80px)] w-full">
      <SignIn />
    </main>
  );
};

export default page;

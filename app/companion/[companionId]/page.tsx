import React from "react";

const page = ({ params }: { params: { companionId: string } }) => {
  return (
    <div className="bg-gray-50 min-h-[calc(100dvh-80px)] w-dvw">
      <div className="custom-width overflow-hidden">
        <h1 className="mt-12">{params.companionId}</h1>
      </div>
      ;
    </div>
  );
};

export default page;

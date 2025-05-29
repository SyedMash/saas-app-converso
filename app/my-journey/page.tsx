import List from "@/components/List";
import { recentLessons } from "@/constants";
import Image from "next/image";
import React from "react";

interface DetailsBoxProps {
  icon: string;
  quantity: string;
  title: string;
}

const DetailsBox = ({ icon, quantity, title }: DetailsBoxProps) => {
  return (
    <div className="border-2 border-black py-3 px-6 rounded-xl">
      <figure className="flex gap-2 items-center">
        <Image src={icon} alt="check" width={28} height={28} />
        <h1>{quantity}</h1>
      </figure>
      <p className="mt-2 capitalize text-wrap">{title}</p>
    </div>
  );
};

const page = () => {
  return (
    <div className="bg-gray-50 min-h-dvh w-dvw">
      <div className="custom-width overflow-hidden">
        <div className="mt-12 flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
          <figure className="flex items-center gap-4">
            <Image
              src={"/icons/science.svg"}
              alt="person"
              height={48}
              width={48}
              className="object-cover rounded-xl"
            />
            <div>
              <h1>Name</h1>
              <p>email@email.com</p>
            </div>
          </figure>
          <div className="flex items-center gap-6">
            <DetailsBox
              icon="/icons/check.svg"
              title="lessons completed"
              quantity="23"
            />
            <DetailsBox
              icon="/icons/cap.svg"
              title="companions created"
              quantity="10"
            />
          </div>
        </div>
        <div className="rounded-xl border-2 p-6 mt-6">
          <h1>Completed lessons</h1>
          <div className="hidden md:flex items-center justify-between mt-6">
            <p className="">Lessons</p>
            <div className="flex items-center gap-24">
              <p className="hidden md:block">Subject</p>
              <p className="hidden md:block">Duration</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {recentLessons.map((lesson) => (
              <List key={lesson.id} {...lesson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

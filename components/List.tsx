import Image from "next/image";
import React from "react";

interface ListProps {
  subject: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
}

const List = ({ color, duration, name, subject, topic }: ListProps) => {
  return (
    <div className="flex items-center justify-between flex-col md:flex-row">
      <div className="flex items-center gap-6">
        <div
          className="w-fit p-3 rounded-xl"
          style={{ backgroundColor: color }}
        >
          <Image
            src={"/icons/science.svg"}
            alt="science"
            height={36}
            width={36}
          />
        </div>
        <div>
          <h2>{name}</h2>
          <p>Topic: {topic}</p>
        </div>
      </div>

      <div className="flex gap-6 mt-6 items-center md:gap-24 md:mt-0">
        <div className="bg-black text-white items-center justify-center rounded-xl py-1 px-4 capitalize flex">
          {subject}
        </div>
        <p>{duration} mins</p>
      </div>
    </div>
  );
};

export default List;

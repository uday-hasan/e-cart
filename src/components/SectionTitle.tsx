import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full realtive flex items-center justify-center mb-20">
      <h1 className="title-heading text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default SectionTitle;

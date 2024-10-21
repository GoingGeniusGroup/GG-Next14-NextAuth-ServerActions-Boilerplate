interface AboutSectionProps {
  aboutUser: { name: string; description: string; updatedAt: string };
}

export default function AboutSection({ aboutUser }: AboutSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-gray-300">
          <span>{aboutUser.name}</span> | <span>{aboutUser.updatedAt}</span>
        </div>
      </div>
      <p className="text-gray-300 mt-32 w-[57%] overflow-hidden text-ellipsis whitespace-normal line-clamp-2">
        {aboutUser.description}
      </p>
    </div>
  );
}

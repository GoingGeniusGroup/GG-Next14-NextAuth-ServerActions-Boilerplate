interface SliderLayoutProp {
  children: React.ReactNode;
  avatar: React.ReactNode;
  card: React.ReactNode;
  experience: React.ReactNode;
  projects: React.ReactNode;
  skills: React.ReactNode;
}

export default function SliderLayout({
  children,
  avatar,
  card,
  experience,
  projects,
  skills,
}: SliderLayoutProp) {
  return (
    <div className="relative dark:text-white text-black">
      {avatar}
      {card}
      {experience}
      {projects}
      {skills}
      {children}
    </div>
  );
}

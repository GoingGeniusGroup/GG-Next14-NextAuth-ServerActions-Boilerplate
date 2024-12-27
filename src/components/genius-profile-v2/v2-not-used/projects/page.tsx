"use cache";
interface GeniusUserProjectProps {
  params: {
    username: string;
  };
}

export default async function GeniusUserProject({
  params,
}: GeniusUserProjectProps) {
  return <>Okay {params.username}</>;
}

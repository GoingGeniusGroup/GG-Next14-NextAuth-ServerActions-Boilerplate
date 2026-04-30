interface GeniusUserProjectProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function GeniusUserProject(props: GeniusUserProjectProps) {
  const params = await props.params;
  return <>Okay {params.username}</>;
}

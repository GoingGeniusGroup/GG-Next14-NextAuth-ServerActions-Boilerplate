import { Card, CardContent, CardHeader } from "@/src/ui/card";
import { Progress } from "@/src/ui/progress/progress";

interface Achievement {
  title: string;
  current: number;
  total: number;
  xp: number;
}

export default function AchievementsCard() {
  const achievements: Achievement[] = [
    {
      title: "Play the following number of games",
      current: 2,
      total: 10,
      xp: 500,
    },
    { title: "Deal 1500 damage", current: 314, total: 1500, xp: 250 },
    {
      title: "Kill or assist in killing 5 enemies",
      current: 3,
      total: 5,
      xp: 250,
    },
    { title: "Revive 15 team members", current: 0, total: 15, xp: 750 },
    { title: "Shotgun eliminations", current: 2, total: 10, xp: 500 },
    { title: "Sniper rifle eliminations", current: 0, total: 10, xp: 500 },
  ];

  const totalProgress = 600;
  const totalRequired = 1000;

  return (
    <Card className="w-full rounded-lg bg-zinc-900 text-white border-none">
      <CardHeader className="space-y-1 pb-4">
        {/* <div className="text-2xl font-bold tracking-tight">SEASON 2</div>
        <div className="text-rose-500 font-semibold">WEEK 3</div> */}
        <div className="text-sm text-zinc-400">
          {totalProgress} / {totalRequired}
        </div>
        <Progress
          value={(totalProgress / totalRequired) * 100}
          className="h-2 bg-zinc-800"
        />
        {/* <button className="bg-zinc-800 text-sm px-4 py-1.5 rounded-md hover:bg-zinc-700 transition-colors">
          CHECK AWARDS
        </button> */}
      </CardHeader>
      <CardContent className="space-y-4 h-[170px] overflow-auto">
        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>{achievement.title}</span>
              <span className="text-blue-400">+{achievement.xp}xp</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-medium">
                {achievement.current} / {achievement.total}
              </div>
              <Progress
                value={(achievement.current / achievement.total) * 100}
                className="h-2 flex-1 bg-zinc-800"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

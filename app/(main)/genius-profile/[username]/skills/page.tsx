import { SpaceRadarChart } from "@/components/comp/Recharts/radar-chart/SpaceRadarChart";
import SkillsForm from "@/components/comp/Forms/SkillsForm";

const data = [
  { subject: "Frontend", skill1: 90, skill2: 85, skill3: 95 },
  { subject: "Backend", skill1: 95, skill2: 90, skill3: 85 },
  { subject: "DevOps", skill1: 80, skill2: 95, skill3: 90 },
  { subject: "Database", skill1: 85, skill2: 80, skill3: 95 },
  { subject: "Architecture", skill1: 90, skill2: 85, skill3: 90 },
];

const dataKeys = ["skill1", "skill2", "skill3"];

const defaultValues = {
  skill_name: "",
  skill_percentage: 0,
  certifications: [],
};

const GeniusUserSkills = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050810] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-10">
      <div className="flex flex-col lg:flex-row bg-[#0D1224] shadow-lg rounded-xl p-6 lg:p-10 space-y-6 lg:space-y-0 lg:space-x-10">
        <div className="flex-1">
          <SpaceRadarChart
            data={data}
            dataKeys={dataKeys}
            title="Skill Matrix"
            description="Developer skill assessment across different domains"
          />
        </div>
        <div className="flex-1 bg-[#1A2236] rounded-lg p-6 shadow-inner">
          <SkillsForm
            gg_id="akjhas"
            skill_id="ashdkjashd"
            defaultValues={defaultValues}
          />
        </div>
      </div>
    </div>
  );
};

export default GeniusUserSkills;

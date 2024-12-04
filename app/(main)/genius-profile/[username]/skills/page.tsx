import { SpaceRadarChart } from "@/components/comp/Recharts/radar-chart/SpaceRadarChart";
import SkillsForm from "@/components/comp/Forms/SkillsForm";
import { getCurrentUser } from "@/actions/userAndGuild";
import { getUserSkills } from "@/actions/skills";

const data = [{ skill_name: "example", skill_percentage: 55 }];

const dataKeys = ["skill1", "skill2", "skill3"];

const defaultValues = {
  skill_name: "",
  skill_percentage: 0,
  certifications: [],
};

const GeniusUserSkills = async () => {
  const currentUser = await getCurrentUser();
  const gg_id = currentUser ? currentUser.gg_id : "";
  const skills = await getUserSkills();
  let skills_data = null;
  if (skills.success) {
    skills_data = skills.data.map((skill) => {
      return {
        skill_name: skill.skill_name,
        skill_percentage: skill.skill_percentage,
      };
    });
  }

  return (
    <>
      <div className="flex gap-1">
        <SpaceRadarChart
          data={skills_data ? skills_data : data}
          dataKeys={dataKeys}
        />
        <SkillsForm gg_id={gg_id} skill_id="" defaultValues={defaultValues} />
      </div>
    </>
  );
};

export default GeniusUserSkills;

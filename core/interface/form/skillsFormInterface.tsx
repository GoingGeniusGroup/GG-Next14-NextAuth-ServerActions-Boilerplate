export interface SkillsFormPropsInterface {
  //   setOpen: (object: boolean) => void;
  gg_id: string;
  skill_id?: string;
  defaultValues?: {
    skill_name: string;
    skill_percentage: number;
    certifications: string[];
  };
}

export interface SkillsDialogPropsInterface {
  gg_id: string;
  skill_id?: string;
  defaultValues?: {
    skill_name?: string;
    skill_percentage?: number;
    certifications?: string[];
  };
}

export type CompanySection =
  | {
      type: "hero";
      description: string;
    }
  | {
      type: "about";
      description: string;
    }
  | {
      type: "benefits";
      description: string;
    }
  // | {
  //     type: "jobs";
  //     heading?: string;
  //     description: string;
  //   };

export type Job = {
  id: string;
  companyId: string; // we store ID for frontend usage
  title: string;
  work_policy: "remote" | "hybrid" | "onsite";
  location: string;
  department: string;
  employment_type: "full-time" | "part-time" | "internship";
  experience_level: "junior" | "mid" | "senior";
  job_type: "permanent" | "contract";
  salary_range: string;
  job_slug: string;
  posted_days_ago: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type CompanyPublic = {
  name: string;
  logo_url?: string | null;
  banner_url?: string | null;
  brand_color?: string | null;
  culture_video_url?: string | null;
  sections: CompanySection[] | null;
  jobs: Job[];
};

export type Brand = {
  logo_url?: string;
  banner_url?: string;
  brand_color?: string;
  culture_video_url?: string;
};

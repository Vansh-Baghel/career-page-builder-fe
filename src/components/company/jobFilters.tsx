"use client";

import { useState } from "react";
import { JobFiltersType } from "@/lib/types";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

export function JobFilters({
  onFilter,
}: {
  onFilter: (filters: JobFiltersType) => void;
}) {
  const [filters, setFilters] = useState<JobFiltersType>({});

  const updateFilter = (field: keyof JobFiltersType, value: string) => {
    const newFilters = {
      ...filters,
      [field]: value,
    };

    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="flex gap-4 my-4">
      {/* Experience Level */}
      <Select onValueChange={(v) => updateFilter("experience_level", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="junior">Junior</SelectItem>
          <SelectItem value="mid">Mid</SelectItem>
          <SelectItem value="senior">Senior</SelectItem>
        </SelectContent>
      </Select>

      {/* Employment Type */}
      <Select onValueChange={(v) => updateFilter("employment_type", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Employment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full_time">Full-time</SelectItem>
          <SelectItem value="part_time">Part-time</SelectItem>
          <SelectItem value="internship">Internship</SelectItem>
        </SelectContent>
      </Select>

      {/* Employment Type */}
      <Select onValueChange={(v) => updateFilter("work_policy", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Work Policy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="remote">Remote</SelectItem>
          <SelectItem value="hybrid">Hybrid</SelectItem>
          <SelectItem value="onsite">Onsite</SelectItem>
        </SelectContent>
      </Select>

      {/* Job Type */}
      <Select onValueChange={(v) => updateFilter("job_type", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="permanent">Permanent</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Job } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  jobs: Job[];
};

export function CareersJobsList({ jobs }: Props) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string>("all");
  const [employmentType, setEmploymentType] = useState<string>("all");

  const uniqueLocations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location))),
    [jobs]
  );

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      if (
        search &&
        !job.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (location !== "all" && job.location !== location) return false;
      if (employmentType !== "all" && job.employment_type !== employmentType)
        return false;
      return true;
    });
  }, [jobs, search, location, employmentType]);

  return (
    <section className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:flex-1"
        />

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {uniqueLocations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={employmentType}
          onValueChange={setEmploymentType}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs list */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No jobs match your filters.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((job) => (
            <Card key={job.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-base">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{job.location}</p>
                <p>
                  {job.employment_type} · {job.work_policy}
                </p>
                <p>Experience: {job.experience_level}</p>
                <p>Salary: {job.salary_range}</p>
                <p className="text-xs">
                  Posted {job.posted_days_ago} days ago
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyPublic, CompanySection } from "@/lib/types";
import Image from "next/image";

export function PreviewView(props: CompanyPublic) {
  const { name, logo_url, banner_url, culture_video_url, sections, jobs } = props;

  const renderSection = (s: CompanySection, idx: number) => (
    <Card key={idx}>
      <CardHeader>
        <CardTitle className="capitalize">{s.type}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm text-slate-700">
          {s.description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Hero / Banner */}
      <section className="rounded-xl overflow-hidden border bg-white">
        {banner_url && (
          <div className="relative h-40 w-full">
            <Image
              src={banner_url}
              alt={`${name} banner`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4 flex items-center gap-4">
          {logo_url && (
            <Image
              src={logo_url}
              alt={name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-md object-cover border"
            />
          )}
          <div>
            <h1 className="text-xl font-semibold">{name}</h1>
            <p className="text-sm text-muted-foreground">Careers at {name}</p>
          </div>
        </div>
      </section>

      {/* Dynamic Text Sections */}
      {sections && sections.length > 0 && (
        <section className="space-y-4">
          {sections.map(renderSection)}
        </section>
      )}

      {/* Jobs */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Open Roles</h2>
        {jobs.length === 0 && (
          <p className="text-sm text-muted-foreground">No openings yet.</p>
        )}
        <div className="grid gap-3 md:grid-cols-2">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="text-base">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>{job.location}</p>
                <p>
                  {job.employment_type} · {job.work_policy}
                </p>
                <p>Experience: {job.experience_level}</p>
                <p>Salary: {job.salary_range}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Culture Video */}
      {culture_video_url && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Culture Video</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden border bg-black">
            <iframe
              src={culture_video_url}
              className="w-full h-full"
              title={`${name} culture video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </div>
  );
}

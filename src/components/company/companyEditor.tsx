"use client";

import { BrandEditor } from "@/components/brand/brandEditor";
import { SectionsEditor } from "@/components/company/sectionsEditor";
import { Button } from "@/components/ui/button";
import { getCompanyPreview, saveCompanyDraft } from "@/lib/apis";
import { CompanySection } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, startTransition } from "react";
import { toast } from "sonner";

export default function CompanyEditor() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", companySlug],
    queryFn: () => getCompanyPreview(companySlug).then((r) => r.data),
    refetchOnWindowFocus: false,
  });

  const [sections, setSections] = useState<CompanySection[]>([]);

  const [brand, setBrand] = useState({
    logo_url: "",
    banner_url: "",
    brand_color: "",
    culture_video_url: "",
  });

  // 🧠 Initialize editable state after data load
  useEffect(() => {
    if (!company) return;

    startTransition(() => {
      setSections(company.sections ?? []);
      setBrand({
        logo_url: company.logo_url || "",
        banner_url: company.banner_url || "",
        brand_color: company.brand_color || "",
        culture_video_url: company.culture_video_url || "",
      });
    });
  }, [company]);

  const { mutate, isPending } = useMutation({
    mutationFn: saveCompanyDraft,
    onSuccess: () => toast.success("Draft saved"),
    onError: () => toast.error("Failed to save draft"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!company) return <p>Company not found</p>;

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Edit Careers Page – {company.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Customize branding and sections. Preview before publishing.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/${companySlug}/preview`)}
          >
            Preview
          </Button>

          <Button
            onClick={() =>
              mutate({
                companySlug,
                draft_sections: sections,
                ...brand,
              })
            }
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Draft"}
          </Button>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="font-medium">Brand</h2>
        <BrandEditor
          brand={brand}
          onChange={(patch) => setBrand((prev) => ({ ...prev, ...patch }))}
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-medium">Content Sections</h2>
        <SectionsEditor sections={sections} onChange={setSections} />
      </section>
    </main>
  );
}

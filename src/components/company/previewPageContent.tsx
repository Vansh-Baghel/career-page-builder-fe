// components/company/PreviewPageContent.tsx
"use client";

import { PreviewView } from "@/components/company/previewView";
import { getCompanyPreview } from "@/lib/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PreviewPageContent() {
  const { companySlug } = useParams<{ companySlug: string }>();

  const router = useRouter();

  const fetchCompanyPreview = async () => {
    try {
      const response = await getCompanyPreview(companySlug);
      return response.data;
    } catch (err) {
      toast.error("Failed to load company data");
      console.error(err);
      return null;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["company", companySlug, "preview"],
    queryFn: fetchCompanyPreview,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Preview</h1>
        <button
          className="text-sm underline"
          onClick={() => router.push(`/${companySlug}/edit`)}
        >
          Back to edit
        </button>
      </div>

      <PreviewView {...data} />
    </main>
  );
}

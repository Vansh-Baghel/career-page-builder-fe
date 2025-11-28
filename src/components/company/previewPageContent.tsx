"use client";

import { PreviewView } from "@/components/company/previewView";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function PreviewPageContent() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Preview</h1>

        <div className="flex items-center gap-2">
          <Button
            className="text-sm"
            onClick={() => router.push(`/${companySlug}/edit`)}
          >
            Back to edit
          </Button>

          <Button
            className="text-sm"
            variant="default"
            onClick={() => router.push(`/${companySlug}/publish`)}
          >
            Publish
          </Button>
        </div>
      </div>

      <PreviewView companySlug={companySlug} />
    </main>
  );
}

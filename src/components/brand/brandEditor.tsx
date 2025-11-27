"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brand } from "@/lib/types";
import { uploadToCloudinary } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  brand: Brand;
  onChange: (updated: Partial<Props["brand"]>) => void;
};

export function BrandEditor({ brand, onChange }: Props) {
  const [localBrand, setLocalBrand] = useState(brand);
  const { companySlug } = useParams() as { companySlug: string };

  useEffect(() => {
    setLocalBrand(brand);
  }, [brand]);

  const setValue = (field: keyof Brand, value: string) => {
    setLocalBrand((prev) => ({ ...prev, [field]: value }));
    onChange({ [field]: value });
  };

  const handleUpload = async (field: keyof Brand, file?: File) => {
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file, companySlug, field);
      setValue(field, url);
      toast.success("Uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload file");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
      {/* LOGO UPLOAD */}
      <div>
        <Label className="mb-2 block font-semibold">Logo</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleUpload("logo_url", e.target.files?.[0])}
        />
        {localBrand?.logo_url && (
          <Image
            src={localBrand.logo_url}
            width={96}
            height={96}
            alt="Company Logo"
            className="w-24 h-24 object-contain mt-3 border rounded-lg"
          />
        )}
      </div>

      {/* BANNER UPLOAD */}
      <div>
        <Label className="mb-2 block font-semibold">Banner Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleUpload("banner_url", e.target.files?.[0])}
        />
        {localBrand?.banner_url && (
          <Image
            src={localBrand.banner_url}
            alt="Company Banner"
            width={600}
            height={144}
            className="w-full h-36 object-cover mt-3 border rounded-lg"
          />
        )}
      </div>

      {/* BRAND COLOR PICKER */}
      <div>
        <Label className="mb-2 block font-semibold">Brand Color</Label>
        <Input
          type="color"
          value={localBrand?.brand_color ?? "#000000"}
          onChange={(e) => setValue("brand_color", e.target.value)}
          className="h-12 p-1 cursor-pointer"
        />
      </div>

      {/* CULTURE VIDEO URL */}
      <div>
        <Label className="mb-2 block font-semibold">Culture Video URL</Label>
        <Input
          type="text"
          placeholder="YouTube / Vimeo URL"
          value={localBrand?.culture_video_url ?? ""}
          onChange={(e) => setValue("culture_video_url", e.target.value)}
        />
        {localBrand?.culture_video_url && (
          <iframe
            src={localBrand.culture_video_url}
            className="mt-3 w-full h-48 rounded-lg border"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { CompanySection } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  sections: CompanySection[];
  onChange: (sections: CompanySection[]) => void;
};

/** 🔹 Template: all sections only get `description` */
const defaults: Record<CompanySection["type"], CompanySection> = {
  hero: { type: "hero", description: "Welcome to Our Team" },
  about: { type: "about", description: "Describe this section…" },
  benefits: { type: "benefits", description: "Describe this section…" },
  // jobs: { type: "jobs", description: "Describe this section…" },
};

export function SectionsEditor({ sections, onChange }: Props) {
  /** ➕ Add section */
  const addSection = (type: CompanySection["type"]) => {
    onChange([...sections, defaults[type]]);
  };

  /** ✏️ Edit description */
  const updateSection = (index: number, value: Partial<CompanySection>) => {
    const next = [...sections];
    next[index] = { ...next[index], ...value };
    onChange(next);
  };

  /** 🗑 Remove */
  const removeSection = (index: number) => {
    const next = [...sections];
    next.splice(index, 1);
    onChange(next);
  };

  /** 🔀 Reorder */
  const moveSection = (index: number, dir: -1 | 1) => {
    const next = [...sections];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  /** 🧱 Render editor — same for all types now */
  const renderEditor = (section: CompanySection, idx: number) => (
    <Textarea
      placeholder="Write here…"
      value={section.description ?? ""}
      onChange={(e) =>
        updateSection(idx, { description: e.target.value })
      }
    />
  );

  /** 🚫 Show only buttons for sections that DO NOT exist */
  const remainingTypes = (["hero", "about", "benefits"] as CompanySection["type"][])
    .filter((t) => !sections.some((sec) => sec.type === t));

  return (
    <div className="space-y-4">
      {sections.map((section, idx) => (
        <div key={idx} className="border rounded-lg p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold capitalize">{section.type}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => moveSection(idx, -1)}>
                ↑
              </Button>
              <Button variant="outline" size="icon" onClick={() => moveSection(idx, 1)}>
                ↓
              </Button>
              <Button variant="destructive" size="icon" onClick={() => removeSection(idx)}>
                ✕
              </Button>
            </div>
          </div>

          {renderEditor(section, idx)}
        </div>
      ))}

      {remainingTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4">
          {remainingTypes.map((type) => (
            <Button
              key={type}
              variant="outline"
              onClick={() => addSection(type)}
            >
              + Add {type}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

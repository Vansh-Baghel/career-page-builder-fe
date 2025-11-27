"use client";

import Image from "next/image";
import { CompanySection } from "@/lib/types";

export function CareersSections({ sections }: { sections: CompanySection[] }) {
  return (
    <section className="space-y-6">
      {sections.map((s, idx) => {
        switch (s.type) {
          case "hero":
            return (
              <div key={idx}>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                {s.subtitle && <p className="text-sm text-muted-foreground">{s.subtitle}</p>}
                {s.buttonText && (
                  <button className="mt-2 px-3 py-1 text-sm rounded bg-primary text-white">
                    {s.buttonText}
                  </button>
                )}
              </div>
            );

          case "about":
            return (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg font-semibold">About</h2>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{s.description}</p>
                {s.image && (
                  <Image
                    src={s.image}
                    alt="About image"
                    width={600}
                    height={220}
                    className="rounded-md border object-cover max-h-60"
                  />
                )}
              </div>
            );

          case "life":
            return (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg font-semibold">Life</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {s.gallery.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt="Life photo"
                      width={300}
                      height={300}
                      className="rounded-md border h-28 object-cover w-full"
                    />
                  ))}
                </div>
              </div>
            );

          case "benefits":
            return (
              <div key={idx}>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="list-disc pl-4 space-y-1 text-sm text-slate-700">
                  {s.items.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            );

          case "jobs":
            return (
              <div key={idx}>
                <h2 className="text-lg font-semibold">{s.heading || "Open Roles"}</h2>
              </div>
            );
        }
      })}
    </section>
  );
}

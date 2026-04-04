"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookDemo } from "@/lib/settings";
import { buildWhatsAppDemoUrl, type DemoFormPayload } from "@/lib/whatsappDemo";

const FIELD_LABELS: Record<keyof DemoFormPayload, string> = {
  name: "Name",
  bar_name: "Bar / Venue Name",
  email: "Email",
  phone: "Phone",
  city: "City",
  bar_size: "Bar Size (e.g. # of taps)",
};

export function BookDemoForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoFormPayload>();

  const onSubmit = async (data: DemoFormPayload) => {
    setSubmitting(true);
    try {
      await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      /* still send user to WhatsApp */
    }
    window.location.href = buildWhatsAppDemoUrl(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
    >
      {bookDemo.formFields.map((field) => (
        <div key={field}>
          <Label htmlFor={field}>{FIELD_LABELS[field as keyof DemoFormPayload]}</Label>
          <Input
            id={field}
            type={field === "email" ? "email" : "text"}
            {...register(field as keyof DemoFormPayload, {
              required: field === "name" || field === "email",
            })}
            className="mt-1"
          />
          {errors[field as keyof DemoFormPayload] && (
            <p className="mt-1 text-sm text-red-400">Required</p>
          )}
        </div>
      ))}
      <Button type="submit" className="mt-4 w-full" disabled={submitting}>
        {submitting ? "Opening WhatsApp…" : "Submit"}
      </Button>
    </form>
  );
}

import { whatsapp } from "@/lib/settings";

export type DemoFormPayload = {
  name: string;
  bar_name: string;
  email: string;
  phone: string;
  city: string;
  bar_size: string;
};

export function buildWhatsAppDemoUrl(data: DemoFormPayload): string {
  const text = [
    "Hello — Spirix demo request",
    "",
    `Name: ${data.name}`,
    `Bar / venue: ${data.bar_name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `City: ${data.city}`,
    `Bar size: ${data.bar_size}`,
  ].join("\n");
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`;
}

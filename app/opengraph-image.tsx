import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Nexa AI — AI Agents, Chatbots, Cloud & Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#1A1A1A",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: 20,
            background: "rgba(255, 255, 255, 0.1)",
            color: "#8A8A8A",
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          E
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          Nexa AI
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#D4D4D4",
          }}
        >
          AI Agents · Chatbots · Cloud · Consulting
        </div>
      </div>
    ),
    { ...size }
  );
}

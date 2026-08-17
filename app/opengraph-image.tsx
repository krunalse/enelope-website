import { ImageResponse } from "next/og";

export const alt = "Enelope — AI Agents, Chatbots, Cloud & Consulting";
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
          background: "#0A2540",
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
            background: "rgba(59, 167, 219, 0.15)",
            color: "#3BA7DB",
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
          Enelope
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#7FD4F5",
          }}
        >
          AI Agents · Chatbots · Cloud · Consulting
        </div>
      </div>
    ),
    { ...size }
  );
}

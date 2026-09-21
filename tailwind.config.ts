import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        primaryActive: "#242424",
        primaryDisabled: "#e5e7eb",
        ink: "#111111",
        body: "#374151",
        muted: "#6b7280",
        mutedSoft: "#898989",
        hairline: "#e5e7eb",
        hairlineSoft: "#f3f4f6",
        canvas: "#ffffff",
        surfaceSoft: "#f8f9fa",
        surfaceCard: "#f5f5f5",
        surfaceStrong: "#e5e7eb",
        surfaceDark: "#101010",
        surfaceDarkElevated: "#1a1a1a",
        onPrimary: "#ffffff",
        onDark: "#ffffff",
        onDarkSoft: "#a1a1aa",
        brandAccent: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        badgeOrange: "#fb923c",
        badgePink: "#ec4899",
        badgeViolet: "#8b5cf6",
        badgeEmerald: "#34d399",
        bg: "#ffffff",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        pill: "9999px",
      },
      spacing: {
        section: "96px",
      },
      fontSize: {
        "display-xl": [
          "64px",
          { lineHeight: "1.05", letterSpacing: "-2px", fontWeight: "600" },
        ],
        "display-lg": [
          "48px",
          { lineHeight: "1.1", letterSpacing: "-1.5px", fontWeight: "600" },
        ],
        "display-md": [
          "36px",
          { lineHeight: "1.15", letterSpacing: "-1px", fontWeight: "600" },
        ],
        "display-sm": [
          "28px",
          { lineHeight: "1.2", letterSpacing: "-0.5px", fontWeight: "600" },
        ],
        "title-lg": [
          "22px",
          { lineHeight: "1.3", letterSpacing: "-0.3px", fontWeight: "600" },
        ],
        "title-md": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        "title-sm": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "1.4", fontWeight: "500" }],
        button: ["14px", { lineHeight: "1", fontWeight: "600" }],
        "nav-link": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
        lift: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
};

export default config;

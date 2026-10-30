// Shared Recharts theming, in two flavours.
//
// Dark ("instrument panel", used on About and Hub): the signal hues (aqua,
// amber, lilac, vermilion) are 6-12:1 on ink but only 1.4-2.9:1 on paper.
//
// Light (Research, Publications, People): the same hues, deepened so every
// series clears the 3:1 graphical-object bar on the paper/white surface
// (vermilion 4.0, amber 3.3, teal 3.9, ultramarine 7.2, violet 4.7), and axis
// text is the 7.5:1 muted ink.

export const chartColors = {
  rose: "#FF4A1C", // vermilion
  orange: "#FFB627", // amber
  green: "#2EE6C5", // aqua
  maroon: "#7B88FF", // ultramarine, lightened for dark surfaces (~7:1 on ink)
  peach: "#C7B6FF", // lilac
};

export const axisTick = { fontSize: 11, fill: "#A8A59C", fontFamily: "'Geist Mono', monospace" };

// Spread onto <Tooltip {...tooltipTheme} />; pages add their own formatter.
export const tooltipTheme = {
  cursor: { fill: "rgba(255,255,255,0.06)" },
  contentStyle: {
    background: "#0A0A0E",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 0,
    color: "#FBFAF7",
    fontSize: 12,
    boxShadow: "none",
  },
  itemStyle: { color: "#FBFAF7" },
  labelStyle: { color: "#A8A59C", fontFamily: "'Geist Mono', monospace", fontSize: 11 },
};

export const chartColorsLight = {
  rose: "#E5400F",
  orange: "#C77700",
  green: "#0B8F79",
  maroon: "#2D3ED8",
  peach: "#7857E6",
};

export const axisTickLight = { fontSize: 11, fill: "#55524B", fontFamily: "'Geist Mono', monospace" };

export const tooltipThemeLight = {
  cursor: { fill: "rgba(10,10,14,0.05)" },
  contentStyle: {
    background: "#FBFAF7",
    border: "1px solid rgba(10,10,14,0.85)",
    borderRadius: 0,
    color: "#0A0A0E",
    fontSize: 12,
    boxShadow: "none",
  },
  itemStyle: { color: "#0A0A0E" },
  labelStyle: { color: "#55524B", fontFamily: "'Geist Mono', monospace", fontSize: 11 },
};

// Value label drawn at the end of a bar (recharts <LabelList> props).
export const valueLabelLight = {
  fill: "#0A0A0E",
  fontSize: 12,
  fontFamily: "'Geist Mono', monospace",
};

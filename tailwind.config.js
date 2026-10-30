/** @type {import('tailwindcss').Config} */
//
// Design system: "Paper & Signal" — a lab-instrument editorial look.
//
//  - Surfaces: warm `paper` for reading, near-black `ink` for cinematic and
//    data sections. Data/maps live on dark "instrument panels" because the
//    bright signal hues only clear contrast there.
//  - `signal` (vermilion) is the single hero accent. It is 5.9:1 on ink but
//    only 2.9:1 on paper, so on paper it is used for fills and graphics only;
//    text on paper uses `signal.ink`. Dark text on a signal fill is 5.9:1.
//  - Legacy token names are kept so every existing class re-themes at once:
//    `brand-500` is now INK (the primary action colour, 17:1 on paper),
//    and the old accent names (rose/orange/green/maroon/peach) now map to the
//    signal hue set (vermilion/amber/aqua/ultramarine/lilac). Each has a
//    text-safe `*Ink` twin (>=4.5:1 on paper and on its own tint).
//
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Instrument Serif'", "Georgia", "'Times New Roman'", "serif"],
        body: ["'Geist'", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["'Geist'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        // Every `white`/`bg-white` in the codebase becomes warm off-white.
        white: "#FBFAF7",
        paper: { DEFAULT: "#F2EFE8", 2: "#E8E4DA" },
        signal: { DEFAULT: "#FF4A1C", ink: "#B5300E" },
        ink: {
          DEFAULT: "#0A0A0E",
          50: "#E8E4DA", // sunken paper (section tint)
          100: "#CBC5B6", // hairlines / rings
          200: "#CFCBC0", // light text on dark
          300: "#9C998F",
          700: "#2B2A30",
          800: "#15151B",
          900: "#0A0A0E",
        },
        brand: {
          50: "#EBE7DD",
          100: "#E1DCCE",
          200: "#CFC9BA",
          300: "#B0AA9A",
          400: "#8A8577",
          500: "#0A0A0E", // primary action = ink
          600: "#22222B", // hover
          700: "#2B2A34",
          800: "#15151B",
          900: "#0A0A0E",
        },
        slate: {
          muted: "#55524B", // 6.8:1 on paper, 6.1:1 on paper-2
          mutedDark: "#A8A59C", // 8.0:1 on ink
        },
        accent: {
          rose: "#FF4A1C",
          roseInk: "#B5300E",
          orange: "#FFB627",
          orangeInk: "#7A5000",
          green: "#2EE6C5",
          greenInk: "#0A6B59",
          maroon: "#2D3ED8", // ultramarine: text-safe AND fill-safe (white on it 6.6:1)
          ultra: "#4257FF",
          peach: "#C7B6FF", // lilac
        },
      },
      borderRadius: {
        // Sharper than Tailwind's defaults: panels read as instruments, not
        // pillowy app cards. `rounded-full` (pills, buttons) is untouched.
        lg: "3px",
        xl: "4px",
        "2xl": "6px",
        "3xl": "10px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(10,10,14,0.04)",
        cardHover: "0 30px 60px -30px rgba(10,10,14,0.45)",
        signal: "0 0 0 1px rgba(255,74,28,0.5), 0 10px 40px -10px rgba(255,74,28,0.55)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.1s steps(2, start) infinite",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        inout: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

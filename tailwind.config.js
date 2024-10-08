const flattenColorPalette = (colors, includeFunctions, ...functionParameters) =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == "object"
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
          }))
        : typeof values == "function"
        ? includeFunctions
          ? [{ [`${color}`]: values(...functionParameters) }]
          : []
        : [{ [`${color}`]: values }]
    )
  );

/* Inner Borders from https://github.com/kripod/tailwindcss-inner-border */
const defaultBoxShadow = [
  "var(--tw-ring-offset-shadow, 0 0 #0000)",
  "var(--tw-ring-shadow, 0 0 #0000)",
  "var(--tw-inner-border-shadow, 0 0 #0000)",
  "var(--tw-shadow, 0 0 #0000)",
].join(", ");

const config = {
  darkMode: "selector",
  content: [
    "./server/*.py",
    "./server/components/*.py",
    "./server/pages/*.py",
    "./public/js/*.js",
  ],
  theme: {
    extend: {
      /* https://mater6ialtheme.arcsine.dev/ */
      colors: {
        /* dark- prefix used for dark mode */
        /* text colors */
        dark: "#121212",
        mid: "#212121",
        "mid-hover": "#414141",
        light: "#ededed",
        error: "#e66465",

        primary: "#b317d6",
        "primary-hover": "#e8b9f3",
        "primary-active": "#9a0dc6",

        /* menu colors */
        "menu-item": "#ffffff",
        "dark-menu-item": "#1f1f1f",
        "menu-item-hover": "#dbdbdb",
        "dark-menu-item-hover": "#262626",
        "menu-item-active": "#bdbdbd",
        "dark-menu-item-active": "#303030",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        {
          values: theme("textShadow"),
        }
      );
    },

    function ({ addDefaults, matchUtilities, theme, corePlugins }) {
      addDefaults("inner-border", {
        "--tw-inner-border-color": theme("borderColor.DEFAULT", "currentColor"),
      });
      matchUtilities(
        {
          "inner-border": (value) => ({
            "@defaults inner-border": {},
            "--tw-inner-border-width": value,
            "--tw-inner-border-shadow":
              "inset 0 0 0 var(--tw-inner-border-width) var(--tw-inner-border-color)",
            "box-shadow": defaultBoxShadow,
          }),
        },
        {
          type: ["line-width", "length"],
          values: theme("borderWidth"),
        }
      );
      matchUtilities(
        {
          "inner-border": (value) => ({
            "--tw-inner-border-color": value,
          }),
        },
        {
          type: ["color", "any"],
          values: (({ DEFAULT: _, ...colors }) => colors)(
            flattenColorPalette(theme("borderColor"))
          ),
        }
      );

      /* Overrides to mitigate precedence issues */
      if (corePlugins("boxShadow")) {
        matchUtilities(
          { shadow: () => ({ "box-shadow": defaultBoxShadow }) },
          { values: theme("boxShadow"), type: ["shadow"] }
        );
      }
      if (corePlugins("ringWidth")) {
        matchUtilities(
          { ring: () => ({ "box-shadow": defaultBoxShadow }) },
          { values: theme("ringWidth"), type: "length" }
        );
      }
    },
  ],
};

try {
  tailwind.config = config;
} catch {
  module.exports = config;
}

// tailwind.config.js
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light", "dark"], // you can add more like "cupcake", "forest", etc.
    },
  };
module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      height: theme => ({
        "screen/1.5": "calc(100vh / 1.5)",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      width: theme => ({
        "3/10": "30%",
        "2/10": "20%",
      }),
    },
  },
  variants: { display: ["responsive", "hover", "focus"] },
  plugins: [],
}
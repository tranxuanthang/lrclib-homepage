/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        indigo: {
          css: {
            '--tw-prose-body': theme('colors.indigo[800]'),
            '--tw-prose-headings': theme('colors.indigo[900]'),
            '--tw-prose-lead': theme('colors.indigo[700]'),
            '--tw-prose-links': theme('colors.indigo[900]'),
            '--tw-prose-bold': theme('colors.indigo[900]'),
            '--tw-prose-counters': theme('colors.indigo[600]'),
            '--tw-prose-bullets': theme('colors.indigo[400]'),
            '--tw-prose-hr': theme('colors.indigo[300]'),
            '--tw-prose-quotes': theme('colors.indigo[900]'),
            '--tw-prose-quote-borders': theme('colors.indigo[300]'),
            '--tw-prose-captions': theme('colors.indigo[700]'),
            '--tw-prose-code': theme('colors.indigo[900]'),
            '--tw-prose-pre-code': theme('colors.indigo[100]'),
            '--tw-prose-pre-bg': theme('colors.indigo[900]'),
            '--tw-prose-th-borders': theme('colors.indigo[300]'),
            '--tw-prose-td-borders': theme('colors.indigo[200]'),
            '--tw-prose-invert-body': theme('colors.indigo[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.indigo[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.indigo[400]'),
            '--tw-prose-invert-bullets': theme('colors.indigo[600]'),
            '--tw-prose-invert-hr': theme('colors.indigo[700]'),
            '--tw-prose-invert-quotes': theme('colors.indigo[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.indigo[700]'),
            '--tw-prose-invert-captions': theme('colors.indigo[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.indigo[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.indigo[600]'),
            '--tw-prose-invert-td-borders': theme('colors.indigo[700]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}


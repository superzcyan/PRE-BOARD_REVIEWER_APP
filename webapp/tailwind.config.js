/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        detailed_exam: "url('assets/detailed_exam.svg')",
        diary: "url('assets/diary.svg')",
        detailed_exam: "url('assets/detailed_exam.svg')",
        student_reading: "url('assets/student_reading.svg')",
        working_late: "url('assets/working_late.svg')",
        blogging: "url('assets/blogging.svg')",
        meditation: "url('assets/meditation.svg')",
      },
      colors: {
        maroon: "#7d0604",
      },
    },
  },
  plugins: [],
};

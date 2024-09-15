/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'60': '#4C63B6',
  				'70': '#4055A8',
  				'80': '#35469C',
  				'90': '#2D3A8C',
  				'100': '#19216C'
  			},
  			secondary: {
  				'60': '#FFE8D9',
  				'70': '#FFD0B5',
  				'80': '#FFB088',
  				'90': '#FF9466',
  				'100': '#F9703E'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

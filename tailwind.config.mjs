// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			press2p: ['"Press Start 2P"', 'cursive'],
  			geistMono: ['"Geist Mono"', 'monospace'],
  			sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			poppins: ['var(--font-poppins)', 'sans-serif'],
  			inter: ['var(--font-inter)', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			orange: {
  				400: '#fb923c',
  				500: '#f97316',
  			},
  			// Custom design tokens
  			cyber: {
  				bg: '#080808',
  				card: '#0d0d0d',
  				border: '#1a1a1a',
  				orange: '#ff6b35',
  				'orange-glow': '#ff8c57',
  				dim: '#2a2a2a',
  			},
  		},
  		animation: {
  			'scan': 'scan 2.5s linear infinite',
  			'marquee': 'marquee 35s linear infinite',
  			'marquee-reverse': 'marquee-reverse 35s linear infinite',
  			'pulse-orange': 'pulse-orange 2s ease-in-out infinite',
  			'float': 'float 6s ease-in-out infinite',
  			'glow': 'glow 2s ease-in-out infinite alternate',
  		},
  		keyframes: {
  			scan: {
  				'0%': { transform: 'translateY(-100%)' },
  				'100%': { transform: 'translateY(2000%)' },
  			},
  			marquee: {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-50%)' },
  			},
  			'marquee-reverse': {
  				'0%': { transform: 'translateX(-50%)' },
  				'100%': { transform: 'translateX(0)' },
  			},
  			'pulse-orange': {
  				'0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(255, 107, 53, 0.4)' },
  				'50%': { opacity: '0.8', boxShadow: '0 0 0 8px rgba(255, 107, 53, 0)' },
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-12px)' },
  			},
  			glow: {
  				'0%': { textShadow: '0 0 10px rgba(255,107,53,0.5)' },
  				'100%': { textShadow: '0 0 30px rgba(255,107,53,0.9), 0 0 60px rgba(255,107,53,0.4)' },
  			},
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

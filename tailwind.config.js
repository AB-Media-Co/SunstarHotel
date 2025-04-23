/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",  // Scans all JS/TS files in src directory
	],
	theme: {
	  extend: {
		// Font sizes for desktop
		fontSize: {
		  'desktop/large/h': ['60px', {
			lineHeight: '100.6px',
			fontWeight: '700'
		  }],
		  'desktop/h1': ['80px', {
			lineHeight: '96px',
			letterSpacing: '-2.4px',
			fontWeight: '700'
		  }],
		  'desktop/h2': ['48px', {
			lineHeight: '57.6px',
			letterSpacing: '-1.92px',
			fontWeight: '700'
		  }],
		  'desktop/h3': ['36px', {
			lineHeight: '46.8px',
			letterSpacing: '-0.72px',
			fontWeight: '700'
		  }],
		  'desktop/h4': ['24px', {
			lineHeight: '31.2px',
			letterSpacing: '-0.48px',
			fontWeight: '500'
		  }],
		  'desktop/h5': ['20px', {
			lineHeight: '26px',
			letterSpacing: '0.2px',
			fontWeight: '700'
		  }],
		  'desktop/h5/medium': ['20px', {
			lineHeight: '26px',
			letterSpacing: '-0.2px',
			fontWeight: '500'
		  }],
		  'desktop/h6/medium': ['16px', {
			lineHeight: '19.2px',
			letterSpacing: '0.16px',
			fontWeight: '500'
		  }],
		  'desktop/body/1': ['16px', {
			lineHeight: '25.6px',
			fontWeight: '400'
		  }],
		  'desktop/body/2/medium': ['14px', {
			lineHeight: '22.4px',
			letterSpacing: '-0.28px',
			fontWeight: '500'
		  }],
		  'desktop/body/2/regular': ['18px', {
			lineHeight: '22.4px',
			letterSpacing: '0.14px',
			fontWeight: '400'
		  }],
		  'desktop/button': ['16px', {
			lineHeight: '19.2px',
			letterSpacing: '0.16px',
			fontWeight: '700'
		  }],
		  'desktop/body/large': ['20px', {
			lineHeight: '32px',
			letterSpacing: '-0.2px',
			fontWeight: '400'
		  }],
		  'desktop/subtitle': ['14px', {
			lineHeight: '22.4px',
			letterSpacing: '0.28px',
			fontWeight: '500'
		  }],
		  'desktop/caption': ['12px', {
			lineHeight: '19.2px',
			letterSpacing: '0.24px',
			fontWeight: '400'
		  }],
		  'desktop/title': ['16px', {
			lineHeight: '19.2px',
			letterSpacing: '0.32px',
			fontWeight: '500'
		  }],
		  'desktop/tertiary/cta': ['14px', {
			lineHeight: '22.4px',
			fontWeight: '500',
		  }],
		  'desktop/stikethrough/text': ['12px', {
			lineHeight: '19.2px',
			letterSpacing: '0.24px',
			fontWeight: '400',
		  }],
		  'desktop/overline': ['10px', {
			lineHeight: '16px',
			letterSpacing: '0.2px',
			fontWeight: '400'
		  }],
		  // Font sizes for mobile
		  'mobile/h1': ['36px', {
			lineHeight: '43.2px',
			letterSpacing: '-0.72px',
			fontWeight: '700'
		  }],
		  'mobile/h2': ['32px', {
			lineHeight: '38.4px',
			letterSpacing: '-0.64px',
			fontWeight: '700'
		  }],
		  'mobile/h3': ['28px', {
			lineHeight: '33.6px',
			letterSpacing: '-0.28px',
			fontWeight: '700'
		  }],
		  'mobile/h4': ['24px', {
			lineHeight: '31.2px',
			letterSpacing: '-0.24px',
			fontWeight: '500'
		  }],
		  'mobile/h5': ['20px', {
			lineHeight: '26px',
			letterSpacing: '0.2px',
			fontWeight: '700'
		  }],
		  'mobile/h5/medium': ['20px', {
			lineHeight: '26px',
			fontWeight: '500'
		  }],
		  'mobile/h6': ['16px', {
			lineHeight: '19.2px',
			letterSpacing: '-0.16px',
			fontWeight: '500'
		  }],
		  'mobile/h7': ['12px', {
			lineHeight: '16.8px',
			letterSpacing: '0.17px',
			fontWeight: '500'
		  }],
		  'mobile/title': ['14px', {
			lineHeight: '22.4px',
			letterSpacing: '0.62px',
			fontWeight: '500'
		  }],
		  'mobile/body/2': ['16px', {
			lineHeight: '24px',
			letterSpacing: '0.24px',
			fontWeight: '400'
		  }],
		  'mobile/small/body': ['12px', {
			lineHeight: '14px',
			letterSpacing: '0.2px',
			fontWeight: '400'
		  }],
		  'mobile/body/large': ['14px', {
			lineHeight: '19.6px',
			letterSpacing: '0.14px',
			fontWeight: '500'
		  }],
		  'mobile/strikethrough': ['10px', {
			lineHeight: '16px',
			letterSpacing: '0.2px',
			fontWeight: '400'
		  }],
		  'mobile/button': ['12px', {
			lineHeight: '19.2px',
			letterSpacing: '-0.24px',
			fontWeight: '500'
		  }],
		  'mobile/small/button': ['12px', {
			lineHeight: '18px',
			letterSpacing: '-0.24px',
			fontWeight: '500'
		  }],
		},
		// Custom background image
		backgroundImage: {
		  'custom-bg': "url('/images/Logo/yellowLine.svg')", // Add your image path here
		},
		// Custom colors
		colors: {
		  'primary-green': '#5BBEBC',
		  'primary-dark-green': '#006167',
		  'primary-yellow': '#FDC114',
		  'primary-gray': '#999999',
		  'primary-white': 'white',
		}
	  },
	},
	plugins: [],
  }
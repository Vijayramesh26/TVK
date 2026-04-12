import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#800000', // Maroon
          secondary: '#FFD700', // Gold
          accent: '#A52A2A',
          background: '#FFFFFF',
          surface: '#FFFFFF',
        },
      },
    },
  },
})

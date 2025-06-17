import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077b6',
    },
    secondary: {
      main: '#f9c74f',
    },
    custom: {
      tertiary: 'salmon',
      disabled: 'grey',
      white: 'white',
    },
  },
  typography: {
    fontFamily: `'Ubuntu', sans-serif`,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
)

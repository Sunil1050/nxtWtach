import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  onToggleTheme: () => {},
})

export default ThemeContext

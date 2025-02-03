import React from 'react'

function Button({
children,
className,
bg_color,
text_color='white',
...props

}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bg_color} ${text_color} ${className}`} 
    {...props}>
        {children}</button>
  )
}

export default Button
// sk_test_51QMnNZFRHQLYw36zQPCYaQlRIJvet9j81jZ6YxXiZrcCPssELgovFYgavmLNWqIuIO316MArJnAS0dTSkSS07iA500UjMUyeh7

// pk_test_51QMnNZFRHQLYw36zmxrPmLBUadRJ7K8EELRiFMUbP1PMAxeIoO9FOAJMawyycbNeqSLp5m88Ebv9yjgYgMv5lyxW00wVrdCtlM

import { Outlet } from 'react-router-dom'
import  Header  from './Components/Header/Header'
import Footer  from './Components/Footer/Footer'
import WhatsappButton from "./Components/WhatsappButton/WhatsappButton";



import './App.css'

function App() {

  return (
    < div >
    <Header  />
       <Outlet />
       <WhatsappButton />
     <Footer />      
    </div>
  )
}

export default App

import {BrowserRouter,Routes,Route} from "react-router-dom"
import TransctionDashboard from "./pages/TransctionDashboard.jsx"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TransctionDashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

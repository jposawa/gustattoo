import { MainLayout } from './fragments'
import './App.css'

function App() {

  /**
   * Doing like this so we can reutilize MainLayout if wanted
   * Also keeps App clean and focused
   * 
   * Additionally, if wanted, it would be possible to group modals and other "detached" components here
   */
  return (
    <MainLayout />
  )
}

export default App

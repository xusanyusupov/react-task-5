import './App.css'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Todo from './components/todo/Todo'


function App() {
  return (
    <>
      <Todo/>
      <ToastContainer/>
    </>
  )
}

export default App

import { Toaster } from 'react-hot-toast';
import { Header } from "./components/Header";
import { TaskList } from './components/TaskList';
import './styles/global.scss';



export function App() {
  return (
    <>
      <Header />
      <TaskList />
      <Toaster position="bottom-center" toastOptions={{
        style: {
          border: '1px solid #3d3d4d',
          padding: '16px',
          color: '#3d3d4d',
        },
      }}/>

    </>
  )
}
import RoutesApp from "./routes";
import "./index.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("cabecalho").style.backgroundColor = "black";
  } else {
    document.getElementById("cabecalho").style.removeProperty('background-color')
  }
}
  return (
    <div>
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </div>
  );
}

export default App;

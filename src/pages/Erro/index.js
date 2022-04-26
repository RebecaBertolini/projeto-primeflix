import { Link } from 'react-router-dom'
import "./erro.css"
function Erro(){
    return(
        <div className="not-found">
            <h1>Erro 404</h1>
            <h2>Página não escontrada. Clique no botão abaixo para acessar a página inicial:</h2>
            <Link to='/'>Clique aqui</Link>
        </div>
    )
}
export default Erro;
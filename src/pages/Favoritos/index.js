import "./favoritos.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id)
        })
        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido da lista!")
    }

    return (
        <div className="container">
            <h1>Filmes salvos</h1>
            {filmes.length === 0 && <span>Você precisa salvar filmes na sua lista!</span>}
            <div className="filmes-salvos">
                <ul>
                    {filmes.map((filme) => {
                        return (
                            <li key={filme.id}>
                                <button onClick={() => {excluirFilme(filme.id)}}>X</button>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}
export default Favoritos;
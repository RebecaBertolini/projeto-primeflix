import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom"
import "./home.css"
import {toast} from 'react-toastify'

function Home() {
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    //toda vez que carregar a página, ira procurar os filmes na API
    useEffect(() => {
        async function loadFilmes() {

            //await: para esperar a resposta, pois a busca na API pode demorar um pouco
            const response = await api.get("movie/now_playing?api_key=c588cf34254b147499726788097390cf", {
                params: {
                    api_key: "c588cf34254b147499726788097390cf",
                    language: "pt-BR",
                    page: 1,
                }
            })
            // console.log(response.data.results.slice(0,10))
            setFilmes(response.data.results)
            setLoading(false)
        }
        loadFilmes()
    }, [])

    function salvarFilme(id, filme){
        const minhaLista = localStorage.getItem("@primeflix")

        //aqui converto para array?, caso não exista essa lista, cria uma vazia
        let filmesSalvos = JSON.parse(minhaLista) || []

        //verificar se o filme já está salvo. Utiliza o método some que irá verificar se no array existe pelo menos um item igual ao que você está comparando.
        const hasFilme = filmesSalvos.some((filmesalvo) => filmesalvo.id === id)

        if(hasFilme){
            toast.warn("Esse filme já está na lista")
            return
        }
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso')
    }

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            
            <div className="lista-filmes">

                {filmes.map((filme) => {
                    return (

                            <article key={filme.id}>
                                <button onClick={() => {salvarFilme(filme.id, filme)}}>Salvar</button>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                                <Link to={`/filme/${filme.id}`}>Acessar</Link> 
                            </article>
                    )
                })}

            </div>
        </div>
    )
}
export default Home;
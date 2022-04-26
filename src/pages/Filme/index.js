import {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api'
import "./filme-info.css"
import { toast } from 'react-toastify'

function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "c588cf34254b147499726788097390cf",
                    language: "pt-BR"
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                console.log('Filme não encontrado')
                navigate('/', { replace: true})
                return
            })
        } 

        loadFilme()

        return() => {
            console.log('O componente foi desmontado')
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        //aqui converto para array?, caso não exista essa lista, cria uma vazia
        let filmesSalvos = JSON.parse(minhaLista) || []

        //verificar se o filme já está salvo. Utiliza o método some que irá verificar se no array existe pelo menos um item igual ao que você está comparando.
        const hasFilme = filmesSalvos.some((filmesalvo) => filmesalvo.id === filme.id)

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
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            <div>
                <strong>Avaliação: {filme.vote_average}/10</strong>

                <div className='area-buttons'>

                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                    </button>

                </div>
            </div>
        </div>
    )
}
export default Filme;
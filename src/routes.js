import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Filme from './pages/Filme'

function RoutesApp(){
    return(
        <div>
            < BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home/> }/>
                    <Route path='/filme/:id' element={ <Filme/> }/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default RoutesApp; 
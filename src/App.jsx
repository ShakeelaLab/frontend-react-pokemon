import './App.css'
import logo from './assets/logo.png'
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";

function App() {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [getPokemon, setGetPokemon] = useState([]);

    useEffect(() => {

        async function fetchPokemon() {
            toggleLoading(true);
            try {
                setError(false);
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/', {
                    params: {
                        limit: 20
                    }
                });
                console.log(response.data)
                setGetPokemon(response.data.results);
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                toggleLoading(false)
            }
        }

        fetchPokemon()

    }, [])

    return (
        <>
            <section className="outer-container">
                <img src={logo} alt="logo pokemon"
                     className="logo"/>
                <div className="buttons-container">
                    <button
                        className="previous-button"
                        type="button"
                        onClick={() => setGetPokemon(prevState => prevState)}
                    >vorige
                    </button>
                    <button
                        className="next-button"
                        type="button"
                    >volgende
                    </button>
                </div>
                {getPokemon.map((pokemon, index) => ( <li key={index}> <div className="pokemon-card"><p>{pokemon.name}</p></div> </li> ))}
                <img src="" alt=""/>
                <p>Moves: </p>
                <p>Weight: </p>
                <p>Abilities:</p>
                <p>cute-charm</p>
                <p>competitive</p>
                <p>friend-guard</p>
            </section>
        </>
    )
}

export default App

import './App.css'
import logo from './assets/logo.png'
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";

function App() {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [getPokemon, setGetPokemon] = useState(null);
    const [page, setPage] = useState(0);


    useEffect(() => {

        async function fetchPokemon() {
            toggleLoading(true);
            try {
                setError(false);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, {
                    params: {
                        limit: 20,
                        offset: page * 20
                    }
                });
                console.log(response)
                setGetPokemon(response.data)
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                toggleLoading(false)
            }
        }

        fetchPokemon()

    }, [page])

    return (
        <>
            <section className="outer-container">
                <img src={logo} alt="logo pokemon"
                     className="logo"/>
                <div className="buttons-container">
                    <button
                        className="previous-button"
                        type="button"
                        onClick={() => setPage((page) => Math.max(page - 1, 0))}
                    >vorige
                    </button>
                    <button
                        className="next-button"
                        type="button"
                        onClick={() => setPage((page) => page + 1)}
                    >volgende
                    </button>
                </div>
                <div className="pokemon-list">
                    {getPokemon?.results?.map((pokemon, index) => {
                        // voor nu kan het alleen op deze manier om png te kunnen laten zien, {pokemon.sprites.front_default} werkt niet, ook niet met vraagtekens ertussen
                        const id = pokemon.url.split("/")[6];
                        return (<li key={index}>
                            <div className="pokemon-card">
                                <p>{pokemon.name}</p> <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                alt={pokemon.name}/></div>
                        </li>);
                    })}
                </div>

            </section>
        </>
    )
}

export default App

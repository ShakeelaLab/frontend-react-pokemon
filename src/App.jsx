import './App.css'
import logo from './assets/logo.png'
import {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "./component/PokemonCard.jsx";

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        async function fetchPokemon() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
                    params: {
                        limit: 20,
                        offset: page * 20
                    }
                });
                setPokemonList(response.data.results);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, [page]);


    return (
        <section className="outer-container"><img src={logo}
                                                  alt="logo pokemon"
                                                  className="logo"/>
            <div className="buttons-container">
                <button className="previous-button"
                        type="button"
                        disabled={page === 0}
                        onClick={() => setPage((p) => Math.max(p - 1, 0))}> vorige
                </button>
                <button className="next-button"
                        type="button"
                        disabled={page >= 67}
                        onClick={() => setPage((p) => p + 1)}> volgende
                </button>
            </div>
            {loading && <p>Loading...</p>} {error &&
                <p>Er ging iets mis!</p>}

            <ul className="pokemon-list"> {pokemonList.map((pokemon, index) => (
                <PokemonCard key={index}
                             pokemon={pokemon}/>))}
            </ul>
        </section>);
}

export default App;
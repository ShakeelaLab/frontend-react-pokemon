import './App.css'
import logo from './assets/logo.png'
import {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard
    from "./component/pokemonCard/PokemonCard.jsx";
import Button from "./component/button/Button.jsx";

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    useEffect(() => {

        const controller = new AbortController();

        async function fetchPokemon() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
                    signal: controller.signal,
                    params: {
                        limit: 20,
                        offset: page * 20
                    }
                });
                setPokemonList(response.data.results);
                setHasNext(Boolean(response.data.next));
                setHasPrevious(Boolean(response.data.previous));
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
        return function cleanup() {
            controller.abort();
        }
    }, [page]);


    return (
        <section className="outer-container"><img src={logo}
                                                  alt="logo pokemon"
                                                  className="logo"/>
            <div className="buttons-container">
                <Button
                    className="previous-button"
                    type="button"
                    disabled={!hasPrevious}
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}>
                    vorige
                </Button>
                <Button className="next-button"
                        type="button" disabled={!hasNext}
                        onClick={() => setPage((p) => p + 1)}>
                    volgende
                </Button>
            </div>
            {loading && <p>Loading...</p>} {error &&
                <p>Er ging iets mis!</p>}

            <ul className="pokemon-list"> {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.url}
                             pokemon={pokemon}/>))}
            </ul>
        </section>);
}

export default App;
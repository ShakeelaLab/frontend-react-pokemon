import {useEffect, useState} from "react";
import axios from "axios";
import './PokemonCard.css'

function PokemonCard({pokemon}) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchDetails() {
            setLoading(true);
            try {
                const response = await axios.get(pokemon.url);
                setDetails(response.data);
            }catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
        return function cleanup() {
            controller.abort();
        }
    }, [pokemon.url]);

    return (
        <ul className="pokemon-card">
            <h3>{pokemon.name}</h3>
            {loading && <p>Loading...</p>} {error &&
            <p>Er ging iets mis!</p>}

            {details && (
                <>
                    <img
                        src={details.sprites.front_default}
                        alt={pokemon.name}
                    />

                    <li><strong>
                        Moves: </strong>{details.moves.length}
                    </li>
                    <li><strong>
                        Weight: </strong>{details.weight}
                    </li>
                    <li><strong>
                        Abilities:
                    </strong></li>
                    <div
                        className="abilities"> {details.abilities.map((a) => (
                        <span key={a.ability.name + a.slot}
                              className="ability"> {a.ability.name} </span>))} </div>
                </>
            )}
        </ul>
    );
}

export default PokemonCard;

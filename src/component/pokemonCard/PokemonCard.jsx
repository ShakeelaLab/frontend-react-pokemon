import {useEffect, useState} from "react";
import axios from "axios";
import './PokemonCard.css'

function PokemonCard({pokemon}) {
    const [details, setDetails] = useState(null);

    useEffect(() => {

        const controller = new AbortController();

        async function fetchDetails() {
            const response = await axios.get(pokemon.url);
            setDetails(response.data);
        }

        fetchDetails();
        return function cleanup() {
            controller.abort();
        }
    }, [pokemon.url]);

    return (
        <li className="pokemon-card">
            <h3>{pokemon.name}</h3>

            {!details && <p>Loading...</p>}

            {details && (
                <>
                    <img
                        src={details.sprites.front_default}
                        alt={pokemon.name}
                    />

                    <p><strong>
                        Moves: </strong>{details.moves.length}
                    </p>
                    <p><strong>
                        Weight: </strong>{details.weight}
                    </p>
                    <p><strong>
                        Abilities:
                    </strong></p>
                    <div
                        className="abilities"> {details.abilities.map((a, index) => (
                        <span key={index}
                              className="ability"> {a.ability.name} </span>))} </div>
                </>
            )}
        </li>
    );
}

export default PokemonCard;

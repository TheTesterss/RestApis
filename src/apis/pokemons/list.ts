import { Request, Response } from 'express';
import { ApiCodes, ApiTypes } from '../../enums/enums';
import { ApiInterface, PokemonInterface } from '../../enums/Interfaces';

export default {
    path: '/pokemons',
    type: ApiTypes.GET,
    run: async (req: Request, res: Response) => {
        let pokemons: PokemonInterface[] = require('../../util/json/pokemons.json');
        let { type } = req.query;
        type = (type as string)?.toUpperCase();

        if (type && type.toUpperCase()) {
            let found = pokemons.filter(
                (pokemon: PokemonInterface) =>
                    pokemon.types[0].fr === type ||
                    pokemon.types[0].en === type ||
                    pokemon.types[1]?.fr === type ||
                    pokemon.types[1]?.en === type
            );
            if (found.length > 0) pokemons = found;
        }

        try {
            return res.status(ApiCodes.SUCCESS).send({
                status: ApiCodes.SUCCESS,
                datas: {
                    amount: pokemons.length,
                    pokemons
                },
                message: 'Success.'
            });
        } catch (error) {
            console.log(error);
            return res.status(ApiCodes.BAD_GATEWAY).send({
                status: ApiCodes.BAD_GATEWAY,
                datas: error,
                message: 'An error occured while requesting to our datas.'
            });
        }
    }
} as ApiInterface;

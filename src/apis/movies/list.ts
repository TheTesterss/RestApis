import { Request, Response } from 'express';
import { ApiCodes, ApiTypes } from '../../enums/enums';
import { ApiInterface, MovieInterface } from '../../enums/Interfaces';

export default {
    path: '/movies',
    type: ApiTypes.GET,
    run: async (req: Request, res: Response) => {
        let movies: MovieInterface[] = require('../../util/json/movies.json');
        let { type } = req.query;
        type = (type as string)?.toUpperCase();

        try {
            return res.status(ApiCodes.SUCCESS).send({
                status: ApiCodes.SUCCESS,
                datas: {
                    amount: movies.length,
                    movies: movies.sort((a: MovieInterface, b: MovieInterface) => b.revenue - a.revenue).slice(0, 1000)
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

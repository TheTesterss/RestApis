import { MovieInterface } from '../enums/Interfaces';

export const findClosestMovie = (movie: string, movies: MovieInterface[]): MovieInterface | null => {
    const normalizedMovie = movie.replaceAll(" ", "").toLowerCase();

    const exactMatch = movies.find(
        (movie_1: MovieInterface) =>
            movie_1.originalTitle?.replaceAll("+", "")?.replaceAll(" ", "")?.toLowerCase() === normalizedMovie ||
            movie_1.title?.replaceAll("+", "")?.replaceAll(" ", "")?.toLowerCase() === normalizedMovie
    );

    if (exactMatch) {
        return exactMatch;
    }

    let closestMatch: MovieInterface | null = null;
    let closestDistance = Infinity;

    movies.forEach((movie_1: MovieInterface) => {
        const distance = levenshteinDistance(normalizedMovie, movie_1.title.replaceAll(" ", "").toLowerCase());
        if (distance < closestDistance) {
            closestDistance = distance;
            closestMatch = movie_1;
        }
    });

    return closestMatch;
};

const levenshteinDistance = (a: string, b: string): number => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
};
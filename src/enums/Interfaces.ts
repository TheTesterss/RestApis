import { Request, Response } from 'express';
import tokenRegex from '../util/tokenRegex';

export interface ApiInterface {
    type: 'post' | 'patch' | 'put' | 'delete' | 'get';
    ip?: string | string[];
    path: string;
    authType?: 'Bearer' | 'Bot';
    headers?: HeadersInterface;
    body?: Object;
    queries?: string[];
    run: (req: Request, res: Response) => {};
}

export interface HeadersInterface {
    token?: typeof tokenRegex;
    token_requirement: boolean;
}

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: bigint;
    flags: bigint;
    banner: string | null;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: AvatarDecorationAsset | null;
    banner_color?: string;
    clan?: null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    locale?: string;
    verified?: boolean;
    email?: string;
    premium_type?: number;
}

export interface AvatarDecorationAsset {
    asset: string;
    sku_id: string;
    expires_at: number | null;
}

export interface DiscordFormatedUser {
    id: string;
    username: string;
    global_name: string;
    discriminator: string;
    flags: DiscordFormatedFlags | null;
    banner: DiscordFormatedBanner | null;
    banner_color: string | null;
    avatar: DiscordFormatedAvatar | null;
    avatarDecoration: DiscordFormatedAvatarDecoration | null;
    clan?: null;
    bot: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    locale?: string | null;
    email?: string | null;
    verified?: boolean;
    premium_type?: number | null;
}

export interface DiscordFormatedBanner {
    asset: string;
    url: string;
    animated: boolean;
    accent_color: number;
}

export interface DiscordFormatedAvatarDecoration extends AvatarDecorationAsset {
    url: string | null;
}

export interface DiscordFormatedAvatar {
    asset: string | null;
    url: string | null;
    animated: boolean;
}

export interface DiscordFormatedFlags {
    current: bigint;
    public: bigint;
    list: string[];
}

export interface PokemonInterface {
    names: PokemonNames;
    types: PokemonTypes[];
    img: string;
    index: string;
}

export interface PokemonNames {
    fr: string;
    en: string;
}

export interface PokemonTypes {
    fr: string;
    en: string;
}

export interface MovieInterface {
    id: string;
    cast: CastInterface[];
    crew: CrewInterface[];
    adult: boolean;
    belongsToCollection: string | null;
    budget: number;
    genres: GenreInterface[];
    homepage: string | null;
    imdbId: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    productionCompanies: string[];
    productionCountries: string[];
    releaseDate: string;
    revenue: number;
    runtime: number | null;
    spokenLanguages: string[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    keywords: KeywordInterface[];
    ratings: RatingInterface[];
}

export interface RatingInterface {
    userId: string;
    movieId: string;
    rating: number;
    timestamp: string;
}

export interface KeywordInterface {
    id: string;
    keyword: string;
}

export interface CastInterface {
    id: string;
    name: string;
    character: string;
}

export interface CrewInterface {
    id: string;
    name: string;
    job: string;
}

export interface GenreInterface {
    id: string;
    name: string;
}

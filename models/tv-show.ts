export interface TvShowSearchResult {
  score: number;
  show: Show;
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: Type;
  language: Language;
  genres: string[];
  status: Status;
  runtime: number | null;
  averageRuntime: number;
  premiered: Date;
  ended: Date | null;
  officialSite: null | string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: Network | null;
  dvdCountry: null;
  externals: Externals;
  image: Image;
  summary: null | string;
  updated: number;
  _links: Links;
}

export interface Links {
  self: Self;
  previousepisode: Previousepisode;
}

export interface Previousepisode {
  href: string;
  name: string;
}

export interface Self {
  href: string;
}

export interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string;
}

export interface Image {
  medium: string;
  original: string;
}

export enum Language {
  English = "English",
  Mongolian = "Mongolian",
}

export interface Network {
  id: number;
  name: string;
  country: Country | null;
  officialSite: null | string;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Rating {
  average: number | null;
}

export interface Schedule {
  time: Time;
  days: string[];
}

export enum Time {
  Empty = "",
  The2100 = "21:00",
  The2200 = "22:00",
}

export enum Status {
  Ended = "Ended",
  ToBeDetermined = "To Be Determined",
}

export enum Type {
  Scripted = "Scripted",
}

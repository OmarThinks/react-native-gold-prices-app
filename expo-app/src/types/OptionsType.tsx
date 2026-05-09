type SingleOptionType<T> = { id: T; title: string };

type OptionsType<T> = SingleOptionType<T>[];

export type { OptionsType, SingleOptionType };

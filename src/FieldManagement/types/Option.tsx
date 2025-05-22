export type Option = { id: string; label: string };

export type TypedOption<T> = {
  readonly id: T;
  readonly label: string;
};

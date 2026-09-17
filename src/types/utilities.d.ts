export type ValueOf<T> = T[keyof T];

/**
 * Allow wild card values alongside a fixed string union.
 *
 * @example
 * type MyString = 'active' | 'inactive' | WildCardString;
 * const myString: MyString = 'active';
 * const anotherString: MyString = 'anything-else'; // wild card value
 */
export type WildCardString = string & {};

export type ErrorState<F> = {
  fields?: Array<keyof F>;
  message?: string;
};

export type BaseProps<T = HTMLDivElement> = React.HTMLAttributes<T>;

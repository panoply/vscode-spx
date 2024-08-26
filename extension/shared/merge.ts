/* eslint-disable no-use-before-define */

interface DA<T> extends ReadonlyArray<T | DA<T>> {}
type DP = undefined;
type FP<T> = (val: T, merge: Merge<T extends object ? T : never>) => T;
type AP<T> = T extends Array<infer V> ? OP<Record<number, V>> : never;
type NP<T> = T extends object ? OP<T> : never;
type OP<S extends object> = { [K in keyof S]?: S[K] | DP | FP<S[K]> | NP<S[K]> | AP<S[K]>;};
type False = false | 0 | '' | null | undefined;
type TopLevelPatch<S extends object> = FP<S> | OP<S> | AP<S> | False;
type MultiPatch<S extends object> = TopLevelPatch<S> | DA<TopLevelPatch<S>>;
type Merge<S extends object> = (source: S, ...patches: Array<MultiPatch<S>>) => S;

/**
 * Immutable merge assignment utility. Accepts deep structures and
 * merges `source` parameter with `patch` parameter
 */
export function merge <Merge extends object> (source: Merge, ...patches: MultiPatch<Merge>[]): Merge {

  const isArr = Array.isArray(source);

  return apply(isArr, isArr ? source.slice() : Object.assign({}, source), patches);

  function apply (arrayType: boolean, copy: any, patch: any) {

    const type = typeof patch;

    if (patch && type === 'object') {

      if (Array.isArray(patch)) {
        for (const p of patch) {
          copy = apply(arrayType, copy, p);
        }
      } else {
        for (const k of Object.keys(patch)) {
          const value = patch[k];
          if (typeof value === 'function') {
            copy[k] = value(copy[k], merge);
          } else if (value === undefined) {
            arrayType ? copy.splice(k, 1) : delete copy[k];
          } else if (value === null || typeof value !== 'object' || Array.isArray(value)) {
            copy[k] = value;
          } else if (typeof copy[k] === 'object') {
            copy[k] = value === copy[k] ? value : merge(copy[k], value);
          } else {
            copy[k] = apply(false, {}, value);
          }
        }
      }

    } else if (type === 'function') {
      copy = patch(copy, merge);
    }

    return copy;

  };

};

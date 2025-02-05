function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return deepMerge(target, ...sources);
}

export type DeepPartial<Thing> = Thing extends Function
  ? Thing
  : Thing extends Array<infer InferredArrayMember>
  ? DeepPartialArray<InferredArrayMember>
  : Thing extends object
  ? DeepPartialObject<Thing>
  : Thing | undefined;

interface DeepPartialArray<Thing> extends Array<DeepPartial<Thing>> {}

type DeepPartialObject<Thing> = {
  [Key in keyof Thing]?: DeepPartial<Thing[Key]>;
};

const createMockFunc =
  <T>(defaultObj: T) =>
  (overrides?: DeepPartial<T>): T =>
    deepMerge(structuredClone(defaultObj), overrides);

export type Mock<T> = {
  readonly create: (overrides?: DeepPartial<T> | undefined) => T;
};

export type MockUsecases<T> = {
  [name: string]: DeepPartial<T>;
};

export function createMock<T>(defaultObj: T): Mock<T> {
  return {
    create: createMockFunc<T>(defaultObj),
  };
}

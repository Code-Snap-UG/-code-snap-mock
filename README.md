# @code-snap/mock

A lightweight TypeScript utility for creating mock objects with deep merging capabilities. This package allows you to define default objects and override them with partials to simulate different scenarios easily.

## Installation

```sh
npm install @code-snap/mock
```

or with Yarn:

```sh
yarn add @code-snap/mock
```

## Usage

### Creating a Mock Object

The `createMock` function generates a mock object from a default structure. You can override parts of it using partials.

```typescript
import { createMock, MockUsecases } from '@code-snap/mock';

type Person = {
  age: number;
  address: {
    city: string;
    street: string;
  };
};

const PersonMock = createMock<Person>({
  age: 1,
  address: {
    city: 'ExampleCity',
    street: 'Teststreet',
  },
});

console.log(PersonMock.create());
// Output: { age: 1, address: { city: 'ExampleCity', street: 'Teststreet' } }
```

### Defining Use Cases

Use cases allow you to define reusable scenarios as partial objects that can override the default structure.

```typescript
const Usecases = {
  NO_ADDRESS: { address: undefined },
  ADULT: { age: 21 },
} satisfies MockUsecases<Person>;

console.log(PersonMock.create(Usecases.ADULT));
// Output: { age: 21, address: { city: 'ExampleCity', street: 'Teststreet' } }
```

### Faker.js Support

`@code-snap/mock` supports `@faker-js/faker`, allowing you to generate realistic test data with ease.

```typescript
import { createMock } from '@code-snap/mock';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
};

const UserMock = createMock<User>({
  name: faker.name.fullName(),
  email: faker.internet.email(),
});

console.log(UserMock.create());
```

## API Reference

### `createMock<T>(defaultObj: T): Mock<T>`

Creates a mock object from a given default object.

- **Parameters:**
  - `defaultObj: T` – The base object to use as a template.
- **Returns:**
  - A `Mock<T>` object with a `create` method for generating mock instances.

### `Mock<T>.create(overrides?: DeepPartial<T>): T`

Creates a mock object with optional overrides.

- **Parameters:**
  - `overrides?: DeepPartial<T>` – A deep partial structure to override parts of the mock.
- **Returns:**
  - A new instance of the mock object with the applied overrides.

### `MockUsecases<T>`

A type that defines a collection of use cases, where each key represents a scenario and the value is a `DeepPartial<T>` override. This acts as a helper type to ensure type saftey.

## Why Use `@code-snap/mock`?

- 🔹 **Simple API** – Define mock objects and override them with ease.
- 🔹 **Type-safe** – Ensures type safety with TypeScript.
- 🔹 **Deep merging** – Merges nested properties correctly.
- 🔹 **Reusable scenarios** – Define and reuse mock configurations with `MockUsecases<T>`.
- 🔹 **Faker.js support** – Easily integrate with `@faker-js/faker` for dynamic test data.

## License

This package is licensed under the MIT License.

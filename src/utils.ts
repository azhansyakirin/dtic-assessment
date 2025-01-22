import { faker } from "@faker-js/faker";

export function isNil(arg: string | string[]) {
    if (Array.isArray(arg)) {
      return arg.some((str) => str == null || typeof str === "undefined");
    } else {
      return arg == null || typeof arg === "undefined";
    }
  }

export function fetchUser() {
  const num = Math.floor(Math.random() * 99);
  const gender = num % 2 === 0 ? "male" : "female";
  const factor = gender === "female" ? "women" : "men";
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);

  return {
    firstName,
    lastName,
    gender,
    location: {
      state: faker.location.state(),
      country: faker.location.country,
    },
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    picture: {
      thumbnail: `https://randomuser.me/api/portraits/thumb/${factor}/${num}.jpg`,
      medium: `https://randomuser.me/api/portraits/med/${factor}/${num}.jpg`,
      large: `https://randomuser.me/api/portraits/${factor}/${num}.jpg`,
    },
  };
}

export function fetchUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = [0, 1, 2, 3, 4].map(() => fetchUser());
      resolve(users);
    }, 100);
  });
}

// 1. Define the character type
type Character = {
  name: string;
  gender: "Male" | "Female";
  archetype: string[];
  birthplace: string;
  firstAppearance: string;
};

export const characters: Character[] = [
  {
    name: "Ryu",
    gender: "Male",
    archetype: ["shoto"],
    birthplace: "Japan",
    firstAppearance: "Street Fighter",
  },
  {
    name: "Ken",
    gender: "Male",
    archetype: ["shoto"],
    birthplace: "USA",
    firstAppearance: "Street Fighter",
  },
  {
    name: "Chun-Li",
    gender: "Female",
    archetype: ["shoto", "charge"],
    birthplace: "China",
    firstAppearance: "Street Fighter II: The World Warrior",
  },
  {
    name: "Juri",
    gender: "Female",
    archetype: ["rushdown"],
    birthplace: "Korea",
    firstAppearance: "Super Street Fighter IV",
  },
  {
    name: "E Honda",
    gender: "Male",
    archetype: ["charge"],
    birthplace: "Japan",
    firstAppearance: "Street Fighter II: The World Warrior",
  },
  {
    name: "Blanka",
    gender: "Male",
    archetype: ["charge"],
    birthplace: "Brazil",
    firstAppearance: "Street Fighter II: The World Warrior",
  },
  {
    name: "Zangief",
    gender: "Male",
    archetype: ["grappler"],
    birthplace: "Russia",
    firstAppearance: "Street Fighter II: The World Warrior",
  },
  {
    name: "Dhalsim ",
    gender: "Male",
    archetype: ["zoner"],
    birthplace: "India",
    firstAppearance: "Street Fighter II: The World Warrior",
  },
  {
    name: "Guile",
    gender: "Male",
    archetype: ["zoner", "charge"],
    birthplace: "USA",
    firstAppearance: "Street Fighter II: The World Warrior",
  },
];

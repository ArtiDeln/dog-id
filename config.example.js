const PET_CONFIG = {
  name: "Кира",
  breed: "Бигль",
  birthDate: "02.06.2018",
  chipped: true,

  photos: [
    "assets/kira.jpg",
    "assets/kira-2.jpg",
  ],

  owners: [
    {
      name: "Артём",
      phone: "+375XXXXXXXXX",
      phoneDisplay: "+375 XX XXX XX XX",
    },
    {
      name: "Анастасия",
      phone: "+375XXXXXXXXX",
      phoneDisplay: "+375 XX XXX XX XX",
    },
  ],

  fallbackClinic: {
    name: "ПолиВет",
    address: "Речицкий просп. 135б, Гомель",
    note: "Если не удаётся дозвониться — можно отвести собаку в эту клинику",
  },

  reward: false,
  rewardText: "",

  notes: [
    "Дружелюбная, не агрессивна",
    "Может испугаться громких звуков",
  ],
};

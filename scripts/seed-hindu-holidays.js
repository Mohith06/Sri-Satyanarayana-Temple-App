// Seeds Hindu holidays from hinduamerican.org/community/hindu-holidays-guide into the events table.
// Run: node scripts/seed-hindu-holidays.js

const { init, id } = require("@instantdb/admin");

const APP_ID = "2e70e6f9-ec56-43c8-a2c6-2894010b8ceb";
const ADMIN_TOKEN = "460e8b87-095e-43ac-b9b8-f9c1670391d2";

const db = init({ appId: APP_ID, adminToken: ADMIN_TOKEN });

const HOLIDAYS = [
  // Hindu Festivals
  { title: "Lohri",            date: "2026-01-13", type: "festival", description: "Harvest festival celebrated with bonfires and folk songs, marking the end of winter." },
  { title: "Makar Sankranti",  date: "2026-01-14", type: "festival", description: "Harvest festival marking the sun's transit into Capricorn, celebrated with kite flying and sesame sweets." },
  { title: "Pongal",           date: "2026-01-14", type: "festival", description: "South Indian harvest festival thanking the Sun god, celebrated with the cooking of pongal rice dish." },
  { title: "Vasant Panchami",  date: "2026-01-23", type: "festival", description: "Festival honoring Goddess Saraswati, the deity of knowledge, wisdom, and arts. Marks the arrival of spring." },
  { title: "Maha Shivaratri",  date: "2026-02-15", type: "puja",    description: "The great night of Lord Shiva. Devotees fast, perform all-night vigils, and offer bilva leaves." },
  { title: "Holi",             date: "2026-03-03", type: "festival", description: "Festival of colors celebrating the victory of good over evil and the arrival of spring." },
  { title: "Ugadi",            date: "2026-03-19", type: "festival", description: "Telugu and Kannada New Year, celebrated with special foods and new beginnings." },
  { title: "Ram Navami",       date: "2026-03-26", type: "puja",    description: "Celebrates the birth of Lord Rama, the seventh avatar of Vishnu." },
  { title: "Mahavir Jayanti",  date: "2026-03-31", type: "special", description: "Birth anniversary of Mahavira, the twenty-fourth and last Tirthankara of Jainism." },
  { title: "Hanuman Jayanti",  date: "2026-04-01", type: "puja",    description: "Celebrates the birth of Lord Hanuman, the divine monkey devotee of Lord Rama." },
  { title: "Vaisakhi",         date: "2026-04-13", type: "festival", description: "Harvest festival and Sikh New Year celebrating the formation of the Khalsa." },
  { title: "Vesak",            date: "2026-05-01", type: "special", description: "Buddhist festival celebrating the birth, enlightenment, and death of the Buddha." },
  { title: "Guru Purnima",     date: "2026-07-29", type: "special", description: "Day to honor spiritual and academic teachers. Celebrated on the full moon of the month of Ashadha." },
  { title: "Raksha Bandhan",   date: "2026-08-27", type: "festival", description: "Festival celebrating the bond between brothers and sisters, marked by tying of the rakhi thread." },
  { title: "Onam",             date: "2026-08-26", type: "festival", description: "Kerala's harvest festival celebrating the homecoming of the mythical King Mahabali." },
  { title: "Krishna Janmashtami", date: "2026-09-03", type: "puja", description: "Celebrates the birth of Lord Krishna, the eighth avatar of Vishnu. Observed with midnight vigils and devotional singing." },
  { title: "Ganesh Chaturthi", date: "2026-09-14", type: "puja",    description: "Festival celebrating the birth of Lord Ganesha. Marked by elaborate clay idol installations and immersions." },
  { title: "Paryushana",       date: "2026-09-08", type: "special", description: "Most important Jain festival, an eight-day period of fasting, prayer, and reflection." },
  { title: "Pitru Paksha Begins", date: "2026-09-26", type: "special", description: "Start of the 14-day period for honoring ancestors through rituals and offerings (Shraddha)." },
  { title: "Gandhi Jayanti",   date: "2026-10-02", type: "special", description: "Birthday of Mahatma Gandhi, Father of the Nation. A national day of remembrance and service." },
  { title: "Navaratri",        date: "2026-10-11", type: "festival", description: "Nine-night festival dedicated to Goddess Durga. Celebrated with garba, dandiya, and nightly pujas." },
  { title: "Durga Puja",       date: "2026-10-16", type: "puja",    description: "Major Bengali festival worshipping Goddess Durga. Elaborate pandals and cultural programs mark the celebration." },
  { title: "Dussehra",         date: "2026-10-20", type: "festival", description: "Celebrates the victory of Lord Rama over Ravana, symbolizing the triumph of good over evil." },
  { title: "Karwa Chauth",     date: "2026-10-28", type: "special", description: "Festival where married women fast from sunrise to moonrise for the long life of their husbands." },
  { title: "Diwali",           date: "2026-11-08", type: "festival", description: "Festival of Lights celebrating the return of Lord Rama to Ayodhya. Marked by lamps, fireworks, and sweets." },
  { title: "Nanak Jayanti",    date: "2026-11-24", type: "special", description: "Celebrates the birth of Guru Nanak Dev Ji, the founder of Sikhism." },
  { title: "Gita Jayanti",     date: "2026-12-19", type: "special", description: "Commemorates the day Lord Krishna delivered the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra." },
  { title: "Swami Vivekananda Jayanti", date: "2026-01-12", type: "special", description: "Birth anniversary of Swami Vivekananda, celebrated as National Youth Day in India." },
];

async function main() {
  console.log(`Seeding ${HOLIDAYS.length} Hindu holidays...`);

  const txns = HOLIDAYS.map((h) =>
    db.tx.events[id()].update({
      title: h.title,
      date: h.date,
      type: h.type,
      description: h.description,
      time: "",
      location: "Sri Satya Temple",
      createdAt: Date.now(),
    })
  );

  await db.transact(txns);
  console.log("Done! All holidays seeded successfully.");
}

main().catch((err) => {
  console.error("Error seeding holidays:", err);
  process.exit(1);
});

"use client";

import { useState } from "react";

const FIRST_NAMES = {
  A: ["Aaliyah", "Abigail", "Ada", "Adaline", "Adalyn", "Addison", "Adela", "Adele", "Adriana", "Adrianna", "Aileen", "Aimee", "Alana", "Alaina", "Alana", "Alessandra", "Alexa", "Alexandra", "Alice", "Alicia", "Alina"],
  B: ["Bailey", "Barbara", "Beatrice", "Becca", "Bella", "Belle", "Bernice", "Beth", "Bethany", "Betsy", "Bianca", "Billie", "Blair", "Blake", "Blythe", "Bonnie", "Brenda", "Briana", "Brianna", "Bridget", "Brittany", "Brooke", "Brooklyn"],
  C: ["Caitlin", "Callie", "Camila", "Camille", "Cara", "Carla", "Carmen", "Carolina", "Caroline", "Carolyn", "Casey", "Cassandra", "Cassie", "Catherine", "Cecilia", "Celeste", "Celine", "Chanel", "Charlotte", "Chelsea", "Chloe", "Christina", "Christine", "Claire", "Clara", "Clarissa"],
  D: ["Dahlia", "Daisy", "Dakota", "Daniela", "Danielle", "Daphne", "Darla", "Darlene", "Davina", "Dawn", "Deanna", "Deborah", "Delia", "Delilah", "Denise", "Desiree", "Destiny", "Diana", "Diane", "Dianne", "Dora", "Dorothy"],
  E: ["Eden", "Edith", "Edna", "Eileen", "Elaine", "Eleanor", "Elena", "Eliana", "Elisa", "Elise", "Eliza", "Elizabeth", "Ella", "Ellen", "Ellie", "Eloise", "Elsa", "Elsie", "Emilia", "Emily", "Emma", "Erica", "Erika", "Erin", "Esme", "Esther", "Eva", "Eve", "Evelyn"],
  F: ["Faith", "Fallon", "Farrah", "Fatima", "Faye", "Felicia", "Felicity", "Fern", "Fiona", "Flora", "Florence", "Frances", "Francesca", "Frankie", "Freya", "Frida", "Gabriella", "Giselle"],
  G: ["Gabriela", "Gabriella", "Gail", "Gemma", "Genesis", "Georgia", "Georgina", "Geraldine", "Gia", "Gianna", "Gigi", "Gina", "Ginger", "Giovanna", "Giselle", "Gloria", "Grace", "Gracie", "Greta", "Gretchen", "Gwen", "Gwendolyn", "Guadalupe"],
  H: ["Hadley", "Hailey", "Haley", "Hallie", "Hannah", "Hanna", "Harmony", "Harper", "Harriet", "Hattie", "Hazel", "Heather", "Heidi", "Helen", "Helena", "Holly", "Hope", "Hunter", "Hyacinth", "Hayley", "Henrietta", "Honor", "Hilda", "Hillary"],
  I: ["Ida", "Iliana", "Iliana", "Imelda", "Imani", "Imogen", "India", "Indigo", "Ingrid", "Irene", "Irina", "Iris", "Isabel", "Isabella", "Isabelle", "Isla", "Isobel", "Ivy", "Ivana", "Ivette", "Inez"],
  J: ["Jackie", "Jade", "Jada", "Janelle", "Jane", "Janet", "Janice", "Jasmine", "Jayla", "Jean", "Jenna", "Jennifer", "Jenny", "Jessica", "Jessie", "Jill", "Joanna", "Jocelyn", "Josephine", "Josie", "Joy", "Joyce", "Judith", "Julia", "Juliana", "Juliet", "Julie", "June"],
  K: ["Kaitlyn", "Kara", "Karen", "Karina", "Karla", "Kassandra", "Kate", "Katelyn", "Katherine", "Kathleen", "Kathryn", "Katie", "Kayla", "Keira", "Kelly", "Kendall", "Kennedy", "Kiera", "Kim", "Kimberly", "Kirsten", "Krista", "Kristen", "Kristina", "Kristine", "Kylie", "Kyla"],
  L: ["Lacey", "Laila", "Lana", "Lara", "Laura", "Lauren", "Layla", "Leah", "Leanne", "Leslie", "Leticia", "Lia", "Liana", "Lillian", "Lily", "Liliana", "Lina", "Linda", "Lindsey", "Lisa", "Lizbeth", "Lola", "London", "Lorelei", "Lorraine", "Lucia", "Lucille", "Lucy", "Luna", "Lydia"],
  M: ["Mabel", "Mackenzie", "Macy", "Madeline", "Madison", "Mae", "Maggie", "Maia", "Maisie", "Makayla", "Mallory", "Mara", "Maria", "Mariah", "Mariana", "Marianne", "Marie", "Marissa", "Marisol", "Marley", "Martha", "Mary", "Matilda", "Maya", "Megan", "Melody", "Melanie", "Melissa", "Mia", "Michaela", "Michelle", "Mila", "Millie", "Miranda", "Molly", "Monica", "Monique", "Morgan", "Mya"],
  N: ["Nadia", "Nadine", "Nancy", "Naomi", "Natalia", "Natalie", "Natasha", "Naya", "Nevaeh", "Nicole", "Nicola", "Nina", "Noelle", "Nora", "Norah", "Norma", "Nova", "Nydia", "Nyla", "Nia", "Nellie", "Nerissa", "Nerine"],
  O: ["Oakley", "Octavia", "Odessa", "Odette", "Olga", "Olive", "Olivia", "Opal", "Ophelia", "Ora", "Oriana", "Orla", "Ornella", "Oona", "Odelia", "Olympia", "Ocean", "Oksana", "Onyx", "Opaline", "Orielle"],
  P: ["Paige", "Paisley", "Paloma", "Pamela", "Patricia", "Paula", "Paulina", "Pearl", "Penelope", "Penny", "Phoebe", "Piper", "Pippa", "Poppy", "Presley", "Priya", "Priscilla", "Prudence", "Paige", "Portia", "Petra", "Pilar", "Pia", "Polly", "Posy"],
  Q: ["Queenie", "Quinn", "Quiana", "Quilla", "Querida", "Quetzalli", "Qiana", "Qadira", "Qamar", "Qiana", "Quinley", "Quinlan", "Quinta", "Quintessa", "Quella", "Quenby", "Quirina", "Quita", "Qiana", "Quorra", "Qiana"],
  R: ["Rachel", "Rachael", "Raegan", "Raelynn", "Rebecca", "Rebekah", "Regina", "Reina", "Renee", "Rhea", "Rhoda", "Riley", "Rita", "River", "Robin", "Robyn", "Rochelle", "Rosa", "Rosalie", "Rosalind", "Rose", "Rosemary", "Rosie", "Rowan", "Roxanne", "Ruby", "Ruth"],
  S: ["Sabrina", "Sadie", "Sally", "Samantha", "Samara", "Sandra", "Sara", "Sarah", "Savannah", "Scarlett", "Selena", "Serena", "Serenity", "Shania", "Shannon", "Sharon", "Shayla", "Sheila", "Shelby", "Sierra", "Simone", "Skylar", "Sofia", "Sophia", "Sonia", "Sonya", "Stella", "Stephanie", "Summer", "Susan", "Susanna", "Sydney", "Sylvia"],
  T: ["Tabitha", "Talia", "Tamara", "Tania", "Tanya", "Tara", "Tatiana", "Tatum", "Taylor", "Teresa", "Theresa", "Tessa", "Tia", "Tiffany", "Tiana", "Tiara", "Tori", "Tricia", "Trinity", "Trisha", "Trudy", "Teresa", "Thea", "Thalia"],
  U: ["Ula", "Ulani", "Una", "Unity", "Ursula", "Ursa", "Uriah", "Ulyssa", "Uma", "Umbria", "Undine", "Usha", "Usagi", "Udele", "Ulla", "Ulrica", "Ulrika", "Umeko", "Umi", "Usha", "Uriella", "Uriel"],
  V: ["Valentina", "Valerie", "Vanessa", "Vera", "Veronica", "Victoria", "Vienna", "Violeta", "Violet", "Viola", "Vivian", "Viviana", "Vivienne", "Virginia", "Viridiana", "Vita", "Vittoria", "Vivienne", "Vada", "Valeria", "Vania", "Vanna", "Velma", "Venus", "Verity"],
  W: ["Wanda", "Wendy", "Whitney", "Willa", "Willow", "Wilma", "Winifred", "Winnie", "Winter", "Wren", "Wrenley", "Wynne", "Wynona", "Waverly", "Wallace", "Wendy", "Westlyn", "Whitley", "Wilhelmina", "Winona", "Winslow", "Wednesday", "Wynter", "Wisteria"],
  X: ["Xandra", "Xanthe", "Xara", "Xena", "Xenia", "Xiomara", "Ximena", "Xyla", "Xylia", "Xylina", "Xylah", "Xylona", "Xaria", "Xaviera", "Xavia", "Xitlali", "Xochitl", "Xoey", "Xuri", "Xena", "Xyla"],
  Y: ["Yadira", "Yana", "Yara", "Yasmin", "Yasmine", "Yvette", "Yvonne", "Yulia", "Yuliana", "Yuna", "Yvette", "Yara", "Yolanda", "Yaritza", "Yasmina", "Yessenia", "Yelena", "Yohana", "Yvette", "Yuki", "Yumi", "Yuna"],
  Z: ["Zahra", "Zaida", "Zaira", "Zara", "Zaria", "Zariah", "Zayla", "Zelda", "Zelina", "Zenaida", "Zinnia", "Zoe", "Zoey", "Zola", "Zora", "Zoya", "Zuleika", "Zuri", "Zariah", "Zelia", "Zenobia", "Zena"]
};

const SURNAMES = ["Santos", "Reyes", "Garcia", "Cruz", "Mendoza", "Navarro", "Castillo", "Ramos", "Aquino", "Flores", "Torres", "Villanueva", "Rivera", "Bautista", "Gonzales", "Gonzalez", "Dela", "Cruz", "Delacruz", "Diaz", "Fernandez", "Hernandez", "Lopez", "Martinez", "Morales", "Perez", "Ramirez", "Rodriguez", "Sanchez", "Santiago", "Soriano", "Mercado", "Manalo", "de", "Leon", "de", "Guzman", "de", "Vera", "de", "Jesus", "Evangelista", "Valdez", "Valencia", "Vargas", "Velasco", "Ventura", "Villarama", "Villarica", "Villanueva", "Villegas", "Vicente", "Velez", "Vera", "Vergara", "Yao", "Yap", "Yu", "Zamora", "Zaragoza", "Abad", "Aguilar", "Alcaraz", "Alcantara", "Alejo", "Alfonso", "Alonzo", "Alvarez", "Amador", "Amante", "Andres", "Angeles", "Angulo", "Aquino", "Arce", "Arcilla", "Arellano", "Arias", "Arriola", "Atienza", "Austria", "Avila", "Bacani", "Badillo", "Balagtas", "Balboa", "Ballesteros", "Baltazar", "Banaag", "Bandala", "Barrios", "Bartolome", "Bautista", "Bayani", "Beltran", "Bernardo", "Besa", "Biscocho", "Bonifacio", "Borja", "Briones", "Bueno", "Caballero", "Cabrera", "Calma", "Caluag", "Camacho", "Campos", "Canlas", "Cañete", "Caparas", "Capili", "Carandang", "Cariaga", "Carpio", "Casimiro", "Castañeda", "Castro", "Catacutan", "Cayabyab", "Cayanan", "Celis", "Chua", "Co", "Coloma", "Concepcion", "Contreras", "Corpuz", "Cortez", "Cordero", "Coronel", "Correa", "Cuenca", "Cunanan", "Dacanay", "Dagdag", "Dalisay", "Damasco", "David", "Dayao", "de", "Castro", "de", "la", "Peña", "de", "los", "Santos", "de", "Mesa", "de", "Ocampo", "de", "los", "Reyes", "de", "Leon", "del", "Mundo", "del", "Rosario", "Domingo", "Dominguez", "Dorado", "Duran", "Dizon", "Ecleo", "Esguerra", "Espiritu", "Estrella", "Fabian", "Fajardo", "Fajardo", "Falguera", "Fermin", "Ferrer", "Francisco", "Franco", "Fuentes", "Galang", "Gallardo", "Garcia", "Garces", "Gatdula", "Gatchalian", "Generoso", "Geronimo", "Go", "Gomez", "Gonzales", "Guevarra", "Gutierrez", "Guzman", "Hidalgo", "Hilario", "Ignacio", "Ilagan", "Infante", "Isidro", "Javier", "Jimenez", "Jose", "Juarez", "Kalaw", "Kasilag", "Katigbak", "Kintanar", "Labasan", "Lacson", "Lagman", "Lagrimas", "Lantican", "Laurel", "Legaspi", "Lim", "Linares", "Lising", "Loyola", "Macapagal", "Macaraig", "Macasieb", "Macatol", "Manahan", "Mangubat", "Manlapaz", "Mariano", "Marquez", "Marcelo", "Marinas", "Marzan", "Masangkay", "Mateo", "Matias", "Mauricio", "Medina", "Medrano", "Mejia", "Mendiola", "Meneses", "Mercado", "Mijares", "Miranda", "Molina", "Montero", "Montemayor", "Montecillo", "Montilla", "Morales", "Natividad", "Nazario", "Nicolas", "Nieves", "Nolasco", "Nunez", "Ocampo", "Ochoa", "Ong", "Ordonez", "Osias", "Pabalan", "Pacheco", "Padilla", "Paguia", "Palanca", "Palomares", "Pangilinan", "Panganiban", "Panlilio", "Paras", "Pascual", "Pastor", "Patricio", "Pelaez", "Pelayo", "Pena", "Peralta", "Perez", "Pimentel", "Pineda", "Ponce", "Prado", "Prieto", "Quijano", "Quinto", "Ramirez", "Ramos", "Real", "Reyes", "Ricarte", "Rivera", "Robles", "Roces", "Roman", "Romero", "Rosales", "Roxas", "Rubio", "Rueda", "Ruiz", "Salazar", "Salcedo", "Samson", "San", "Jose", "Sandoval", "Santiago", "Santos", "Sebastian", "Sevilla", "Sison", "Solis", "Soriano", "Suarez", "Sumulong", "Tabora", "Tan", "Tanchoco", "Tanyag", "Tañada", "Tiu", "Tolentino", "Trinidad", "Tuazon", "Uy", "Valdez", "Valenzuela", "Valerio", "Velasco", "Ventura", "Vergara", "Vicente", "Villafuerte", "Villalon", "Villanueva", "Villar", "Villarreal", "Villegas", "Yabut", "Yambao", "Yanga", "Ylagan", "Yulo", "Zafra", "Zamora", "Zapanta", "Zarate", "Zulueta", "Zuniga"];

const LOCATION_DATA = {
  "Antipolo": {
    high: ["Antipolo National High School","Our Lady of Fatima University - Basic Education","San Isidro National High School"],
    college: ["University of Rizal System - Antipolo","Our Lady of Fatima University - Antipolo","FEU Roosevelt Antipolo"]
  },
  "Manila": {
    high: ["Manila Science High School","Ramon Magsaysay High School","Arellano High School"],
    college: ["University of the Philippines Manila","Pamantasan ng Lungsod ng Maynila","De La Salle University"]
  },
  "Quezon City": {
    high: ["Quezon City Science High School","Quezon City National High School","Don Alejandro Roces Science High School"],
    college: ["Ateneo de Manila University","University of the Philippines Diliman","University of the Philippines College of Law"]
  }
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Keep generated full names unique during the current browser session.
const USED_FULL_NAMES = new Set();

function birthdayForAge(age) {
  const today = new Date();
  const latest = new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
  const earliest = new Date(today.getFullYear() - age - 1, today.getMonth(), today.getDate() + 1);
  const span = latest.getTime() - earliest.getTime();
  const date = new Date(earliest.getTime() + Math.floor(Math.random() * (span + 1)));
  return date.toISOString().slice(0,10);
}

function formatBirthday(value) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function makePhone(i) {
  // Clearly fictional/test placeholder, not a real contact number.
  return `TEST-PHONE-${String(i + 1).padStart(3, "0")}`;
}

function generateProfiles({ initial, location, count, age, password }) {
  const key = (initial || "M").trim().charAt(0).toUpperCase();
  const names = FIRST_NAMES[key] || FIRST_NAMES.M;
  const loc = LOCATION_DATA[location] || LOCATION_DATA.Antipolo;
  const totalCombinations = names.length * SURNAMES.length;

  return Array.from({ length: count }, (_, i) => {
    // Prevent repeats across Generate clicks while there are unused combinations.
    if (USED_FULL_NAMES.size >= totalCombinations) USED_FULL_NAMES.clear();

    let first;
    let surname;
    let fullName;
    do {
      first = pick(names);
      surname = pick(SURNAMES);
      fullName = `${first} ${surname}`;
    } while (USED_FULL_NAMES.has(fullName));

    USED_FULL_NAMES.add(fullName);

    return {
      id: crypto.randomUUID(),
      name: fullName,
      gender: "Female",
      age,
      birthday: birthdayForAge(age),
      hometown: location,
      highSchool: pick(loc.high),
      college: pick(loc.college),
      phone: makePhone(i),
      password
    };
  });
}

function profileText(p) {
  return [
    `Name: ${p.name}`,
    `Gender: ${p.gender}`,
    `Age: ${p.age}`,
    `Birthday: ${formatBirthday(p.birthday)}`,
    `Hometown/City: ${p.hometown}`,
    `High School: ${p.highSchool}`,
    `College: ${p.college}`,
    `Test Phone: ${p.phone}`,
    `Password: ${p.password}`
  ].join("\n");
}

export default function Home() {
  const [initial, setInitial] = useState("M");
  const [location, setLocation] = useState("Antipolo");
  const [age, setAge] = useState(21);
  const [count, setCount] = useState(10);
  const [password, setPassword] = useState("TestPassword123!");
  const [profiles, setProfiles] = useState([]);

  const generate = () => {
    setProfiles(generateProfiles({ initial, location, count: Math.min(100, Math.max(1, count)), age: Math.max(21, age), password }));
  };

  const reset = () => {
    setInitial("M"); setLocation("Antipolo"); setAge(21); setCount(10);
    setPassword("TestPassword123!"); setProfiles([]);
  };

  const copy = async (p) => navigator.clipboard.writeText(profileText(p));
  const copyAll = async () => navigator.clipboard.writeText(profiles.map(profileText).join("\n\n--------------------\n\n"));

  return (
    <main>
      <div className="shell">
        <header>
          <div>
            <span className="badge">FICTIONAL / TEST DATA</span>
            <h1>Profile Generator</h1>
            <p>Generate fictional profiles for UI, QA, and development testing.</p>
          </div>
          <div className="countBadge">{profiles.length} generated</div>
        </header>

        <section className="panel">
          <div className="grid">
            <label>First-name initial
              <input maxLength="1" value={initial} onChange={e => setInitial(e.target.value.toUpperCase())}/>
            </label>
            <label>Hometown / City
              <select value={location} onChange={e => setLocation(e.target.value)}>
                {Object.keys(LOCATION_DATA).map(x => <option key={x}>{x}</option>)}
              </select>
            </label>
            <label>Minimum age
              <input type="number" min="21" max="100" value={age} onChange={e => setAge(Number(e.target.value))}/>
            </label>
            <label>Profiles to generate
              <input type="number" min="1" max="100" value={count} onChange={e => setCount(Number(e.target.value))}/>
            </label>
            <label className="full">Password for test data
              <input value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>Gender
              <input value="Female" disabled />
            </label>
          </div>
          <div className="actions">
            <button className="primary" onClick={generate}>Generate</button>
            <button onClick={copyAll} disabled={!profiles.length}>Copy All</button>
            <button className="danger" onClick={reset}>Reset</button>
          </div>
        </section>

        <div className="notice">
          These are fictional test records. Phone values are placeholders and are not intended for real account registration.
        </div>

        <section className="results">
          {profiles.length === 0 ? (
            <div className="empty">Set your options and click <b>Generate</b>.</div>
          ) : profiles.map((p, i) => (
            <article className="card" key={p.id}>
              <div className="cardTop">
                <div>
                  <span className="number">#{i + 1}</span>
                  <h2>{p.name}</h2>
                </div>
                <button onClick={() => copy(p)}>Copy</button>
              </div>
              <div className="details">
                <span><b>Gender</b>{p.gender}</span>
                <span><b>Age</b>{p.age}</span>
                <span><b>Birthday</b>{formatBirthday(p.birthday)}</span>
                <span><b>City</b>{p.hometown}</span>
                <span><b>High school</b>{p.highSchool}</span>
                <span><b>College</b>{p.college}</span>
                <span><b>Test phone</b>{p.phone}</span>
                <span><b>Password</b>{p.password}</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

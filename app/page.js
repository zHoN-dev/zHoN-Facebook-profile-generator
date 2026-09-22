"use client";

import { useState } from "react";

const FIRST_NAMES = {
  A: ["Andrea","Angela","Anne","Alyssa","Aira"],
  B: ["Bianca","Bea","Bernadette","Brianna","Bella"],
  C: ["Camille","Carla","Christine","Chloe","Clarisse"],
  D: ["Danielle","Diana","Denise","Daphne","Daniella"],
  E: ["Ella","Elaine","Erika","Eunice","Elise"],
  F: ["Faith","Fiona","Frances","Faye","Felicia"],
  G: ["Gabrielle","Giselle","Grace","Gwen","Gia"],
  H: ["Hannah","Hazel","Heidi","Hope","Holly"],
  I: ["Isabel","Irene","Ivy","Isabelle","Imani"],
  J: ["Jasmine","Janelle","Joanna","Julia","Jessa"],
  K: ["Katrina","Kyla","Kristine","Kara","Kim"],
  L: ["Leah","Lara","Lianne","Liza","Luna"],
  M: ["Maria","Mikaela","Megan","Michelle","Mae"],
  N: ["Nicole","Nina","Natalie","Naomi","Nadine"],
  O: ["Olivia","Odessa","Ophelia","Olive","Orla"],
  P: ["Patricia","Paula","Phoebe","Pia","Priscilla"],
  Q: ["Queenie","Quinn","Quiana","Querida","Quella"],
  R: ["Rachel","Rina","Rhea","Rebecca","Rochelle"],
  S: ["Sophia","Samantha","Sarah","Selena","Stephanie"],
  T: ["Theresa","Tanya","Tricia","Tessa","Tina"],
  U: ["Uma","Ursula","Unity","Una","Ulani"],
  V: ["Vanessa","Veronica","Valerie","Vera","Violet"],
  W: ["Wendy","Willa","Whitney","Willow","Winnie"],
  X: ["Xena","Xandra","Xyla","Xiomara","Xenia"],
  Y: ["Yasmin","Yvette","Yvonne","Yana","Yara"],
  Z: ["Zara","Zoe","Zinnia","Zelda","Zia"]
};

const SURNAMES = ["Santos","Reyes","Garcia","Cruz","Mendoza","Dela Cruz","Navarro","Castillo","Ramos","Aquino","Flores","Torres","Villanueva","Rivera","Bautista"];

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
  return Array.from({ length: count }, (_, i) => {
    const first = pick(names);
    const surname = pick(SURNAMES);
    return {
      id: crypto.randomUUID(),
      name: `${first} ${surname}`,
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

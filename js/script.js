// Catch the Volume People
// This file makes the people move, lets the user drag them, and changes the sound volume.

const playground = document.querySelector("#playground");
const basket = document.querySelector("#basket");
const capturedPerson = document.querySelector("#captured-person");
const volumeDisplay = document.querySelector("#volume-display");
const hint = document.querySelector("#hint");
const soundButton = document.querySelector("#sound-button");

// Make 21 values: 0, 5, 10 ... 100.
const volumeValues = Array.from({ length: 21 }, (_, index) => index * 5);
const people = [];
let activePerson = null;
let currentVolume = 50;
let audioContext;
let gainNode;

// Each person has a position (x/y) and speed (speedX/speedY).
// We save these details in JavaScript so we can update their movement every frame.
function createPeople() {
  const colors = ["#ff6b81", "#ffca3a", "#70d6ff", "#8ac926", "#c77dff"];

  volumeValues.forEach((value, index) => {
    const person = document.createElement("div");
    person.className = "person";
    person.innerHTML = `<span class="number">${value}</span><span class="head"></span><span class="body"></span><span class="legs"></span>`;
    person.style.setProperty("--shirt", colors[index % colors.length]);
    person.style.setProperty("--skin", index % 2 ? "#f2bd94" : "#8d5a42");
    playground.appendChild(person);

    // Loud people move a little faster. The 0 person is very sleepy.
    const speed = 0.25 + value / 250;
    const data = {
      element: person,
      value,
      x: 25 + Math.random() * (playground.clientWidth - 100),
      y: 60 + Math.random() * (playground.clientHeight - 180),
      speedX: (Math.random() > 0.5 ? 1 : -1) * speed,
      speedY: (Math.random() > 0.5 ? 1 : -1) * speed,
      captured: false,
    };
    people.push(data);
    drawPerson(data);
    person.addEventListener("pointerdown", (event) => startDragging(event, data));
  });
}

// This puts a person at their saved x/y location on the screen.
function drawPerson(person) {
  person.element.style.left = `${person.x}px`;
  person.element.style.top = `${person.y}px`;
}

// requestAnimationFrame runs this function before the browser draws each frame.
function movePeople() {
  const maxX = playground.clientWidth - 54;
  const maxY = playground.clientHeight - 74;

  people.forEach((person) => {
    if (person.captured || person === activePerson) return;

    person.x += person.speedX;
    person.y += person.speedY;
    if (person.x < 0 || person.x > maxX) person.speedX *= -1;
    if (person.y < 35 || person.y > maxY) person.speedY *= -1;
    person.x = Math.max(0, Math.min(maxX, person.x));
    person.y = Math.max(35, Math.min(maxY, person.y));
    drawPerson(person);
  });

  requestAnimationFrame(movePeople);
}

function startDragging(event, person) {
  event.preventDefault();
  activePerson = person;
  person.element.classList.add("dragging");
  person.element.setPointerCapture(event.pointerId);
  hint.textContent = "Catch them before they escape!";
}

// While dragging, place the person underneath the pointer/finger.
playground.addEventListener("pointermove", (event) => {
  if (!activePerson) return;
  const area = playground.getBoundingClientRect();
  activePerson.x = event.clientX - area.left - 26;
  activePerson.y = event.clientY - area.top - 35;
  drawPerson(activePerson);
  if (isOverBasket(activePerson.element)) hint.textContent = "Drop a number here to set the volume.";
});

playground.addEventListener("pointerup", finishDragging);
playground.addEventListener("pointercancel", finishDragging);

function finishDragging() {
  if (!activePerson) return;
  const person = activePerson;
  person.element.classList.remove("dragging");
  activePerson = null;

  if (isOverBasket(person.element)) capturePerson(person);
}

// Two rectangles overlap when the person is inside the basket area.
function isOverBasket(personElement) {
  const personBox = personElement.getBoundingClientRect();
  const basketBox = basket.getBoundingClientRect();
  return personBox.right > basketBox.left && personBox.left < basketBox.right && personBox.bottom > basketBox.top && personBox.top < basketBox.bottom;
}

function capturePerson(person) {
  // Release the old selected person back into the field.
  const previous = people.find((otherPerson) => otherPerson.captured);
  if (previous) {
    previous.captured = false;
    playground.appendChild(previous.element);
    previous.x = 50;
    previous.y = 80;
  }

  person.captured = true;
  capturedPerson.appendChild(person.element);
  setVolume(person.value);
  hint.textContent = `Success! You captured ${person.value}.`;
}

function setVolume(value) {
  currentVolume = value;
  volumeDisplay.textContent = `${value}%`;

  // Web Audio volume uses a number from 0 to 1, so 60% becomes 0.60.
  if (gainNode) gainNode.gain.value = value / 100;
}

// Browsers require a user action before they allow sound. This button starts a quiet test tone.
soundButton.addEventListener("click", () => {
  if (!audioContext) {
    audioContext = new AudioContext();
    gainNode = audioContext.createGain();
    gainNode.gain.value = currentVolume / 100;
    gainNode.connect(audioContext.destination);
  }

  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 330;
  oscillator.connect(gainNode);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.45);
  soundButton.textContent = "Play it again";
});

createPeople();
movePeople();

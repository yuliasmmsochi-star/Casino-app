const tg = window.Telegram.WebApp;
const storage = tg.CloudStorage;

let userId = tg.initDataUnsafe?.user?.id;
let balance = 0;

function loadBalance() {
  if (!userId) return;

  storage.getItem(`balance_${userId}`, (err, value) => {
    if (value) {
      balance = parseInt(value);
    } else {
      balance = 1000;
      storage.setItem(`balance_${userId}`, balance.toString());
    }
    updateBalance();
  });
}

function saveBalance() {
  if (!userId) return;
  storage.setItem(`balance_${userId}`, balance.toString());
}

function updateBalance() {
  document.getElementById("balance").innerText = balance;
}

function addBalance(amount) {
  balance += amount;
  saveBalance();
  updateBalance();
}

function subtractBalance(amount) {
  balance -= amount;
  if (balance < 0) balance = 0;
  saveBalance();
  updateBalance();
}

// --- ИГРЫ ---

function playSlots() {
  const win = Math.random() < 0.35;
  if (win) {
    addBalance(200);
    document.getElementById("result").innerText = "🎉 Вы выиграли +200!";
  } else {
    subtractBalance(100);
    document.getElementById("result").innerText = "😢 Не повезло -100";
  }
}

function playRoulette() {
  const win = Math.random() < 0.48;
  if (win) {
    addBalance(150);
    document.getElementById("result").innerText = "🎡 Победа +150!";
  } else {
    subtractBalance(75);
    document.getElementById("result").innerText = "😞 Проигрыш -75";
  }
}

function playDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  if (roll >= 4) {
    addBalance(100);
    document.getElementById("result").innerText = `🎲 Выпало ${roll}. Победа +100!`;
  } else {
    subtractBalance(50);
    document.getElementById("result").innerText = `🎲 Выпало ${roll}. -50`;
  }
}

// запуск
tg.ready();
loadBalance();

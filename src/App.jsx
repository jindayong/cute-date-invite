import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const teaseMessages = [
  "에이~ 다시 생각해봐 🥺",
  "진짜...? 😢",
  "한 번만 더 생각해줘 💕",
  "NO는 고장났어 😝"
];

const menuItems = [
  { emoji: "🍕", label: "피자" },
  { emoji: "🍣", label: "회" },
  { emoji: "🥗", label: "샐러드" },
  { emoji: "🥪", label: "샌드위치" },
  { emoji: "🍚", label: "한식" },
  { emoji: "✍️", label: "기타" }
];

const pad = (value) => String(value).padStart(2, "0");

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";
  return `${pad(hours)}:${minutes}`;
});

const formatDateText = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(`${dateValue}T00:00:00`);
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
};

const getLocalDateValue = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const formatCountdown = (target) => {
  const distance = target.getTime() - Date.now();

  if (distance <= 0) {
    return "오늘이야! 예쁘게 만나자 💕";
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return `${days}일 ${pad(hours)}시간 ${pad(minutes)}분 ${pad(seconds)}초`;
};

export default function App() {
  const today = getLocalDateValue();
  const [step, setStep] = useState("invite");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [menu, setMenu] = useState("");
  const [customMenu, setCustomMenu] = useState("");
  const [noPosition, setNoPosition] = useState({ left: 58, top: 62 });
  const [tease, setTease] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [countdown, setCountdown] = useState("");
  const noButtonRef = useRef(null);

  const selectedMenu = menu === "기타" ? customMenu.trim() : menu;
  const selectedDateTime = useMemo(() => {
    if (!date || !time) return null;
    return new Date(`${date}T${time}:00`);
  }, [date, time]);

  useEffect(() => {
    if (!selectedDateTime) return undefined;

    const tick = () => setCountdown(formatCountdown(selectedDateTime));
    tick();

    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [selectedDateTime]);

  const moveNoButton = () => {
    const buttonWidth = noButtonRef.current?.offsetWidth || 96;
    const buttonHeight = noButtonRef.current?.offsetHeight || 54;
    const safeWidth = Math.max(window.innerWidth - buttonWidth - 32, 80);
    const safeHeight = Math.max(window.innerHeight - buttonHeight - 32, 160);
    const nextLeft = Math.floor(16 + Math.random() * safeWidth);
    const nextTop = Math.floor(96 + Math.random() * Math.max(safeHeight - 80, 80));
    const message = teaseMessages[Math.floor(Math.random() * teaseMessages.length)];

    setNoPosition({ left: nextLeft, top: nextTop });
    setTease(message);
  };

  const pickMenu = (label) => {
    setMenu(label);
    setIsConfirmed(false);

    if (label !== "기타") {
      setStep("final");
    }
  };

  const burstHearts = () => {
    const freshHearts = Array.from({ length: 30 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.45,
      size: 18 + Math.random() * 18
    }));

    setIsConfirmed(true);
    setHearts(freshHearts);
    window.setTimeout(() => setHearts([]), 3600);
  };

  const makeCalendarFile = () => {
    if (!selectedDateTime || !selectedMenu) return;

    const start = new Date(selectedDateTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const toIcsDate = (value) =>
      `${value.getUTCFullYear()}${pad(value.getUTCMonth() + 1)}${pad(
        value.getUTCDate()
      )}T${pad(value.getUTCHours())}${pad(value.getUTCMinutes())}${pad(
        value.getUTCSeconds()
      )}Z`;
    const escapeText = (value) =>
      value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Cute Date Invite//Date Plan//KO",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@cute-date-invite`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `SUMMARY:${escapeText(`데이트 - ${selectedMenu}`)}`,
      `DESCRIPTION:${escapeText("좋아하는 사람과의 데이트 약속")}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "date-plan.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="date-app">
      <section className="phone-shell" aria-live="polite">
        <div className="soft-glow soft-glow-one" />
        <div className="soft-glow soft-glow-two" />

        {step === "invite" && (
          <div className="screen intro-screen">
            <p className="mini-label">오늘의 아주 중요한 질문</p>
            <h1>나랑 데이트 갈래? 💕</h1>

            <div className="button-row">
              <button
                className="primary-button yes-button"
                type="button"
                onClick={() => setStep("datetime")}
              >
                YES 💖
              </button>
            </div>

            {tease && <p className="tease-message">{tease}</p>}

            <button
              ref={noButtonRef}
              className="secondary-button runaway-button"
              style={{ left: noPosition.left, top: noPosition.top }}
              type="button"
              onFocus={moveNoButton}
              onMouseEnter={moveNoButton}
              onPointerDown={moveNoButton}
              onTouchStart={moveNoButton}
              aria-label="도망가는 NO 버튼"
            >
              NO
            </button>
          </div>
        )}

        {step === "datetime" && (
          <div className="screen card-screen">
            <p className="mini-label">Step 1</p>
            <h2>언제 만날까? 💌</h2>

            <div className="choice-card">
              <label htmlFor="date">날짜</label>
              <input
                id="date"
                min={today}
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div className="choice-card">
              <label htmlFor="time">시간</label>
              <select
                id="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              >
                <option value="">시간을 골라줘</option>
                {timeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="primary-button full-button"
              type="button"
              disabled={!date || !time}
              onClick={() => setStep("menu")}
            >
              메뉴 고르러 가기 💕
            </button>
          </div>
        )}

        {step === "menu" && (
          <div className="screen card-screen">
            <p className="mini-label">Step 2</p>
            <h2>뭐 먹으러 갈까? 🍽️</h2>

            <div className="menu-grid">
              {menuItems.map((item) => (
                <button
                  className={`menu-card ${menu === item.label ? "selected" : ""}`}
                  key={item.label}
                  type="button"
                  onClick={() => pickMenu(item.label)}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {menu === "기타" && (
              <div className="custom-menu">
                <label htmlFor="customMenu">먹고 싶은 메뉴</label>
                <input
                  id="customMenu"
                  placeholder="예: 파스타, 타코, 디저트"
                  value={customMenu}
                  onChange={(event) => setCustomMenu(event.target.value)}
                />
                <button
                  className="primary-button full-button"
                  type="button"
                  disabled={!customMenu.trim()}
                  onClick={() => setStep("final")}
                >
                  이걸로 정하기 💕
                </button>
              </div>
            )}
          </div>
        )}

        {step === "final" && selectedDateTime && (
          <div className="screen final-screen">
            <p className="mini-label">Date Plan</p>
            <h2>약속 잡혔다 💘</h2>

            <div className="result-card">
              <p>
                우리 {formatDateText(date)} {time}에 {selectedMenu} 먹으러
                데이트하자 💕
              </p>
            </div>

            <div className="countdown-card">
              <span>데이트 D-Day까지 ❤️</span>
              <strong>{countdown}</strong>
            </div>

            <button className="primary-button full-button" type="button" onClick={burstHearts}>
              확정하기 💕
            </button>

            {isConfirmed && <p className="done-message">데이트 예약 완료 💕</p>}

            <button className="calendar-button" type="button" onClick={makeCalendarFile}>
              캘린더에 추가하기
            </button>
            <p className="calendar-note">
              좋아하는 사람과의 약속은 잊어버리면 안 되니까 😘
            </p>
          </div>
        )}
      </section>

      <div className="heart-layer" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${heart.size}px`
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </main>
  );
}

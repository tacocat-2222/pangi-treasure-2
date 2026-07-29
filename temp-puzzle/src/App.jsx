import { useEffect, useState } from "react";

const TOTAL = 30;

export default function App() {
  const [pieces, setPieces] = useState([]);
  const [message, setMessage] = useState("");
  const [ team, setTeam] = useState(
    localStorage.getItem("team") || ""
  );

  const storageKey = `pieces_${team}`;

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    // 관리자 초기화
    if (params.get("reset") === "1") {
      localStorage.removeItem("pieces");
      setPieces([]);
      setMessage("🔄 퍼즐이 초기화되었습니다.");
      return;
    }

    const saved = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );

    const piece = Number(params.get("piece"));
    const qrTeam = params.get("team");

    let nextPieces = [...saved];
    if (qrTeam && qrTeam !== team) {
  setMessage(
    "🚫 잘못된 조각입니다! 다른 팀의 QR입니다."
  );

  setPieces(saved);

  return;
}

    if (
      piece >= 1 &&
      piece <= TOTAL &&
      !saved.includes(piece)
    ) {
      nextPieces.push(piece);

      localStorage.setItem(
  storageKey,
  JSON.stringify(nextPieces)
);

      setMessage(
        `🎉 ${piece}번 조각을 획득했습니다!`
      );
    }

    setPieces(nextPieces);
  }, []);

  const resetPuzzle = () => {
  if (
    window.confirm(
      "정말 퍼즐을 초기화하시겠습니까?"
    )
  ) {
    const adminCode = window.prompt(
      "관리자 코드를 입력하세요."
    );

    if (adminCode !== "0000") {
      alert("관리자 코드가 올바르지 않습니다.");
      return;
    }

    localStorage.removeItem(storageKey);
    setPieces([]);
    setMessage("🔄 퍼즐이 초기화되었습니다.");

    alert("퍼즐이 초기화되었습니다.");
  }
};

const selectTeam = (selectedTeam) => {
  localStorage.setItem(
    "team",
    selectedTeam
  );

  setTeam(selectedTeam);
};

const changeTeam = () => {
  localStorage.removeItem("team");
  setTeam("");
  setMessage("");
};

if (!team) {
  return (
    <div
      style={{
        padding: 30,
        textAlign: "center",
      }}
    >
      <h1>🧩 팡이 보물찾기</h1>

      <h2>팀을 선택하세요</h2>

      <button
        onClick={() => selectTeam("red")}
      >
        🔴 빨강팀
      </button>

      <br />
      <br />

      <button
        onClick={() => selectTeam("blue")}
      >
        🔵 파랑팀
      </button>

      <br />
      <br />

      <button
        onClick={() => selectTeam("green")}
      >
        🟢 초록팀
      </button>

      <br />
      <br />

      <button
        onClick={() => selectTeam("black")}
      >
        ⚫ 검정팀
      </button>
    </div>
  );
}
``
  return (
    <div
      style={{
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1>🧩 팡이 보물찾기</h1>

      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        진행률: {pieces.length}/{TOTAL}
      </p>

      <button
        onClick={resetPuzzle}
        style={{
          marginBottom: 20,
          padding: "10px 15px",
          backgroundColor: "#ff6b6b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        퍼즐 초기화
      </button>

      {message && (
        <div
          style={{
            padding: 12,
            marginBottom: 15,
            backgroundColor: "#dff0d8",
            border: "1px solid #b2d8b2",
          }}
        >
          {message}
        </div>
      )}

      {pieces.length === TOTAL && (
  <div
    style={{
      padding: 20,
      marginBottom: 20,
      backgroundColor: "#ffe066",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h2>🎊 축하합니다! 🎊</h2>

    <p>
      {team === "red" && "🔴 빨강팀 퍼즐 완성!"}
      {team === "blue" && "🔵 파랑팀 퍼즐 완성!"}
      {team === "green" && "🟢 초록팀 퍼즐 완성!"}
      {team === "black" && "⚫ 검정팀 퍼즐 완성!"}
    </p>

    <img
  src={
    team === "red"
      ? "/complete_red.jpg"
      : team === "blue"
      ? "/complete_blue.jpg"
      : team === "green"
      ? "/complete_green.jpg"
      : "/complete_black.jpg"
  }
  style={{
    width: "100%",
    maxWidth: "600px",
    borderRadius: "10px",
  }}
/>

  </div>
)}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(6, minmax(50px, 1fr))",
          gap: "5px",
        }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1 / 1",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              overflow: "hidden",
            }}
          >
            {pieces.includes(i + 1) ? (
              <img
                src={`/${team}/piece_${String(i+1).padStart(2,"0")}.png`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                />
            ) : (
              "❓"
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
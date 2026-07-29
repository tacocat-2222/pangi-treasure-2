import { useEffect, useState } from "react";

export default function App() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("pieces") || "[]"
    );
    setPieces(saved);
  }, []);

  const collectPiece = () => {
    if (pieces.length < 30) {
      const next = [...pieces, pieces.length + 1];
      setPieces(next);
      localStorage.setItem(
        "pieces",
        JSON.stringify(next)
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🧩 팡이 보물찾기</h1>

      <p>진행률: {pieces.length}/30</p>

      <button onClick={collectPiece}>
        퍼즐 1개 획득
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 80px)",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 80,
              height: 80,
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pieces.includes(i + 1)
              ? `조각 ${i + 1}`
              : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}
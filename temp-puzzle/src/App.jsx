import { useEffect, useState } from "react";

const TOTAL = 30;

export default function App() {
  const [pieces, setPieces] = useState([]);
  const [message, setMessage] = useState("");

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
      localStorage.getItem("pieces") || "[]"
    );

    const piece = Number(params.get("piece"));

    let nextPieces = [...saved];

    if (
      piece >= 1 &&
      piece <= TOTAL &&
      !saved.includes(piece)
    ) {
      nextPieces.push(piece);

      localStorage.setItem(
        "pieces",
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
      localStorage.removeItem("pieces");
      setPieces([]);
      setMessage("🔄 퍼즐이 초기화되었습니다.");
    }
  };

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
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          🎊 축하합니다!
          <br />
          30개의 조각을 모두 찾았습니다!
          <br />
          팡이 보물찾기 성공!
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
                src={`/pieces/piece_${String(i+1).padStart(2,"0")}.png`}
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
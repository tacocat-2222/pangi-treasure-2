import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const TOTAL = 30;

export default function Admin() {
  const [teams, setTeams] = useState({
    red: [],
    blue: [],
    green: [],
    black: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const names = [
        "red",
        "blue",
        "green",
        "black",
      ];

      const result = {};

      for (const name of names) {
        const snap = await getDoc(
          doc(db, "teams", name)
        );

        result[name] = snap.exists()
          ? snap.data().pieces || []
          : [];
      }

      setTeams(result);
    };

    loadData();

    const timer = setInterval(
      loadData,
      2000
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>📊 관리자 대시보드</h1>

      {Object.entries(teams).map(
        ([team, pieces]) => {
          const percent = Math.round(
            (pieces.length / TOTAL) * 100
          );

          return (
            <div
              key={team}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <h2>
                {team === "red" &&
                  "🔴 빨강팀"}
                {team === "blue" &&
                  "🔵 파랑팀"}
                {team === "green" &&
                  "🟢 초록팀"}
                {team === "black" &&
                  "⚫ 검정팀"}
              </h2>

              <p>
                진행률:
                {pieces.length}/{TOTAL}
                ({percent}%)
              </p>

              <p>
                획득 조각:
                {pieces.length
                  ? pieces
                      .sort(
                        (a, b) => a - b
                      )
                      .join(", ")
                  : "없음"}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
}
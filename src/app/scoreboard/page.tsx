'use client';
import Link from "next/link";
import StudentBar from "./StudentBar";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

export default function Page() {
  const [participants, setParticipants] = useState<{ name: string; userId: number; initialCount: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch("/api/users/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
            console.log(res);
          throw new Error("API fetch failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setParticipants(
          data.map((user: User) => ({ name: user.name, userId: user.id, initialCount: user.score }))
        );
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen-1">
      {isLoading && <p className="text-center">Loading participants...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {participants.length > 0 && (
        <ul className="list-none p-0">
          {participants.map((participant, index) => (
            <li key={index} className="mb-4">
              <StudentBar name={participant.name} initalScore={participant.initialCount} id={participant.userId} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

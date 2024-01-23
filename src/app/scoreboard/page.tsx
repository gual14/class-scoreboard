'use client'
import Link from "next/link"
import StudentBar from "./StudentBar"
const participants = ["Rani", "Gal", "Guy", "Yonatan", "Yoni", "Tom", "Avishai", "Netanel", "David", "Ilay", "Eitan"]
export default function Page() {
    return(
        <div className="flex justify-center items-center min-h-screen-1">
            <ul className="list-none p-0">
                {participants.map((student, index) => (
                    <li key={index} className="mb-4">
                    <StudentBar name={student} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
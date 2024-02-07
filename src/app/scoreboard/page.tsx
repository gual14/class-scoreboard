'use client'
import StudentBar from "./StudentBar"
const participants = ["Rani", "Liav","Gal", "Guy", "Yonathan", "Yoni", "Tom", "Avishai", "Netanel", "David", "Ilay", "Eitan"]
export default function Page() {
    return(
        <div className="flex justify-center items-center min-h-screen">
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

import { useEffect, useRef, useState } from "react";
interface StudentBarProps{
    name: string;
    id: number;
    initalScore: number;
}

export default function StudentBar({name, id, initalScore}: StudentBarProps) {
    const [count, setCount] = useState(initalScore)
    const [inputValue, setInputValue] = useState("0");
    const isMounted = useRef(false)

    useEffect(() => {
        // Update the input value when the count changes
        if(isMounted.current)
        {
            console.log(JSON.stringify({userId: id, newScore:  count}))
            setInputValue(count.toString());
            fetch('/api/users/', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId: id, newScore:  count}),
        })
            .then((res)=>{
                if(res.ok)
                {
                    return res.json()
                }
                else{
                    throw new Error("Api Update fail")
                }
            })}
            else{
                isMounted.current = true
            }
        
    }, [count, id]);
    function increment() {
        setCount(count + 1)
    }
    function decrement() {
        setCount(count - 1)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the input value but don't update the count immediately
        setInputValue(event.target.value);
    };
    
    const handleInputBlur = () => {
        // When the input loses focus, update the count based on the input value
        const newScore = parseInt(inputValue, 10) || 0;
        setCount(newScore);
    };
    return(
        <div className="flex items-center m-2">
            <span className="w-24 flex-shrink-0 text-2xl">{ name }</span>
            <button className="btn ml-2 text-xl" onClick={increment}>+</button>
            <input type="number" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} className="mx-2 w-16 p-1 text-center border rounded"/>
            <button className="btn mr-2 text-xl" onClick={decrement}>-</button>
        </div>
    )
}
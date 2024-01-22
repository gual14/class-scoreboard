import { useEffect, useState } from "react";
interface StudentBarProps{
    name: string;
}

export default function StudentBar({name}: StudentBarProps) {
    const [count, setCount] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false);
    const [inputValue, setInputValue] = useState("0");

    useEffect(() => {
        // Update the input value when the count changes
        setInputValue(count.toString());
    }, [count]);
    function animateNumberChange() {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500); // Adjust the duration as needed
    }
    function increment() {
        setCount(count + 1)
        animateNumberChange()
    }
    function decrement() {
        setCount(count - 1)
        animateNumberChange()
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
            <span className="w-16 flex-shrink-0">{ name }</span>
            <button className="btn ml-2" onClick={increment}>+</button>
            <input type="number" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} className="mx-2 w-16 p-1 text-center border rounded"/>
            <button className="btn mr-2" onClick={decrement}>-</button>
        </div>
    )
}
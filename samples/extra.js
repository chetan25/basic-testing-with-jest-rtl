import "./styles.css";
import { useState } from "react";

// scenario 2
//  <div style={{ color }}>

export default function App() {
    let [color, setColor] = useState("red");
    return (
        <div>
            <input value={color} onChange={(e) => setColor(e.target.value)} />
            <p>Hello, world!</p>
            <ExpensiveTree />
        </div>
    );
}

function ExpensiveTree() {
    let now = performance.now();
    while (performance.now() - now < 100) {
        // Artificial delay -- do nothing for 100ms
    }
    return (
        <Child>
            <Child></Child>
            <Child>
                <Child></Child>
                <Child>
                    <Child></Child>
                </Child>
            </Child>
        </Child>
    );
}

// function ColorPicker({ children }) {
//     let [color, setColor] = useState("red");
//     return (
//         <div style={{ color }}>
//             <input value={color} onChange={(e) => setColor(e.target.value)} />
//             {children}
//         </div>
//     );
// }

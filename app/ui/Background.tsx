"use client"
import { useCanvas } from "../helpers";

export default function Background() {
    const canvasRef = useCanvas(({ context, width, height }) => {
        context.fillStyle = 'red';
        context.fillRect(0, 0, width, height);
    });

    return <canvas className="fixed z-[-1]" ref={canvasRef}></canvas>
}
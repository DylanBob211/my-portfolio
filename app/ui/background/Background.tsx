"use client"
import { useCanvas } from "../../helpers/canvas";
import { Tree } from "./treeAnimation";

export default function Background() {
    const canvasRef = useCanvas(({ context, width, height }) => Tree.drawScene(context, width, height), { renderAfter: 50, stutter: 50 });

    return <canvas className="fixed z-[-1]" ref={canvasRef}></canvas>
}
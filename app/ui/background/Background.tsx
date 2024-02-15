"use client"
import { useCanvas } from "../../helpers/canvas";
import { Tree } from "./treeAnimation";

export default function Background() {
    const canvasRef = useCanvas(({ context, width, height, frameCount }) => Tree.drawScene(context, {
        width, height, frameCount, treeParams: {
            levels: 3,
            height: (height: number) => height / 3,
            width: 5,
            branchesAngleVariation: 40,
            sectionedBranching: true,
            branchSections: 3,
            grassEffect: true,
            color: { r: 20, g: 20, b: 20, a: .5 },
            mainBranchAngleVariation: 5,
        }, sceneParams: {
            treesAmount: (width: number) => Math.floor(width / (100 * window.devicePixelRatio)),
            clearColor: { r: 200, g: 200, b: 200, a: .03 },
            randomTreeDistributionFactor: 50,
            depth: 10,
            treeDrawingFrameRate: 100,
            treeDrawingFrameRateStutter: 50,
        }
    }));

    return <canvas className="fixed z-[-1]" ref={canvasRef}></canvas>
}
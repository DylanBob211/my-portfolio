import { useRef, useEffect } from "react";

export function useCanvas(draw: (props: { context: CanvasRenderingContext2D, width: number, height: number, frameCount: number }) => void) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        const resizeFn = (_?: UIEvent) => {
            if (canvasRef.current && context) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight;
            }
        }
        window.addEventListener('resize', resizeFn)
        resizeFn()
        return () => {
            window.removeEventListener('resize', resizeFn)
        }
    }, [draw])

    useEffect(() => {

        const context = canvasRef.current?.getContext('2d')!;
        let frameCount = 0
        let animationFrameId: number;

        const render = () => {
            frameCount++
            draw({ context, width: context.canvas.width, height: context.canvas.height, frameCount })
            animationFrameId = window.requestAnimationFrame(render)
        }

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])




    return canvasRef;
}
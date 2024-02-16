import { useRef, useEffect } from "react";
import * as random from '../random';
import { useLiveRef } from "../hooks";

export type CanvasDrawFn = (props: {
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    frameCount: number
}) => void

export type CanvasSettings = {
    refreshRate: number,
    refreshRateStutter: number
}

export function useCanvas(draw: CanvasDrawFn, options?: CanvasSettings) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawRef = useLiveRef(draw);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        const resizeFn = (_?: UIEvent) => {
            if (canvasRef.current && context) {
                const scale = window.devicePixelRatio;
                canvasRef.current.style.width = `$${window.innerWidth}px`
                canvasRef.current.style.height = `$${window.innerHeight}px`
                canvasRef.current.width = Math.floor(window.innerWidth * scale);
                canvasRef.current.height = Math.floor(window.innerHeight * scale);
            }
        }
        window.addEventListener('resize', resizeFn)
        resizeFn()
        return () => {
            window.removeEventListener('resize', resizeFn)
        }
    }, [])

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d')!;
        let frameCount = 0
        let currentFrameTimestamp = 0;
        let animationId: number | null = null;
        const render = (timestamp: number) => {
            if (!options?.refreshRate || timestamp - currentFrameTimestamp > random.randomValueBetweenVariation(options.refreshRate, options.refreshRateStutter)) {
                frameCount++
                drawRef.current({ context, width: context.canvas.width, height: context.canvas.height, frameCount });
                currentFrameTimestamp = timestamp;
            }
            animationId = requestAnimationFrame(render);
        }

        animationId = requestAnimationFrame(render)

        return () => {
            if (animationId)
                cancelAnimationFrame(animationId)
        }
    }, [drawRef, options])




    return canvasRef;
}
import { useRef, useEffect } from "react";
import * as random from '../random';

export type CanvasDrawFn =  (props: { 
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
    }, [draw])

    useEffect(() => {

        const context = canvasRef.current?.getContext('2d')!;
        let frameCount = 0
        let animationFrameId: number;
        let currentFrameTimestamp = 0; 
        const render = (timestamp: number) => {
            if (!options?.refreshRate || timestamp - currentFrameTimestamp > random.randomValueBetweenVariation(options.refreshRate, options.refreshRateStutter)) {
                frameCount++
                draw({ context, width: context.canvas.width, height: context.canvas.height, frameCount });
                currentFrameTimestamp = timestamp;
            }
            animationFrameId = requestAnimationFrame(render);
        }

        requestAnimationFrame(render)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, options])




    return canvasRef;
}
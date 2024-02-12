import { useRef, useEffect } from "react";
import * as random from '../random';

export function useCanvas(draw: (props: { context: CanvasRenderingContext2D, width: number, height: number, frameCount: number }) => void, options?: {
    renderAfter: number,
    stutter: number
}) {
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
            if (!options || timestamp - currentFrameTimestamp > (options.renderAfter + random.rangeFloor(-options.renderAfter * options.stutter / 100, options.renderAfter * options.stutter / 100))) {
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
    }, [])




    return canvasRef;
}
import { useRef } from "react";

export function useLiveRef<T>(value: T) {
    const ref = useRef<T>(value);
    ref.current = value;
    return ref;
}

export function useChange<T>(value: T, equalityFn: (a: T, b: T) => boolean = Object.is): [T, T | null] {
    const previous = useRef<T | null>(null);
    const current = useRef<T>(value);
    if (!equalityFn(current.current, value)) {
        previous.current = JSON.parse(JSON.stringify(current.current));
        current.current = value;
    }
    return [current.current, previous.current]
}
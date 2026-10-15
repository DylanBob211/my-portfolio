import { useLayoutEffect, useRef } from "react";

export function useLiveRef<T>(value: T) {
    const ref = useRef<T>(value);
    useLayoutEffect(() => {
        ref.current = value;
    });
    return ref;
}

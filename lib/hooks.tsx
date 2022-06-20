
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function useMedia<T>(queries: string[], values: T[] | readonly T[], defaultValue: T) {
    const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList[]>()
    const [value, setValue] = useState(getValue);

    // Function that gets value based on matching media query
    function getValue() {
        // Get index of first media query that matches        
        if (mediaQueryList) { //because window is undefined server-side
            const index = mediaQueryList.findIndex((mql: any) => mql.matches);
            return typeof values[index] !== 'undefined' ? values[index] : defaultValue
        }
        return defaultValue
    };

    useEffect(() => {
        // Array containing a media query list for each query
        const list = queries.map((q: any) => window.matchMedia(q));
        setMediaQueryList(list)
    }, [])

    useEffect(() => {
        /**
         * Event listener callback
         * Note: By defining getValue outside of useEffect we ensure that it has ...
         * the current values of hook args (as this hook only runs on mount/dismount).
         */
        if (!!mediaQueryList) {
            setValue(getValue) //important
            const handler = () => setValue(getValue);
            // Set a listener for each media query with above handler as callback.
            mediaQueryList.forEach((mql: any) => mql.addListener(handler));
            // Remove listeners on cleanup
            return () => mediaQueryList.forEach((mql: any) => mql.removeListener(handler));
        }
        //eslint-disable-next-line
    }, [mediaQueryList])

    return value;
}

export function useScreenSize() {
    const sizes = ["xl", "lg", "md", "sm", "xs"] as const

    return useMedia<ArrayMember<typeof sizes>>(
        // Media queries
        ['(min-width: 1280px)', '(min-width: 1024px)', '(min-width: 768px)', '(min-width: 640px)', '(min-width: 360px)'],
        // Column counts (relates to above media queries by array index)
        sizes,
        // Default column count
        "xs"
    )
}

export function useRefSize(ref: React.MutableRefObject<Element>) {
    const [size, setSize] = useState<{ [name: string]: undefined | number }>({ width: undefined, height: undefined })

    useEffect(() => {
        const compStyles = window.getComputedStyle(ref.current);
        const width = Number(compStyles.getPropertyValue('width').replace(/[^\d.-]/g, ''))
        const height = Number(compStyles.getPropertyValue('height').replace(/[^\d.-]/g, ''))
        setSize({ width, height })
        //eslint-disable-next-line
    }, [ref]);

    return size
}

export function useTimeout(callback: Function, delay: number) {
    // React hook for delaying calls with time
    // returns callback to use for cancelling
    const timeoutIdRef = useRef<NodeJS.Timeout | number>();
    const cancel = useCallback(() => {
        const timeoutId = timeoutIdRef.current;
        if (timeoutId) {
            timeoutIdRef.current = undefined;
            clearTimeout(timeoutId as number);
        }
    }, [timeoutIdRef])

    useEffect(() => {
        timeoutIdRef.current = setTimeout(callback, delay);
        return cancel;
    }, [callback, delay, cancel]);

    return cancel;
}

export function useClipboard() {
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState<string>()

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = (text: string) => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(text)
            .then(() => {
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 3000);
            })
            .catch((err) => {
                console.log(err)
                setError(err.message)
            })
    }

    return { handleCopyClick, copied, error }
}
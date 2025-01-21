export const isBrowser = typeof window !== "undefined";

//* mobile
const myBrowser = typeof window !== "undefined";
export const isMobile = myBrowser && window.innerWidth < 700;
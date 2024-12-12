export function postponeChanges(timerId, fn) {
    if (timerId) clearTimeout(timerId);
    return setTimeout(() =>{fn();clearTimeout(timerId);}, 1000)
}
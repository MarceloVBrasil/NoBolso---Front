function generateRandomValueWith2Decimals(seed: number, range: number) {
    const value = (seed + Math.random() * range).toFixed(1) + '5'
    return value
}

export { generateRandomValueWith2Decimals }
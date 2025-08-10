export const getPhonemeBySymbol = (phonemes) => {
    return phonemes.reduce((acc, phoneme) => {
        acc.set(phoneme.symbol, phoneme)
        return acc
    }, new Map())
}

export const getChartRows = (chartLayout, numberOfRow, numberOfCol) => {
    const rows = []
    const symbols = chartLayout.split(" ")
    for (let i = 0; i < symbols.length; i += numberOfCol) {
        const cols = new Array(numberOfCol)
        for (let j = 0; j < numberOfCol; j++) {
            cols[j] = symbols[i + j]
        }
        rows.push(cols)
    }
    return rows
}

export const getChartColors = (chartColor) => {
    const list = []
    for (const [key, value] of Object.entries(chartColor)) {
        switch (typeof value) {
            case "string":
                list.push([key, value])
                break
            case "object":
                for (const subItem of getChartColors(value)) {
                    list.push(subItem)
                }
                break
        }
    }
    return list
}

export const getPhonemeBgColorBySymbol = (phonemes, chartColor) => {
    const map = new Map()
    for (const phoneme of phonemes) {
        let color = chartColor
        const types = phoneme.type.split(":")
        for (let i = 0; i < types.length; i++) {
            color = color[types[i]]
        }
        map.set(phoneme.symbol, color)
    }
    return map
}

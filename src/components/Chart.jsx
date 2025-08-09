import { useMemo } from "react"

import Phoneme from "./Phoneme"

import { classNames } from "../utils/dom"
import {
    PHONEME_GROUP,
    VOWEL_GROUP,
    ROW_SPAN,
    COL_SPAN,
    CHART_COLOR,
} from "../utils/constants"
import {
    getPhonemeBySymbol,
    getChartRows,
    getChartColors,
    getPhonemeBgColorBySymbol,
} from "../utils/ui"

export default function Chart({ layout, phonemes, selectedPhoneme, onSelectPhoneme }) {
    const phonemeBySymbol = useMemo(
        () => getPhonemeBySymbol(phonemes),
        [phonemes],
    )

    const chartRows = useMemo(
        () => getChartRows(layout, ROW_SPAN * 2, COL_SPAN * 2),
        [layout],
    )

    const chartColors = useMemo(() => getChartColors(CHART_COLOR), [])

    const phonemeBgColorBySymbol = useMemo(
        () => getPhonemeBgColorBySymbol(phonemes, CHART_COLOR),
        [phonemes],
    )

    return (
        <table className="w-auto table-auto border-collapse border border-gray-400">
            <caption className="caption-bottom pt-2">
                <div className="flex w-full justify-between gap-1 sm:justify-center sm:gap-2">
                    {chartColors.map((chartColor, index) => {
                        const [key, value] = chartColor
                        return (
                            <div
                                key={index}
                                className={classNames(
                                    value,
                                    "w-16 cursor-pointer border border-gray-400 text-center sm:w-20 sm:px-2",
                                )}
                            >
                                <p className="text-xs font-light sm:text-sm">
                                    {key}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </caption>
            <tbody>
                <tr>
                    <th className="border border-gray-400"></th>
                    {VOWEL_GROUP.map((group, index) => (
                        <th
                            key={index}
                            className="h-6 border border-gray-400"
                            colSpan={COL_SPAN}
                        >
                            <p className="h-full px-2 text-sm font-light">{group}</p>
                        </th>
                    ))}
                </tr>
                {chartRows.map((cols, rowIndex) => (
                    <tr key={rowIndex}>
                        {rowIndex % ROW_SPAN === 0 && (
                            <th
                                rowSpan={ROW_SPAN}
                                className="w-6 rotate-180 border border-gray-400"
                            >
                                <p
                                    className="w-full px-2 text-sm font-light"
                                    style={{ writingMode: "vertical-rl" }}
                                >
                                    {PHONEME_GROUP[rowIndex / ROW_SPAN]}
                                </p>
                            </th>
                        )}
                        {cols.map((symbol, colIndex) => (
                            <td
                                key={colIndex}
                                className={classNames(
                                    phonemeBgColorBySymbol.get(symbol),
                                    "size-12 border border-gray-400 duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg sm:size-18 md:size-20 lg:size-22",
                                )}
                            >
                                {phonemeBySymbol.get(symbol) && (
                                    <Phoneme
                                        phoneme={phonemeBySymbol.get(symbol)}
                                        isSelected={selectedPhoneme.symbol === symbol}
                                        onClick={() => {
                                            onSelectPhoneme(phonemeBySymbol.get(symbol))
                                        }}
                                    />
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

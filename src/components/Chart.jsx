import { useMemo, useCallback } from "react"

import Phoneme from "./Phoneme"

import { classNames } from "../utils/dom"
import { CHART_COLOR } from "../utils/constants"

export default function Chart({ ipa, selectedPhoneme, onClickPhoneme }) {
  const phonemeGroup = ["vowels", "consonants"]
  const vowelGroup = ["monophthongs", "diphthongs"]
  const rowSpan = 3
  const colSpan = 4
  const { layout, phonemes } = ipa

  const getChartColor = useCallback((root = CHART_COLOR) => {
    const list = []
    for (const [key, value] of Object.entries(root)) {
      if (typeof value === "string") {
        list.push({ [key]: value })
      } else if (typeof value === "object") {
        const subList = getChartColor(value)
        for (const subItem of subList) {
          list.push(subItem)
        }
      }
    }
    return list
  }, [])

  const chartColors = useMemo(() => getChartColor(), [getChartColor])

  const getPhonemeBackgroundColor = (symbol) => {
    const phoneme = phonemeMap[symbol]
    if (!phoneme) {
      return
    }

    const types = phoneme.type.split(":")
    let color = CHART_COLOR
    for (let i = 0; i < types.length; i++) {
      const chartColor = color[types[i]]
      if (chartColor) {
        color = chartColor
      }
    }

    return typeof color === "string" && color
  }

  const rows = useMemo(() => {
    const rows = []
    const symbols = layout.split(" ")
    for (let i = 0; i < symbols.length; i += colSpan * 2) {
      const cols = []
      for (let j = 0; j < colSpan * 2; j++) {
        cols.push(symbols[i + j])
      }
      rows.push(cols)
    }
    return rows
  }, [layout, colSpan])

  const phonemeMap = useMemo(
    () =>
      phonemes.reduce((acc, phoneme) => {
        acc[phoneme.symbol] = phoneme
        return acc
      }, {}),
    [phonemes],
  )

  return (
    <table className="w-auto table-auto border-collapse border border-gray-400">
      <caption className="caption-bottom pt-2">
        <div className="flex w-full justify-between gap-1 sm:justify-center sm:gap-2">
          {chartColors.map((color, index) => {
            const [key, value] = Object.entries(color)[0]
            return (
              <div
                className={classNames(
                  value,
                  "w-16 cursor-pointer border border-gray-400 text-center sm:w-20 sm:px-2",
                )}
              >
                <p key={index} className="text-xs font-light sm:text-sm">
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
          {vowelGroup.map((group, index) => (
            <th
              key={index}
              className="h-6 border border-gray-400"
              colSpan={colSpan}
            >
              <p className="h-full px-2 text-sm font-light">{group}</p>
            </th>
          ))}
        </tr>
        {rows.map((cols, rowIndex) => (
          <tr key={rowIndex}>
            {rowIndex % rowSpan === 0 && (
              <th
                rowSpan={rowSpan}
                className="w-6 rotate-180 border border-gray-400"
              >
                <p
                  className="w-full px-2 text-sm font-light"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {phonemeGroup[rowIndex / rowSpan]}
                </p>
              </th>
            )}
            {cols.map((symbol, colIndex) => (
              <td
                key={colIndex}
                className={classNames(
                  getPhonemeBackgroundColor(symbol),
                  "size-12 border border-gray-400 duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg sm:size-18 md:size-20 lg:size-22",
                )}
              >
                {phonemeMap[symbol] && (
                  <Phoneme
                    phoneme={phonemeMap[symbol]}
                    isSelected={selectedPhoneme.symbol === symbol}
                    onClick={() => {
                      onClickPhoneme(phonemeMap[symbol])
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

import { useMemo, useCallback } from "react"

import Cell from "./Cell"

import { classNames } from "../utils/dom"
import { CHART_COLOR } from "../utils/constants"

export default function Chart({ ipa, onClickPhoneme }) {
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
    <div className="flex flex-col items-center justify-center gap-2">
      <table className="w-screen table-auto border-collapse border border-gray-400 md:w-auto">
        <caption className="caption-bottom pt-2">
          <div className="flex w-full justify-around md:justify-center md:gap-2">
            {chartColors.map((color, index) => {
              const [key, value] = Object.entries(color)[0]
              return (
                <div
                  key={index}
                  className={classNames(
                    value,
                    "w-18 cursor-pointer border border-gray-400 text-center text-xs font-light duration-200 ease-in hover:shadow-lg md:w-20 md:text-sm",
                  )}
                >
                  {key}
                </div>
              )
            })}
          </div>
        </caption>
        <tbody>
          <tr>
            <th className="border border-gray-400 text-sm font-light"></th>
            {vowelGroup.map((group, index) => (
              <th
                key={index}
                className="h-6 border border-gray-400 px-2 text-sm font-light"
                colSpan={colSpan}
              >
                <span>{group}</span>
              </th>
            ))}
          </tr>
          {rows.map((cols, rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex % rowSpan === 0 && (
                <th
                  rowSpan={rowSpan}
                  className="w-6 rotate-180 border border-gray-400 py-2 text-sm font-light"
                >
                  <span style={{ writingMode: "vertical-rl" }}>
                    {phonemeGroup[rowIndex / rowSpan]}
                  </span>
                </th>
              )}
              {cols.map((symbol, colIndex) => (
                <td
                  key={colIndex}
                  className={classNames(
                    getPhonemeBackgroundColor(symbol),
                    "h-22 w-12 border border-gray-400 duration-200 ease-in hover:shadow-lg md:w-22 md:hover:bg-gray-100",
                  )}
                >
                  {phonemeMap[symbol] && (
                    <Cell
                      phoneme={phonemeMap[symbol]}
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
    </div>
  )
}

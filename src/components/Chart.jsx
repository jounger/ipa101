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
    if (!phoneme) return "bg-gray-100"
    const types = phoneme.type.split(":")
    let color = CHART_COLOR
    for (let i = 0; i < types.length; i++) {
      const chartColor = color[types[i]]
      if (chartColor) {
        color = chartColor
      }
    }

    return (typeof color === "string" && color) || CHART_COLOR["default"]
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
      <table className="table-fixed border-collapse border border-gray-300">
        <tbody>
          <tr>
            <th className="border border-gray-300 text-sm font-light"></th>
            {vowelGroup.map((group, index) => (
              <th
                key={index}
                className="h-5 w-80 border border-gray-300 px-2 text-sm font-light"
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
                  className="h-60 w-5 rotate-180 border border-gray-300 py-2 text-sm font-light"
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
                    "size-20 border border-gray-300 p-2 hover:shadow-lg",
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
      <div className="flex justify-center gap-2">
        {chartColors.map((color, index) => {
          const [key, value] = Object.entries(color)[0]
          if (key === "default") {
            return null
          }

          return (
            <span
              key={index}
              className={classNames(
                value,
                "w-20 cursor-pointer border border-gray-300 text-center text-sm font-light hover:shadow-lg",
              )}
            >
              {key}
            </span>
          )
        })}
      </div>
    </div>
  )
}

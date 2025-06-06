import { useMemo } from "react"

import { classNames } from "../utils/dom"
import { getRandomInt } from "../utils/number"

export default function Cell({ phoneme, isSelected, onClick }) {
  const example = useMemo(() => {
    const randomExampleIndex = getRandomInt(0, phoneme.examples.length - 1)
    return phoneme.examples[randomExampleIndex]
  }, [phoneme.examples])

  return (
    <div
      className={classNames(
        { "inset-ring inset-ring-purple-800 sm:inset-ring-2": isSelected },
        "h-full w-full cursor-pointer text-center md:p-2",
      )}
      onClick={onClick}
    >
      <p
        className={classNames(
          { "text-purple-800": isSelected },
          "text-2xl font-normal sm:text-4xl",
        )}
      >
        {phoneme.symbol}
      </p>
      <p
        className="cursor-help p-px text-xs font-light hover:underline md:text-sm"
        title={example.transcription}
      >
        {example.text}
      </p>
    </div>
  )
}

import { useMemo } from "react"

import { getRandomInt } from "../utils/number"

export default function Cell({ phoneme, onClick }) {
  const example = useMemo(() => {
    const randomExampleIndex = getRandomInt(0, phoneme.examples.length - 1)
    return phoneme.examples[randomExampleIndex]
  }, [phoneme.examples])

  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center"
      onClick={onClick}
    >
      <p className="text-4xl font-normal hover:animate-pulse">
        {phoneme.symbol}
      </p>
      <p
        className="cursor-help text-sm font-light hover:underline"
        title={example.transcription}
      >
        {example.text}
      </p>
    </div>
  )
}

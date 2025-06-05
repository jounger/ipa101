import { useMemo } from "react"

import { getRandomInt } from "../utils/number"

export default function Cell({ phoneme, onClick }) {
  const example = useMemo(() => {
    const randomExampleIndex = getRandomInt(0, phoneme.examples.length - 1)
    return phoneme.examples[randomExampleIndex]
  }, [phoneme.examples])

  return (
    <div className="cursor-pointer text-center md:p-2" onClick={onClick}>
      <p className="text-2xl font-normal sm:text-3xl md:text-4xl">
        {phoneme.symbol}
      </p>
      <p
        className="cursor-help text-xs font-light hover:underline md:text-sm"
        title={example.transcription}
      >
        {example.text}
      </p>
    </div>
  )
}

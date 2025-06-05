import { useState } from "react"

import Chart from "../components/Chart"
import Detail from "../components/Detail"

export default function Content({ ipa }) {
  const [selectedPhoneme, setSelectedPhoneme] = useState(
    ipa && ipa.phonemes.length > 0 ? ipa.phonemes[0] : null,
  )

  const handleSelectedPhoneme = (phoneme) => {
    if (phoneme.symbol === selectedPhoneme?.symbol) {
      console.warn("The phoneme has already been selected")
      return
    }

    setSelectedPhoneme(phoneme)
  }

  if (!ipa) {
    return (
      <main className="flex h-full items-center justify-center">
        <p className="text-lg font-light">Loading...</p>
      </main>
    )
  }

  return (
    <main className="flex flex-wrap items-start justify-center gap-2 px-2 pb-10">
      <Chart
        ipa={ipa}
        phoneme={selectedPhoneme}
        onClickPhoneme={handleSelectedPhoneme}
      />
      {selectedPhoneme && <Detail phoneme={selectedPhoneme} />}
    </main>
  )
}

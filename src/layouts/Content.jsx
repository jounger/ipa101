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

  return (
    <main className="flex flex-col items-start justify-center gap-2 p-1 md:flex-row md:p-4">
      {ipa && <Chart ipa={ipa} onClickPhoneme={handleSelectedPhoneme} />}
      {selectedPhoneme && <Detail phoneme={selectedPhoneme} />}
    </main>
  )
}

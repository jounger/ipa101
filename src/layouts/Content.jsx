import { useState } from "react"

import Chart from "../components/Chart"
import Detail from "../components/Detail"

export default function Content({ layout, phonemes }) {
    const [selectedPhoneme, setSelectedPhoneme] = useState(phonemes[0])

    const onSelectPhoneme = (phoneme) => {
        if (phoneme.symbol !== selectedPhoneme.symbol) {
            setSelectedPhoneme(phoneme)
        }
    }

    return (
        <main className="flex flex-wrap items-start justify-center gap-2 px-2 pb-10">
            <Chart
                layout={layout}
                phonemes={phonemes}
                selectedPhoneme={selectedPhoneme}
                onSelectPhoneme={onSelectPhoneme}
            />
            <Detail phoneme={selectedPhoneme} />
        </main>
    )
}

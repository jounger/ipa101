import { useRef } from "react"

import { CAMBRIDGE_DICTIONARY } from "../utils/constants"

export default function Audio({ audios }) {
    if (!audios || audios.length === 0) {
        return <p className="text-sm font-light">No audios</p>
    }

    const audioRefs = useRef([])

    const onSelectAudio = (index) => {
        const audio = audioRefs.current[index]
        if (audio) {
            audio.play()
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {audios.map((audio, index) => (
                <div key={audio.source}>
                    <audio
                        ref={(el) => (audioRefs.current[index] = el)}
                        preload="none"
                        controlsList="nodownload"
                    >
                        Your browser does not support the audio element
                        <source
                            src={`${CAMBRIDGE_DICTIONARY}${audio.source}`}
                            type="audio/mpeg"
                        />
                    </audio>
                    <button
                        className="h-8 w-14 cursor-pointer border border-gray-300 p-1 duration-200 ease-in hover:border-gray-400 hover:bg-gray-100 hover:shadow-lg"
                        onClick={() => onSelectAudio(index)}
                    >
                        <p className="text-sm font-normal">{audio.accent} 🔊</p>
                    </button>
                </div>
            ))}
        </div>
    )
}

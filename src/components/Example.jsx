import { CAMBRIDGE_DICTIONARY } from "../utils/constants"

export default function Example({ examples }) {
    return examples.map((example, index) => (
        <p key={index} className="text-sm font-light">
            <a
                className="cursor-help hover:underline"
                title={example.transcription}
                href={`${CAMBRIDGE_DICTIONARY}/dictionary/english/${example.text}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {example.text}
            </a>
            {index < examples.length - 1 && ","}&nbsp;
        </p>
    ))
}

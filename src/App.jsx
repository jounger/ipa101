import Content from "./layouts/Content"

import ipa from "./data/ipa.json"

function App() {
    const { layout, phonemes } = ipa

    return (
        <div className="h-screen">
            <header className="flex items-center justify-center p-2 sm:p-2">
                <h1 className="text-xl font-bold sm:text-2xl">
                    International Phonetic Alphabet
                </h1>
            </header>

            <Content layout={layout} phonemes={phonemes} />

            <footer className="fixed bottom-0 w-full p-2 sm:p-2">
                <div className="text-center text-xs font-light sm:text-sm">
                    <a
                        href="https://coff.ee/ipa101"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        <span>Made with ❤️</span>
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default App

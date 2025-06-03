import { useState } from "react"

import Content from "./layouts/Content"

import ipaData from "./data/ipa.json"

function App() {
  const [ipa, _] = useState(ipaData)

  return (
    <>
      <header className="flex items-center justify-center p-2">
        <h1 className="text-xl font-bold md:text-2xl">
          International Phonetic Alphabet
        </h1>
      </header>
      <Content ipa={ipa} />
    </>
  )
}

export default App

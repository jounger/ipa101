import { useState } from "react"

import Content from "./layouts/Content"

import ipaData from "./data/ipa.json"

function App() {
  const [ipa, _] = useState(ipaData)

  return (
    <>
      <Content ipa={ipa} />
    </>
  )
}

export default App

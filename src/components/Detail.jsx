import { useRef, useState, useMemo } from "react"

import { classNames } from "../utils/dom"
import { CAMBRIDGE_DICTIONARY } from "../utils/constants"

export default function Detail({ phoneme }) {
  const [selectedVideo, setSelectedVideo] = useState(
    phoneme.videos && phoneme.videos.length > 0 ? phoneme.videos[0] : null,
  )

  const handleVideoClick = (video) => {
    if (selectedVideo && selectedVideo.source === video.source) {
      console.warn("The video has already been selected")
      return
    }
    setSelectedVideo(video)
  }

  return (
    <table className="table-auto border-collapse border border-gray-300">
      <tbody>
        <tr>
          <th
            colSpan={100}
            className="h-5 w-100 border border-gray-300 px-2 text-sm font-light"
          >
            phoneme: {`/${phoneme.symbol}/`}
          </th>
        </tr>
        <tr>
          <th
            className="h-20 w-5 rotate-180 border border-gray-300 px-2 text-sm font-light"
            style={{ writingMode: "vertical-rl" }}
          >
            accent
          </th>
          <td className="size-20 border border-gray-300 p-2">
            <Audio audios={phoneme.audios} />
          </td>
          <th
            className="h-20 w-5 rotate-180 border border-gray-300 px-2 text-sm font-light"
            style={{ writingMode: "vertical-rl" }}
          >
            example
          </th>
          <td className="border border-gray-300 p-2">
            <div className="flex text-sm font-light">
              {phoneme.examples.map((example, index) => (
                <span key={index}>
                  <a
                    className="cursor-help hover:underline"
                    title={example.transcription}
                    href={`${CAMBRIDGE_DICTIONARY}/dictionary/english/${example.text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {example.text}
                  </a>
                  {index < phoneme.examples.length - 1 && ","}&nbsp;
                </span>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <th
            className="h-60 w-5 rotate-180 border border-gray-300 px-2 text-sm font-light"
            style={{ writingMode: "vertical-rl" }}
          >
            guideline
          </th>
          <td colSpan={100} className="border border-gray-300 p-2">
            <Video
              videos={phoneme.videos}
              selectedVideo={selectedVideo}
              onClick={handleVideoClick}
            />
          </td>
        </tr>
        <tr>
          <th
            className="h-20 w-5 rotate-180 border border-gray-300 px-2 text-sm font-light"
            style={{ writingMode: "vertical-rl" }}
          >
            game
          </th>
          <td colSpan={100} className="border border-gray-300 p-2">
            <span className="text-sm font-light">Incoming</span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function Audio({ audios }) {
  const audioRefs = useRef([])
  if (!audios || audios.length === 0) {
    return <span className="text-sm font-light">No audios</span>
  }

  const handleAudioClick = (index) => {
    const audio = audioRefs.current[index]
    if (audio) audio.play()
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
            className="flex cursor-pointer items-center gap-1 border border-gray-100 px-1 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg"
            onClick={() => handleAudioClick(index)}
          >
            <span className="text-sm font-normal hover:underline">
              {audio.accent}
            </span>
            🔊
          </button>
        </div>
      ))}
    </div>
  )
}

function Video({ selectedVideo, videos, onClick }) {
  const currentVideo = useMemo(() => {
    if (!videos || videos.length === 0) {
      return null
    }

    if (!selectedVideo || !selectedVideo.source) {
      return videos[0]
    }

    const isFound = videos.find(
      (video) => video.source === selectedVideo.source,
    )
    if (isFound) {
      return isFound
    }

    return videos[0]
  }, [selectedVideo, videos])

  if (!videos || videos.length === 0) {
    return <span className="text-sm font-light">No videos</span>
  }

  return (
    <>
      {currentVideo && (
        <iframe
          width="360"
          height="200"
          src={currentVideo.source}
          title="YouTube video player"
          allow="accelerometer;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
      <div className="mt-2 flex gap-2">
        {videos.map((video) => (
          <button
            key={video.source}
            className={classNames(
              currentVideo.source === video.source
                ? "cursor-not-allowed border-gray-300 bg-gray-50"
                : "cursor-pointer border-gray-100",
              "flex items-center justify-between gap-1 border px-1 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg",
            )}
            onClick={() => onClick(video)}
          >
            <span className="text-sm font-normal hover:underline">
              {video.accent}
            </span>
            📽️
          </button>
        ))}
      </div>
    </>
  )
}

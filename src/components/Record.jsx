import { useRef, useState } from "react"

import { classNames } from "../utils/dom"

export default function Record() {
  const audioRef = useRef(null)
  const streamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [recording, setRecording] = useState(false)

  const handleRecordClick = async (e) => {
    e.preventDefault()
    if (recording) {
      mediaRecorderRef.current.stop()
      return
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    const audioChunks = []
    let recordingTimeout = null

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.onstart = () => {
      audioChunks.length = 0
      recordingTimeout = setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop()
        }
      }, 5000)
      audioRef.current.muted = true
      setRecording(true)
    }

    mediaRecorder.onstop = () => {
      clearTimeout(recordingTimeout)
      audioRef.current.muted = false
      setRecording(false)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop()
        })
        streamRef.current = null
      }
      if (audioChunks.length === 0) {
        setAudioUrl(null)
        return
      }
      if (audioChunks.length === 0) {
        console.warn("No audio data recorded")
        return
      }

      const audioBlob = new Blob(audioChunks, {
        type: mediaRecorder.mimeType,
      })
      audioChunks.length = 0
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
    }

    mediaRecorder.start()
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return (
      <p className="text-sm font-light">
        Your browser does not support audio recording
      </p>
    )
  }

  return (
    <div className="flex gap-2">
      <button
        className={classNames(
          "flex h-18 w-10 cursor-pointer flex-col items-center gap-1 border border-gray-300 p-1 duration-200 ease-in hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg",
          recording && "border-gray-400 bg-gray-100",
        )}
        onClick={handleRecordClick}
      >
        {recording ? (
          <>
            <p className="text-sm font-normal">Stop</p>
            <span>
              <svg
                className="size-6 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          </>
        ) : (
          <>
            <p className="text-sm font-normal hover:underline">Start</p>
            <span>🎙️</span>
          </>
        )}
      </button>
      <div className="align flex w-full items-center border border-gray-300 bg-gray-100">
        <audio
          ref={audioRef}
          src={audioUrl || undefined}
          controls
          preload="none"
          className="w-full"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}

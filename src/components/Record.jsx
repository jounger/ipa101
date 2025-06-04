import { useCallback, useEffect, useRef, useState } from "react"
import { classNames } from "../utils/dom"

export default function Record() {
  const audioRef = useRef(null)
  const recordButtonRef = useRef(null)
  const [recording, setRecording] = useState(false)

  const onSuccess = useCallback(
    (stream) => {
      const mediaRecorder = new MediaRecorder(stream)
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
        setRecording(false)
        audioRef.current.muted = false
        if (audioChunks.length === 0) {
          console.warn("No audio data recorded")
          return
        }

        const audioBlob = new Blob(audioChunks, {
          type: mediaRecorder.mimeType,
        })
        audioChunks.length = 0
        const audioUrl = URL.createObjectURL(audioBlob)
        audioRef.current.src = audioUrl
        audioRef.current.load()
      }

      recordButtonRef.current.addEventListener("click", (e) => {
        e.preventDefault()
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop()
        } else {
          audioRef.current.pause()
          mediaRecorder.start()
        }
      })
    },
    [audioRef, recordButtonRef],
  )

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia not supported on your browser!")
      return
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(onSuccess)
      .catch((error) => {
        console.error("Error accessing microphone:", error)
      })
  }, [onSuccess])

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return (
      <span className="text-sm font-light">
        Your browser does not support audio recording
      </span>
    )
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        ref={recordButtonRef}
        className={classNames(
          "flex h-8 cursor-pointer items-center justify-between gap-1 gap-2 border border-gray-300 px-1 duration-200 ease-in hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg",
          recording && "border-gray-400 bg-gray-100",
        )}
      >
        {recording ? (
          <>
            <span className="text-sm font-normal">Stop recording</span>
            <svg
              className="size-4 animate-spin"
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
          </>
        ) : (
          <span className="text-sm font-normal hover:underline">
            Record yourself 🎙️
          </span>
        )}
      </button>
      <audio
        ref={audioRef}
        controls
        preload="none"
        className="w-full border border-gray-300 bg-gray-100"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

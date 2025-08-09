import { useMemo, useState } from "react"

import { classNames } from "../utils/dom"

export default function Video({ videos }) {
    if (!videos || videos.length === 0) {
        return <p className="text-sm font-light">No videos</p>
    }

    const padding = 4 * (6 + 8)
    const minWidth = Math.max(320, window.innerWidth - padding)
    const maxWidth = Math.min(400, window.innerWidth - padding)
    const width = Math.min(minWidth, maxWidth)
    const height = Math.floor(width * (9 / 16))

    const [selectedVideo, setSelectedVideo] = useState(videos[0])

    const onSelectVideo = (video) => {
        if (selectedVideo.source !== video.source) {
            setSelectedVideo(video)
        }
    }

    const currentVideo = useMemo(() => {
        const isFound = videos.find(
            (video) => video.source === selectedVideo.source,
        )
        if (isFound) {
            return isFound
        }

        return videos[0]
    }, [selectedVideo, videos])


    return (
        <div className="flex flex-col gap-2">
            <iframe
                width={width}
                height={height}
                src={currentVideo.source}
                title="YouTube video player"
                allow="accelerometer;"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <div className="flex gap-2">
                {videos.map((video) => (
                    <button
                        key={video.source}
                        className={classNames(
                            currentVideo.source === video.source
                                ? "cursor-not-allowed border-gray-400 bg-gray-100"
                                : "cursor-pointer border-gray-100",
                            "h-8 w-14 border p-1 duration-200 ease-in hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg",
                        )}
                        onClick={() => onSelectVideo(video)}
                    >
                        <p className="text-sm font-normal">{video.accent} 📽️</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

import Audio from "./Audio"
import Record from "./Record"
import Video from "./Video"
import Example from "./Example"

export default function Detail({ phoneme }) {
    return (
        <table className="w-auto table-auto border-collapse border border-gray-400">
            <tbody>
                <tr>
                    <th colSpan={100} className="h-6 border border-gray-400">
                        <p className="h-full px-2 text-sm font-light">
                            phoneme: {`/${phoneme.symbol}/`}
                        </p>
                    </th>
                </tr>
                <tr>
                    <th className="w-6 rotate-180 border border-gray-400">
                        <p
                            className="w-full px-2 text-sm font-light"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            accent
                        </p>
                    </th>
                    <td className="h-18 w-14 border border-gray-400 p-2 sm:w-18 md:h-20 lg:h-22">
                        <Audio audios={phoneme.audios} />
                    </td>
                    <th className="h-18 w-6 rotate-180 border border-gray-400">
                        <p
                            className="w-full px-2 text-sm font-light"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            practice
                        </p>
                    </th>
                    <td className="h-18 border border-gray-400 p-2 md:h-20 lg:h-22">
                        <Record />
                    </td>
                </tr>
                <tr>
                    <th className="w-6 rotate-180 border border-gray-400">
                        <p
                            className="w-full px-2 text-sm font-light"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            guideline
                        </p>
                    </th>
                    <td colSpan={100} className="border border-gray-400 p-2">
                        <Video
                            videos={phoneme.videos}
                        />
                    </td>
                </tr>
                <tr>
                    <th className="w-6 rotate-180 border border-gray-400">
                        <p
                            className="w-full px-2 text-sm font-light"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            example
                        </p>
                    </th>
                    <td colSpan={100} className="border border-gray-400 p-2">
                        <div className="flex">
                            <Example examples={phoneme.examples} />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

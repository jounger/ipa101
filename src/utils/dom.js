export const classNames = (...classes) => {
    let result = ""
    for (const cls of classes) {
        switch (typeof cls) {
            case "string":
                result += cls
                break
            case "object":
                if (Array.isArray(cls)) {
                    result += classNames(...cls)
                } else {
                    for (const key in cls) {
                        if (cls[key]) {
                            result += key
                        }
                    }
                }
                break
            default:
                continue
        }
        result += " "
    }

    return result.trim()
}

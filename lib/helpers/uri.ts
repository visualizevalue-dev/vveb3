export const URI_REGEX = /^(http|https|ipfs|ipns):\/\/(.*)$/

export const isValidURI = (uri: string) => URI_REGEX.test(uri)

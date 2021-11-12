export default class Bubble {
  appName: string
  apiKey: string
  isTestMode: boolean = false

  constructor(appName: string, apiKey: string, isTestMode: boolean = false) {
    this.appName = appName
    this.apiKey = apiKey
    this.isTestMode = isTestMode
  }

  getDataEndpoint(typename: string): string {
    if (this.isTestMode) {
      return `https://${this.appName}.bubbleapps.io/version-test/api/1.1/obj/${typename}`
    } else {
      return `https://${this.appName}.bubbleapps.io/api/1.1/obj/${typename}`
    }
  }
}

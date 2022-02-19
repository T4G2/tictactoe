import { App } from './src/app.js'
function main() {
    console.log("Starting PiskvorkyJobsBot v0.0.0")
    window.app = new App()
    window.app.run()
}



window.onload = () => {
    main()
}
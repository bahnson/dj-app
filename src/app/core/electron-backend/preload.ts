
let app = require('electron').remote.app
let fs = require('fs')

const appDataPath = app.getPath('appData') + '/dj-app'

if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath)
}

//////////////////////////////////////////////////////////////////////
// general app state 
//////////////////////////////////////////////////////////////////////

let appState = null
const appStateFile = appDataPath + '/app-state.json'

if (fs.existsSync(appStateFile)) {
    appState = JSON.parse(fs.readFileSync(appStateFile).toString())
}

Object.defineProperty(window, 'appState', { value: appState, writable: false })
Object.defineProperty(window, 'persistAppState', { 

    value: (newAppState) => {
        
        if (!newAppState) return
        fs.writeFileSync(appStateFile, JSON.stringify(newAppState)
    )}, 
    writable: false 
})

//////////////////////////////////////////////////////////////////////
// tracks
//////////////////////////////////////////////////////////////////////

let trackData = null
const trackDataFile = appDataPath + '/tracks.json'

if (fs.existsSync(trackDataFile)) {
    trackData = JSON.parse(fs.readFileSync(trackDataFile).toString())
}

Object.defineProperty(window, 'tracks', { value: trackData, writable: false })
Object.defineProperty(window, 'persistTracks', { 
    
    value: (newTrackData) => {
        
        if (!newTrackData) return
        fs.writeFileSync(trackDataFile, JSON.stringify(newTrackData)
    )},
    writable: false 
})

//////////////////////////////////////////////////////////////////////
// transitions
//////////////////////////////////////////////////////////////////////

let transitionData = null
const transitionDataFile = appDataPath + '/transitions.json'

if (fs.existsSync(transitionDataFile)) {
    transitionData = JSON.parse(fs.readFileSync(transitionDataFile).toString())
}

Object.defineProperty(window, 'transitions', { value: transitionData, writable: false })
Object.defineProperty(window, 'persistTransitions', { 
    
    value: (newTransitionData) => {
        
        if (!newTransitionData) return
        fs.writeFileSync(transitionDataFile, JSON.stringify(newTransitionData)
    )},
    writable: false 
})

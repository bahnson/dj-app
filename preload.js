"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('electron').remote.app;
console.log(app.getAppPath());
var trackInfoFile = 'C:\\Users\\bahns\\Desktop\\Dev\\dj-app\\src\\assets\\tracks_and_transitions.json';
var content = require('fs').readFileSync(trackInfoFile).toString();
var trackInfo = JSON.parse(content);
// TODO: add type for DB/track repository
Object.defineProperty(window, 'trackInfo', {
    writable: false,
    value: {
        transitions: trackInfo.transitions,
        tracks: trackInfo.tracks
    }
});
//# sourceMappingURL=preload.js.map
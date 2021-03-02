import { Injectable } from '@angular/core'
import {Track} from './data-model/track'

@Injectable({ providedIn: 'root'})
export class TracksService {

  tracks: Track[] = []
  
  constructor() { 
    
    if (!window["tracks"]) {

      this.persistTracks()
      return
    }

    window["tracks"].forEach(item => {
      
      this.tracks.push(new Track(item.artist, item.title))
    });
  }

  importTracks(tracksToAdd: Track[]) {
    
    tracksToAdd.forEach( (t:Track) => {
      
    })

    Array.prototype.push.apply(this.tracks, tracksToAdd)
    this.persistTracks()
  }

  persistTracks() {
    
    if (!window["persistTracks"]) {
    
      throw new Error("no backend function for persisting tracks")
    }

    window["persistTracks"](this.tracks)
  }

  getTrackById(id: string) : Track {

    for (const t of this.tracks) {
      console.log(id + ' == ' + t.id)
      if (t.id === id) return t
    }

    return null
  }
}

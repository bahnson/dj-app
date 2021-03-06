import { Component, OnInit } from '@angular/core'
import { Stars, Track, TrimRange } from '../core/data-model/track'
import { TracksService } from '../core/tracks.service'

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent {
  
  filterString: string = ""
  draggedOver: boolean = false

  constructor(private _trackService : TracksService) { }

  get tracks() : Track[] {

    if (this.filterString) {

      return this._trackService.tracks.filter((t: Track) =>{
        
        return t.id.match(this.filterString)
      }) 
    }

    return this._trackService.tracks    
  }

  onDrop(event: DragEvent) {
    
    event.preventDefault()

    this.draggedOver = false

    let files: FileList = event.dataTransfer.files
    let addedTracks : Track[] = []

    for (let i = 0; i < files.length; i++) {
      
      let matchGroups = /(.+)\s*-\s*(.+)\..+/.exec(files.item(i).name)
      
      if (matchGroups) {

        addedTracks.push( new Track(matchGroups[1].trim(), matchGroups[2].trim(), 0, 0, []))
        continue
      }

      matchGroups = /(.+)\..+/.exec(files.item(i).name)

      if (matchGroups) {

        addedTracks.push( new Track(Track.UNKNOWN_ARTIST, matchGroups[1].trim(), 0, 0, []))
        continue
      }
    }

    let addedTracksSorted = addedTracks.sort((t1: Track, t2: Track) : number => {
      return t1.id < t2.id ? -1: 1
    })

    this._trackService.importTracks(addedTracks.sort())
  }

  onDragOver(event: DragEvent) {

    this.draggedOver = true
    
    event.stopPropagation()
    event.preventDefault()
  }

  setStars(track: Track, stars: Stars) {

    if (stars === 1 && track.stars === 1) {

      track.stars = 0

    } else {

      track.stars = stars
    }

    this._trackService.persistTracks()
  }

  setTrim(track: Track, trim: TrimRange) {

    track.trim = trim
    this._trackService.persistTracks()
  }
}

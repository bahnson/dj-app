import { Component, OnInit } from '@angular/core'
import { Track } from '../core/data-model/track'
import { TracksService } from '../core/tracks.service'
import { TransitionsService } from '../core/transitions.service'


@Component({
  selector: 'playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.sass']
})

export class PlayingComponent implements OnInit {

  trackBacklog : Track[]
  currentTrack : Track
  nextCandidate : Track
  knownMatches : Track[]

  constructor(private _trackService : TracksService, private _transitionsService : TransitionsService) { 
    
    this.trackBacklog = []
    this.currentTrack = null
    this.knownMatches = null
  }

  ngOnInit() {}

  get tracks() : Track[] {

    return this._trackService.tracks    
  }

  get matchingTracks() : Track[] {

    return this.knownMatches 
  }
  // TODO
  /*
  get currentTransition() {
    this.trackService
  }
  */

  selectNextCandidate(t: Track) {

    if (!this.currentTrack) {
    
      this.currentTrack = t
      this.knownMatches = this._transitionsService.findNextTrackIdsFor(t).map( id=> this._trackService.getTrackById(id))
    
    } else {

      this.nextCandidate = t
    }
  }
  
  selectCandidateAsNext() {

    if (!this.nextCandidate) {
      
      return
    }

    if (this.currentTrack === this.nextCandidate || this.trackBacklog.includes(this.nextCandidate)) {
      
      console.log("track already played!") //TODO: show to user
      return
    }

    if (this.trackBacklog.includes(this.currentTrack)) {
      
      this.trackBacklog.unshift(this.currentTrack)
    }
    
    this.trackBacklog.unshift(this.currentTrack)

    this.currentTrack = this.nextCandidate
    this.knownMatches = this._transitionsService.findNextTrackIdsFor(this.currentTrack).map( id=> this._trackService.getTrackById(id))
    this.nextCandidate = null
  }

  onDrop(event: DragEvent) {
    
    event.preventDefault()

    let f: File = event.dataTransfer.files.item(0)
    console.log("dropped" + f.name)
  }

  onDragOver(event: DragEvent) {
    
    event.stopPropagation()
    event.preventDefault()
  }
}

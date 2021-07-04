import { Component, OnInit } from '@angular/core'
import { Track } from '../core/data-model/track'
import { Transition } from '../core/data-model/transition'
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
  nextTrack : Track
  transition: Transition
  knownMatches : Track[]

  constructor(private _trackService : TracksService, private _transitionsService : TransitionsService) { 
    
    this.trackBacklog = []
    this.currentTrack = null
    this.nextTrack = null
    this.knownMatches = null
  }

  ngOnInit() {}

  get tracks() : Track[] {

    return this._trackService.tracks    
  }

  get matchingTracks() : Track[] {

    return this.knownMatches 
  }

  selectCurrentTrack(t: Track) {
    
    this.currentTrack = t
    this.knownMatches = this._transitionsService.findNextTrackIdsFor(t).map( id=> this._trackService.getTrackById(id))
  }
  
  selectNextTrack(t: Track) {

    if (!t) {
      
      return
    }

    if (this.currentTrack === t || this.trackBacklog.includes(t)) {
      
      console.log("track already played!") //TODO: show to user
      return
    }

    this.nextTrack = t
    this.transition = this._transitionsService.getTransitionFor(this.currentTrack, this.nextTrack)
    /*
    if (this.trackBacklog.includes(this.currentTrack)) {
      
      this.trackBacklog.unshift(this.currentTrack)
    }
    
    this.trackBacklog.unshift(this.currentTrack)

    this.currentTrack = this.nextCandidate
    this.knownMatches = this._transitionsService.findNextTrackIdsFor(this.currentTrack).map( id=> this._trackService.getTrackById(id))
    this.nextCandidate = null
    */
  }

  continueSet() {
    
    this.trackBacklog.unshift(this.currentTrack)
    this.currentTrack = this.nextTrack
    this.nextTrack = null
  }

  changeLastTrackEnabled() { return this.trackBacklog.length === 0}
}

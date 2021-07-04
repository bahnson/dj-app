import {Component, OnInit} from '@angular/core'
import { AppStateService } from '../core/app-state.service'
import { Track } from '../core/data-model/track'
import { Transition } from '../core/data-model/transition'
import { TracksService } from '../core/tracks.service'
import { TransitionsService } from '../core/transitions.service'

@Component({
  selector: 'transitions',
  templateUrl: './transitions.component.html',
  styleUrls: ['./transitions.component.sass']
})

export class TransitionsComponent {
  
  fromTrack: Track
  toTrack: Track
  transition: Transition

  constructor(  private _trackService: TracksService, 
                private _transitionsService: TransitionsService,
                private _appStateService: AppStateService) {

    let fromTrackId = this._appStateService.state.transitionsTab.fromTrackId
    let toTrackId = this._appStateService.state.transitionsTab.toTrackId
                  
    if (fromTrackId && toTrackId) {
      
      this.fromTrack = this._trackService.getTrackById(fromTrackId)
      this.toTrack = this._trackService.getTrackById(toTrackId)
      this.transition = this._transitionsService.getTransitionFor(this.fromTrack, this.toTrack)
    }
  }

  get tracks() { return this._trackService.tracks}

  selectFromTrack(t: Track) {

    this.fromTrack = t
    
    this._appStateService.state.transitionsTab.fromTrackId = t.id
    this._appStateService.persistState()

    if (this.toTrack) {
      
      this.transition = this._transitionsService.getTransitionFor(this.fromTrack, this.toTrack)
    }
  }
  
  clearFromTrack() {
    
    this.fromTrack = null
    this.transition = null
  }
  
  selectToTrack(t: Track) {
    
    this.toTrack = t

    this._appStateService.state.transitionsTab.toTrackId = t.id
    this._appStateService.persistState()

    if (this.toTrack) {

      this.transition = this._transitionsService.getTransitionFor(this.fromTrack, this.toTrack)
    }
  }

  updateTransition() {

    this._transitionsService.updateTransition(this.transition)
    this._transitionsService.persistTransitions()
  }
  
  clearToTrack() {
    
    this.toTrack = null
    this.transition = null
  }
}

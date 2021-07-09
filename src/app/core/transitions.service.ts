import { Injectable } from '@angular/core'
import {Transition} from './data-model/transition'
import {Track} from './data-model/track'

@Injectable({ providedIn: 'root'})
export class TransitionsService {

  transitions: Transition[] = window["transitions"] 
  
  constructor() { 
    
    if (!this.transitions) {

      this.transitions = []

      this.persistTransitions()
    }
  }

  updateTransition(t: Transition) {
    
    for (let i = 0; i < this.transitions.length; i++) {
      
      if (t.fromId === this.transitions[i].fromId && t.toId === this.transitions[i].toId) {
        this.transitions.splice(i,1)
      }
    }    

    this.transitions.push(t)
  }

  getTransitionFor(from: Track, to: Track): Transition {

    // TODO consider multiple transitions ...
    for (const t of this.transitions) {
      
      if (t.fromId === from.id && t.toId === to.id) {
        return t
      }
    }

    return new Transition(from.id, to.id)
    
  }
  
  findNextTrackIdsFor(currentTrack: Track) : string[] {
    
    let next : string[] = []

    this.transitions.forEach((t: Transition) => {
      
      if (t.fromId === currentTrack.id) {

        next.push(t.toId)
      }
    })

    return next
  }

  persistTransitions() {

    if (!window["persistTransitions"]) {
    
      throw new Error("no backend function for persisting transitions")
    }

    window["persistTransitions"](this.transitions)
  }
}

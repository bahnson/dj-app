import { Injectable } from '@angular/core'
import { AppState } from './data-model/app-state'

@Injectable({providedIn: 'root'})
export class AppStateService {

  // see electron-backend/preload.ts
  state: AppState = window["appState"] 

  constructor() {

    if (!this.state) {

      this.state = {

        selectedTab: 0,
        transitionsTab: {
            fromTrackId: "",
            toTrackId: ""
        }
      }

      this.persistState()
    }
  }

  persistState() {
    
    if (!window["persistAppState"]) {
    
      throw new Error("no backend function for persisting app state")
    }

    window["persistAppState"](this.state)
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import {AppStateService} from '../app/core/app-state.service'

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  // I opted for no view encapsulation with proper scoping
  // see https://material.angular.io/guide/customizing-component-styles#styling-other-components 
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  selectedIndex: Number = 0
  
  constructor(private _appStateService: AppStateService) {
    
    this.selectedIndex = this._appStateService.state.selectedTab
  }

  onTabChanged(index: Number) {

    this.selectedIndex = index
    this._appStateService.state.selectedTab = this.selectedIndex
    this._appStateService.persistState()
  }
}

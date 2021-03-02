import { NgModule } from '@angular/core'
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Material
import { RippleGlobalOptions, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from "@angular/material/divider"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatRadioModule } from "@angular/material/radio"
import { MatSelectModule } from "@angular/material/select"
import { MatSliderModule } from '@angular/material/slider'
import { MatTabsModule } from "@angular/material/tabs"
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card'
import {MatExpansionModule} from '@angular/material/expansion'

// Own
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { LibraryComponent } from './library/library.component'
import { PlayingComponent } from './playing/playing.component'
import { SettingsComponent } from './settings/settings.component'
import { TransitionsComponent } from './transitions/transitions.component';
import { TrackSearchComponent } from './common/track-search/track-search.component';
import { TransitionDetailsComponent } from './common/transition-details/transition-details.component'

const globalRippleConfig: RippleGlobalOptions = {
  animation: {
    enterDuration: 400,
    exitDuration: 200,
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    PlayingComponent,
    SettingsComponent,
    TransitionsComponent,
    TrackSearchComponent,
    TransitionDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule, 
    MatInputModule,
    MatAutocompleteModule, 
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}

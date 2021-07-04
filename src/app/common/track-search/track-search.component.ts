import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core'
import {FormControl} from '@angular/forms'
import {from, Observable} from 'rxjs'
import {map, startWith} from 'rxjs/operators'
import { Track } from '../../core/data-model/track'
import { TracksService } from '../../core/tracks.service'


@Component({
  selector: 'track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.sass']
})

export class TrackSearchComponent implements OnInit, OnChanges {
  
  @Input() label: string
  @Input() tracks: Track[]
  @Input() selectedTrack: Track
  @Input() enabled: boolean = true 
  @Input() confirmationEnabled: boolean = false

  @Output() onTrackSelected = new EventEmitter<Track>()
  @Output() onTrackCleared = new EventEmitter()
  @Output() onTrackConfirmed = new EventEmitter()
  
  filteredTracks: Observable<Track[]>
  formControl: FormControl = new FormControl()

  // TODO explain map functions and _filterTracks (too implicit)
  ngOnInit() {

    this.filteredTracks = this.formControl.valueChanges.pipe(
      
      startWith(''),
      map(value => typeof value === 'string' ? value : this.inputTextForTrack(value)),
      map(value => this._filterTracks(value))
    )

    if (this.selectedTrack) this.selectTrack(this.selectedTrack)
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (!changes.enabled) {
      return
    }

    if (changes.enabled.currentValue === true) {
    
      this.formControl.enable()
    
    } else {

      this.formControl.disable() 
    }
  }
  
  inputTextForTrack(track: Track) : string {
    
    return track  ? track.id
                  : ''
  }
  
  selectTrack(track: Track) {

    this.onTrackSelected.emit(track)
  }

  confirmTrack() {

    this.onTrackConfirmed.emit()
  }

  clearTrack() {

    this.onTrackCleared.emit()
  }

  private _filterTracks(value: string): Track[] {

    const filterValue = value.toLowerCase();

    return this.tracks.filter(
      
      (track) => {
        
        if (track.toString() === value) {
          
          return true
        }
        
        return  track.title.toLowerCase().includes(filterValue)
                || track.artist.toLowerCase().includes(filterValue)
      }  
    )
  }
}

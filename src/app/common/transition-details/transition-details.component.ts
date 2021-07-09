import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transition, TransitionInstruction } from '../../core/data-model/transition';

type InstructionSide = "To" | "From"

@Component({
  selector: 'transition-details',
  templateUrl: './transition-details.component.html',
  styleUrls: ['./transition-details.component.sass']
})

export class TransitionDetailsComponent {

  @Input() transition: Transition
  @Input() editable: boolean = true
  @Output() onChange = new EventEmitter<Transition>()
  modifiableInstructions: Set<TransitionInstruction> = new Set<TransitionInstruction>()
  
  constructor() { }
  
  get instructions(): TransitionInstruction[] {

    if (!this.transition) return []

    return this.transition.instructions
  } 

  onMouseOver(i: TransitionInstruction) {
    
    if (this.editable === false) {
      return
    }

    this.modifiableInstructions.add(i)
  }

  onMouseLeave(i: TransitionInstruction) {
    
    this.modifiableInstructions.delete(i)
  }

  isEditable(i: TransitionInstruction) {

    return this.modifiableInstructions.has(i)
  }

  isTimeFieldDisplayed(i: TransitionInstruction, side: InstructionSide) : boolean {
    
    if (this.isEditable(i)) {
      
      return true
    }
     else {
    
      return      (side === "From" && i.timeFrom.length !== 0)
              ||  (side === "To" && i.timeTo.length !== 0)  
              ||  (i.timeFrom.length === 0 && i.timeTo.length === 0) 
    }
  }

  isTextFieldDisplayed(i: TransitionInstruction, side: InstructionSide) : boolean {
    
    if (this.isEditable(i)) {
    
      return true
    
    } else {
    
      return      (side === "From" && i.textFrom.length !== 0)
              ||  (side === "To" && i.textTo.length !== 0)  
              ||  (side === "From" && i.timeFrom.length !== 0 && i.textTo.length !== 0)
              ||  (side === "To" && i.timeTo.length !== 0 && i.textFrom.length !== 0)
              ||  (i.textFrom.length === 0 && i.textTo.length === 0) 
    }
  }

  addNewInstruction() {

    this.instructions.push({
      timeFrom: "",
      textFrom: "",
      timeTo: "",
      textTo: ""
    })
  }

  moveInstruction(index: number, upOrDown: string) {

    let extracted = this.transition.instructions.splice(index, 1)
    let insertIndex = upOrDown === 'up' ? index - 1 : index + 1
    this.transition.instructions.splice(insertIndex, 0, extracted[0])
    this.onDetailsChanged()
  }

  removeInstruction(i: TransitionInstruction) {

    this.transition.instructions = this.transition.instructions.filter(item => item !== i)
    this.onDetailsChanged()
  }

  onDetailsChanged() {

    this.onChange.emit(this.transition)
  }
}

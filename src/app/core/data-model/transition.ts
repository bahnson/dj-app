import {TrackId} from './track'


export class Transition {
    
    fromId: TrackId
    toId: TrackId
    comments: String
    instructions: TransitionInstruction[]
    
    constructor(fromId: string, toId: string) {

        this.fromId = fromId
        this.toId = toId
        this.comments = ""
        this.instructions = []
    }
}

// type InstructionSide = "From" | "To"
export interface TransitionInstruction {
    timeFrom: string,
    textFrom: string,
    timeTo: string,
    textTo: string
}

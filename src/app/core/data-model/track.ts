
export class Track {
    
    static UNKNOWN_ARTIST: string = 'Unknown Artist'

    title: string = ''
    artist: string = Track.UNKNOWN_ARTIST
    trim: TrimRange = 0

    // meta
    stars: Stars = 0
    tags: string[] = []
    genres: string[] = []

    constructor (artist: string, title: string) {

        this.artist = artist
        this.title = title
    }

    get id() : string {
        return this.artist + ' - ' + this.title
    }
}

export type TrackId = string

// Trim wheel position from -5 to 5 in 0.25 steps
type TrimRange =    -5 | -4.75 | -4.5 | -4.25 |
                    -4 | -3.75 | -3.5 | -3.25 | 
                    -3 | -2.75 | -2.5 | -2.25 |
                    -2 | -2.75 | -2.5 | -2.25 |
                    -1 | -1.75 | -1.5 | -1.25 |
                     0 |  0.25 |  0.5 |  0.75 |
                     1 |  1.25 |  1.5 |  1.75 |
                     2 |  2.25 |  2.5 |  2.75 |
                     3 |  3.25 |  3.5 |  3.75 |
                     4 |  4.25 |  4.5 |  4.75 |
                     5

type Stars = 0 | 1 | 2 | 3 | 4 | 5


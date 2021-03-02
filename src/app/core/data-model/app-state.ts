export interface AppState {
    selectedTab: Number,
    transitionsTab: {
        fromTrackId: string,
        toTrackId: string
    }
}
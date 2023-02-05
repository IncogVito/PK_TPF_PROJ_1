export interface GameFormModel {
  name: string,
  type: 'single' | 'multiple',
  singleGameTime: number
}

export interface GameSearchModel {
  gameId?: string,
  joiningCode?: string
}

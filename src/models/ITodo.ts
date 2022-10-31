export type TStatus = 'done' | 'in process' | 'not active'
export type TColors = '#e0e3c3' | '#7CFC00' | '#FA8072' | '#B22222' | '#00FF7F' | '#008B8B' | '#FFEFD5' | '#FF00FF'
export const ColorsArr: TColors[] = ['#e0e3c3', '#FA8072', '#7CFC00', '#B22222', '#00FF7F', '#008B8B', '#FFEFD5', '#FF00FF']

export interface ITodo {
    id: string
    title: string
    status: TStatus
    description: string
    color: TColors
    date: string
}

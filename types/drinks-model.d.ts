declare interface IEvent {
  attendance: number
  finishAt: Date
  id : string
  menuBeverages: IMenuBeverage[]
  name: string
  startAt: Date
  url: string
}

declare interface IMenuBeverage {
  beverage: IBeverage
  consumptions: IConsumption[]
  event: IEvent
  id: string
}

declare interface IBeverage {
  alcohol: number
  id: string
  image: string
  name: string
  unit: string
  volume: number
}

declare interface IConsumption {
  consumedAt: Date
  id: string
  menuBeverage: IMenuBeverage
}

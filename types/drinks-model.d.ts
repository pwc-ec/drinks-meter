declare interface IEvent {
  attendance: Number
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
  alcohol: Number
  id: string
  image: string
  name: string
  unit: string
  volume: Number
}

declare interface IConsumption {
  cßonsumedAt: Date
  id: string
  menuBeverage: IMenuBeverage
}

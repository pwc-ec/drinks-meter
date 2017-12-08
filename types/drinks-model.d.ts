declare interface IEvent {
  finishAt: Date
  id :string
  menuBeverages: IMenuBeverage[]
  startAt: Date
}

declare interface IMenuBeverage {
  beverage: IBeverage
  consupmtions: IConsumption[]
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

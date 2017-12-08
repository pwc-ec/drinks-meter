import '../img/beverages/pilsnerbeer.png'
import '../img/beverages/whitewine.png'

export const getBeverageImage = (name: string): string => `/img/beverages/${name.toLowerCase().replace(/ /g, '')}.png`

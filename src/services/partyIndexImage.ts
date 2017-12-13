import '../img/events/flavio-christmas-party/1.jpg'
import '../img/events/flavio-christmas-party/2.jpg'
import '../img/events/flavio-christmas-party/3.jpg'
import '../img/events/flavio-christmas-party/4.jpg'
import '../img/events/flavio-christmas-party/5.jpg'

import '../img/events/ras-christmas-party/1.jpg'
import '../img/events/ras-christmas-party/2.jpg'
import '../img/events/ras-christmas-party/3.jpg'
import '../img/events/ras-christmas-party/4.jpg'
import '../img/events/ras-christmas-party/5.jpg'

export const getPartyIndexImage = (dirName: string, fileName: string): string =>
  `/img/events/${dirName}/${fileName}.jpg`

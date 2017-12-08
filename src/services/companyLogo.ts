import '../img/logos/aarealbank.svg.200px.png'
import '../img/logos/adidas.svg.200px.png'
import '../img/logos/beiersdorf.svg.200px.png'
import '../img/logos/bmw.svg.200px.png'
import '../img/logos/commerzbank.svg.200px.png'
import '../img/logos/continental.svg.200px.png'
import '../img/logos/daimler.svg.200px.png'
import '../img/logos/deutschebank.svg.200px.png'
import '../img/logos/enbw.svg.200px.png'
import '../img/logos/eon.svg.200px.png'
import '../img/logos/henkel.svg.200px.png'
import '../img/logos/siemens.svg.200px.png'
import '../img/logos/volkswagen.svg.200px.png'
import '../img/logos/vw.svg.200px.png'

/**
 * Gets company logo
 * @param {ICompany} company Company object
 * Returns string with URL pointing to a logo or image data with base64 encoding
 */
export const getLogo = (company: ICompany): string =>
  `/img/logos/${company.name.toLowerCase().replace(/ /g, '')}.svg.200px.png`

/**
 * Returns empty image
 */
export const emptyLogo = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

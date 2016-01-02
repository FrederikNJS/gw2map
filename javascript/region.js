import Zone from 'javascript/zone'
import Coordinate from 'javascript/coordinate'

export default class Region {
    constructor(regionDef) {
        this.labelCoordinate = new Coordinate(regionDef.get('label_coord'))
        this.maps = regionDef.get('maps').valueSeq().map(mapDef=>new Zone(mapDef))
        this.name = regionDef.get('name')
    }
}

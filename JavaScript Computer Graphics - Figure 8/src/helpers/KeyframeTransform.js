// Import the parent class Transform
import Transform from './Transform'

/**
 * A child of Transform that adds the ability to clone other transform
 * Objects and to interpolate between them.
 */
class KeyframeTransform extends Transform {
  /**
   * @constructor
   * @param {Transform} copyMe - A transform to copy (must always be provided)!
   */
  constructor (copyMe) {
    // Call parent's constructor
    super(copyMe._meshObj)

    // Copy the core properties from the other Transform object
    this._position.copy(copyMe._position)
    this._rotation.copy(copyMe._rotation)
    this._scale.copy(copyMe._scale)
    this._pivotPoint.copy(copyMe._pivotPoint)
  }

  /**
   * Create a new KeyframeTransformation that is the linear interpolation
   * of 'this' with Btrans using 'alpha'.
   * @this {KeyframeTransform} The 'previous' transform in the pair.
   * @param {KeyframeTransform} BTrans The 'next' transform in the pair.
   * @param {number} alpha A value between 0 and 1 used for interpolation.
   * @return {KeyframeTransform} The result of linearly interpolating
   */
  lerp (BTrans, alpha) {
    // Clone the current transform
    var interp = new KeyframeTransform(this)
    var posX = interp.position.x * (1 - alpha) + (BTrans.position.x * alpha)
    var posY = interp.position.y * (1 - alpha) + (BTrans.position.y * alpha)
    var posZ = interp.position.z * (1 - alpha) + (BTrans.position.z * alpha)

    var rotX = interp.rotation.x * (1 - alpha) + (BTrans.rotation.x * alpha)
    var rotY = interp.rotation.y * (1 - alpha) + (BTrans.rotation.y * alpha)
    var rotZ = interp.rotation.z * (1 - alpha) + (BTrans.rotation.z * alpha)

    var scaX = interp.scale.x * (1 - alpha) + (BTrans.scale.x * alpha)
    var scaY = interp.scale.y * (1 - alpha) + (BTrans.scale.y * alpha)
    var scaZ = interp.scale.z * (1 - alpha) + (BTrans.scale.z * alpha)

    var pivX = interp.pivot.x * (1 - alpha) + (BTrans.pivot.x * alpha)
    var pivY = interp.pivot.y * (1 - alpha) + (BTrans.pivot.y * alpha)
    var pivZ = interp.pivot.z * (1 - alpha) + (BTrans.pivot.z * alpha)

    interp.setPosition(posX, posY, posZ)
    interp.setRotation(rotX, rotY, rotZ)
    interp.setScale(scaX, scaY, scaZ)
    interp.setPivot(pivX, pivY, pivZ)
    // Return the interpolated result
    return interp
  }
}

export default KeyframeTransform

import { ref } from 'vue'

export function useLocation() {
  const currentLocation = ref(null)
  const locationError = ref(null)
  const isLocating = ref(false)
  const locationSupported = ref(!!navigator.geolocation)

  // Check if geolocation is supported
  const checkLocationSupport = () => {
    locationSupported.value = !!navigator.geolocation
    return locationSupported.value
  }

  // Get user's current location
  const locateUserPosition = () => {
    if (!checkLocationSupport()) {
      const error = 'Geolocation is not supported by this browser'
      locationError.value = error
      return Promise.reject(new Error(error))
    }

    isLocating.value = true
    locationError.value = null

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          currentLocation.value = position
          isLocating.value = false
          resolve(position)
        },
        (error) => {
          isLocating.value = false
          const errorMessage = getLocationErrorMessage(error.code)
          locationError.value = errorMessage
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    })
  }

  // Get human-readable location error message
  const getLocationErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 1:
        return 'Location access denied. Please enable location permissions.'
      case 2:
        return 'Location unavailable. Please try again.'
      case 3:
        return 'Location request timed out. Please try again.'
      default:
        return 'An unknown location error occurred.'
    }
  }

  // Clear location data
  const clearLocation = () => {
    currentLocation.value = null
    locationError.value = null
    isLocating.value = false
  }

  // Get location status for debugging
  const getLocationStatus = () => {
    return {
      supported: locationSupported.value,
      hasLocation: !!currentLocation.value,
      isLocating: isLocating.value,
      error: locationError.value
    }
  }

  return {
    currentLocation,
    locationError,
    isLocating,
    locationSupported,
    locateUserPosition,
    clearLocation,
    checkLocationSupport,
    getLocationStatus
  }
}

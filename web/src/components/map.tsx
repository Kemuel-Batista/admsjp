import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import { LoadingAnimationIcon } from './loading-animation-icon'
import { Skeleton } from './ui/skeleton'

interface MapProps {
  onPositionMarkerChange: (positionMarker: [number, number] | null) => void
  latitude?: number
  longitude?: number
}

export function Map({ onPositionMarkerChange, latitude, longitude }: MapProps) {
  const [position, setPosition] = useState({
    latitude: latitude || 0,
    longitude: longitude || 0,
  })
  const [positionMarker, setPositionMarker] = useState({
    latitude: latitude || 0,
    longitude: longitude || 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const mapIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
    iconSize: [30, 30],
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setIsLoading(false)
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Skeleton className="h-24 w-full bg-transparent" />
        <LoadingAnimationIcon />
      </div>
    )
  }

  function MyComponent() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng
        setPositionMarker({
          latitude: parseFloat(lat.toFixed(6)),
          longitude: parseFloat(lng.toFixed(6)),
        })
        onPositionMarkerChange([
          parseFloat(lat.toFixed(6)),
          parseFloat(lng.toFixed(6)),
        ])
      },
    })

    return (
      <Marker
        position={[positionMarker.latitude, positionMarker.longitude]}
        icon={mapIcon}
      />
    )
  }

  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full overflow-hidden relative z-0"
    >
      <MyComponent />
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VtdWVsYmF0aXN0YSIsImEiOiJja2c5cGl2Z2kwMW94MnpvZ3U4cm51ZXlsIn0.gQRlcm-shu3sZX9KFY-ZLg`}
      />
    </MapContainer>
  )
}

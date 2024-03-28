import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import { LoadingAnimationIcon } from './loading-animation-icon'
import { Skeleton } from './ui/skeleton'

interface MapProps {
  latitude: number
  longitude: number
}

const MapDisabled = ({ latitude, longitude }: MapProps) => {
  const [position] = useState({ latitude, longitude })

  const [isLoading, setIsLoading] = useState(true)

  const mapIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
    iconSize: [30, 30],
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

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

  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full overflow-hidden relative z-0"
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      dragging={false}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VtdWVsYmF0aXN0YSIsImEiOiJja2c5cGl2Z2kwMW94MnpvZ3U4cm51ZXlsIn0.gQRlcm-shu3sZX9KFY-ZLg`}
      />
      <Marker
        interactive={false}
        icon={mapIcon}
        position={[position.latitude, position.longitude]}
      />
    </MapContainer>
  )
}

export default MapDisabled

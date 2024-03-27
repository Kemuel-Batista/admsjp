import { RefreshCcw } from 'lucide-react'

export function LoadingAnimationIcon() {
  return (
    <RefreshCcw size={20} color="#1872CF">
      <animate
        attributeName="opacity"
        values="0;1;0"
        dur="4s"
        repeatCount="indefinite"
      ></animate>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="5s"
        from="0 0 0"
        to="360 0 0"
        repeatCount="indefinite"
      ></animateTransform>
    </RefreshCcw>
  )
}

export type Event = {
  id: string
  title: string
  slug: string
  description: string
  initialDate: string
  finalDate: string
  status: number
  visible: number
  departmentId: number
  eventType: number
  imagePath: string
  message: string | null
  pixKey: string
  pixType: number
  createdAt: string
  createdBy: number
  updatedAt: string | null
  updatedBy: number | null
  deletedAt: string | null
  deletedBy: number | null
}

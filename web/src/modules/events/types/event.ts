export type Event = {
  id: number
  uuid: string
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
  createdAt: string
  createdBy: number
  updatedAt: string | null
  updatedBy: number | null
  deletedAt: string | null
  deletedBy: number | null
}

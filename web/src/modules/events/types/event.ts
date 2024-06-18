export type Event = {
  id: number
  uuid: string
  title: string
  slug: string
  description: string
  initialDate: Date
  finalDate: Date
  status: number
  visible: number
  departmentId: number
  eventType: number
  imagePath: string
  message: string | null
  createdAt: Date
  createdBy: number
  updatedAt: Date | null
  updatedBy: number | null
  deletedAt: Date | null
  deletedBy: number | null
}

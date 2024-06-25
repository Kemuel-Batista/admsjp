export type Department = {
  id: number
  uuid: string
  name: string
  description: string
  status: number
  visible: number
  createdAt: Date
  createdBy: number
  updatedAt: Date | null
  updatedBy: number | null
  deletedAt: Date | null
  deletedBy: number | null
}

export type Profile = {
  id: number
  uuid: string
  name: string
  status: number
  visible: number
  createdAt: Date
  createdBy: number
  updatedAt: Date | null
  updatedBy: number | null
  deletedAt: Date | null
  deletedBy: number | null
}

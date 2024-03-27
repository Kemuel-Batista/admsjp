import { ChurchForm } from '@/components/administrators/church-form'

export function NewAdministratorChurch() {
  return (
    <div className="flex-1 flex-col space-y-8 p-8">
      <h2 className="text-2xl tracking-tight">Nova igreja</h2>

      <ChurchForm />
    </div>
  )
}

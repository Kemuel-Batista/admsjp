export function calculateAge(dateOfBirth: Date): number {
  const currentDate: Date = new Date()
  const currentYear: number = currentDate.getFullYear()
  const currentMonth: number = currentDate.getMonth() + 1
  const currentDay: number = currentDate.getDate()

  const birthYear: number = dateOfBirth.getFullYear()
  const birthMonth: number = dateOfBirth.getMonth() + 1
  const birthDay: number = dateOfBirth.getDate()

  let age: number = currentYear - birthYear

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--
  }

  return age
}

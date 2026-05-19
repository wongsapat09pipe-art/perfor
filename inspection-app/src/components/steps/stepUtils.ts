import { FormData } from '@/lib/formData'

export interface StepProps {
  data: FormData
  set: (key: keyof FormData) => (val: unknown) => void
}

export function useArrayField<T extends { id: number }>(
  items: T[],
  setItems: (items: T[]) => void,
  newItem: Omit<T, 'id'>
) {
  const maxId = () => items.length ? Math.max(...items.map(r => r.id)) + 1 : 1
  const add = () => setItems([...items, { id: maxId(), ...newItem } as T])
  const del = (id: number) => { if (items.length > 1) setItems(items.filter(r => r.id !== id)) }
  const upd = (id: number, key: string, val: string) =>
    setItems(items.map(r => r.id === id ? { ...r, [key]: val } : r))
  return { add, del, upd }
}

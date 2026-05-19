import { Field, Textarea, SectionTitle } from '@/components/UI'
import { StepProps } from './stepUtils'
export default function StepBackground({ data, set }: StepProps) {
  const s = (k: keyof typeof data) => (v: string) => set(k)(v)
  return (
    <>
      <SectionTitle>📋 บทนำ</SectionTitle>
      <Field label="1.1 ที่มาและความสำคัญ"><Textarea value={data.background} onChange={s('background')} placeholder="อาคาร [ชื่อ] มีความกังวลเกี่ยวกับความมั่นคงแข็งแรง เนื่องจาก..." /></Field>
      <Field label="1.2 วัตถุประสงค์"><Textarea value={data.objectives} onChange={s('objectives')} placeholder="1) เพื่อตรวจสอบวิเคราะห์ความมั่นคงแข็งแรงของโครงสร้างอาคาร&#10;2) ..." /></Field>
      <Field label="1.3 ขอบเขตการดำเนินงาน"><Textarea value={data.scope} onChange={s('scope')} placeholder="1.) ตรวจสอบคุณสมบัติเบื้องต้นของโครงสร้างอาคาร&#10;2.) สรุปผลการตรวจสอบ" /></Field>
    </>
  )
}

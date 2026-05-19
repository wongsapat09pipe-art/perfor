import { Field, Input, Textarea, Grid2, SectionTitle } from '@/components/UI'
import { StepProps } from './stepUtils'

export default function StepProject({ data, set }: StepProps) {
  const s = (k: keyof typeof data) => (v: string) => set(k)(v)
  return (
    <>
      <SectionTitle>🏗️ ข้อมูลโครงการ</SectionTitle>
      <Grid2>
        <Field label="ชื่ออาคาร *"><Input value={data.buildingName} onChange={s('buildingName')} placeholder="เช่น Big C The Color Chaeng Wattna" /></Field>
        <Field label="ชื่อโครงการ (หัวรายงาน)"><Input value={data.projName} onChange={s('projName')} placeholder="เช่น อาคารเดิม Big C แจ้งวัฒนะ" /></Field>
        <Field label="ที่อยู่อาคาร *" full><Input value={data.address} onChange={s('address')} placeholder="เลขที่ ถนน แขวง เขต จังหวัด รหัสไปรษณีย์" /></Field>
        <Field label="จำนวนชั้น"><Input value={data.floors} onChange={s('floors')} placeholder="เช่น 4 ชั้น + ใต้ดิน 1 ชั้น" /></Field>
        <Field label="อายุอาคาร (ปี)"><Input value={data.age} onChange={s('age')} placeholder="เช่น 25" /></Field>
        <Field label="เสนอต่อ (ลูกค้า) *"><Input value={data.client} onChange={s('client')} placeholder="ชื่อบริษัท/เจ้าของโครงการ" /></Field>
        <Field label="บริษัทผู้จัดทำ"><Input value={data.company} onChange={s('company')} /></Field>
        <Field label="วิศวกรผู้ตรวจสอบ *"><Input value={data.engineer} onChange={s('engineer')} placeholder="ชื่อ-นามสกุล" /></Field>
        <Field label="เลขทะเบียนวิศวกร"><Input value={data.engCode} onChange={s('engCode')} placeholder="เช่น วย.2638" /></Field>
        <Field label="วันที่ตรวจสอบ"><Input value={data.date} onChange={s('date')} type="date" /></Field>
      </Grid2>
    </>
  )
}

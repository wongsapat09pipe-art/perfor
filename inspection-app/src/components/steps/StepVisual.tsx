import { Field, Textarea, TableEditor, SectionTitle } from '@/components/UI'
import { StepProps, useArrayField } from './stepUtils'
const STRUCT = ['เสา','คาน','พื้น/ท้องพื้น','ผนัง','คาน+ท้องพื้น','โครงเหล็กหลังคา','อื่นๆ']
const SEV = ['น้อย/ไม่เร่งด่วน','ปานกลาง/เร่งด่วน','รุนแรง/เร่งด่วน']

export default function StepVisual({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.visualItems, v => set('visualItems')(v),
    {floor:'',struct:'เสา',sev:'ปานกลาง/เร่งด่วน',detail:'',size:''})
  return (
    <>
      <SectionTitle>👁️ 3.1 Visual Inspection — รายการความเสียหาย</SectionTitle>
      <TableEditor items={data.visualItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'floor',label:'ชั้น',width:50,placeholder:'ชั้น 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'sev',label:'ความรุนแรง',type:'select',options:SEV},
        {key:'detail',label:'รายละเอียดความเสียหาย',width:160,placeholder:'เช่น คอนกรีตแตก เหล็กสนิม'},
        {key:'size',label:'ขนาด',width:70,placeholder:'เช่น 4 ตร.ม.'},
      ]} />
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.visualSummary} onChange={v=>set('visualSummary')(v)} placeholder="พบความเสียหายทั้งหมด XX จุด..." /></Field></div>
    </>
  )
}

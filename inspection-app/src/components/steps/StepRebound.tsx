import { Field, Textarea, TableEditor, SectionTitle, Note } from '@/components/UI'
import { StepProps, useArrayField } from './stepUtils'
const STRUCT = ['เสา','คาน','พื้น/ท้องพื้น','ผนัง','คาน+ท้องพื้น','อื่นๆ']
const DIR = ['แนวนอน','แนวตั้งยิงขึ้น','แนวตั้งยิงลง']

export default function StepRebound({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.reboundItems, v => set('reboundItems')(v),
    {loc:'',struct:'เสา',dir:'แนวนอน',r1:'',r2:'',r3:'',r4:'',r5:'',r6:'',r7:'',r8:'',r9:'',r10:'',avg:'',fc:''})
  return (
    <>
      <SectionTitle>🔨 3.2 Rebound Hammer Test</SectionTitle>
      <Note>บันทึก 10 ค่าต่อจุด (R1–R10) ตามมาตรฐาน ASTM C805</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.reboundItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:90,placeholder:'เสา C1 ชั้น 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'dir',label:'ทิศทาง',type:'select',options:DIR},
        {key:'r1',label:'R1',width:36},{key:'r2',label:'R2',width:36},{key:'r3',label:'R3',width:36},
        {key:'r4',label:'R4',width:36},{key:'r5',label:'R5',width:36},{key:'r6',label:'R6',width:36},
        {key:'r7',label:'R7',width:36},{key:'r8',label:'R8',width:36},{key:'r9',label:'R9',width:36},
        {key:'r10',label:'R10',width:36},
        {key:'avg',label:'เฉลี่ย',width:44},{key:'fc',label:"fc' (ksc)",width:54},
      ]} />
      </div>
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.reboundSummary} onChange={v=>set('reboundSummary')(v)} placeholder="จากการทดสอบ XX จุด พบว่ากำลังอัดคอนกรีตอยู่ในเกณฑ์..." /></Field></div>
    </>
  )
}

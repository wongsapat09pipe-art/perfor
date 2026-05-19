import { Field, Textarea, TableEditor, SectionTitle, Note, Grid2, Input } from '@/components/UI'
import { StepProps, useArrayField } from './stepUtils'
const STRUCT = ['เสา','คาน','พื้น/ท้องพื้น','ผนัง','คาน+ท้องพื้น','โครงเหล็กหลังคา','อื่นๆ']
const UPV_Q = ['ดีเยี่ยม (Excellent) >4500','ดี (Good) 3500-4500','ปานกลาง (Medium) 3000-3500','แย่ (Doubtful) <3000']
const PH = ['ค่า pH ปกติ (เปลี่ยนเป็นสีม่วงแดง)','ค่า pH ต่ำ (ไม่เปลี่ยนสี)']
const PASS = ['ผ่าน','ไม่ผ่าน']
const HC_RES = ['ความเป็นไปได้ 90% ไม่เกิดสนิม (≥-0.200V)','ไม่แน่นอน (-0.200 ถึง -0.350V)','ความเป็นไปได้ 90% เกิดสนิม (<-0.350V)']

export function StepUPV({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.upvItems, v => set('upvItems')(v),
    {loc:'',struct:'เสา',method:'Direct',speed:'',qual:'ดี (Good) 3500-4500'})
  return (
    <>
      <SectionTitle>📡 3.3 Ultrasonic Pulse Velocity (UPV)</SectionTitle>
      <TableEditor items={data.upvItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:90,placeholder:'เสา C1 ชั้น 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'method',label:'วิธีวัด',type:'select',options:['Direct','Semi','Indirect']},
        {key:'speed',label:'ความเร็ว (m/s)',width:80,placeholder:'เช่น 3850'},
        {key:'qual',label:'คุณภาพ',type:'select',options:UPV_Q},
      ]} />
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.upvSummary} onChange={v=>set('upvSummary')(v)} placeholder="คุณภาพคอนกรีตโดยรวมอยู่ในเกณฑ์..." /></Field></div>
    </>
  )
}

export function StepCrack({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.crackItems, v => set('crackItems')(v),
    {loc:'',struct:'เสา',t1:'',t2:'',spacing:'',depth:''})
  return (
    <>
      <SectionTitle>🔍 3.4 Crack Depth — วัดความลึกรอยร้าว</SectionTitle>
      <Note>อ้างอิง BS 1881: Part 203 — d = a·√((t1²−t2²)/(t2²−t1²))</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.crackItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:100,placeholder:'คาน B1 ชั้น 2'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'t1',label:'t1 (μs)',width:55,placeholder:''},
        {key:'t2',label:'t2 (μs)',width:55,placeholder:''},
        {key:'spacing',label:'ระยะ a (mm)',width:65,placeholder:''},
        {key:'depth',label:'ความลึก (mm)',width:70,placeholder:'คำนวณ/วัด'},
      ]} />
      </div>
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.crackSummary} onChange={v=>set('crackSummary')(v)} placeholder="ความลึกรอยร้าวสูงสุดที่พบ..." /></Field></div>
    </>
  )
}

export function StepHalfCell({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.halfcellItems, v => set('halfcellItems')(v),
    {floor:'',loc:'',struct:'เสา',result:'ไม่แน่นอน',summary:''})
  return (
    <>
      <SectionTitle>⚡ 3.5 Half-Cell Potential — ค่าการสึกกร่อนเหล็กเสริม</SectionTitle>
      <Note>อ้างอิง ASTM C876-91 และ มยผ.1506-51</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.halfcellItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'floor',label:'ชั้น',width:55,placeholder:'ใต้ดิน'},
        {key:'loc',label:'ตำแหน่ง',width:65,placeholder:'จุดที่ 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'result',label:'ผลการประเมิน',type:'select',options:HC_RES},
        {key:'summary',label:'สรุปจุดนี้',width:130,placeholder:'เช่น พบ 2 บริเวณที่ไม่แน่นอน'},
      ]} />
      </div>
      <div style={{marginTop:12}}><Field label="สรุปผลภาพรวม"><Textarea value={data.halfcellSummary} onChange={v=>set('halfcellSummary')(v)} placeholder="จากการตรวจสอบ XX จุด พบว่า..." /></Field></div>
    </>
  )
}

export function StepFerro({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.ferroItems, v => set('ferroItems')(v),
    {loc:'',struct:'เสา',axis:'X',width:'',numBar:'',coverMin:'',coverMax:'',coverAvg:'',spacingMin:'',spacingMax:'',matchDesign:'√ ใช่',matchTol:'√ ใช่'})
  return (
    <>
      <SectionTitle>🔬 3.6 Ferro Scan / Cover Meter</SectionTitle>
      <Note>แยกแกน X/Y — Allowable tolerance อ้างอิง ACI 117</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.ferroItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:80,placeholder:'พื้นชั้น 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'axis',label:'แกน',type:'select',options:['X','Y']},
        {key:'width',label:'ความกว้าง (m)',width:60},
        {key:'numBar',label:'จำนวนเหล็ก (เส้น)',width:75},
        {key:'coverMin',label:'Cover min (cm)',width:65},
        {key:'coverMax',label:'Cover max (cm)',width:65},
        {key:'coverAvg',label:'Cover avg (cm)',width:65},
        {key:'matchDesign',label:'ตรงแบบ',type:'select',options:['√ ใช่','× ไม่ใช่']},
        {key:'matchTol',label:'อยู่ใน tolerance',type:'select',options:['√ ใช่','× ไม่ใช่']},
      ]} />
      </div>
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.ferroSummary} onChange={v=>set('ferroSummary')(v)} placeholder="ผลการตรวจสอบตำแหน่งเหล็กเสริม..." /></Field></div>
    </>
  )
}

export function StepCarbonation({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.carbonItems, v => set('carbonItems')(v),
    {loc:'',struct:'เสา',depth:'0-1',ph:'ค่า pH ปกติ (เปลี่ยนเป็นสีม่วงแดง)'})
  return (
    <>
      <SectionTitle>🧪 3.7 Carbonation Test — สภาพความเป็นด่างของคอนกรีต</SectionTitle>
      <Note>อ้างอิง ASTM C856 — ใช้สารละลายฟีนอล์ฟทาลีน</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.carbonItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'จุดที่/ตำแหน่ง',width:70,placeholder:'จุดที่ 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'depth',label:'ความลึก (cm)',width:65,placeholder:'0-1'},
        {key:'ph',label:'สถานะ pH',type:'select',options:PH},
      ]} />
      </div>
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.carbonSummary} onChange={v=>set('carbonSummary')(v)} placeholder="พบการเกิดคาร์บอเนชั่น X จุด จากทั้งหมด Y จุด..." /></Field></div>
    </>
  )
}

export function StepChloride({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.chlorideItems, v => set('chlorideItems')(v),
    {loc:'',struct:'เสา',depthLevel:'1/3 cover',chloridePct:'',criticalPct:'0.15',pass:'ผ่าน'})
  return (
    <>
      <SectionTitle>⚗️ 3.8 Chloride Test — ปริมาณคลอไรด์ในคอนกรีต</SectionTitle>
      <Note>อ้างอิง ASTM C1152-03 และ มยผ.1332-55</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.chlorideItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:70,placeholder:'จุดที่ 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'depthLevel',label:'ระดับความลึก',type:'select',options:['1/3 cover','2/3 cover','At cover','Below cover']},
        {key:'chloridePct',label:'คลอไรด์ที่วัดได้ (%)',width:80,placeholder:'เช่น 0.08'},
        {key:'criticalPct',label:'ค่าวิกฤต (%)',width:60,placeholder:'0.15'},
        {key:'pass',label:'ผล',type:'select',options:PASS},
      ]} />
      </div>
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.chlorideSummary} onChange={v=>set('chlorideSummary')(v)} placeholder="ผลการตรวจสอบปริมาณคลอไรด์..." /></Field></div>
    </>
  )
}

export function StepLevelling({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.levelItems, v => set('levelItems')(v),
    {loc:'',level:'',ref:'0',diff:''})
  return (
    <>
      <SectionTitle>📏 3.9 Levelling Test — วัดระดับด้วยกล้องระดับ</SectionTitle>
      <TableEditor items={data.levelItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:110,placeholder:'พื้นชั้น 2 จุดที่ 1'},
        {key:'level',label:'ค่าระดับ (mm)',width:75,placeholder:'เช่น 25'},
        {key:'ref',label:'ค่าอ้างอิง (mm)',width:75,placeholder:'0'},
        {key:'diff',label:'ส่วนต่าง (mm)',width:75,placeholder:'คำนวณ'},
      ]} />
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.levelSummary} onChange={v=>set('levelSummary')(v)} placeholder="ค่าระดับสูงสุด/ต่ำสุด ส่วนต่างสูงสุด..." /></Field></div>
    </>
  )
}

export function StepCompressive({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.compressItems, v => set('compressItems')(v),
    {loc:'',dia:'',height:'',area:'',maxLoad:'',fc:''})
  return (
    <>
      <SectionTitle>⬇️ 3.10 Compressive Strength Test — ทดสอบกำลังอัดด้วยเครื่องอัด</SectionTitle>
      <Note>อ้างอิง ASTM C42-99 — Coring ขนาด 3 นิ้ว</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.compressItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:85,placeholder:'พื้นชั้น B1'},
        {key:'dia',label:'เส้นผ่าศูนย์กลาง (cm)',width:85,placeholder:'7.62'},
        {key:'height',label:'ความสูง (cm)',width:60},
        {key:'area',label:'พื้นที่ (cm²)',width:60,placeholder:'คำนวณ'},
        {key:'maxLoad',label:'แรงอัดสูงสุด (kN)',width:80},
        {key:'fc',label:"f'c (ksc)",width:60,placeholder:'คำนวณ'},
      ]} />
      </div>
      <Grid2>
        <Field label="กำลังอัดออกแบบ fc' (ksc)"><Input value={data.compressDesignFc} onChange={v=>set('compressDesignFc')(v)} placeholder="เช่น 240" /></Field>
        <div />
      </Grid2>
      <Field label="สรุปผล"><Textarea value={data.compressSummary} onChange={v=>set('compressSummary')(v)} placeholder="ค่าเฉลี่ยกำลังอัด XX ksc (XX% ของค่าออกแบบ)..." /></Field>
    </>
  )
}

export function StepLiquid({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.liquidItems, v => set('liquidItems')(v),
    {loc:'',struct:'โครงเหล็กหลังคา',result:'ผ่าน — ไม่พบรอยไม่สมบูรณ์',detail:''})
  return (
    <>
      <SectionTitle>💧 3.11 Liquid Penetration Test — ความสมบูรณ์จุดต่อโครงสร้างหลังคา</SectionTitle>
      <TableEditor items={data.liquidItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:85,placeholder:'จุดต่อ RB-1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:['โครงเหล็กหลังคา','รอยเชื่อม','จุดต่อเหล็ก','อื่นๆ']},
        {key:'result',label:'ผล',type:'select',options:['ผ่าน — ไม่พบรอยไม่สมบูรณ์','ไม่ผ่าน — พบรอยไม่สมบูรณ์']},
        {key:'detail',label:'รายละเอียด',width:130},
      ]} />
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.liquidSummary} onChange={v=>set('liquidSummary')(v)} placeholder="ผลการตรวจสอบความสมบูรณ์จุดต่อ..." /></Field></div>
    </>
  )
}

export function StepHardness({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.hardnessItems, v => set('hardnessItems')(v),
    {loc:'',struct:'เสา',hbValue:'',tensileStrength:'',pass:'ผ่าน'})
  return (
    <>
      <SectionTitle>💎 3.12 Hardness Test — กำลังรับแรงดึงประลัยของเหล็กเสริม</SectionTitle>
      <Note>อ้างอิงสมการ Kobe&apos;s Engineering Japan — แปลงค่า HB เป็นกำลังดึงประลัย</Note>
      <div style={{marginTop:8}}>
      <TableEditor items={data.hardnessItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:90,placeholder:'เสา C1 ชั้น 1'},
        {key:'struct',label:'โครงสร้าง',type:'select',options:STRUCT},
        {key:'hbValue',label:'HB (Brinell)',width:70,placeholder:'เช่น 185'},
        {key:'tensileStrength',label:'กำลังดึง (MPa)',width:75,placeholder:'คำนวณ'},
        {key:'pass',label:'ผล',type:'select',options:PASS},
      ]} />
      </div>
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.hardnessSummary} onChange={v=>set('hardnessSummary')(v)} placeholder="เหล็กเสริมมีกำลังรับแรงดึงประลัย..." /></Field></div>
    </>
  )
}

export function StepUT({ data, set }: StepProps) {
  const { add, del, upd } = useArrayField(data.utItems, v => set('utItems')(v),
    {loc:'',struct:'เหล็กกล่อง',thickness:'',designThick:'',pass:'ผ่าน'})
  return (
    <>
      <SectionTitle>〰️ 3.13 Ultrasonic Thickness — ความหนาชิ้นส่วนโครงสร้างเหล็ก</SectionTitle>
      <TableEditor items={data.utItems} onAdd={add} onDelete={del} onUpdate={upd} cols={[
        {key:'loc',label:'ตำแหน่ง',width:90,placeholder:'เหล็กกล่อง RB-1'},
        {key:'struct',label:'ชิ้นส่วน',type:'select',options:['เหล็กกล่อง','เหล็กรูปพรรณ','แผ่นเหล็ก','อื่นๆ']},
        {key:'thickness',label:'ความหนาที่วัด (mm)',width:85},
        {key:'designThick',label:'ความหนาตามแบบ (mm)',width:90},
        {key:'pass',label:'ผล',type:'select',options:PASS},
      ]} />
      <div style={{marginTop:12}}><Field label="สรุปผล"><Textarea value={data.utSummary} onChange={v=>set('utSummary')(v)} placeholder="ผลการตรวจสอบความหนาชิ้นส่วนเหล็ก..." /></Field></div>
    </>
  )
}

export function StepConclusion({ data, set }: StepProps) {
  const tests: [string, number][] = [
    ['Visual Inspection', data.visualItems.length],
    ['Rebound Hammer', data.reboundItems.length],
    ['UPV Test', data.upvItems.length],
    ['Crack Depth', data.crackItems.length],
    ['Half-Cell Potential', data.halfcellItems.length],
    ['Ferro Scan', data.ferroItems.length],
    ['Carbonation', data.carbonItems.length],
    ['Chloride', data.chlorideItems.length],
    ['Levelling', data.levelItems.length],
    ['Compressive Strength', data.compressItems.length],
    ['Liquid Penetration', data.liquidItems.length],
    ['Hardness Test', data.hardnessItems.length],
    ['UT Thickness', data.utItems.length],
  ]
  return (
    <>
      <SectionTitle>✅ บทที่ 4 สรุปผลการดำเนินงาน</SectionTitle>
      <Field label="ข้อความสรุปผลการตรวจสอบโดยรวม">
        <Textarea value={data.conclusion} onChange={v => set('conclusion')(v)}
          placeholder="จากการดำเนินการตรวจสอบโครงสร้าง [ชื่ออาคาร] โดยวิศวกร [ชื่อ] ผู้ตรวจสอบมีความเห็นว่า..." />
      </Field>
      <div style={{background:'#EBF8FF',borderRadius:8,padding:16,marginTop:8,borderLeft:'4px solid #1B4F8A',borderRadius:0}}>
        <div style={{fontSize:12,fontWeight:700,color:'#1B4F8A',marginBottom:10}}>📊 สรุปข้อมูลที่กรอก</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px 8px'}}>
          {[['ชื่ออาคาร',data.buildingName],['เสนอต่อ',data.client],['วิศวกร',data.engineer]].map(([k,v])=>(
            <div key={k} style={{display:'flex',gap:6,fontSize:12,marginBottom:3}}>
              <span style={{color:'#4A5568',minWidth:80}}>{k}:</span>
              <span style={{color:'#2D3748',fontWeight:600}}>{v||'-'}</span>
            </div>
          ))}
          {tests.map(([k,v])=>(
            <div key={k} style={{display:'flex',gap:6,fontSize:12,marginBottom:3}}>
              <span style={{color:'#4A5568',minWidth:120}}>{k}:</span>
              <span style={{color:'#2D3748',fontWeight:600}}>{v} จุด</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

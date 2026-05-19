export interface VisualItem { id: number; floor: string; struct: string; sev: string; detail: string; size: string }
export interface ReboundItem { id: number; loc: string; struct: string; dir: string; r1:string;r2:string;r3:string;r4:string;r5:string;r6:string;r7:string;r8:string;r9:string;r10:string; avg: string; fc: string }
export interface UPVItem { id: number; loc: string; struct: string; method: string; speed: string; qual: string }
export interface CrackItem { id: number; loc: string; struct: string; t1: string; t2: string; spacing: string; depth: string }
export interface HalfCellItem { id: number; floor: string; loc: string; struct: string; result: string; summary: string }
export interface FerroItem { id: number; loc: string; struct: string; axis: string; width: string; numBar: string; coverMin: string; coverMax: string; coverAvg: string; spacingMin: string; spacingMax: string; matchDesign: string; matchTol: string }
export interface CarbonItem { id: number; loc: string; struct: string; depth: string; ph: string }
export interface ChlorideItem { id: number; loc: string; struct: string; depthLevel: string; chloridePct: string; criticalPct: string; pass: string }
export interface LevelItem { id: number; loc: string; level: string; ref: string; diff: string }
export interface CompressItem { id: number; loc: string; dia: string; height: string; area: string; maxLoad: string; fc: string }
export interface LiquidItem { id: number; loc: string; struct: string; result: string; detail: string }
export interface HardnessItem { id: number; loc: string; struct: string; hbValue: string; tensileStrength: string; pass: string }
export interface UTItem { id: number; loc: string; struct: string; thickness: string; designThick: string; pass: string }

export const ALL_TESTS = [
  { id: 'visual',    label: 'Visual Inspection',          sub: 'สำรวจสภาพทางกายภาพด้วยสายตา' },
  { id: 'rebound',   label: 'Rebound Hammer Test',        sub: 'ทดสอบกำลังอัดคอนกรีตด้วยค้อนกระแทก' },
  { id: 'upv',       label: 'Ultrasonic Pulse Velocity',  sub: 'ทดสอบค่าความสมบูรณ์ของคอนกรีต' },
  { id: 'crack',     label: 'Crack Depth',                sub: 'วัดความลึกรอยร้าวด้วยคลื่นอัลตร้าโซนิค' },
  { id: 'halfcell',  label: 'Half-Cell Potential',        sub: 'ตรวจสอบค่าการสึกกร่อนของเหล็กเสริม' },
  { id: 'ferro',     label: 'Ferro Scan / Cover Meter',   sub: 'ตรวจสอบตำแหน่งของเหล็กเสริม' },
  { id: 'carbon',    label: 'Carbonation Test',           sub: 'ตรวจสอบสภาพการเกิดคาร์บอเนชั่น' },
  { id: 'chloride',  label: 'Chloride Test',              sub: 'ตรวจสอบปริมาณคลอไรด์ในคอนกรีต' },
  { id: 'level',     label: 'Levelling Test',             sub: 'วัดระดับด้วยกล้องระดับ' },
  { id: 'compress',  label: 'Compressive Strength Test',  sub: 'ทดสอบกำลังอัดด้วยเครื่องอัดคอนกรีต' },
  { id: 'liquid',    label: 'Liquid Penetration Test',    sub: 'ตรวจสอบความสมบูรณ์จุดต่อโครงสร้างหลังคา' },
  { id: 'hardness',  label: 'Hardness Test',              sub: 'กำลังรับแรงดึงประลัยของเหล็กเสริม' },
  { id: 'ut',        label: 'Ultrasonic Thickness',       sub: 'ตรวจสอบความหนาชิ้นส่วนโครงสร้างเหล็ก' },
] as const

export type TestId = typeof ALL_TESTS[number]['id']

export interface FormData {
  buildingName: string; projName: string; address: string; floors: string; age: string
  client: string; company: string; engineer: string; engCode: string; date: string
  background: string; objectives: string; scope: string
  selectedTests: TestId[]
  visualItems: VisualItem[]; visualSummary: string
  reboundItems: ReboundItem[]; reboundSummary: string
  upvItems: UPVItem[]; upvSummary: string
  crackItems: CrackItem[]; crackSummary: string
  halfcellItems: HalfCellItem[]; halfcellSummary: string
  ferroItems: FerroItem[]; ferroSummary: string
  carbonItems: CarbonItem[]; carbonSummary: string
  chlorideItems: ChlorideItem[]; chlorideSummary: string
  levelItems: LevelItem[]; levelSummary: string
  compressItems: CompressItem[]; compressDesignFc: string; compressSummary: string
  liquidItems: LiquidItem[]; liquidSummary: string
  hardnessItems: HardnessItem[]; hardnessSummary: string
  utItems: UTItem[]; utSummary: string
  conclusion: string
}

const nid = () => 1
export const defaultData: FormData = {
  buildingName:'', projName:'', address:'', floors:'', age:'',
  client:'', company:'บริษัท เพอร์ฟอร์มแมกซ์ บิวดิ้ง เซอร์วิซ จำกัด',
  engineer:'', engCode:'', date:'',
  background:'', objectives:'', scope:'',
  selectedTests: ALL_TESTS.map(t => t.id) as TestId[],
  visualItems:[{id:1,floor:'',struct:'เสา',sev:'ปานกลาง/เร่งด่วน',detail:'',size:''}], visualSummary:'',
  reboundItems:[{id:1,loc:'',struct:'เสา',dir:'แนวนอน',r1:'',r2:'',r3:'',r4:'',r5:'',r6:'',r7:'',r8:'',r9:'',r10:'',avg:'',fc:''}], reboundSummary:'',
  upvItems:[{id:1,loc:'',struct:'เสา',method:'Direct',speed:'',qual:'ดี (Good) 3500-4500'}], upvSummary:'',
  crackItems:[{id:1,loc:'',struct:'เสา',t1:'',t2:'',spacing:'',depth:''}], crackSummary:'',
  halfcellItems:[{id:1,floor:'',loc:'',struct:'เสา',result:'ไม่แน่นอน',summary:''}], halfcellSummary:'',
  ferroItems:[{id:1,loc:'',struct:'เสา',axis:'X',width:'',numBar:'',coverMin:'',coverMax:'',coverAvg:'',spacingMin:'',spacingMax:'',matchDesign:'',matchTol:''}], ferroSummary:'',
  carbonItems:[{id:1,loc:'',struct:'เสา',depth:'0-1',ph:'ค่า pH ปกติ (เปลี่ยนเป็นสีม่วงแดง)'}], carbonSummary:'',
  chlorideItems:[{id:1,loc:'',struct:'เสา',depthLevel:'1/3 cover',chloridePct:'',criticalPct:'0.15',pass:'ผ่าน'}], chlorideSummary:'',
  levelItems:[{id:1,loc:'',level:'',ref:'0',diff:''}], levelSummary:'',
  compressItems:[{id:1,loc:'',dia:'',height:'',area:'',maxLoad:'',fc:''}], compressDesignFc:'', compressSummary:'',
  liquidItems:[{id:1,loc:'',struct:'โครงเหล็กหลังคา',result:'ผ่าน — ไม่พบรอยไม่สมบูรณ์',detail:''}], liquidSummary:'',
  hardnessItems:[{id:1,loc:'',struct:'เสา',hbValue:'',tensileStrength:'',pass:'ผ่าน'}], hardnessSummary:'',
  utItems:[{id:1,loc:'',struct:'เสา',thickness:'',designThick:'',pass:'ผ่าน'}], utSummary:'',
  conclusion:''
}

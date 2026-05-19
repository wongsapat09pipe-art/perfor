import { FormData } from './formData'

function para(text: string, opts: Record<string,unknown> = {}) {
  const { Document, Paragraph, TextRun, AlignmentType } = (window as any).__docx
  return new Paragraph({
    children: [new TextRun({ text, font: 'TH Sarabun New', size: 28, ...opts })],
    spacing: { after: 80 },
    alignment: AlignmentType.LEFT,
  })
}

function heading(text: string, level: number) {
  const { Paragraph, TextRun, AlignmentType, HeadingLevel } = (window as any).__docx
  const sizes: Record<number, number> = { 1: 36, 2: 30, 3: 28 }
  return new Paragraph({
    children: [new TextRun({ text, bold: true, font: 'TH Sarabun New', size: sizes[level] || 28 })],
    heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    alignment: AlignmentType.CENTER,
  })
}

function makeTable(headers: string[], rows: string[][], colWidths: number[]) {
  const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, ShadingType, BorderStyle } = (window as any).__docx
  const totalW = colWidths.reduce((a, b) => a + b, 0)
  const border = { style: BorderStyle.SINGLE, size: 1, color: 'AAAAAA' }
  const borders = { top: border, bottom: border, left: border, right: border }

  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      borders, width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: '1B4F8A', type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', font: 'TH Sarabun New', size: 22 })] })]
    }))
  })

  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      borders, width: { size: colWidths[ci], type: WidthType.DXA },
      shading: { fill: ri % 2 === 0 ? 'FFFFFF' : 'F7FAFC', type: ShadingType.CLEAR },
      margins: { top: 40, bottom: 40, left: 80, right: 80 },
      children: [new Paragraph({ children: [new TextRun({ text: cell || '-', font: 'TH Sarabun New', size: 22 })] })]
    }))
  }))

  return new Table({ width: { size: totalW, type: WidthType.DXA }, columnWidths: colWidths, rows: [headerRow, ...dataRows] })
}

async function loadDocx() {
  if ((window as any).__docx) return
  const mod = await import('https://cdn.jsdelivr.net/npm/docx@8.5.0/+esm' as string)
  ;(window as any).__docx = mod
}

export async function generateDocx(d: FormData) {
  await loadDocx()
  const { Document, Packer, Paragraph, TextRun, PageBreak, Header, Footer, AlignmentType, PageNumber, BorderStyle } = (window as any).__docx

  const title = d.buildingName || 'อาคาร'
  const headerPara = new Paragraph({
    children: [new TextRun({ text: `รายงานตรวจสอบโครงสร้าง${title}`, font: 'TH Sarabun New', size: 22, color: '444444' })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '1B4F8A', space: 1 } },
    alignment: AlignmentType.RIGHT,
  })
  const footerPara = new Paragraph({
    children: [
      new TextRun({ text: `${d.company}    `, font: 'TH Sarabun New', size: 18 }),
      new TextRun({ children: [PageNumber.CURRENT], font: 'TH Sarabun New', size: 18 }),
    ],
    alignment: AlignmentType.CENTER,
  })

  const sec = (children: unknown[]) => ({
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1701 } } },
    headers: { default: new Header({ children: [headerPara] }) },
    footers: { default: new Footer({ children: [footerPara] }) },
    children,
  })

  const empty = () => new Paragraph({ children: [new TextRun('')] })
  const bold = (t: string) => para(t, { bold: true })

  // Cover section (no header/footer)
  const coverChildren = [
    empty(), empty(), empty(),
    new Paragraph({ children: [new TextRun({ text: 'รายงานตรวจสอบและประเมินสภาพโครงสร้าง', bold: true, size: 40, font: 'TH Sarabun New' })], alignment: AlignmentType.CENTER }),
    empty(),
    new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 36, font: 'TH Sarabun New' })], alignment: AlignmentType.CENTER }),
    empty(),
    new Paragraph({ children: [new TextRun({ text: `เสนอต่อ: ${d.client || '-'}`, size: 28, font: 'TH Sarabun New' })], alignment: AlignmentType.CENTER }),
    new Paragraph({ children: [new TextRun({ text: `จัดทำโดย: ${d.company}`, size: 28, font: 'TH Sarabun New' })], alignment: AlignmentType.CENTER }),
    empty(),
    new Paragraph({ children: [new TextRun({ text: d.date ? `วันที่: ${d.date}` : '', size: 26, font: 'TH Sarabun New' })], alignment: AlignmentType.CENTER }),
  ]

  // Chapter 1
  const ch1 = [
    heading('บทที่ 1 บทนำ', 1),
    heading('1.1 ที่มาและความสำคัญ', 2),
    para(d.background || '-'),
    heading('1.2 วัตถุประสงค์', 2),
    para(d.objectives || '-'),
    heading('1.3 ขอบเขตการดำเนินงาน', 2),
    para(d.scope || '-'),
    heading('1.4 ข้อมูลโครงการ', 2),
    para(`1.) ชื่ออาคาร: ${d.buildingName || '-'}`),
    para(`2.) สถานที่ตั้งอาคาร: ${d.address || '-'}`),
    para(`3.) จำนวนชั้น: ${d.floors || '-'}`),
    para(`4.) อายุอาคาร: ${d.age || '-'} ปี`),
  ]

  // Chapter 3 results — only selected tests
  const sel = new Set(d.selectedTests)
  const ch3: unknown[] = [heading('บทที่ 3 ผลการดำเนินงาน', 1)]
  let secNum = 1

  const pushSection = (title: string, tableNodes: unknown[], summary: string) => {
    ch3.push(heading(`3.${secNum} ${title}`, 2))
    secNum++
    if (tableNodes.length) { tableNodes.forEach(n => ch3.push(n)); ch3.push(empty()) }
    ch3.push(para(summary || '-'))
  }

  if (sel.has('visual')) pushSection(
    'การสำรวจสภาพทางกายภาพด้วยสายตา (Visual Inspection)',
    d.visualItems.some(r => r.detail || r.floor) ? [makeTable(
      ['ลำดับ','ชั้น','โครงสร้าง','ความรุนแรง','รายละเอียดความเสียหาย','ขนาด'],
      d.visualItems.map((r,i) => [String(i+1),r.floor,r.struct,r.sev,r.detail,r.size]),
      [600,700,1000,1400,3000,900])] : [],
    d.visualSummary)

  if (sel.has('rebound')) pushSection(
    'การทดสอบกำลังอัดของคอนกรีตด้วยค้อนกระแทก (Rebound Hammer Test)',
    d.reboundItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','โครงสร้าง','ทิศทาง','R1','R2','R3','R4','R5','R6','R7','R8','R9','R10','เฉลี่ย',"fc' (ksc)"],
      d.reboundItems.map((r,i) => [String(i+1),r.loc,r.struct,r.dir,r.r1,r.r2,r.r3,r.r4,r.r5,r.r6,r.r7,r.r8,r.r9,r.r10,r.avg,r.fc]),
      [500,900,900,900,450,450,450,450,450,450,450,450,450,450,600,650])] : [],
    d.reboundSummary)

  if (sel.has('upv')) pushSection(
    'การทดสอบค่าความสมบูรณ์ของคอนกรีต ด้วยวิธี Ultrasonic Pulse Velocity',
    d.upvItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','โครงสร้าง','วิธีวัด','ความเร็วคลื่น (m/s)','คุณภาพคอนกรีต'],
      d.upvItems.map((r,i) => [String(i+1),r.loc,r.struct,r.method,r.speed,r.qual]),
      [600,1200,1000,800,1200,2800])] : [],
    d.upvSummary)

  if (sel.has('crack')) pushSection(
    'การตรวจสอบความลึกรอยร้าวด้วยคลื่นอัลตร้าโซนิค (Crack Depth)',
    d.crackItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','โครงสร้าง','t1 (μs)','t2 (μs)','ระยะ a (mm)','ความลึก (mm)'],
      d.crackItems.map((r,i) => [String(i+1),r.loc,r.struct,r.t1,r.t2,r.spacing,r.depth]),
      [600,1200,1000,800,800,900,900])] : [],
    d.crackSummary)

  if (sel.has('halfcell')) pushSection(
    'การตรวจสอบค่าการสึกกร่อนของเหล็กเสริม (Half-Cell Potential)',
    d.halfcellItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ชั้น','ตำแหน่ง','โครงสร้าง','ผลการประเมิน','สรุป'],
      d.halfcellItems.map((r,i) => [String(i+1),r.floor,r.loc,r.struct,r.result,r.summary]),
      [500,600,700,900,2500,2400])] : [],
    d.halfcellSummary)

  if (sel.has('ferro')) pushSection(
    'การตรวจสอบตำแหน่งของเหล็กเสริม (Ferro Scan/Cover Meter)',
    d.ferroItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','โครงสร้าง','แกน','ความกว้าง (m)','จำนวน (เส้น)','Cover min','Cover max','Cover avg','ตรงแบบ','ใน tol.'],
      d.ferroItems.map((r,i) => [String(i+1),r.loc,r.struct,r.axis,r.width,r.numBar,r.coverMin,r.coverMax,r.coverAvg,r.matchDesign,r.matchTol]),
      [500,900,900,500,700,700,750,750,750,700,750])] : [],
    d.ferroSummary)

  if (sel.has('carbon')) pushSection(
    'ผลการตรวจสอบการเกิดคาร์บอเนชันในคอนกรีต (Carbonation Depth Test)',
    d.carbonItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','โครงสร้าง','ความลึก (cm)','การเปลี่ยนแปลงของสารละลายฟีนอล์ฟทาลีน','สถานะ'],
      d.carbonItems.map((r,i) => [String(i+1),r.struct,r.depth,r.ph.includes('ปกติ')?'เปลี่ยนเป็นสีม่วงแดง':'ไม่เปลี่ยนสี',r.ph]),
      [600,1000,900,3200,1900])] : [],
    d.carbonSummary)

  if (sel.has('chloride')) pushSection(
    'การตรวจสอบปริมาณคลอไรด์ในเนื้อคอนกรีต (Chloride Test)',
    d.chlorideItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','โครงสร้าง','ระดับความลึก','คลอไรด์ที่วัดได้ (%)','ค่าวิกฤต (%)','ผล'],
      d.chlorideItems.map((r,i) => [String(i+1),r.loc,r.struct,r.depthLevel,r.chloridePct,r.criticalPct,r.pass]),
      [500,900,900,1000,1100,900,700])] : [],
    d.chlorideSummary)

  if (sel.has('level')) pushSection(
    'การวัดระดับด้วยกล้องระดับ (Levelling Test)',
    d.levelItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','ค่าระดับ (mm)','ค่าอ้างอิง (mm)','ส่วนต่าง (mm)'],
      d.levelItems.map((r,i) => [String(i+1),r.loc,r.level,r.ref,r.diff]),
      [600,2000,1000,1000,1000])] : [],
    d.levelSummary)

  if (sel.has('compress')) {
    const nodes: unknown[] = []
    if (d.compressItems.some(r => r.loc)) {
      nodes.push(makeTable(
        ['ลำดับ','ตำแหน่ง','เส้นผ่าศูนย์กลาง (cm)','ความสูง (cm)','พื้นที่ (cm²)','แรงอัดสูงสุด (kN)',"f'c (ksc)"],
        d.compressItems.map((r,i) => [String(i+1),r.loc,r.dia,r.height,r.area,r.maxLoad,r.fc]),
        [500,1100,1000,800,800,1200,800]))
      if (d.compressDesignFc) nodes.push(para(`กำลังอัดที่ออกแบบ: ${d.compressDesignFc} ksc`))
    }
    pushSection('ผลการทดสอบกำลังรับแรงอัดคอนกรีตด้วยเครื่องอัดคอนกรีต (Compressive Strength Test)', nodes, d.compressSummary)
  }

  if (sel.has('liquid')) pushSection(
    'การตรวจสอบความสมบูรณ์จุดต่อโครงสร้างหลังคาด้วยวิธี Liquid Penetrations Test',
    d.liquidItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','โครงสร้าง','ผล','รายละเอียด'],
      d.liquidItems.map((r,i) => [String(i+1),r.loc,r.struct,r.result,r.detail]),
      [500,1000,1000,2200,2900])] : [],
    d.liquidSummary)

  if (sel.has('hardness')) pushSection(
    'การตรวจสอบกำลังรับแรงดึงประลัยของเหล็กเสริมด้วยการวัดความแข็ง (Hardness Test)',
    d.hardnessItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','โครงสร้าง','HB (Brinell)','กำลังดึงประลัย (MPa)','ผล'],
      d.hardnessItems.map((r,i) => [String(i+1),r.loc,r.struct,r.hbValue,r.tensileStrength,r.pass]),
      [600,1200,1000,900,1400,700])] : [],
    d.hardnessSummary)

  if (sel.has('ut')) pushSection(
    'การตรวจสอบความหนาชิ้นส่วนโครงสร้างเหล็กด้วยวิธี Ultrasonic Test',
    d.utItems.some(r => r.loc) ? [makeTable(
      ['ลำดับ','ตำแหน่ง','ชิ้นส่วน','ความหนาที่วัด (mm)','ความหนาตามแบบ (mm)','ผล'],
      d.utItems.map((r,i) => [String(i+1),r.loc,r.struct,r.thickness,r.designThick,r.pass]),
      [600,1500,1200,1200,1400,700])] : [],
    d.utSummary)

  // Chapter 4 conclusion
  const testLabels: Record<string,string> = {
    visual:'Visual Inspection', rebound:'Rebound Hammer Test', upv:'Ultrasonic Pulse Velocity',
    crack:'Crack Depth', halfcell:'Half-Cell Potential', ferro:'Ferro Scan/Cover Meter',
    carbon:'Carbonation Test', chloride:'Chloride Test', level:'Levelling Test',
    compress:'Compressive Strength Test', liquid:'Liquid Penetrations Test',
    hardness:'Hardness Test', ut:'Ultrasonic Thickness Test'
  }
  const ch4 = [
    heading('บทที่ 4 สรุปผลการดำเนินงาน', 1),
    para(`จากการดำเนินการตรวจสอบโครงสร้าง${title} โดยมีวิศวกรคือ${d.engineer || '-'} ${d.engCode ? `(${d.engCode})` : ''} และทีมงานเข้าดำเนินการตรวจสอบโครงสร้าง ซึ่งมีรายการการตรวจสอบ ดังนี้`),
    ...d.selectedTests.map(id => para(`- ${testLabels[id] || id}`)),
    empty(),
    para(d.conclusion || 'สรุปผลการดำเนินงาน...'),
    empty(), empty(),
    new Paragraph({ children: [new TextRun({ text: d.engineer || '', font: 'TH Sarabun New', size: 28 })], alignment: AlignmentType.RIGHT }),
    new Paragraph({ children: [new TextRun({ text: d.engCode ? `(${d.engCode})` : '', font: 'TH Sarabun New', size: 28 })], alignment: AlignmentType.RIGHT }),
    new Paragraph({ children: [new TextRun({ text: 'ผู้ควบคุมและตรวจสอบรายงาน', font: 'TH Sarabun New', size: 28 })], alignment: AlignmentType.RIGHT }),
  ]

  const doc = new Document({
    sections: [
      { properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1701 } } }, children: coverChildren },
      sec([...ch1, empty()]),
      sec([...ch3]),
      sec([...ch4]),
    ]
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `รายงานตรวจสอบ_${d.buildingName || 'อาคาร'}_${new Date().toISOString().slice(0,10)}.docx`
  a.click()
  URL.revokeObjectURL(url)
}

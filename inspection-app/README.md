# ระบบสร้างรายงานตรวจสอบโครงสร้างเชิงลึก

Web App สำหรับกรอกข้อมูลผลการทดสอบ 13 หัวข้อ แล้วดาวน์โหลด .docx ได้ทันที

## วิธี Deploy บน Vercel (ฟรี)

### ขั้นตอนที่ 1 — สร้าง GitHub repo
1. ไปที่ https://github.com/new
2. ตั้งชื่อ repo เช่น `inspection-report-app`
3. กด **Create repository**

### ขั้นตอนที่ 2 — อัปโหลดไฟล์
```bash
# Clone repo แล้ว copy ไฟล์ทั้งหมดจาก inspection-app/ ลงไป
git clone https://github.com/YOUR_USERNAME/inspection-report-app.git
# วาง/copy ไฟล์ทั้งหมดลงใน folder นั้น
cd inspection-report-app
git add .
git commit -m "initial commit"
git push
```

### ขั้นตอนที่ 3 — Deploy บน Vercel
1. ไปที่ https://vercel.com → **Sign in with GitHub**
2. กด **Add New Project**
3. เลือก repo `inspection-report-app`
4. กด **Deploy** (ไม่ต้องตั้งค่าอะไร — Vercel รู้จัก Next.js อัตโนมัติ)
5. รอ ~1 นาที → ได้ URL เช่น `https://inspection-report-app.vercel.app`

### แชร์ URL ให้ทีม
ทุกคนเข้า URL นั้นได้เลย กรอกข้อมูล กดปุ่ม "สร้างรายงาน .docx" → ดาวน์โหลดไฟล์ได้ทันที

## การพัฒนา Local
```bash
npm install
npm run dev
# เปิด http://localhost:3000
```

## โครงสร้างโปรเจกต์
```
src/
├── app/
│   ├── page.tsx          # หน้าหลัก + navigation
│   ├── page.module.css   # สไตล์หน้าหลัก
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global CSS
├── components/
│   ├── UI.tsx            # shared components (Field, Input, Table, ...)
│   ├── StepBar.tsx       # แถบ navigation ด้านบน
│   └── steps/
│       ├── stepUtils.ts  # useArrayField hook
│       ├── AllSteps.tsx  # step components ทั้งหมด
│       ├── StepProject.tsx
│       ├── StepBackground.tsx
│       ├── StepVisual.tsx
│       ├── StepRebound.tsx
│       └── ... (16 steps)
└── lib/
    ├── formData.ts       # TypeScript types + default data
    └── generateDocx.ts   # สร้าง .docx ด้วย docx.js
```

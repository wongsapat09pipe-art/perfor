'use client'
import { useState, useMemo } from 'react'
import StepBar from '@/components/StepBar'
import StepProject from '@/components/steps/StepProject'
import StepBackground from '@/components/steps/StepBackground'
import StepSelectTests from '@/components/steps/StepSelectTests'
import StepVisual from '@/components/steps/StepVisual'
import StepRebound from '@/components/steps/StepRebound'
import {
  StepUPV, StepCrack, StepHalfCell, StepFerro,
  StepCarbonation, StepChloride, StepLevelling, StepCompressive,
  StepLiquid, StepHardness, StepUT, StepConclusion
} from '@/components/steps/AllSteps'
import { generateDocx } from '@/lib/generateDocx'
import { defaultData, FormData, TestId } from '@/lib/formData'
import s from './page.module.css'

type StepComponent = React.ComponentType<{ data: FormData; set: (k: keyof FormData) => (v: unknown) => void }>

const TEST_STEPS: Record<TestId, { label: string; icon: string; component: StepComponent }> = {
  visual:   { label: 'Visual',       icon: '👁️',  component: StepVisual },
  rebound:  { label: 'Rebound',      icon: '🔨',  component: StepRebound },
  upv:      { label: 'UPV',          icon: '📡',  component: StepUPV },
  crack:    { label: 'Crack Depth',  icon: '🔍',  component: StepCrack },
  halfcell: { label: 'Half-Cell',    icon: '⚡',  component: StepHalfCell },
  ferro:    { label: 'Ferro Scan',   icon: '🔬',  component: StepFerro },
  carbon:   { label: 'Carbonation',  icon: '🧪',  component: StepCarbonation },
  chloride: { label: 'Chloride',     icon: '⚗️',  component: StepChloride },
  level:    { label: 'Levelling',    icon: '📏',  component: StepLevelling },
  compress: { label: 'Compressive',  icon: '⬇️',  component: StepCompressive },
  liquid:   { label: 'Liquid PT',    icon: '💧',  component: StepLiquid },
  hardness: { label: 'Hardness',     icon: '💎',  component: StepHardness },
  ut:       { label: 'UT Thickness', icon: '〰️',  component: StepUT },
}

const FIXED_PRE  = [
  { label: 'โครงการ',       icon: '🏗️', component: StepProject      as StepComponent },
  { label: 'บทนำ',          icon: '📋', component: StepBackground   as StepComponent },
  { label: 'เลือกการทดสอบ', icon: '🗂️', component: StepSelectTests  as StepComponent },
]
const FIXED_POST = [
  { label: 'สรุปผล', icon: '✅', component: StepConclusion as StepComponent },
]

export default function Home() {
  const [cur, setCur]     = useState(0)
  const [data, setData]   = useState<FormData>(defaultData)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  const set = (key: keyof FormData) => (val: unknown) =>
    setData(d => ({ ...d, [key]: val }))

  const allSteps = useMemo(() => {
    const testSteps = data.selectedTests.map(id => TEST_STEPS[id]).filter(Boolean)
    return [...FIXED_PRE, ...testSteps, ...FIXED_POST]
  }, [data.selectedTests])

  const safeCur = Math.min(cur, allSteps.length - 1)
  const ActiveStep = allSteps[safeCur]?.component

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 4000) }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      await generateDocx(data)
      showToast('✅ ดาวน์โหลด .docx เรียบร้อยแล้ว!')
    } catch (e) {
      showToast('❌ เกิดข้อผิดพลาด กรุณาลองใหม่')
      console.error(e)
    }
    setLoading(false)
  }

  const isLast = safeCur === allSteps.length - 1

  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <div className={s.headerIcon}>🏛️</div>
        <div>
          <div className={s.headerTitle}>ระบบสร้างรายงานตรวจสอบโครงสร้างเชิงลึก</div>
          <div className={s.headerSub}>
            Performax Building Service — เลือก {data.selectedTests.length} / 13 หัวข้อ
          </div>
        </div>
      </div>

      <StepBar
        steps={allSteps.map(st => `${st.icon} ${st.label}`)}
        current={safeCur}
        onChange={i => setCur(i)}
      />

      <div className={s.body}>
        <div className={s.card}>
          {ActiveStep && <ActiveStep data={data} set={set} />}

          <div className={s.nav}>
            <button
              className={s.btnPrev}
              onClick={() => setCur(c => Math.max(0, c - 1))}
              disabled={safeCur === 0}
            >← ก่อนหน้า</button>

            <span className={s.counter}>{safeCur + 1} / {allSteps.length}</span>

            {!isLast ? (
              <button className={s.btnNext} onClick={() => setCur(c => Math.min(allSteps.length - 1, c + 1))}>
                ถัดไป →
              </button>
            ) : (
              <button
                className={s.btnGenerate}
                onClick={handleGenerate}
                disabled={loading || data.selectedTests.length === 0}
              >
                {loading ? '⏳ กำลังสร้าง...' : '📄 สร้างรายงาน .docx'}
              </button>
            )}
          </div>
        </div>

        {/* Chip bar — show active tests, click × to deselect */}
        <div className={s.chips}>
          <span className={s.chipsLabel}>การทดสอบที่เลือก:</span>
          {data.selectedTests.length === 0
            ? <span style={{ color: '#C53030', fontSize: 12 }}>ยังไม่ได้เลือก</span>
            : data.selectedTests.map(id => (
              <span key={id} className={s.chip}>
                {TEST_STEPS[id]?.icon} {TEST_STEPS[id]?.label}
                <button
                  className={s.chipDel}
                  onClick={() => set('selectedTests')(data.selectedTests.filter(x => x !== id))}
                >×</button>
              </span>
            ))
          }
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  )
}

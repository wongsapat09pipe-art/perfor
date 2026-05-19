'use client'
import { ALL_TESTS, TestId } from '@/lib/formData'
import { StepProps } from './stepUtils'

const BLUE = '#1B4F8A'
const LIGHT = '#EBF8FF'
const BORDER = '#90CDF4'

export default function StepSelectTests({ data, set }: StepProps) {
  const selected = data.selectedTests

  const toggle = (id: TestId) => {
    const next = selected.includes(id)
      ? selected.filter(s => s !== id)
      : [...selected, id]
    set('selectedTests')(next)
  }

  const selectAll = () => set('selectedTests')(ALL_TESTS.map(t => t.id) as TestId[])
  const clearAll = () => set('selectedTests')([])

  return (
    <div>
      <div style={{ color: BLUE, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
        🧪 เลือกการทดสอบที่ใช้ในงานนี้
      </div>
      <p style={{ fontSize: 12, color: '#718096', marginBottom: 16, lineHeight: 1.6 }}>
        เลือกเฉพาะหัวข้อที่ดำเนินการจริง — ขั้นตอนกรอกข้อมูลและรายงาน .docx จะแสดงเฉพาะที่เลือก
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button onClick={selectAll} style={{
          padding: '5px 14px', borderRadius: 6, border: `1px solid ${BORDER}`,
          background: LIGHT, color: BLUE, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600
        }}>✓ เลือกทั้งหมด</button>
        <button onClick={clearAll} style={{
          padding: '5px 14px', borderRadius: 6, border: '1px solid #FED7D7',
          background: '#FFF5F5', color: '#C53030', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600
        }}>✕ ล้างทั้งหมด</button>
        <span style={{ fontSize: 12, color: '#718096', alignSelf: 'center', marginLeft: 4 }}>
          เลือกแล้ว {selected.length} / {ALL_TESTS.length} หัวข้อ
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {ALL_TESTS.map((t, i) => {
          const checked = selected.includes(t.id)
          return (
            <label key={t.id} onClick={() => toggle(t.id)} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px',
              borderRadius: 8, border: `1px solid ${checked ? BORDER : '#E2E8F0'}`,
              background: checked ? LIGHT : '#FAFAFA',
              cursor: 'pointer', transition: 'all 0.12s', userSelect: 'none'
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                border: `2px solid ${checked ? BLUE : '#CBD5E0'}`,
                background: checked ? BLUE : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {checked && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: checked ? BLUE : '#2D3748' }}>
                  {i + 1}. {t.label}
                </div>
                <div style={{ fontSize: 11, color: '#718096', marginTop: 2 }}>{t.sub}</div>
              </div>
            </label>
          )
        })}
      </div>

      {selected.length === 0 && (
        <div style={{ marginTop: 14, padding: '10px 14px', background: '#FFFAF0', border: '1px solid #FBBF24', borderRadius: 8, fontSize: 12, color: '#92400E' }}>
          ⚠️ กรุณาเลือกอย่างน้อย 1 หัวข้อทดสอบ
        </div>
      )}
    </div>
  )
}

export default function StepBar({ steps, current, onChange }: { steps: string[]; current: number; onChange: (i: number) => void }) {
  return (
    <div style={{ background:'#fff', borderBottom:'1px solid #E2E8F0', padding:'0 8px', display:'flex', overflowX:'auto', scrollbarWidth:'none' }}>
      {steps.map((s, i) => (
        <button key={i} onClick={() => onChange(i)} style={{
          padding:'10px 11px', border:'none', cursor:'pointer', fontSize:11, fontFamily:'inherit',
          background:'none', color: i===current ? '#1B4F8A' : '#718096',
          fontWeight: i===current ? 700 : 400,
          borderBottom: i===current ? '2.5px solid #1B4F8A' : '2.5px solid transparent',
          whiteSpace:'nowrap', transition:'all 0.12s'
        }}>{i+1}. {s}</button>
      ))}
    </div>
  )
}

import React from 'react'

const B = '#1B4F8A'

const inp: React.CSSProperties = {
  width:'100%', padding:'7px 10px', border:'1px solid #CBD5E0', borderRadius:6,
  fontSize:13, fontFamily:'inherit', outline:'none', background:'#fff', color:'#2D3748'
}
const ta: React.CSSProperties = { ...inp, minHeight:80, resize:'vertical' }
const lbl: React.CSSProperties = { display:'block', fontSize:11, fontWeight:600, color:'#4A5568', marginBottom:4 }
const tblTh: React.CSSProperties = { background:B, color:'#fff', padding:'6px 8px', textAlign:'left', fontWeight:600, fontSize:11, whiteSpace:'nowrap' }
const tblTd: React.CSSProperties = { padding:'3px 5px', borderBottom:'1px solid #E2E8F0', verticalAlign:'middle' }
const tblInp: React.CSSProperties = { width:'100%', padding:'3px 6px', border:'1px solid #E2E8F0', borderRadius:4, fontSize:11, fontFamily:'inherit', minWidth:50 }

export function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div style={{ marginBottom:12, gridColumn: full ? '1/-1' : undefined }}>
      <label style={lbl}>{label}</label>
      {children}
    </div>
  )
}
export function Input({ value, onChange, placeholder, type='text' }: { value:string; onChange:(v:string)=>void; placeholder?:string; type?:string }) {
  return <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={inp} />
}
export function Textarea({ value, onChange, placeholder }: { value:string; onChange:(v:string)=>void; placeholder?:string }) {
  return <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={ta} />
}
export function Select({ value, onChange, options }: { value:string; onChange:(v:string)=>void; options:string[] }) {
  return <select value={value} onChange={e=>onChange(e.target.value)} style={inp}>{options.map(o=><option key={o}>{o}</option>)}</select>
}
export function Grid2({ children }: { children: React.ReactNode }) {
  return <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 14px' }}>{children}</div>
}
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ color:B, fontSize:14, fontWeight:700, marginBottom:16 }}>{children}</div>
}
export function Note({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize:11, color:'#718096', marginTop:6, lineHeight:1.5 }}>{children}</p>
}
export function AddBtn({ onClick }: { onClick:()=>void }) {
  return <button onClick={onClick} style={{ background:'#EBF8FF', color:B, border:'1px solid #90CDF4', borderRadius:6, padding:'4px 12px', fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>+ เพิ่มแถว</button>
}
export function DelBtn({ onClick }: { onClick:()=>void }) {
  return <button onClick={onClick} style={{ background:'none', border:'none', color:'#FC8181', cursor:'pointer', fontSize:16, padding:'0 4px', lineHeight:1 }}>×</button>
}

interface ColDef { key: string; label: string; type?: 'select'|'input'; options?: string[]; width?: number; placeholder?: string }
interface TableEditorProps<T extends { id: number }> {
  items: T[]
  cols: ColDef[]
  onAdd: () => void
  onDelete: (id: number) => void
  onUpdate: (id: number, key: string, val: string) => void
}
export function TableEditor<T extends { id: number }>({ items, cols, onAdd, onDelete, onUpdate }: TableEditorProps<T>) {
  return (
    <div>
      <div style={{ overflowX:'auto', marginBottom:8 }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
          <thead>
            <tr>
              <th style={{ ...tblTh, width:28 }}>#</th>
              {cols.map(c => <th key={c.key} style={{ ...tblTh, minWidth: c.width||60 }}>{c.label}</th>)}
              <th style={{ ...tblTh, width:28 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, idx) => (
              <tr key={row.id} style={{ background: idx%2===0 ? '#fff' : '#F7FAFC' }}>
                <td style={{ ...tblTd, textAlign:'center', color:'#718096' }}>{idx+1}</td>
                {cols.map(c => {
                  const val = (row as Record<string,unknown>)[c.key] as string ?? ''
                  return (
                    <td key={c.key} style={tblTd}>
                      {c.type === 'select'
                        ? <select value={val} onChange={e=>onUpdate(row.id,c.key,e.target.value)} style={tblInp}>{(c.options||[]).map(o=><option key={o}>{o}</option>)}</select>
                        : <input value={val} onChange={e=>onUpdate(row.id,c.key,e.target.value)} placeholder={c.placeholder||''} style={{ ...tblInp, minWidth: c.width||50 }} />
                      }
                    </td>
                  )
                })}
                <td style={tblTd}><DelBtn onClick={()=>onDelete(row.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddBtn onClick={onAdd} />
    </div>
  )
}

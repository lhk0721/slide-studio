// Shared slide frame for the graduation-review deck: the inbody-u300 header
// pattern (title · sub · section label · one hairline) plus an optional
// bottom convergence bar. Slides put their body inside `.gr-body`.
export default function Frame({ title, sub, section, converge, children }) {
  return (
    <div className="gr-slide">
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">{title}</h2>
          {sub && <div className="s-hd-sub">{sub}</div>}
        </div>
        {section && <span className="s-hd-section">{section}</span>}
      </div>
      <div className="s-rule" />
      {children}
      {converge && <div className="gr-converge">{converge}</div>}
    </div>
  )
}

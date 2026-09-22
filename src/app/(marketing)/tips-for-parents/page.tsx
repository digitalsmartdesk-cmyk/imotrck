'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const AGE_TABS = [
  {
    label: 'Ages 7–9',
    tips: [
      'Children at this age think in very concrete terms — stick to simple, direct emotion words like happy, sad, scared, angry, excited.',
      "Use stories and books as bridges. Ask \"How do you think that character felt?\" before asking about your child's own feelings.",
      'Physical comfort is still very important — a hug, sitting together, being present often speaks louder than words.',
      'Keep emotional conversations short. Five minutes of genuine attention beats a long lecture every time.',
      "Use art, play, and drawing as alternative expression routes when words don't come easily.",
    ],
  },
  {
    label: 'Ages 10–12',
    tips: [
      'Peer relationships become the emotional centre of gravity — show genuine interest in friendships without prying.',
      'Validate before you problem-solve. "That sounds really frustrating" lands better than "Here\'s what you should do."',
      'This age group is sensitive to fairness and feeling heard — avoid dismissing concerns with "you\'ll understand when you\'re older."',
      'Create low-pressure side-by-side moments (cooking, driving, watching something together) where conversation happens naturally.',
      'Introduce the idea that emotions give us useful information — not to be avoided, but understood.',
    ],
  },
  {
    label: 'Ages 13–15',
    tips: [
      'Resist the urge to fix everything. Teenagers often just need to be heard, not advised.',
      'Respect their growing need for privacy while keeping doors open — "I\'m here when you\'re ready to talk" goes a long way.',
      'Avoid criticising their peers directly, even when concerned — it often pushes teens to defend them.',
      'Share your own emotional experiences honestly and age-appropriately. Modelling vulnerability builds trust.',
      'Celebrate emotional courage when they do share — even a brief "thank you for telling me that" reinforces openness.',
    ],
  },
]

const ARTICLES = [
  { emoji: '📖', title: 'Building an emotional vocabulary', time: '5 min read', desc: 'How naming feelings precisely — beyond happy, sad, angry — helps children regulate them better.' },
  { emoji: '🧘', title: 'The 5-4-3-2-1 reset technique', time: '4 min read', desc: 'A simple grounding exercise for moments of overwhelm that children as young as 7 can learn to use independently.' },
  { emoji: '🗣', title: 'When tweens stop talking', time: '6 min read', desc: 'Why 10–12 year-olds often go quiet — and evidence-based strategies for staying connected during this transition.' },
]

const WORKSHEETS = [
  { emoji: '🎨', title: 'My Feelings Map', age: 'Ages 7–9', desc: 'A colouring worksheet to explore where feelings live in the body.' },
  { emoji: '📓', title: 'My Daily Check-In', age: 'Ages 8–12', desc: 'A simple one-page journal format for daily emotional reflection.' },
  { emoji: '💬', title: 'Conversation Starters', age: 'Ages 10–14', desc: '30 questions designed to open meaningful parent–child conversations.' },
  { emoji: '🌱', title: 'My Strengths Tree', age: 'Ages 9–15', desc: 'A visual worksheet for exploring personal values and emotional strengths.' },
]

export default function TipsPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <Nav />

      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '72px 0 64px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="section-label" style={{ color: 'var(--coral)' }}>Resources</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>Tips for Parents</h1>
          <p style={{ fontSize: 17, color: 'rgba(245,243,239,0.7)', lineHeight: 1.6 }}>
            Practical guidance to support your child&apos;s emotional growth — whether you&apos;ve just done an assessment or you&apos;re exploring for the first time.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-label">How to talk about feelings</div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>5 principles that actually work</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { num: 1, title: 'Name it to tame it', body: 'Help your child label emotions specifically — "frustrated," "disappointed," "nervous" — rather than just "bad" or "upset." Research shows that naming an emotion reduces its intensity in the brain, giving children a sense of control.', example: 'Instead of "calm down," try: "It sounds like you\'re feeling really frustrated right now. That makes sense."' },
              { num: 2, title: "Ask, don't tell", body: 'Open questions invite reflection. Closed statements shut it down. Replace "You\'re fine" with genuine curiosity. Children who feel heard are more willing to share difficult feelings.', example: '"What was the hardest part of your day?" works better than "How was school?" (which gets "fine").' },
              { num: 3, title: 'Share your own feelings', body: 'When parents model emotional honesty — "I felt nervous before that meeting" — it normalises feelings and shows children that even adults have to manage emotions.', example: '"I was really disappointed when that happened. I had to take some deep breaths to calm down."' },
              { num: 4, title: 'Create safe moments', body: 'Bedtime, car rides, and walks are golden — side-by-side, low-pressure contexts where children often open up more than they would face-to-face at a table.', example: 'A simple bedtime ritual: "Rose and thorn — what was one good thing and one hard thing today?"' },
              { num: 5, title: 'Validate first, solve later', body: "The instinct to fix problems is strong in parents — but children often just need to feel understood before they're ready to think about solutions. Validation doesn't mean agreement; it means acknowledgment.", example: 'First: "That sounds really hard, and I understand why you\'re upset." Then (later): "Would you like help thinking about what to do?"' },
            ].map(tip => (
              <div key={tip.num} className="card" style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 24, padding: '28px 32px', alignItems: 'start' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--teal)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{tip.num}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{tip.title}</h3>
                  <p style={{ fontSize: 14.5, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.6, marginBottom: 12 }}>{tip.body}</p>
                  <div style={{ background: 'var(--cream-deep)', borderRadius: 10, padding: '10px 14px', fontSize: 13.5, color: 'var(--navy)', fontStyle: 'italic' }}>💬 {tip.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream-deep)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-label">Age-by-age guidance</div>
          <h2 className="section-title" style={{ marginBottom: 32 }}>What to expect and how to connect</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {AGE_TABS.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveTab(i)} className={`chip ${activeTab === i ? 'active' : ''}`}>{tab.label}</button>
            ))}
          </div>
          <div className="card" style={{ padding: 32 }}>
            {AGE_TABS[activeTab].tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < AGE_TABS[activeTab].tips.length - 1 ? 16 : 0 }}>
                <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>→</span>
                <p style={{ fontSize: 15, color: 'var(--navy-ink)', lineHeight: 1.65 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ background: 'rgba(232,165,152,0.18)', border: '1px solid rgba(232,165,152,0.4)', borderRadius: 18, padding: 36 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>🌿 When to consider professional support</h3>
            <p style={{ fontSize: 14.5, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.6, marginBottom: 20 }}>
              ImoTracker is a wellness tool, not a clinical assessment. Your instincts as a parent matter most. Consider speaking with your paediatrician, a school counsellor, or a child psychologist if you notice:
            </p>
            <div className="rg-2col-sm">
              {[
                'Persistent sadness or tearfulness lasting more than two weeks',
                'Significant withdrawal from friends, family, or activities they used to enjoy',
                'Noticeable changes in sleep (too much or too little) or appetite',
                'Frequent, intense emotional outbursts beyond what seems typical',
                'Expressions of hopelessness, worthlessness, or not wanting to be here',
                'Any behaviour that genuinely worries or frightens you as a parent',
              ].map((flag, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--coral)', flexShrink: 0, fontWeight: 700 }}>•</span>
                  <span style={{ fontSize: 14, color: 'var(--navy-ink)', lineHeight: 1.55 }}>{flag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream-deep)', padding: '80px 0' }}>
        <div className="container">
          <div className="section-label">Articles</div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Further reading</h2>
          <div className="rg-3up" style={{ marginBottom: 0 }}>
            {ARTICLES.map(a => (
              <div key={a.title} className="card" style={{ padding: 28, cursor: 'pointer' }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{a.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 8 }}>{a.time}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.55 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-label">Downloadable worksheets</div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Free resources for your family</h2>
          <div className="rg-4up">
            {WORKSHEETS.map(w => (
              <div key={w.title} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 28 }}>{w.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{w.age}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{w.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.5, flex: 1 }}>{w.desc}</p>
                <button className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 16px', alignSelf: 'flex-start' }}>Download PDF</button>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.45, marginTop: 20 }}>
            * These worksheets are for personal, non-commercial use. Please do not redistribute without permission.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

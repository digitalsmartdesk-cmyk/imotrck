import type { Question } from './questions'

export type ScoreResult = {
  domain: string
  score: number
  maxScore: number
  percentage: number
}

export type InsightItem = {
  type: 'strength' | 'growth' | 'neutral'
  title: string
  body: string
}

export type OverallLabel = 'Strong' | 'Developing Well' | 'Needs Support'

type QuestionLike = Pick<Question, 'id' | 'type' | 'domain'> & { options?: string[] }

export function scoreAnswers(
  answers: Record<string | number, string | string[]>,
  questions: QuestionLike[]
): ScoreResult[] {
  const domainScores: Record<string, { total: number; count: number }> = {}

  for (const question of questions) {
    const answer = answers[question.id]
    if (!answer) continue

    let score = 0
    if (question.type === 'emoji-scale' || question.type === 'scale') {
      score = parseInt(String(answer)) || 3
    } else if (question.type === 'single-choice') {
      const options = question.options || []
      const idx = options.indexOf(String(answer))
      score = idx >= 0 ? Math.round(((options.length - idx) / options.length) * 5) : 3
    } else if (question.type === 'multi-select') {
      const selected = Array.isArray(answer) ? answer : []
      const options = question.options || []
      score = Math.min(5, Math.round((selected.length / Math.max(options.length / 2, 1)) * 5))
    } else {
      score = answer ? 4 : 3
    }

    if (!domainScores[question.domain]) {
      domainScores[question.domain] = { total: 0, count: 0 }
    }
    domainScores[question.domain].total += score
    domainScores[question.domain].count += 1
  }

  return Object.entries(domainScores).map(([domain, { total, count }]) => {
    const avgScore = total / count
    const normalised = Math.round((avgScore / 5) * 5 * 10) / 10
    return {
      domain,
      score: Math.round(normalised),
      maxScore: 5,
      percentage: Math.round((avgScore / 5) * 100),
    }
  })
}

export function generateInsights(scores: ScoreResult[], childName?: string): InsightItem[] {
  const name = childName ? `${childName} shows` : 'Your child shows'
  const nameAlt = childName ? `${childName} may` : 'Your child may'
  const insights: InsightItem[] = []

  for (const s of scores) {
    if (s.score >= 4) {
      insights.push({
        type: 'strength',
        title: `Strong ${s.domain}`,
        body: `${name} excellent ${s.domain.toLowerCase()} skills, scoring ${s.score}/5. This is a real strength to celebrate.`,
      })
    } else if (s.score <= 2) {
      insights.push({
        type: 'growth',
        title: `${s.domain} needs support`,
        body: `${nameAlt} benefit from gentle support developing their ${s.domain.toLowerCase()} skills. This is a growth opportunity.`,
      })
    } else {
      insights.push({
        type: 'neutral',
        title: `${s.domain} developing well`,
        body: `${childName ? childName : 'Your child'} is making good progress with ${s.domain.toLowerCase()}, with room to grow further.`,
      })
    }
  }

  return insights
}

export function getOverallLabel(input: ScoreResult[] | number): OverallLabel {
  let avg: number
  if (typeof input === 'number') {
    avg = input
  } else {
    if (input.length === 0) return 'Developing Well'
    avg = input.reduce((sum, s) => sum + s.score, 0) / input.length
  }
  if (avg >= 4) return 'Strong'
  if (avg >= 3) return 'Developing Well'
  return 'Needs Support'
}

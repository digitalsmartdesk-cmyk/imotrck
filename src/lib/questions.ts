export type Question = {
  id: number
  text: string
  type: 'emoji-scale' | 'single-choice' | 'multi-select' | 'scale' | 'open-text' | 'frequency'
  domain: string
  options?: string[]
}

export const FREE_QUESTIONS: Question[] = [
  { id: 1, text: 'When you feel sad, what do you usually do?', type: 'single-choice', domain: 'Emotional Awareness', options: ['Cry by myself', 'Tell someone I trust', 'Play or do something fun', 'I\'m not sure'] },
  { id: 2, text: 'How do you feel when a friend is upset?', type: 'emoji-scale', domain: 'Emotional Awareness' },
  { id: 3, text: 'Can you tell when someone is feeling left out?', type: 'single-choice', domain: 'Emotional Awareness', options: ['Always', 'Sometimes', 'Rarely', 'I\'m not sure'] },
  { id: 4, text: 'How good are you at naming how you feel?', type: 'scale', domain: 'Emotional Awareness' },
  { id: 5, text: 'Which feelings do you find easiest to notice in yourself?', type: 'multi-select', domain: 'Emotional Awareness', options: ['Happy', 'Sad', 'Angry', 'Nervous', 'Excited', 'Scared'] },
  { id: 6, text: 'When you feel worried, how big does it get?', type: 'emoji-scale', domain: 'Emotional Awareness' },
  { id: 7, text: 'How easy is it for you to ask for help when you\'re upset?', type: 'scale', domain: 'Emotional Awareness' },
  { id: 8, text: 'Do you have someone you can talk to when you have big feelings?', type: 'single-choice', domain: 'Emotional Awareness', options: ['Yes, definitely', 'Sometimes', 'Not really', 'I prefer to handle it alone'] },
  { id: 9, text: 'What helps you feel better when you\'re sad or angry?', type: 'multi-select', domain: 'Emotional Awareness', options: ['Talking to someone', 'Being alone for a bit', 'Playing or moving', 'Drawing or writing', 'Listening to music', 'Hugging someone'] },
  { id: 10, text: 'Is there anything about your feelings you\'d like to share?', type: 'open-text', domain: 'Emotional Awareness' },
]

export type Topic = {
  id: string
  name: string
  label: string
  description: string
  questionCount: number
  questions: number
  ageMin: number
  ageMax: number
  minAge: number
  icon: string
  tier: 'free' | 'premium'
  isFree: boolean
  estimatedMinutes: number
  domains: string[]
}

export const TOPICS: Topic[] = [
  {
    id: 'emotional-awareness',
    name: 'Emotional Awareness',
    label: 'Emotional Awareness',
    description: 'Can my child name and notice their feelings in the moment?',
    questionCount: 15,
    questions: 15,
    ageMin: 7,
    ageMax: 15,
    minAge: 7,
    icon: '💛',
    tier: 'free',
    isFree: true,
    estimatedMinutes: 5,
    domains: ['Emotional Awareness'],
  },
  {
    id: 'emotional-regulation',
    name: 'Emotional Regulation',
    label: 'Emotional Regulation',
    description: 'How does my child handle big emotions?',
    questionCount: 18,
    questions: 18,
    ageMin: 7,
    ageMax: 15,
    minAge: 7,
    icon: '🌊',
    tier: 'premium',
    isFree: false,
    estimatedMinutes: 6,
    domains: ['Emotional Regulation'],
  },
  {
    id: 'stress-resilience',
    name: 'Stress & Resilience',
    label: 'Stress & Resilience',
    description: 'How does my child cope under pressure?',
    questionCount: 18,
    questions: 18,
    ageMin: 8,
    ageMax: 15,
    minAge: 8,
    icon: '🌿',
    tier: 'premium',
    isFree: false,
    estimatedMinutes: 6,
    domains: ['Stress & Resilience'],
  },
  {
    id: 'empathy-social',
    name: 'Empathy & Social Sense',
    label: 'Empathy & Social Sense',
    description: 'Does my child tune in to others?',
    questionCount: 16,
    questions: 16,
    ageMin: 7,
    ageMax: 15,
    minAge: 7,
    icon: '🤝',
    tier: 'premium',
    isFree: false,
    estimatedMinutes: 5,
    domains: ['Empathy & Social Sense'],
  },
  {
    id: 'relationships-trust',
    name: 'Relationships & Trust',
    label: 'Relationships & Trust',
    description: 'How does my child build connections?',
    questionCount: 17,
    questions: 17,
    ageMin: 7,
    ageMax: 15,
    minAge: 7,
    icon: '🔗',
    tier: 'premium',
    isFree: false,
    estimatedMinutes: 6,
    domains: ['Relationships & Trust'],
  },
  {
    id: 'self-perception',
    name: 'Self-Perception',
    label: 'Self-Perception',
    description: 'How does my child see themselves?',
    questionCount: 16,
    questions: 16,
    ageMin: 7,
    ageMax: 15,
    minAge: 7,
    icon: '🪞',
    tier: 'premium',
    isFree: false,
    estimatedMinutes: 5,
    domains: ['Self-Perception'],
  },
  {
    id: 'identity-authenticity',
    name: 'Identity & Authenticity',
    label: 'Identity & Authenticity',
    description: 'Is my child secure in who they are?',
    questionCount: 20,
    questions: 20,
    ageMin: 10,
    ageMax: 15,
    minAge: 10,
    icon: '✨',
    tier: 'premium',
    isFree: false,
    estimatedMinutes: 7,
    domains: ['Identity & Authenticity'],
  },
  {
    id: 'meaning-purpose',
    name: 'Meaning & Purpose',
    label: 'Meaning & Purpose',
    description: 'Does my child feel their life has direction?',
    questionCount: 15,
    questions: 15,
    ageMin: 10,
    ageMax: 15,
    minAge: 10,
    icon: '🌟',
    tier: 'premium',
    isFree: false,
    estimatedMinutes: 5,
    domains: ['Meaning & Purpose'],
  },
]

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find(t => t.id === id)
}

export function getTopicQuestions(topicId: string): Question[] {
  const topic = getTopic(topicId)
  if (!topic) return []

  const count = topic.questionCount
  const domain = topic.name

  const questionTemplates: Array<{ text: string; type: Question['type']; options?: string[] }> = [
    { text: `How well do you manage your ${domain.toLowerCase()} day to day?`, type: 'scale' },
    { text: `How often do you think about how you feel inside?`, type: 'frequency' },
    { text: `When did you last feel something strongly?`, type: 'single-choice', options: ['Today', 'This week', 'A while ago', 'I\'m not sure'] },
    { text: `Which of these describe how you feel right now?`, type: 'multi-select', options: ['Happy', 'Calm', 'Nervous', 'Excited', 'Sad', 'Confused'] },
    { text: `How easy is it to handle difficult feelings?`, type: 'scale' },
    { text: `How do you feel about yourself overall?`, type: 'emoji-scale' },
    { text: `What helps you most when you\'re feeling upset?`, type: 'multi-select', options: ['Talking to someone', 'Time alone', 'Physical activity', 'Creative activities', 'Music', 'Being in nature'] },
    { text: `How important is understanding your feelings to you?`, type: 'scale' },
    { text: `How often do others notice how you\'re feeling?`, type: 'frequency' },
    { text: `How well do you bounce back when things go wrong?`, type: 'scale' },
    { text: `Which words best describe your emotional style?`, type: 'multi-select', options: ['Open', 'Private', 'Sensitive', 'Strong', 'Thoughtful', 'Expressive'] },
    { text: `How connected do you feel to the people around you?`, type: 'emoji-scale' },
    { text: `When you\'re worried, what do you usually do?`, type: 'single-choice', options: ['Talk to someone', 'Keep it to myself', 'Distract myself', 'Not sure'] },
    { text: `How confident do you feel in yourself?`, type: 'scale' },
    { text: `How much do your feelings change throughout the day?`, type: 'scale' },
    { text: `Do you find it easy to say how you feel?`, type: 'frequency' },
    { text: `How proud are you of how you handle tough situations?`, type: 'scale' },
    { text: `What would you like your parent to understand about you?`, type: 'open-text' },
  ]

  const questions: Question[] = []
  for (let i = 0; i < count; i++) {
    const template = questionTemplates[i % questionTemplates.length]
    questions.push({
      id: i + 1,
      text: template.text,
      type: template.type,
      domain,
      options: template.options,
    })
  }

  return questions
}

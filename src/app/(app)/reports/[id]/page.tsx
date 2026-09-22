import ReportClient from './ReportClient'

export function generateStaticParams() {
  return ['r1', 'r2', 'r3', 'r4', '1', '2', '3', '4'].map(id => ({ id }))
}

export default function ReportPage({ params }: { params: { id: string } }) {
  return <ReportClient id={params.id} />
}

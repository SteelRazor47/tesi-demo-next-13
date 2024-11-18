import { Suspense } from 'react';
import Note from '../../../components/Note'
import NoteSkeleton from '../../../components/NoteSkeleton';

export default async function Home({ params }) {
  const id = (await params).id
  return (
    <Suspense fallback={<NoteSkeleton isEditing={false /*isEditing*/} />}>
      <Note selectedId={id} isEditing={false /*isEditing*/} />
    </Suspense>
  )
}

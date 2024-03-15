
export default function TestIdPage({
  params,
}) {

  const {
    testId,
  } = params;

  return (
    <main>
      <p>Go get dis test info: {testId}</p>
    </main>
  )
}

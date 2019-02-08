export const getForminitialValues = selectedTask => (
  {
    title: selectedTask.title,
    duration: selectedTask.duration / 60,
    description: selectedTask.description
  }
)

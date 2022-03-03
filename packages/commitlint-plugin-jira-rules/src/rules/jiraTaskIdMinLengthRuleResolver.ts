import { parseCommitMessage } from 'commitlint-jira-utils'
import { TRuleResolver } from '../../@types'

const jiraTaskIdMinLengthRuleResolver: TRuleResolver = (
  parsed,
  _when,
  value = 3,
) => {
  const rawCommitMessage = parsed.raw
  if (!rawCommitMessage) return [false, 'Commit message should not be empty']

  const commitMessage = parseCommitMessage(rawCommitMessage)

  const nonValidTaskId = commitMessage.commitTaskIds.find(
    taskId => taskId.length < value,
  )

  const isRuleValid = !nonValidTaskId

  return [
    isRuleValid,
    `${nonValidTaskId} taskId must not be shorter than ${value} characters`,
  ]
}

export default jiraTaskIdMinLengthRuleResolver

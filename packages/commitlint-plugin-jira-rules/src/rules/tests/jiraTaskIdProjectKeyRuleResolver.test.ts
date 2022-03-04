import jiraTaskIdProjectKeyRuleResolver from '../jiraTaskIdProjectKeyRuleResolver'

describe('jiraTaskIdProjectKeyRuleResolver', () => {
  it('should return a error response if commit message is empty', () => {
    const parsed = {
      raw: '',
    }
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, 'PRJT')[0],
    ).toEqual(false)
  })
  it('should return a error response if task id does not include project key', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, 'PRJT')[0],
    ).toEqual(false)
  })
  it('should include invalid task id and the expected project id in error message', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, 'PRJT')[1],
    ).toMatch(new RegExp('^IB-21'))
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, 'PRJT')[1],
    ).toMatch(new RegExp('PRJT$'))
  })
  it('should return a error response if task id does not include any project keys', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    const value = ['PRJT', 'PRJT2']
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, value)[0],
    ).toEqual(false)
  })
  it('should return an error response if any of multiple task ids do not include any project keys', () => {
    const parsed = {
      raw: 'PRJT-21, IB-21: my commit message',
    }
    const value = ['PRJT', 'PRJT2']
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, value)[0],
    ).toEqual(false)
  })
  it('should include the invalid task id and the expected project ids in the error message when using multiple tasks and projects', () => {
    const parsed = {
      raw: 'PRJT-21, IB-21, PRJT2-21: my commit message',
    }
    const value = ['PRJT', 'PRJT2']
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, value)[1],
    ).toMatch(new RegExp('^IB-21'))
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, value)[1],
    ).toMatch(new RegExp('PRJT,PRJT2$'))
  })
  it('should return a success response if project key is set to false', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, false)[0],
    ).toEqual(true)
  })
  it('should return a success response if task id include project key', () => {
    const parsed = {
      raw: 'PRJT-21: my commit message',
    }
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, 'PRJT')[0],
    ).toEqual(true)
  })
  it('should return a success response if task id include one of the project key', () => {
    const parsed = {
      raw: 'PRJT-21: my commit message',
    }
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, ['PRJT', 'PRJT2'])[0],
    ).toEqual(true)
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, [
        'PRJT3',
        'PRJT2',
        'PRJT',
      ])[0],
    ).toEqual(true)
  })
  it('should return a success response if all task ids include one of the project keys', () => {
    const parsed = {
      raw: 'PRJT-21, PRJT2-21: my commit message',
    }
    const value = ['PRJT', 'PRJT2']
    expect(
      jiraTaskIdProjectKeyRuleResolver(parsed, undefined, value)[0],
    ).toEqual(true)
  })
})

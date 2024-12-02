# Summary

- official docs에서 page-router를 활용하는 경우 metadata를 사용하는 많은 방법을 찾을 수는 없었음.
- 현재 구현한 방법이 큰 문제는 없으므로, 추후 앱 라우터를 활용하게 된다면 metadata api를 사용하는 것을 목표로 함.

# Motive

- 해당 앱은 어떤 태스크를 시작하고 타이머가 돌아가며 남은 시간을 브라우저의 탭을 통해서 확인하는 것이 필수
- 이를 위해서 아래 구현이 필요하였음.

# My usecase

```
//Clock.tsx

  const time = convertMsToTime(leftSecs);

  return (
    <>
      <Head>
        <title>{time}</title>
        <meta
          name="My pomodoro timer"
          content="Task Reminder using Pomodoro method"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  )
```

- 현재로써는 타이머 워커를 활용하는 Clock 컴포넌트에서 dynamic하게 head 제목을 바꿔서 남은 시간을 알 수 있게 함.

[nextjs page router <Head>](https://nextjs.org/docs/pages/api-reference/components/head)

- 에서 추천하는 바로는 최상위에서 사용하는 것이 좋다고 하나, 현재까지 큰 문제점은 발견하지 못함.

조금더 확인이 필요할 듯 함.
